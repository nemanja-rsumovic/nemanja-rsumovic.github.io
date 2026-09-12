/* ==========================================================================
   Nav: mobile toggle + scroll state + scrollspy
   ========================================================================== */
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("open");
  navLinks.classList.toggle("open");
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("open");
    navLinks.classList.remove("open");
  });
});

window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 30);
});

const sections = document.querySelectorAll("section[id]");
const navAnchors = navLinks.querySelectorAll("a");
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navAnchors.forEach((a) => {
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
        });
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => spy.observe(s));

/* ==========================================================================
   Reveal on scroll
   ========================================================================== */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ==========================================================================
   Hero floating glyphs (math + code symbols, purely decorative/aria-hidden)
   ========================================================================== */
const glyphWrap = document.getElementById("heroGlyphs");
if (glyphWrap) {
  const glyphs = ["{ }", "∑", "π", "λ", "</>", "∫", "0×1", "f(x)", "∞", "±"];
  glyphs.forEach((g, i) => {
    const el = document.createElement("span");
    el.textContent = g;
    el.style.left = `${8 + ((i * 37) % 88)}%`;
    el.style.top = `${10 + ((i * 53) % 78)}%`;
    el.style.fontSize = `${14 + (i % 4) * 6}px`;
    el.style.animationDelay = `${i * 0.7}s`;
    glyphWrap.appendChild(el);
  });
}

/* ==========================================================================
   Projects - rendered from js/projects-data.js so new entries are just
   objects added to the PROJECTS array, no HTML editing required.
   ========================================================================== */
const grid = document.getElementById("projectsGrid");
const filterBar = document.getElementById("filterBar");

function linkIconMarkup(link) {
  return `<a class="project-link" href="${link.href}" target="_blank" rel="noopener">
    <i class="${link.icon}"></i> ${link.label}
  </a>`;
}

function cardMarkup(p) {
  const tags = p.tags.map((t) => `<span class="tag-pill">${t}</span>`).join("");
  const links = p.links && p.links.length ? p.links.map(linkIconMarkup).join("") : "";
  const note = !p.links || !p.links.length ? `<span class="project-note">// private / university repo</span>` : "";
  const status = p.status ? `<span class="status-pill">${p.status}</span>` : "";
  return `
    <article class="project-card reveal${p.featured ? " featured" : ""}" data-category="${p.category}">
      <div class="project-media">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
        ${status}
      </div>
      <div class="project-body">
        <div class="project-tags">${tags}</div>
        <h3>${p.title}</h3>
        <p>${p.description}</p>
        <div class="project-links">${links}${note}</div>
      </div>
    </article>`;
}

function noteCardMarkup() {
  return `
    <article class="project-card note-card reveal">
      <i class="fa-solid fa-hourglass-half"></i>
      <p class="mono">a few newer projects are on their way</p>
      <p class="note-sub">in the meantime, you can find them in my CV</p>
      <a class="project-link" href="files/Nemanja_Rsumovic_CV.pdf" target="_blank" rel="noopener">
        <i class="fa-solid fa-file-pdf"></i> View CV
      </a>
    </article>`;
}

function moreCardMarkup() {
  return `
    <article class="project-card more-card reveal">
      <span class="plus">+</span>
      <p class="mono">more projects coming soon</p>
    </article>`;
}

function renderProjects() {
  const cardsHtml = noteCardMarkup() + PROJECTS.map(cardMarkup).join("") + moreCardMarkup();
  grid.innerHTML = cardsHtml;
  document.querySelectorAll(".project-card.reveal").forEach((el) => revealObserver.observe(el));
}

function renderFilters() {
  const categories = ["all", ...new Set(PROJECTS.map((p) => p.category))];
  filterBar.innerHTML = categories
    .map((c) => {
      const label = c === "all" ? "All projects" : CATEGORY_LABELS[c] || c;
      return `<button class="filter-btn${c === "all" ? " active" : ""}" data-filter="${c}">${label}</button>`;
    })
    .join("");

  filterBar.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      document.querySelectorAll(".project-card:not(.more-card):not(.note-card)").forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hidden-by-filter", !match);
      });
      const moreCard = document.querySelector(".more-card");
      if (moreCard) moreCard.classList.toggle("hidden-by-filter", filter !== "all");
    });
  });
}

renderProjects();
renderFilters();

/* ==========================================================================
   Footer year
   ========================================================================== */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ==========================================================================
   Floating CTA -> nastava/ - pojavi se posle kratke pauze na svakom
   ucitavanju stranice. X je zatvara samo za taj prikaz - refresh je vraca.
   ========================================================================== */
const nastavaBubble = document.getElementById("nastavaBubble");
if (nastavaBubble) {
  setTimeout(() => nastavaBubble.classList.add("show"), 500);

  const nbClose = document.getElementById("nastavaBubbleClose");
  if (nbClose) {
    nbClose.addEventListener("click", (e) => {
      e.preventDefault();
      nastavaBubble.classList.remove("show");
    });
  }
}
