// ============================================================
// BUILD V2 — portfolio-v2 (correzioni N1, IT + EN)
// Uso: node build/build-v2.js
// ============================================================

const fs = require("fs");
const path = require("path");
const { SITE, PROJECTS } = require("./data.v2");

const root = path.join(__dirname, "..", "portfolio-v2");

// ordine di visualizzazione invertito (ultimo progetto per primo)
const ORDER = [...PROJECTS].reverse();

const ICONS = {
  arrowRight:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  arrowUpRight:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>',
  arrowLeft:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
};

// ---------- dizionario i18n ----------
function buildI18N() {
  const d = {
    hero_l1: { it: "Benvenut*", en: "Welcome*" },
    hero_l2: { it: "nel mio portfolio.", en: "to my portfolio." },
    intro: { it: SITE.intro, en: SITE.intro_en },
    work_label: { it: "Lavori", en: "Work" },
    nav_lavori: { it: "Lavori", en: "Work" },
    nav_contatti: { it: "Contatti", en: "Contact" },
    gallery_title: { it: "I miei progetti", en: "My projects" },
    open_project: { it: "Apri progetto", en: "Open project" },
    all_projects: { it: "Tutti i lavori", en: "All projects" },
    key_activities: { it: "Key Activities", en: "Key Activities" },
    meta_year: { it: "Anno", en: "Year" },
    meta_place: { it: "Luogo", en: "Place" },
    gallery_label: { it: "Galleria", en: "Gallery" },
    prev_label: { it: "Precedente", en: "Previous" },
    next_label: { it: "Successivo", en: "Next" },
    footer_eyebrow: { it: "Contatti", en: "Contact" },
    footer_cta: { it: "Let's connect", en: "Let's connect" },
    cv_link: { it: "Scarica il CV", en: "Download CV" },
    credits: { it: "Foto: archivio personale", en: "Photos: personal archive" },
    dl_title: { it: "I 7 step dell'esperienza museale", en: "The 7 steps of the museum experience" },
    dl_sub: {
      it: "La sintesi operativa della ricerca: modelli e step pronti da applicare per operatori culturali e management.",
      en: "The operative synthesis of the research: models and steps ready to apply for cultural operators and management.",
    },
    dl_btn: { it: "Scarica i 7 step (PDF)", en: "Download the 7 steps (PDF)" },
  };

  PROJECTS.forEach((p) => {
    d["cat_" + p.slug] = { it: p.cat, en: p.cat_en };
    d["title_" + p.slug] = { it: p.title, en: p.title_en };
    d["ptitle_" + p.slug] = { it: p.pageTitle, en: p.pageTitle_en };
    d["abs_" + p.slug] = { it: p.abstract, en: p.abstract_en };
    d["year_" + p.slug] = { it: p.year, en: p.year_en };
    d["place_" + p.slug] = { it: p.place, en: p.place_en };
    p.body.forEach((b, i) => (d["body_" + p.slug + "_" + i] = { it: b, en: p.body_en[i] }));
    (p.actions || []).forEach((a, i) => (d["act_" + p.slug + "_" + i] = { it: a, en: p.actions_en[i] }));
  });

  return d;
}

// ---------- head ----------
function head(title, desc, base) {
  return `  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex, nofollow, noarchive" />
  <title>${title}</title>
  <meta name="description" content="${desc}" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:type" content="website" />
  <link rel="icon" type="image/svg+xml" href="${base}assets/favicon.svg" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="${base}css/style.css" />`;
}

// ---------- nav ----------
function nav(base) {
  return `<div class="nav">
  <div class="container nav-inner">
    <a class="brand" href="${base}index.html"><span class="brand-blue">Beatrice</span>&nbsp;<span>Perrone</span></a>
    <nav class="nav-links" aria-label="Navigazione principale">
      <a href="${base}index.html#lavori" data-i18n="nav_lavori">Lavori</a>
      <a href="${base}index.html#contatti" data-i18n="nav_contatti">Contatti</a>
    </nav>
    <div class="nav-right">
      <div class="lang-switch" role="group" aria-label="Lingua">
        <button type="button" data-lang-btn="it" class="active">IT</button>
        <button type="button" data-lang-btn="en">EN</button>
      </div>
      <button class="nav-toggle" aria-label="Apri il menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
  </div>
</div>`;
}

// ---------- hero ----------
function hero() {
  return `<header class="hero" id="top">
  <div class="container hero-inner">
    <h1 class="hero-title reveal">
      <span data-i18n="hero_l1">Benvenut*</span><br />
      <span class="hero-blue" data-i18n="hero_l2">nel mio portfolio.</span>
    </h1>
    <p class="lead reveal" data-delay="1" data-i18n="intro">${SITE.intro}</p>
  </div>
</header>`;
}

