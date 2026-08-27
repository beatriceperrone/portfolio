/* Portfolio · Beatrice Perrone
   Interazioni: lingua IT/EN, nav, reveal, anno, touch flip */

(function () {
  "use strict";

  var I18N = window.I18N || {};

  // ---- lingua ----
  function storedLang() {
    try {
      return localStorage.getItem("lang") === "en" ? "en" : "it";
    } catch (e) {
      return "it";
    }
  }

  function applyLang(lang) {
    document.documentElement.lang = lang === "en" ? "en" : "it";

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      var entry = I18N[key];
      if (entry && entry[lang] != null) el.textContent = entry[lang];
    });

    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-html");
      var entry = I18N[key];
      if (entry && entry[lang] != null) el.innerHTML = entry[lang];
    });

    document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-lang-btn") === lang);
    });

    try {
      localStorage.setItem("lang", lang);
    } catch (e) {}
  }

  document.querySelectorAll("[data-lang-btn]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyLang(btn.getAttribute("data-lang-btn"));
    });
  });

  // ---- nav: stato al scroll ----
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 24) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("open");
        toggle.classList.remove("open");
        document.body.style.overflow = "";
      }
    });
  }

  // ---- reveal on scroll ----
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // ---- anno corrente ----
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // ---- riduzione movimento ----
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  // ---- touch: anteprima flip appoggiando il dito ----
  document.querySelectorAll(".tile").forEach(function (tile) {
    var startX = 0;
    var startY = 0;

    function off() {
      tile.classList.remove("flipped");
    }

    tile.addEventListener("pointerdown", function (e) {
      if (e.pointerType !== "touch") return;
      startX = e.clientX;
      startY = e.clientY;
      tile.classList.add("flipped");
    });

    tile.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "touch" || !tile.classList.contains("flipped")) return;
      var dx = e.clientX - startX;
      var dy = e.clientY - startY;
      if (Math.sqrt(dx * dx + dy * dy) > 12) off();
    });

    tile.addEventListener("pointerup", off);
    tile.addEventListener("pointercancel", off);
    tile.addEventListener("pointerleave", off);
  });

  // applica la lingua salvata (default italiano)
  applyLang(storedLang());

  // ---------------------------------------------------------------
  // CUR CURSORE — cometa: testa blu + coda di particelle (blu→rosso)
  // ---------------------------------------------------------------
  function initCursor() {
    if (window.matchMedia("(pointer: coarse)").matches) return; // niente su touch

    // testa (blu)
    var dot = document.createElement("div");
    dot.className = "cursor-dot";
    document.body.appendChild(dot);
    document.body.classList.add("has-cursor");

    // pool di particelle della coda (più corta)
    var N = 12;
    var parts = [];
    for (var i = 0; i < N; i++) {
      var d = document.createElement("div");
      d.className = "cursor-trail";
      document.body.appendChild(d);
      parts.push({ el: d, x: innerWidth / 2, y: innerHeight / 2 });
    }

    var mouseX = innerWidth / 2, mouseY = innerHeight / 2;
    var headX = mouseX, headY = mouseY; // testa

    var BLUE = [36, 88, 212];
    var INK = [27, 23, 33];
    var WHITE = [255, 255, 255];

    // stato animato (transizioni smooth via lerp)
    var curSize = 26;
    var curR = BLUE[0], curG = BLUE[1], curB = BLUE[2];
    var tR = BLUE[0], tG = BLUE[1], tB = BLUE[2];
    var tSize = 26;
    var trailOn = true;

    window.addEventListener("mousemove", function (e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    var untouched = true;
    window.addEventListener("mousemove", function () {
      if (untouched) {
        untouched = false;
        document.body.classList.add("cursor-on");
      }
    }, { passive: true });

    function hexToRgb(hex) {
      var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec((hex || "").trim());
      return m ? [parseInt(m[1], 16), parseInt(m[2], 16), parseInt(m[3], 16)] : null;
    }

    // sceglie un colore che CONTRASTA con l'acronimo del progetto
    function contrastFor(col) {
      var lum = (0.299 * col[0] + 0.587 * col[1] + 0.114 * col[2]) / 255;
      return lum < 0.55 ? WHITE : INK;
    }

    function loop() {
      // testa: inseguimento rapido
      headX += (mouseX - headX) * 0.5;
      headY += (mouseY - headY) * 0.5;

      // transizioni smooth di dimensione e colore
      curSize = curSize + (tSize - curSize) * 0.12;
      curR += (tR - curR) * 0.12;
      curG += (tG - curG) * 0.12;
      curB += (tB - curB) * 0.12;

      // pipeline coda
      var px = headX, py = headY;
      for (var i = 0; i < N; i++) {
        var p = parts[i];
        p.x += (px - p.x) * 0.4;
        p.y += (py - p.y) * 0.4;
        px = p.x; py = p.y;
      }

      // testa: unico cerchio
      dot.style.width = curSize + "px";
      dot.style.height = curSize + "px";
      dot.style.background = "rgb(" + Math.round(curR) + "," + Math.round(curG) + "," + Math.round(curB) + ")";
      dot.style.transform = "translate3d(" + (headX - curSize / 2) + "px," + (headY - curSize / 2) + "px,0)";

      // coda (più corta e sfumata)
      for (var j = 0; j < N; j++) {
        var part = parts[j];
        if (!trailOn) { part.el.style.opacity = "0"; continue; }
        var t = j === 0 ? 0 : (1 - j / N);
        var size = curSize > 45 ? 2 : (3 + (curSize * 0.16) * Math.pow(t, 2.2));
        if (curSize > 45) size *= 0.4;
        var alpha = Math.pow(t, 1.4) * 0.85;
        part.el.style.width = size + "px";
        part.el.style.height = size + "px";
        part.el.style.background = "rgb(" +
          Math.round(curR + (255 - curR) * t) + "," +
          Math.round(curG + (255 - curG) * t) + "," +
          Math.round(curB + (255 - curB) * t) + ")";
        part.el.style.opacity = alpha.toFixed(3);
        part.el.style.transform = "translate3d(" + (part.x - size / 2) + "px," + (part.y - size / 2) + "px,0)";
      }

      requestAnimationFrame(loop);
    }
    loop();

    // ---------- colore/dimensione in base al blocco ----------
    var interactive = "a, button, .tile, [data-lang-btn], .lang-switch, .nav-links a";

    // colori custom del cursore su ogni card (contrastano col retro '--accent')
    var CARD_COLORS = {
      "cosmo-matinee":        "#B44515", // arancio scuro  (retro blu)
      "compay-segundo":       "#B21E5F", // fucsia scuro   (retro azzardo chiaro)
      "giornata-del-giappone": "#B32B4A", // rosso/berry   (retro pergamena)
      "gianna-nannini":      "#1B2A5C", // blu notte     (retro corallo)
      "villaggio-della-salute": "#3C1E8F", // viola scuro  (retro oro)
      "club-silencio":       "#FF8A00", // arancio      (retro blu)
      "tesi-esperienziale":  "#0C6B4F", // verde smeraldo (retro pesca)
      "luoghi-comuni":      "#B4455F", // carmino      (retro azzurro)
    };

    function setBlock(el) {
      // prezza lo slug dalla card (href="progetti/{slug}/index.html")
      var href = el.getAttribute("href") || "";
      var mm = /progetti\/([a-z0-9-]+)\//.exec(href);
      var slug = mm ? mm[1] : "";
      var custom = CARD_COLORS[slug];
      var c;
      if (custom) {
        c = hexToRgb(custom);
      } else {
        var accent = getComputedStyle(el).getPropertyValue("--accent").trim();
        var col = accent && hexToRgb(accent);
        c = col ? contrastFor(col) : BLUE;
      }
      tR = c[0]; tG = c[1]; tB = c[2];
      tSize = 98; // dentro la card: ridotto leggermente
      trailOn = false;
    }
    function setHover() {
      tR = BLUE[0]; tG = BLUE[1]; tB = BLUE[2];
      tSize = 46;
      trailOn = false;
    }
    function setIdle() {
      tR = BLUE[0]; tG = BLUE[1]; tB = BLUE[2];
      tSize = 22; // poco più piccolo, vicino al dot del titolo
      trailOn = false;
    }

    document.addEventListener("mouseover", function (e) {
      var tile = e.target.closest(".tile");
      if (tile) { setBlock(tile); return; }
      if (e.target.closest(interactive)) { setHover(); return; }
      setIdle();
    });
  }

  initCursor();
})();