function matPill(mat) {
  if (mat.locked) {
    return `<span class="mat-pill locked"><i class="fa fa-lock"></i> ${mat.label}</span>`;
  }
  return `<a class="mat-pill" href="${mat.href}" target="_blank" rel="noopener"><i class="${mat.icon || 'fa fa-arrow-up-right-from-square'}"></i> ${mat.label}</a>`;
}

function courseCardMarkup(course) {
  const title = course.pdf
    ? `<a href="${course.pdf}" target="_blank" rel="noopener">${course.name}</a>`
    : `<span class="no-syllabus">${course.name}</span>`;

  const profs = course.professors && course.professors.length
    ? `<div class="course-profs"><i class="fa fa-chalkboard-user"></i><span>${course.professors.join(", ")}</span></div>`
    : "";

  const materials = course.materials && course.materials.length
    ? `<div class="course-materials">${course.materials.map(matPill).join("")}</div>`
    : `<div class="course-materials"><span class="mat-empty">// materials to be added</span></div>`;

  return `
    <article class="course-card reveal">
      <h3>${title}</h3>
      ${profs}
      ${materials}
    </article>`;
}

function semesterMarkup(sem) {
  const cards = sem.courses && sem.courses.length
    ? sem.courses.map(courseCardMarkup).join("")
    : "";
  return `
    <div class="sem-block">
      <h2 class="sem-title">${sem.label} <span class="mono">${sem.courses ? sem.courses.length : 0} courses</span></h2>
      <div class="course-grid">${cards}</div>
    </div>`;
}

function renderCoursePage() {
  const data = window.COURSE_DATA;
  if (!data) return;

  document.title = data.pageTitle + " - Nemanja Ršumović";
  const heroTitle = document.getElementById("courseHeroTitle");
  const heroSub = document.getElementById("courseHeroSub");
  const eyebrow = document.getElementById("courseEyebrow");
  if (heroTitle) heroTitle.textContent = data.pageTitle;
  if (heroSub) heroSub.textContent = data.pageSub;
  if (eyebrow) eyebrow.textContent = data.eyebrow || "$ cat courses.md";

  const container = document.getElementById("courseContent");
  if (!container) return;

  if (!data.semesters || !data.semesters.length || data.semesters.every((s) => !s.courses || !s.courses.length)) {
    container.innerHTML = `
      <div class="course-page-empty reveal">
        <span class="plus">+</span>
        <p class="mono">Course list coming soon</p>
      </div>`;
  } else {
    container.innerHTML = data.semesters.map(semesterMarkup).join("");
  }

  container.querySelectorAll(".reveal").forEach((el) => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    obs.observe(el);
  });
}

renderCoursePage();

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