// ---------- tile ----------
function tile(p) {
  return `<a class="tile reveal" href="progetti/${p.slug}/index.html" aria-label="${p.title} · ${p.cat}" style="--accent:${p.accent};--accent-text:${p.accentText};">
  <span class="tile-inner">
    <span class="tile-face tile-front">
      <img src="${p.photo}" alt="${p.title}" loading="lazy" width="800" height="600" />
      <span class="tile-front-label">
        <span class="cat" data-i18n="cat_${p.slug}">${p.cat}</span>
        <span class="title" data-i18n="title_${p.slug}">${p.title}</span>
      </span>
    </span>
    <span class="tile-face tile-back">
      <span class="tile-back-top">
        <span class="tile-num">${p.num}</span>
        <span class="tile-arrow">${ICONS.arrowUpRight}</span>
      </span>
      <span class="tile-back-body">
        <span class="title" data-i18n="title_${p.slug}">${p.title}</span>
        <span class="abstract" data-i18n="abs_${p.slug}">${p.abstract}</span>
      </span>
      <span class="tile-back-cta"><span data-i18n="open_project">Apri progetto</span> ${ICONS.arrowRight}</span>
    </span>
  </span>
</a>`;
}

// ---------- footer ----------
function footer(base) {
  return `<footer class="footer" id="contatti">
  <div class="container">
    <div class="footer-cta reveal">
      <p class="eyebrow" data-i18n="footer_eyebrow">Contatti</p>
      <a class="footer-cta-link" href="mailto:${SITE.email}">
        <span class="footer-cta-word"><span data-i18n="footer_cta">Let's connect</span><span class="footer-cta-dot">.</span></span>
        <span class="footer-cta-arrow">${ICONS.arrowUpRight}</span>
      </a>
      <div class="footer-contacts">
        <a href="mailto:${SITE.email}">${SITE.email}</a>
        <a href="tel:${SITE.phoneHref}">${SITE.phone}</a>
        <a href="${SITE.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span data-year>2025</span> Beatrice Perrone · ${SITE.location}</span>
      <span><a href="${base}${SITE.cv}" target="_blank" rel="noopener" data-i18n="cv_link">Scarica il CV</a> &middot; <span data-i18n="credits">Immagini: Wikimedia Commons</span></span>
    </div>
  </div>
</footer>`;
}

// ---------- index ----------
function indexPage() {
  const base = "";
  const body = `${nav(base)}
${hero()}
<main>
  <section class="works" id="lavori">
    <div class="container">
      <div class="section-head reveal">
        <div>
          <p class="eyebrow" data-i18n="work_label">Lavori</p>
          <h2 class="section-title"><span data-i18n="gallery_title">I miei progetti</span><span style="color:var(--blue);">.</span></h2>
        </div>
      </div>
    </div>
    <div class="works-grid">
      ${ORDER.map((p, i) =>
        tile(p).replace('class="tile reveal"', `class="tile reveal" data-delay="${(i % 2) + 1}"`)
      ).join("\n      ")}
    </div>
  </section>
</main>
${footer(base)}`;

  return `<!DOCTYPE html>
<html lang="it">
<head>
${head(`${SITE.name} · Eventi, comunicazione & marketing`, `${SITE.intro}`, base)}
</head>
<body>
${body}
<script src="js/i18n.js"></script>
<script src="js/main.js"></script>
</body>
</html>`;
}

// ---------- pagine progetto ----------
function actionsHTML(p) {
  const items = p.actions
    .map((a, i) => `<li data-i18n="act_${p.slug}_${i}">${a}</li>`)
    .join("\n        ");
  return `<div class="proj-actions">
  <h3 data-i18n="key_activities">Key Activities</h3>
  <ul>${items}</ul>
</div>`;
}

function downloadHTML(p, assetBase) {
  return `<div class="download-box">
  <div class="txt">
    <h4 data-i18n="dl_title">I 7 step dell'esperienza museale</h4>
    <p data-i18n="dl_sub">La sintesi operativa della ricerca: modelli e step pronti da applicare per operatori culturali e management.</p>
  </div>
  <a class="btn btn-primary" href="${assetBase}7-step-esperienza-museale.pdf" target="_blank" rel="noopener">${ICONS.arrowUpRight} <span data-i18n="dl_btn">Scarica i 7 step (PDF)</span></a>
</div>`;
}

