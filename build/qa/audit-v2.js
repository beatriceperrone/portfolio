// ============================================================
// QA AUDIT — serve /portfolio-v2, carica tutte le pagine con
// Chromium (Puppeteer) e verifica errori, immagini rotte,
// overflow orizzontale e comportamento dell'hover/flip.
// Uso: node build/qa/audit.js
// ============================================================

const http = require("http");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

const ROOT = path.join(__dirname, "..", "..", "portfolio-v2");
const SHOTS = path.join(__dirname, "..", "..", "screenshots-v2");
const PORT = 4189;

const MIME = {
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
};

function serve() {
  return http
    .createServer((req, res) => {
      let urlPath = decodeURIComponent(req.url.split("?")[0]);
      if (urlPath.endsWith("/")) urlPath += "index.html";
      const file = path.join(ROOT, urlPath);
      if (!file.startsWith(ROOT)) {
        res.writeHead(403);
        return res.end("Forbidden");
      }
      fs.readFile(file, (err, data) => {
        if (err) {
          res.writeHead(404);
          return res.end("Not found");
        }
        res.writeHead(200, { "Content-Type": MIME[path.extname(file).toLowerCase()] || "application/octet-stream" });
        res.end(data);
      });
    })
    .listen(PORT);
}

async function scrollThrough(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let y = 0;
      const t = setInterval(() => {
        y += 700;
        window.scrollTo(0, y);
        if (y >= document.body.scrollHeight - window.innerHeight + 200) {
          clearInterval(t);
          resolve();
        }
      }, 80);
    });
    window.scrollTo(0, 0);
  });
  await new Promise((r) => setTimeout(r, 600));
}

// Forza il caricamento di TUTTE le immagini (anche quelle lazy sotto la piega)
async function loadAllImages(page) {
  await page.evaluate(async () => {
    const imgs = [...document.images];
    imgs.forEach((img) => (img.loading = "eager"));
    await Promise.all(
      imgs.map((img) => {
        if (img.complete && img.naturalWidth > 0) return Promise.resolve();
        return new Promise((resolve) => {
          const src = img.getAttribute("src");
          if (!src) return resolve();
          img.addEventListener("load", () => resolve(), { once: true });
          img.addEventListener("error", () => resolve(), { once: true });
          img.removeAttribute("src");
          img.setAttribute("src", src);
        });
      })
    );
  });
  await page.waitForNetworkIdle({ idleTime: 800, timeout: 60000 }).catch(() => {});
}

(async () => {
  fs.mkdirSync(SHOTS, { recursive: true });
  serve();
  const pages = ["/index.html"];
  const progetti = fs.readdirSync(path.join(ROOT, "progetti"));
  progetti.forEach((s) => pages.push(`/progetti/${s}/index.html`));

  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  const results = [];

  for (const pathname of pages) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

    const failures = [];
    page.on("requestfailed", (r) => failures.push(`REQFAIL ${r.url()} ${r.failure()?.errorText || ""}`));
    page.on("response", (r) => {
      if (r.status() >= 400) failures.push(`HTTP ${r.status()} ${r.url()}`);
    });
    const consoleErrs = [];
    page.on("console", (m) => {
      if (m.type() === "error") consoleErrs.push(m.text());
    });
    const pageErrs = [];
    page.on("pageerror", (e) => pageErrs.push(e.message));

    await page.goto(`http://127.0.0.1:${PORT}${pathname}`, { waitUntil: "networkidle2", timeout: 60000 });
    await loadAllImages(page);
    await scrollThrough(page);

    // immagini rotte
    const brokenImages = await page.evaluate(() =>
      [...document.images]
        .filter((i) => !(i.complete && i.naturalWidth > 0))
        .map((i) => i.getAttribute("src"))
    );

    // overflow orizzontale
    const overflow = await page.evaluate(() => {
      const w = document.documentElement.clientWidth;
      const sw = document.documentElement.scrollWidth;
      return sw > w + 2 ? { clientWidth: w, scrollWidth: sw } : null;
    });

    // titolo e h1
    const title = await page.title();

    results.push({
      page: pathname,
      title,
      brokenImages,
      overflow,
      consoleErrs,
      pageErrs,
      failures,
    });
    await page.close();
  }

  // Verifica flip della card sulla homepage
  const p = await browser.newPage();
  await p.setViewport({ width: 1440, height: 900 });
  await p.goto(`http://127.0.0.1:${PORT}/index.html`, { waitUntil: "networkidle2" });
  await p.evaluate(() => window.scrollTo(0, document.querySelector("#lavori").offsetTop - 120));
  await new Promise((r) => setTimeout(r, 900));
  const tile = await p.$(".tile");
  const box = await tile.boundingBox();
  await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await new Promise((r) => setTimeout(r, 1000));
  const flipTransform = await p.evaluate(() => {
    const inner = document.querySelector(".tile .tile-inner");
    return inner ? getComputedStyle(inner).transform : "none";
  });
  await p.screenshot({ path: path.join(SHOTS, "home-hover.png"), fullPage: false });
  await p.close();

  // Screenshot completo homepage + pagine campione
  const shotPages = ["/index.html", pages[2], pages[6]];
  for (const pathname of shotPages) {
    const sp = await browser.newPage();
    await sp.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });
    await sp.goto(`http://127.0.0.1:${PORT}${pathname}`, { waitUntil: "networkidle2" });
    await scrollThrough(sp);
    await sp.screenshot({
      path: path.join(SHOTS, pathname.replace(/\//g, "_").replace(/\.html$/, ".png")),
      fullPage: true,
    });
    await sp.close();
  }

  await browser.close();

  // report
  console.log("\n===== QA REPORT =====");
  console.log("Flip hover (transform):", flipTransform);
  let ok = true;
  for (const r of results) {
    const issues = [];
    if (r.brokenImages.length) issues.push(`brokenImages: ${r.brokenImages.length}`);
    if (r.overflow) issues.push(`horiz-overflow ${JSON.stringify(r.overflow)}`);
    if (r.consoleErrs.length) issues.push(`console: ${r.consoleErrs.join(" | ")}`);
    if (r.pageErrs.length) issues.push(`pageerror: ${r.pageErrs.join(" | ")}`);
    if (r.failures.length) issues.push(`network: ${r.failures.join(" | ")}`);
    const status = issues.length ? "⚠" : "✓";
    if (issues.length) ok = false;
    console.log(`${status} ${r.page} — "${r.title}"${issues.length ? "  → " + issues.join(" · ") : ""}`);
  }
  console.log(ok ? "\n✅ Tutti i controlli superati" : "\n⚠ Ci sono problemi da sistemare");
  process.exit(ok ? 0 : 1);
})().catch((e) => {
  console.error(e);
  process.exit(1);
});