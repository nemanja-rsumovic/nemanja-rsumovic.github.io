/* ==========================================================================
   Nastava - jedan renderer za obe vrste strana:
     - ulazna strana (hub)  -> window.NASTAVA_GODINE   (js/nastava-hub.js)
     - strana godine        -> window.NASTAVA_GODINA   (js/nastava-godina-*.js)

   Na strani godine imaš 3 celine, sve se pune iz data fajla:
     ocene[]        -> zaključane tabele, po jedna po odeljenju
     prezentacije[] -> teorija sa časa; svaka stavka može imati odeljenja: []
     zadaci[]       -> zadaci, rešenja, skenirani urađeni zadaci
   ========================================================================== */

function observeReveal(root) {
  root.querySelectorAll(".reveal").forEach((el) => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 }
    );
    obs.observe(el);
  });
}

/* Postupno pojavljivanje elemenata u nizu (kartice, redovi) - malo kasnjenje
   po redosledu daje "kaskadni" efekat umesto da sve iskoci odjednom. */
function stagger(i, stepMs, maxMs) {
  const ms = Math.min(i * (stepMs || 55), maxMs || 480);
  return ` style="transition-delay:${ms}ms;animation-delay:${ms}ms"`;
}

/* -------------------------------------------------------------------------
   Plivajući matematički simboli u pozadini heroa (isti motiv kao na
   glavnom sajtu - js/main.js#heroGlyphs), samo drugi set simbola.
   ------------------------------------------------------------------------- */
function renderGlyphs() {
  const wrap = document.getElementById("nastavaGlyphs");
  if (!wrap) return;
  const glyphs = ["∑", "π", "√", "∞", "f(x)", "Δ", "θ", "∫", "±", "x²"];
  glyphs.forEach((g, i) => {
    const el = document.createElement("span");
    el.textContent = g;
    el.style.left = `${6 + ((i * 41) % 90)}%`;
    el.style.top = `${8 + ((i * 59) % 80)}%`;
    el.style.fontSize = `${13 + (i % 4) * 6}px`;
    el.style.animationDelay = `${i * 0.65}s`;
    wrap.appendChild(el);
  });
}

/* -------------------------------------------------------------------------
   HUB
   ------------------------------------------------------------------------- */
function godinaCardMarkup(g, i) {
  const teme = (g.teme || []).map((t) => `<span>${t}</span>`).join("");
  return `
    <a class="godina-card reveal"${stagger(i)} href="${g.href}">
      <span class="gc-num">${g.broj}</span>
      <h2>${g.naziv}</h2>
      <div class="gc-teme">${teme}</div>
      <span class="gc-go">Otvori materijale <i class="fa-solid fa-arrow-right"></i></span>
    </a>`;
}

function renderHub() {
  const wrap = document.getElementById("godineGrid");
  if (!wrap || !window.NASTAVA_GODINE) return;
  const godine = window.NASTAVA_GODINE;
  wrap.innerHTML =
    godine.map(godinaCardMarkup).join("") +
    `<div class="godina-card soon reveal"${stagger(godine.length)}>
       <span class="plus">+</span> Ostale godine biće dodate prilikom rada sa tim generacijama
     </div>`;
  observeReveal(wrap);

  const stat = document.getElementById("nastavaStat");
  if (stat) {
    const brojGodina = godine.length;
    stat.innerHTML = `<i class="fa-solid fa-graduation-cap"></i> ${brojGodina} ${brojGodina === 1 ? "aktivna godina" : "aktivne godine"} u ponudi · materijali se redovno ažuriraju`;
  }
}

/* -------------------------------------------------------------------------
   STRANA GODINE
   ------------------------------------------------------------------------- */
function coversAll(item, sve) {
  const o = item.odeljenja;
  return !o || !o.length || o.length >= sve.length;
}

