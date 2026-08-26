/**
 * WebQA — strumenti per "vedere" e verificare il portfolio.
 *
 * Espone due tool richiamabili da pi:
 *   - screenshot_page : salva uno screenshot PNG di una pagina del sito
 *   - audit_page      : report tecnico (console, immagini rotte, overflow)
 *
 * Serve automaticamente la cartella /portfolio-v2 su un server locale e
 * usa Puppeteer (Chromium) per il rendering headless.
 *
 * Dipendenze: puppeteer (già in package.json della root del progetto).
 * Attiva con /reload, poi chiedi ad esempio:
 *   "fai lo screenshot di /index.html"
 */

import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";
import { createServer, type Server } from "node:http";
import { readFile } from "node:fs";
import { promises as fsp } from "node:fs";
import { join, extname, normalize } from "node:path";

let puppeteerModule: any = null;

const SITE_ROOT = join(__dirname, "..", "..", "..", "portfolio-v2");
const OUT_DIR = join(__dirname, "..", "..", "..", "screenshots");

const MIME: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".json": "application/json",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
};

let server: Server | null = null;
let port: number | null = null;
let browser: any = null;

function startServer(): Promise<string> {
  if (server && port) return Promise.resolve(`http://127.0.0.1:${port}`);
  return new Promise((resolveP, reject) => {
    const s = createServer((req, res) => {
      try {
        let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
        if (urlPath.endsWith("/")) urlPath += "index.html";
        const normalized = normalize(urlPath).replace(/^(\.\.(\/|\\|$))+/, "");
        const file = join(SITE_ROOT, normalized);
        if (!file.startsWith(SITE_ROOT)) {
          res.writeHead(403);
          res.end("Forbidden");
          return;
        }
        readFile(file, (err, data) => {
          if (err) {
            res.writeHead(404);
            res.end("Not found");
            return;
          }
          res.writeHead(200, { "Content-Type": MIME[extname(file).toLowerCase()] || "application/octet-stream" });
          res.end(data);
        });
      } catch {
        res.writeHead(400);
        res.end("Bad request");
      }
    });
    s.on("error", reject);
    s.listen(0, "127.0.0.1", () => {
      const addr = s.address();
      if (addr && typeof addr === "object") {
        port = addr.port;
        server = s;
        resolveP(`http://127.0.0.1:${port}`);
      } else {
        reject(new Error("Impossibile avviare il server"));
      }
    });
  });
}

async function getBrowser() {
  if (!puppeteerModule) {
    // require lazy: non carica Chromium all'avvio di pi
    puppeteerModule = require("puppeteer");
  }
  if (!browser) {
    browser = await puppeteerModule.launch({ args: ["--no-sandbox"] });
  }
  return browser;
}

function toUrl(pathOrUrl: string, base: string): string {
  const p = pathOrUrl.trim();
  if (/^https?:\/\//i.test(p)) return p;
  const clean = p.startsWith("/") ? p : `/${p}`;
  return `${base}${clean}`;
}

async function loadAllImages(page: any) {
  await page.evaluate(async () => {
    const imgs = [...(document.images as any)];
    imgs.forEach((img) => (img.loading = "eager"));
    await Promise.all(
      imgs.map((img: any) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          const src = img.getAttribute("src");
          if (!src) return resolve(null);
          img.addEventListener("load", () => resolve(null), { once: true });
          img.addEventListener("error", () => resolve(null), { once: true });
          img.removeAttribute("src");
          img.setAttribute("src", src);
        });
      })
    );
  });
  await page.waitForNetworkIdle({ idleTime: 700, timeout: 60000 }).catch(() => {});
}