function galleryHTML(p) {
  return `<section class="proj-gallery">
  <p class="label" data-i18n="gallery_label">Galleria</p>
  <div class="gallery-grid count-${p.gallery.length} reveal">
    ${p.gallery
      .map(
        (g) =>
          `<figure class="g-item"><img src="${g.src}" alt="${g.alt}" loading="lazy" />${g.credit ? `<figcaption class="credit">${g.credit}</figcaption>` : ""}</figure>`
      )
      .join("\n      ")}
  </div>
</section>`;
}

function projectPage(p, prev, next) {
  const base = "../../";
  const assetBase = "../../assets/";

  const body = `<header class="proj-head container">
  <a class="back-link reveal" href="${base}index.html#lavori">${ICONS.arrowLeft} <span data-i18n="all_projects">Tutti i lavori</span></a>
  <div class="proj-top">
    <div class="proj-top-title reveal">
      <p class="eyebrow proj-kicker" data-i18n="cat_${p.slug}">${p.cat}</p>
      <h1 class="proj-title" data-i18n="ptitle_${p.slug}">${p.pageTitle}</h1>
    </div>
    <div class="proj-meta-top reveal" data-delay="1">
      <div class="meta-top-item"><span class="k" data-i18n="meta_year">Anno</span><span class="v" data-i18n="year_${p.slug}">${p.year}</span></div>
      <div class="meta-top-item"><span class="k" data-i18n="meta_place">Luogo</span><span class="v" data-i18n="place_${p.slug}">${p.place}</span></div>
    </div>
  </div>
</header>
<main class="proj" style="--accent:${p.accent};--accent-text:${p.accentText};">
  <div class="container">
    <div class="prose reveal">
      ${p.body.map((b, i) => `<div data-i18n-html="body_${p.slug}_${i}">${b}</div>`).join("\n      ")}
      ${p.actions ? actionsHTML(p) : ""}
      ${p.download ? downloadHTML(p, assetBase) : ""}
    </div>
    ${p.gallery ? galleryHTML(p) : ""}
  </div>
  <div class="container">
    <nav class="proj-nav">
      <a class="prev" href="../${prev.slug}/index.html"><span class="dir" data-i18n="prev_label">Precedente</span><span class="t" data-i18n="title_${prev.slug}">${prev.title}</span></a>
      <a class="next" href="../${next.slug}/index.html"><span class="dir" data-i18n="next_label">Successivo</span><span class="t" data-i18n="title_${next.slug}">${next.title}</span></a>
    </nav>
  </div>
</main>`;

  return `<!DOCTYPE html>
<html lang="it">
<head>
${head(`${p.pageTitle} · ${p.cat} | ${SITE.name}`, p.abstract, base)}
</head>
<body>
${nav(base)}
${body}
${footer(base)}
<script src="${base}js/i18n.js"></script>
<script src="${base}js/main.js"></script>
</body>
</html>`;
}

// ---------- genera ----------
function run() {
  fs.mkdirSync(path.join(root, "css"), { recursive: true });
  fs.mkdirSync(path.join(root, "js"), { recursive: true });
  fs.mkdirSync(path.join(root, "assets"), { recursive: true });

  // CV
  const cvSrc = path.join(__dirname, "..", "CV_Beatrice Perrone_en.pdf");
  const cvDst = path.join(root, "assets", "CV_Beatrice-Perrone_en.pdf");
  if (fs.existsSync(cvSrc)) fs.copyFileSync(cvSrc, cvDst);

  // asset condivisi (favicon + PDF 7 step) — sorgente in build/assets
  const shared = path.join(__dirname, "assets");
  for (const f of ["favicon.svg", "7-step-esperienza-museale.pdf"]) {
    const src = path.join(shared, f);
    const dst = path.join(root, "assets", f);
    if (fs.existsSync(src)) fs.copyFileSync(src, dst);
  }

  // dizionario i18n
  fs.writeFileSync(
    path.join(root, "js", "i18n.js"),
    "window.I18N = " + JSON.stringify(buildI18N()) + ";\n"
  );

  // index
  fs.writeFileSync(path.join(root, "index.html"), indexPage());

  // progetti (prev/next seguono l'ordine invertito)
  const n = ORDER.length;
  PROJECTS.forEach((p) => {
    const idx = ORDER.indexOf(p);
    const prev = ORDER[(idx - 1 + n) % n];
    const next = ORDER[(idx + 1) % n];
    const dir = path.join(root, "progetti", p.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), projectPage(p, prev, next));
  });

  const count = fs.readdirSync(path.join(root, "progetti")).length;
  console.log(`✓ Sito v2 generato in /portfolio-v2 — index + ${count} pagine progetto`);
}

run();