function resRowMarkup(item, opts, i) {
  opts = opts || {};
  const locked = !!opts.locked;
  const sve = opts.odeljenja || [];
  const icon = item.icon || opts.defaultIcon || "fa-solid fa-file-lines";

  let tags = "";
  if (opts.showTags) {
    tags = coversAll(item, sve)
      ? `<span class="r-tag all">svi smerovi</span>`
      : item.odeljenja.map((o) => `<span class="r-tag">${o}</span>`).join("");
  }

  const meta = item.meta ? `<span class="r-meta">${item.meta}</span>` : "";
  const dataOdelj = coversAll(item, sve)
    ? sve.join(" ")
    : (item.odeljenja || []).join(" ");

  return `
    <a class="res-row${locked ? " locked" : ""}"${stagger(i || 0, 40, 360)} href="${item.href}" target="_blank" rel="noopener" data-odeljenja="${dataOdelj}">
      <span class="r-ico"><i class="${icon}"></i></span>
      <span class="r-main">
        <span class="r-title">${item.label}</span>
        <span class="r-sub">
          ${locked ? '<i class="fa-solid fa-lock"></i> školski nalog' : meta}
          ${tags}
        </span>
      </span>
      <i class="fa-solid fa-chevron-right chev"></i>
    </a>`;
}

function sekcijaMarkup(cfg) {
  const items = cfg.items || [];
  const body = items.length
    ? `<div class="res-list">${items.map((it, i) => resRowMarkup(it, cfg.row, i)).join("")}</div>`
    : `<div class="res-empty"><span class="plus">+</span>${cfg.emptyText || "Materijali se dodaju uskoro"}</div>`;

  const filter = cfg.filterOdeljenja && cfg.filterOdeljenja.length
    ? `<div class="odelj-filter" data-filter-for="${cfg.id}">
         <button class="of-btn active" data-o="svi">svi</button>
         ${cfg.filterOdeljenja.map((o) => `<button class="of-btn" data-o="${o}">${o}</button>`).join("")}
       </div>`
    : "";

  return `
    <div class="sekcija reveal" id="${cfg.id}">
      <div class="sekcija-head${cfg.locked ? " locked" : ""}">
        <span class="s-ico"><i class="${cfg.ikonica}"></i></span>
        <h2>${cfg.naziv}</h2>
        <span class="s-count">${items.length}</span>
      </div>
      ${cfg.opis ? `<p class="sekcija-desc">${cfg.opis}</p>` : ""}
      ${filter}
      ${body}
    </div>`;
}

function oceneCardMarkup(o, i) {
  return `
    <a class="ocena-card"${stagger(i, 45, 300)} href="${o.href}" target="_blank" rel="noopener">
      <span class="oc-lock"><i class="fa-solid fa-lock"></i></span>
      <span class="oc-odelj">${o.odeljenje}</span>
      <span class="oc-go">Otvori tabelu <i class="fa-solid fa-arrow-up-right-from-square"></i></span>
    </a>`;
}

function wireFilters(container) {
  container.querySelectorAll(".odelj-filter").forEach((bar) => {
    const target = document.getElementById(bar.dataset.filterFor);
    bar.querySelectorAll(".of-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        bar.querySelectorAll(".of-btn").forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        const o = btn.dataset.o;
        target.querySelectorAll(".res-row").forEach((row) => {
          const list = (row.dataset.odeljenja || "").split(" ").filter(Boolean);
          row.classList.toggle("hidden", o !== "svi" && !list.includes(o));
        });
      });
    });
  });
}