export default function webqa(pi: ExtensionAPI) {
  pi.registerTool({
    name: "screenshot_page",
    label: "Screenshot pagina",
    description:
      "Apre una pagina del portfolio (percorso relativo a /portfolio-v2 oppure URL assoluto) in Chromium e salva uno screenshot PNG in /screenshots. Utile per vedere graficamente il risultato del sito.",
    parameters: Type.Object({
      path: Type.String({ description: "Percorso della pagina, es. /index.html o /progetti/luoghi-comuni/" }),
      name: Type.Optional(Type.String({ description: "Nome file di output (senza estensione). Default: slug dalla path." })),
      fullPage: Type.Optional(Type.Boolean({ description: "Cattura l'intera pagina (default true)" })),
      width: Type.Optional(Type.Number({ description: "Larghezza viewport (default 1440)" })),
      height: Type.Optional(Type.Number({ description: "Altezza viewport (default 900)" })),
    }),
    async execute(_toolCallId, params) {
      const base = await startServer();
      const url = toUrl(params.path || "/index.html", base);
      const w = params.width || 1440;
      const h = params.height || 900;
      const fullPage = params.fullPage !== false;

      await fsp.mkdir(OUT_DIR, { recursive: true });
      const slug =
        params.name ||
        url
          .replace(/^https?:\/\//, "")
          .replace(/[^a-zA-Z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "")
          .slice(0, 80) || "page";
      const outFile = join(OUT_DIR, `${slug}.png`);

      const b = await getBrowser();
      const page = await b.newPage();
      await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
      await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
      await loadAllImages(page);
      if (fullPage) {
        await page.evaluate(async () => {
          await new Promise((resolve) => {
            let y = 0;
            const t = setInterval(() => {
              y += 800;
              window.scrollTo(0, y);
              if (y >= document.body.scrollHeight - window.innerHeight + 200) {
                clearInterval(t);
                resolve(null);
              }
            }, 60);
          });
          window.scrollTo(0, 0);
        });
      }
      await page.screenshot({ path: outFile, fullPage });
      const title = await page.title();
      await page.close();

      return {
        content: [{ type: "text", text: `Screenshot salvato: ${outFile}\nPagina: ${url}\nTitolo: ${title}` }],
        details: { file: outFile, url, title, width: w, height: h, fullPage },
      };
    },
  });

  pi.registerTool({
    name: "audit_page",
    label: "Audit pagina",
    description:
      "Verifica una pagina del portfolio: errori console, richieste fallite, immagini rotte, overflow orizzontale e titolo. Restituisce un report testuale.",
    parameters: Type.Object({
      path: Type.String({ description: "Percorso della pagina, es. /index.html o /progetti/luoghi-comuni/" }),
    }),
    async execute(_toolCallId, params) {
      const base = await startServer();
      const url = toUrl(params.path || "/index.html", base);

      const b = await getBrowser();
      const page = await b.newPage();
      await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

      const failures: string[] = [];
      const consoleErrs: string[] = [];
      const pageErrs: string[] = [];
      page.on("requestfailed", (r: any) => failures.push(`REQFAIL ${r.url()} ${r.failure()?.errorText || ""}`));
      page.on("response", (r: any) => {
        if (r.status() >= 400) failures.push(`HTTP ${r.status()} ${r.url()}`);
      });
      page.on("console", (m: any) => {
        if (m.type() === "error") consoleErrs.push(m.text());
      });
      page.on("pageerror", (e: any) => pageErrs.push(e.message));

      await page.goto(url, { waitUntil: "networkidle2", timeout: 60000 });
      await loadAllImages(page);

      const brokenImages = await page.evaluate(() =>
        [...(document.images as any)]
          .filter((i: any) => !(i.complete && i.naturalWidth > 0))
          .map((i: any) => i.getAttribute("src"))
      );
      const overflow = await page.evaluate(() => {
        const cw = document.documentElement.clientWidth;
        const sw = document.documentElement.scrollWidth;
        return sw > cw + 2 ? `client ${cw}px / scroll ${sw}px` : null;
      });
      const title = await page.title();
      await page.close();

      const lines: string[] = [];
      lines.push(`Audit: ${url}`);
      lines.push(`Titolo: ${title}`);
      lines.push(brokenImages.length ? `✗ Immagini non caricate: ${brokenImages.length}` : "✓ Immagini: OK");
      lines.push(overflow ? `✗ Overflow orizzontale: ${overflow}` : "✓ Layout: nessun overflow orizzontale");
      lines.push(consoleErrs.length ? `✗ Console: ${consoleErrs.join(" | ")}` : "✓ Console: nessun errore");
      lines.push(pageErrs.length ? `✗ PageError: ${pageErrs.join(" | ")}` : "✓ PageError: nessuno");
      lines.push(failures.length ? `✗ Rete: ${failures.join(" | ")}` : "✓ Rete: nessuna richiesta fallita");

      return { content: [{ type: "text", text: lines.join("\n") }], details: { ok: !(brokenImages.length || overflow || consoleErrs.length || pageErrs.length || failures.length) } };
    },
  });

  pi.on("session_shutdown", async () => {
    if (browser) {
      await browser.close().catch(() => {});
      browser = null;
    }
    if (server) {
      server.close();
      server = null;
      port = null;
    }
  });
}