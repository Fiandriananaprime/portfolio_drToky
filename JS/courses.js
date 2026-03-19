(function () {
const data = window.sharedData || window.data;
if (!data) return;

const courseListEl = document.getElementById("courseList");
const selectTech = document.getElementById("selectTech");
const selectLevel = document.getElementById("selectLevel");
const rangeMinEl = document.getElementById("rangeMin");
const rangeMaxEl = document.getElementById("rangeMax");
const clearBtn = document.getElementById("clearAll");
const resultCountEl = document.getElementById("resultCount");
const flagsEl = document.querySelectorAll(".flags button span");
const priceRange = document.getElementById("price-range");
const filterBtn = document.getElementById("filterBtn");
const filterPanel = document.getElementById("filterPanel");
const closeFilterBtn = document.getElementById("closeFilter");
const loadMoreBtn = document.getElementById("loadMore");
const noMatchesEl = document.getElementById("noMatches");
const itemsPerPage = 5;

let searchEl =
  window.innerWidth >= 1024
    ? document.getElementById("searchInput")
    : document.getElementById("searchInputMobile");

let searchTerm = "";
let allowedLevels = [];
let allowedTechs = [];
let allowedLangs = ["MG", "FR", "EN"];
let currentPage = 1;

function syncPageWithHash(courses) {
  const hash = window.location.hash || "";
  const match = hash.match(/^#course-(.+)$/);
  if (!match || window.innerWidth >= 1024) return;

  const targetId = match[1];
  const filtered = courses
    .filter((c) => {
      const hay =
        `${c.title} ${c.description} ${(c.technologies || []).join(" ")}`.toLowerCase();
      return !searchTerm || hay.includes(searchTerm);
    })
    .filter(
      (c) =>
        !allowedLevels.length ||
        allowedLevels.includes((c.level || "beginner").toLowerCase()),
    )
    .filter(
      (c) =>
        !allowedTechs.length ||
        (c.technologies || [])
          .map((t) => t.toLowerCase())
          .some((t) => allowedTechs.includes(t)),
    )
    .filter((c) => allowedLangs.includes((c.language || "").toUpperCase()))
    .filter((c) => {
      const min = rangeMinEl
        ? Number(rangeMinEl.value)
        : Number.NEGATIVE_INFINITY;
      const max = rangeMaxEl
        ? Number(rangeMaxEl.value)
        : Number.POSITIVE_INFINITY;
      return c.price >= min && c.price <= max;
    });

  const idx = filtered.findIndex((c) => String(c.id) === targetId);
  if (idx !== -1) {
    currentPage = Math.floor(idx / itemsPerPage) + 1;
  }
}

function setupSearchListener() {
  const input =
    window.innerWidth >= 1024
      ? document.getElementById("searchInput")
      : document.getElementById("searchInputMobile");
  if (!input) return;
  input.oninput = (e) => {
    searchTerm = (e.target.value || "").toLowerCase().trim();
    currentPage = 1;
    listCourse(data.courses);
  };
  searchEl = input;
}

function listCourse(courses) {
  if (!courseListEl) return;
  syncPageWithHash(courses);
  const filtered = courses
    .filter((c) => {
      const hay =
        `${c.title} ${c.description} ${(c.technologies || []).join(" ")}`.toLowerCase();
      return !searchTerm || hay.includes(searchTerm);
    })
    .filter(
      (c) =>
        !allowedLevels.length ||
        allowedLevels.includes((c.level || "beginner").toLowerCase()),
    )
    .filter(
      (c) =>
        !allowedTechs.length ||
        (c.technologies || [])
          .map((t) => t.toLowerCase())
          .some((t) => allowedTechs.includes(t)),
    )
    .filter((c) => allowedLangs.includes((c.language || "").toUpperCase()))
    .filter((c) => {
      const min = rangeMinEl
        ? Number(rangeMinEl.value)
        : Number.NEGATIVE_INFINITY;
      const max = rangeMaxEl
        ? Number(rangeMaxEl.value)
        : Number.POSITIVE_INFINITY;
      return c.price >= min && c.price <= max;
    });

  if (noMatchesEl) noMatchesEl.innerHTML = "";
  if (resultCountEl) {
    if (filtered.length === courses.length) {
      resultCountEl.style.display = "none";
    }   
    else {
      resultCountEl.textContent = `${filtered.length} course${filtered.length !== 1 ? "s" : ""} found`;
      resultCountEl.style.display = "inline";
    }
    if (filtered.length === 0) {
      if (noMatchesEl) {
        noMatchesEl.innerHTML = `
        <p class="text-2xl italic font-playfair text-muted p-2">No courses match your filters.</p>
        <button id="clearFilters" class="mt-2 text-red underline">CLEAR FILTERS</button>
        `;
        const clearFiltersBtn = noMatchesEl.querySelector('#clearFilters');
        if (clearFiltersBtn) clearFiltersBtn.addEventListener('click', () => clearFilters());
      }
      if (courseListEl) {
        courseListEl.innerHTML = '';
        courseListEl.style.display = 'none';
      }
      if (loadMoreBtn) loadMoreBtn.style.display = "none";
      return;
    }
  }
  if (courseListEl) courseListEl.style.display = '';
  const isMobile = window.innerWidth < 1024;
  let coursesToShow = filtered;
  if (isMobile) {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    coursesToShow = filtered.slice(start, end);
  }

  courseListEl.innerHTML = "";
  coursesToShow.forEach((c) => {
    const lang = (c.language || "").toUpperCase();
    const tech =
      c.technologies && c.technologies.length ? c.technologies[0] : "";
    courseListEl.innerHTML += `
        <div id="course-${c.id}" class="w-[20vw] min-w-[300px] bg-white rounded-xl shadow overflow-hidden card relative mb-4">
        <div class="badge flex gap-1 absolute z-10 top-2 left-2">
          <span class="langue rounded-xl bg-white text-dark text-sm py-1 px-2">${lang}</span>
          ${tech ? `<span class="tech rounded-xl bg-dark text-white text-sm py-1 px-2">${tech}</span>` : ""}
        </div>
        <div class="description relative">
          <img src="${c.thumbnail}" alt="${c.title}">
        </div>
        <article class="flex flex-col justify-between gap-3 my-2 relative px-1">
          <div class="flex flex-col">
            <h2 class="text-3xl text-red-dark truncate w-full font-semibold">${c.title}</h2>
            <span class="text-dark text-lg font-bold">MGA ${c.price}</span>
          </div>
          <p class="text-sm text-dark line-clamp-3">${c.description || ''}</p>
          <div class="flex gap-2 items-center justify-center">
            <a href="${c.page || `courses.html#course-${c.id}`}" class="bg-white text-red hover:scale border border-red py-2 px-4 rounded-lg shadow-xl">Voir plus</a>
            <button class="cartBtn bg-red text-white py-2 px-4 rounded-lg shadow-xl" onclick="addToCart(${c.id})">Add to cart</button>
          </div>
        </article>
      </div>
    `;
  });

  if (isMobile && filtered.length > currentPage * itemsPerPage && loadMoreBtn) {
    loadMoreBtn.style.display = "block";
    loadMoreBtn.onclick = () => {
      currentPage++;
      listCourse(courses);
    };
  } else if (loadMoreBtn) loadMoreBtn.style.display = "none";
}
function clearFilters() {
  searchTerm = "";
  if (searchEl) searchEl.value = "";
  flagsEl.forEach((f) => f.classList.add("active"));
  priceRange.textContent = "0 - 300000 MGA";
  allowedLevels = [];
  allowedLangs = ["MG", "FR", "EN"];
  allowedTechs = [];
  if (selectLevel) selectLevel.value = "all";
  if (selectTech) selectTech.value = "all";
  if (rangeMinEl) rangeMinEl.value = rangeMinEl.min || 0;
  if (rangeMaxEl) rangeMaxEl.value = rangeMaxEl.max || 300000;
  if (rangeMinEl)
    rangeMinEl.dispatchEvent(new Event("input", { bubbles: true }));
  if (rangeMaxEl)
    rangeMaxEl.dispatchEvent(new Event("input", { bubbles: true }));
  if (noMatchesEl) noMatchesEl.innerHTML = "";
  currentPage = 1;
  listCourse(data.courses);
}
if (clearBtn) clearBtn.addEventListener("click", () => {
  clearFilters();
});

if (selectLevel) selectLevel.addEventListener("change", () => {
  const lvl = (selectLevel.value || "").toLowerCase();
  allowedLevels = !lvl || lvl === "all" ? [] : [lvl];
  currentPage = 1;
  listCourse(data.courses);
});

if (selectTech) selectTech.addEventListener("change", () => {
  const tech = (selectTech.value || "").toLowerCase();
  allowedTechs = !tech || tech === "all" ? [] : [tech];
  currentPage = 1;
  listCourse(data.courses);
});

if (rangeMinEl)
  rangeMinEl.addEventListener("input", () => {
    currentPage = 1;
    listCourse(data.courses);
  });
if (rangeMaxEl)
  rangeMaxEl.addEventListener("input", () => {
    currentPage = 1;
    listCourse(data.courses);
  });

document.querySelectorAll(".flags button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const span = btn.querySelector("span");
    const lang = span.classList[span.classList.length - 1].toUpperCase();
    if (span.classList.contains("active")) {
      span.classList.remove("active");
      const index = allowedLangs.indexOf(lang);
      if (index !== -1) allowedLangs.splice(index, 1);
    } else {
      span.classList.add("active");
      allowedLangs.push(lang);
    }
    currentPage = 1;
    listCourse(data.courses);
  });
});

if (filterBtn) filterBtn.addEventListener("click", () =>
  filterPanel && filterPanel.classList.toggle("hidden"),
);
if (closeFilterBtn) closeFilterBtn.addEventListener("click", () =>
  filterPanel && filterPanel.classList.add("hidden"),
);

document.addEventListener('DOMContentLoaded', () => {
  currentPage = 1;
  setupSearchListener();
  listCourse(data.courses);
  window.addEventListener("resize", () => {
    currentPage = 1;
    setupSearchListener();
    listCourse(data.courses);
  });
});
})();