function renderGodina() {
  const d = window.NASTAVA_GODINA;
  const container = document.getElementById("nastavaContent");
  if (!d || !container) return;

  document.title = `Matematika · ${d.godina} - Nemanja Ršumović`;
  const t = document.getElementById("nastavaTitle");
  const s = document.getElementById("nastavaSub");
  if (t) t.textContent = `Matematika · ${d.godina}`;
  if (s) s.textContent = d.podnaslov || "Savremena gimnazija, Beograd";

  const odeljenja = d.odeljenja || [];
  let html = "";

  /* --- Ocene ------------------------------------------------------------- */
  const subNavLinks = [];
  if (d.ocene && d.ocene.length) {
    subNavLinks.push({ id: "ocene", label: "Ocene", icon: "fa-solid fa-chart-simple" });
    html += `
      <div class="sekcija reveal" id="ocene">
        <div class="sekcija-head locked">
          <span class="s-ico"><i class="fa-solid fa-chart-simple"></i></span>
          <h2>Evidencija rada i ocene</h2>
          <span class="s-count">${d.ocene.length}</span>
        </div>
        <p class="sekcija-desc"><i class="fa-solid fa-lock"></i> ${d.oceneNapomena || "Otvara samo školski Google nalog učenika."}</p>
        <div class="ocene-grid">${d.ocene.map(oceneCardMarkup).join("")}</div>
      </div>`;
  }

  /* --- Prezentacije (teorija sa časa) ---------------------------------- */
  subNavLinks.push({ id: "prezentacije", label: "Prezentacije", icon: "fa-solid fa-chalkboard" });
  html += sekcijaMarkup({
    id: "prezentacije",
    naziv: "Prezentacije",
    ikonica: "fa-solid fa-chalkboard",
    opis: d.prezentacijeOpis || "// teorija, slajdovi i objašnjeni primeri sa časa — javno dostupno",
    items: d.prezentacije || [],
    filterOdeljenja: odeljenja,
    emptyText: "Prezentacije se dodaju uskoro",
    row: {
      odeljenja: odeljenja,
      showTags: true,
      defaultIcon: "fa-solid fa-file-powerpoint",
    },
  });

  /* --- Zadaci i rešenja ---------------------------------------------- */
  subNavLinks.push({ id: "zadaci", label: "Zadaci i rešenja", icon: "fa-solid fa-pen-ruler" });
  html += sekcijaMarkup({
    id: "zadaci",
    naziv: "Zadaci i rešenja",
    ikonica: "fa-solid fa-pen-ruler",
    opis: d.zadaciOpis || "// zbirke zadataka, rešenja i skenirani urađeni zadaci",
    items: d.zadaci || [],
    emptyText: "Zadaci se dodaju uskoro",
    row: { defaultIcon: "fa-solid fa-file-lines" },
  });

  html += `
    <div class="nastava-info">
      <a href="mailto:nemanja.rsumovic@savremena-gimnazija.edu.rs"><i class="fa-solid fa-envelope"></i> nemanja.rsumovic@savremena-gimnazija.edu.rs</a>
      <span><i class="fa-solid fa-circle-info"></i> Prezentacije i zadaci su javni · tabele sa ocenama otvara samo školski nalog</span>
    </div>`;

  container.innerHTML = html;
  wireFilters(container);
  observeReveal(container);
  renderSubNav(subNavLinks);
}

/* -------------------------------------------------------------------------
   Sticky pod-navigacija (Ocene / Prezentacije / Zadaci) sa scrollspy-jem -
   isti princip kao glavna navigacija na pocetnom sajtu.
   ------------------------------------------------------------------------- */
function renderSubNav(links) {
  const nav = document.getElementById("subNav");
  if (!nav || !links.length) return;

  nav.innerHTML = links
    .map((l) => `<a href="#${l.id}"><i class="${l.icon}"></i> ${l.label}</a>`)
    .join("");
  nav.hidden = false;

  const anchors = nav.querySelectorAll("a");
  anchors[0].classList.add("active");

  const sections = links.map((l) => document.getElementById(l.id)).filter(Boolean);
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        anchors.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
      });
    },
    { rootMargin: "-35% 0px -55% 0px" }
  );
  sections.forEach((s) => spy.observe(s));

  anchors.forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.getElementById(a.getAttribute("href").slice(1));
      if (!target) return;
      const y = target.getBoundingClientRect().top + window.scrollY - (nav.getBoundingClientRect().bottom - nav.getBoundingClientRect().top) - 90;
      window.scrollTo({ top: y, behavior: "smooth" });
    });
  });
}

/* ------------------------------------------------------------------------- */
renderGlyphs();
renderHub();
renderGodina();

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Nav gains a shadow once the page scrolls under it - same idea as main.js */
const nastavaNav = document.querySelector(".nastava-nav");
if (nastavaNav) {
  const setScrolled = () => nastavaNav.classList.toggle("scrolled", window.scrollY > 12);
  window.addEventListener("scroll", setScrolled, { passive: true });
  setScrolled();
}
