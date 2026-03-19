(function () {
  const data = window.sharedData || window.data;
  if (!data) return;

  const aboutME1 = document.getElementById("aboutME1");
  const aboutME2 = document.getElementById("aboutME2");

  if (aboutME1) aboutME1.textContent = data.aboutMe_part1 || "";
  if (aboutME2) aboutME2.textContent = data.aboutMe_part2 || "";

  const container = document.getElementById("overview");

  if (container) {
    data.overview.forEach((item, index) => {
      const block = document.createElement("div");
      const accentClass = index !== 0 ? "accent" : "";

      block.innerHTML = `
        <p class="stat-number ${accentClass}">${item.number}</p>
        <p class="stat-label">${item.label}</p>
      `;

      container.appendChild(block);
    });
  }

  function renderCourses() {
    const grid = document.getElementById("coursesGrid");
    if (!grid) return;

    data.homeCourses.forEach((course, index) => {
      const badgeClass = index === 0 ? "badge-red" : "badge-dark";

      grid.innerHTML += `
  <article class="course-card flex flex-col min-w-0 w-full">
    <span class="${badgeClass} inline-block text-xs font-semibold px-3 py-1 rounded-full mb-5 self-start">
      ${course.tag}
    </span>
    <h3 class="font-playfair text-dark text-lg font-bold mb-6 flex-grow break-words overflow-hidden">
      ${course.title}
    </h3>
    <hr class="border-border mb-4">
    <div class="flex items-center justify-between">
      <span class="text-light text-xs">${course.mode}</span>
      <span class="text-light text-xs">${course.duration}</span>
    </div>
  </article>
  `;
    });
  }

  function renderExperiences() {
    const grid = document.getElementById("expGrid");
    if (!grid) return;

    data.experiences.forEach((exp) => {
      grid.innerHTML += `
        <article class="exp-card">
          <p class="exp-year">${exp.year}</p>
          <h3 class="text-dark font-semibold mb-1" style="font-size: 1.1rem;">${exp.role}</h3>
          <p class="exp-place">${exp.org}</p>
          <p class="text-muted" style="font-size: 0.875rem; line-height: 1.625;">${exp.desc}</p>
        </article>
      `;
    });
  }

  renderCourses();
  renderExperiences();
})();

