// ============================================================
// DEV WATCH — rigenera portfolio-v2 quando cambiano i sorgenti build
// Uso: node build/dev-watch.js  (oppure npm run dev)
// ============================================================
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
// File che, se cambiati, richiedono la rigenerazione
const WATCH_DIR = [
  "build",
];

let building = false;
let queued = false;

function runBuild() {
  if (building) {
    queued = true;
    return;
  }
  building = true;
  const t0 = Date.now();
  const child = spawn("node", ["build/build-v2.js"], { cwd: ROOT, stdio: "inherit" });
  child.on("exit", (code) => {
    building = false;
    if (code === 0) {
      console.log(`\n✓ Build rigenerata in ${Date.now() - t0}ms — ricarica il browser.\n`);
    } else {
      console.log(`\n✗ Build fallita (codice ${code}). Correggi e riprova.\n`);
    }
    if (queued) {
      queued = false;
      runBuild();
    }
  });
}

WATCH_DIR.forEach((p) => {
  const full = path.join(ROOT, p);
  fs.watch(full, { recursive: p.includes("assets") }, () => {
    // debounce (i salvataggi multipli generano più eventi)
    clearTimeout(runBuild._t);
    runBuild._t = setTimeout(runBuild, 150);
  });
});

console.log(`👀 In watch su:\n   ${WATCH_DIR.join("\n   ")}\n`);
console.log("HTML e i18n si rigenerano da soli a ogni salvataggio.\n");

// prima build all'avvio, così serve la versione più recente
runBuild();