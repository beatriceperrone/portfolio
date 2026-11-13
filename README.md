# Portfolio — Beatrice Perrone

Portfolio web di **Beatrice Perrone**: eventi, comunicazione e marketing strategico.

- Homepage tipografica ("Portfolio / Beatrice Perrone") con intro e gallery di **9 progetti**
- Card **quadrate che flippano in hover** mostrando l'abstract, con click verso la pagina dedicata
- Pagina dedicata per ogni progetto (testo, metadati, galleria, crediti foto, prev/next)
- Gallery **"a tutto schermo" in righe da due** (full-bleed, card 4:3)
- Sezione **Chi sono** (esperienza, formazione, competenze, lingue, certificazioni)
- PDF scaricabile **"I 7 step dell'esperienza museale"** nella pagina della tesi
- CV scaricabile dal footer
- IT/EN con un click
- Palette: crema caldo + viola elettrico + accenti (corallo, ambra, rosa) — font **Inter**

## Struttura

```
portfolio-v2/         ← il sito generato (versione pubblicata)
  index.html
  progetti/<slug>/index.html
  css/style.css
  js/main.js
  assets/…             (CV, PDF 7 step, favicon, foto, gallerie)
docs/                  ← copia di portfolio-v2 pubblicata via GitHub Pages
build/                 ← sorgente contenuti + generatori (non serve in produzione)
  data.v2.js           ← TUTTI i testi e i contenuti del sito
  build-v2.js          ← genera le pagine statiche
  assets/              ← risorse di input (favicon, PDF 7 step)
  crop-gallery.py      ← ritaglia le foto delle gallery
  qa/audit-v2.js       ← QA automatico con Chromium
.pi/extensions/webqa/  ← estensione pi: screenshot e audit delle pagine
materiali/             ← bozze, correzioni e foto originali (ignorato da git)
```

## Avvio e anteprima

```bash
# dentro la cartella del progetto
npm install            # una sola volta (installa puppeteer/Chromium)

# servire localmente su http://localhost:4174
npm run serve
```

## Modifiche e rigenerazione

Modifica i contenuti in **`build/data.v2.js`**, poi:

```bash
npm run build          # rigenera portfolio-v2/index.html + pagine progetto
```

## QA automatico

```bash
npm run qa             # serve /portfolio-v2, apre ogni pagina con Chromium
                       # e verifica errori, immagini rotte, overflow, flip in hover
```

## Estensione pi (per "vedere" il sito dentro pi)

Dopo aver fatto `/reload` in pi, sono disponibili due tool:

- **`screenshot_page`** — apre una pagina e salva uno screenshot in `screenshots/`
  - es. `"fai lo screenshot di /progetti/luoghi-comuni/"`
- **`audit_page`** — report tecnico (console, immagini, overflow)
  - es. `"fai l'audit di /index.html"`

L'estensione usa Puppeteer (Chromium) già installato con `npm install`.

## Note sulle immagini

Le foto provengono da **Wikimedia Commons** e sono citate con autore e licenza
(CC BY / CC BY-SA / Public domain) direttamente nelle didascalie delle pagine.

---

## Pubblicazione su GitHub Pages

Il sito viene copiato in `docs/` (GitHub Pages serve da lì).

1. Push del progetto su `main`.
2. Su GitHub: **Settings → Pages**:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/docs**
   - Save
3. Dopo qualche secondo/minuto il sito è su `https://apoffa.github.io/portfolio-bea/`

Per aggiornare il sito dopo modifiche:

```bash
npm run build:pages     # rigenera portfolio-v2 e sincronizza docs/
git add -A && git commit -m "Update portfolio" && git push
```