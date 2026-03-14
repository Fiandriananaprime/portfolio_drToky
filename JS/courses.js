const data = {
  // -------------------------
  // HOME
  // -------------------------

  aboutMe_part1: `I am a PhD researcher studying complex systems through agent-based modeling and simulation. However, teaching, is my Ikigai, it is driven by a deep commitment to helping students grow beyond what they thought possible.`,

  aboutMe_part2: `It is not an accessory to my work — it is its foundation and its energy. Research sharpens my thinking; the classroom gives it meaning. And as a developer, I turn ideas into clean, reliable software built to last.`,

  overview: [
    { number: new Date().getFullYear() - 2017, label: "Years experience" },
    { number: "800+", label: "Students taught" },
    { number: "20+", label: "Topics" },
  ],

  experiences: [
    {
      year: "2026 – Present",
      role: "Consultant",
      org: "Independent",
      desc: "Advising, teaching, on a much more singular level for all societies, and developing scalable solutions",
    },
    {
      year: "2021 – 2026",
      role: "Study Coordinator | Back-end developer",
      org: "HEI Madagascar (Haute École d'Informatique), Antananarivo",
      desc: "Responsible of studies, permanent teacher for 5 different topics, as well as some back-end development on the school management app",
    },
    {
      year: "2024",
      role: "PhD in Computer Science",
      org: "Université de Fianarantsoa",
      desc: "A self-founded PhD on modeling complex systems, between the university of Fianarantsoa, and CIRAD, Montpellier, titled: Accounting for norms in agent-based modeling",
    },
    {
      year: "2017 – 2020",
      role: "Teacher",
      org: "ESMIA (École Supérieure de Management et d'Informatique appliquée), Antananarivo",
      desc: "Taught over 14 different topics from first years to Master degree. Mentoring students from small projects to technical ones",
    },
  ],

  homeCourses: [
    {
      tag: "Development",
      title: "Web Development Fundamentals",
      mode: "Online",
      duration: "8 weeks",
    },
    {
      tag: "Translation",
      title: "Technical Translation Masterclass",
      mode: "Hybrid",
      duration: "6 weeks",
    },
    {
      tag: "Research",
      title: "Academic Writing & Methodology",
      mode: "Offline",
      duration: "10 weeks",
    },
  ],

  // -------------------------
  // COURSES
  // -------------------------

  courses: [
    {
      id: 1,
      title: "Javascript for beginners",
      description:
        "Javascript made easy as your first language. This video walks you through the basic mechanism of algorithms, loops, conditions, functions, JS modules, unit tests, and modern syntax perfect for starters",
      creationDate: new Date("2026-01-01"),
      thumbnail: "https://picsum.photos/400",
      price: 120000,
      level: "beginner",
      language: "en",
      technologies: ["javascript"],
    },
    {
      id: 2,
      title: "Java for beginners",
      description:
        "A simple course for true beginners in Java. Learn OOP fundamentals: classes, objects, encapsulation, inheritance, polymorphism, abstraction to understand the basics of Java.",
      creationDate: new Date("2026-01-01"),
      thumbnail: "https://picsum.photos/400",
      price: 220000,
      level: "beginner",
      language: "en",
      technologies: ["java"],
    },
    {
      id: 3,
      title: "Relational Databases for beginners",
      description:
        "Understand how relational databases really work. This course introduces tables, primary keys, foreign keys, constraints, normalization, ER diagrams, and SQL basics.",
      creationDate: new Date("2026-01-01"),
      thumbnail: "https://picsum.photos/400",
      price: 180000,
      level: "beginner",
      language: "fr",
      technologies: ["sql"],
    },
    {
      id: 4,
      title: "Git & Version Control Essentials",
      description:
        "Master Git from scratch. Learn repositories, commits, branches, merging, rebasing, resolving conflicts, and collaborating with remote repositories like GitHub.",
      creationDate: new Date("2026-01-01"),
      thumbnail: "https://picsum.photos/400",
      price: 95000,
      level: "beginner",
      language: "en",
      technologies: [],
    },
    {
      id: 5,
      title: "Operating Systems Fundamentals",
      description:
        "Discover how operating systems manage processes, memory, files, threads, and scheduling. Understand the difference between user space and kernel space, concurrency basics.",
      creationDate: new Date("2026-01-01"),
      thumbnail: "https://picsum.photos/400",
      price: 200000,
      level: "beginner",
      language: "fr",
      technologies: [],
    },
    {
      id: 6,
      title: "Technical English for Developers",
      description:
        "Improve your English for the tech world. Learn essential vocabulary for programming, documentation, meetings, presentations, and job interviews.",
      creationDate: new Date("2026-01-01"),
      thumbnail: "https://picsum.photos/400",
      price: 85000,
      level: "beginner",
      language: "mg",
      technologies: [],
    },
    {
      id: 7,
      title: "Professional French Communication",
      description:
        "Strengthen your French for academic and professional environments. Focus on formal writing, presentations, technical explanations, and clear structured arguments.",
      creationDate: new Date("2026-01-01"),
      thumbnail: "https://picsum.photos/400",
      price: 80000,
      level: "beginner",
      language: "mg",
      technologies: [],
    },
    {
      id: 8,
      title: "SEO Fundamentals for Web Developers",
      description:
        "Learn how search engines work and how to optimize websites for visibility. Cover keywords, technical SEO, performance optimization, metadata, and structured data.",
      creationDate: new Date("2026-01-01"),
      thumbnail: "https://picsum.photos/400",
      price: 150000,
      level: "intermediate",
      language: "en",
      technologies: ["javascript"],
    },
    {
      id: 9,
      title: "Spring Boot for Backend Development",
      description:
        "Build modern REST APIs with Spring Boot. Learn dependency injection, controllers, services, JPA, security basics, validation, and scalable backend architecture.",
      creationDate: new Date("2026-01-01"),
      thumbnail: "https://picsum.photos/400",
      price: 250000,
      level: "advanced",
      language: "fr",
      technologies: ["java"],
    },
  ],

  // -------------------------
  // TESTIMONIALS
  // -------------------------

  testimonials: [
    {
      id: 1,
      role: "student",
      rating: 5,
      description:
        "A precious aid, a light shining upon every step of my journey",
      author: "Soa Mariaka, Promotion Mpamakilay, HEI (2021-2024)",
      thumbnail: "https://picsum.photos/200",
    },
    {
      id: 2,
      role: "student",
      rating: 5,
      description:
        "An inspiring mentor who transforms complex concepts into clear and structured knowledge. The discipline and rigor I learned here shaped the way I approach every technical challenge today.",
      author: "Faniry Keziah, Promotion Mpamakilay, HEI (2022-2025)",
      thumbnail: "https://picsum.photos/200",
    },
    {
      id: 3,
      role: "student",
      rating: 5,
      description:
        "More than courses, it was a mindset shift. Learning how to think structurally about databases and algorithms changed my confidence as a developer.",
      author: "Ando Ramanantsoa, Promotion Avotra, HEI (2021-2024)",
      thumbnail: "https://picsum.photos/200",
    },
    {
      id: 4,
      role: "student",
      rating: 4,
      description:
        "The emphasis on fundamentals — Git, SQL, system design — prepared me for real-world projects. Every assignment felt practical and meaningful.",
      author: "Dinasoa Ratsimba, Promotion Avotra, HEI (2022-2025)",
      thumbnail: "https://picsum.photos/200",
    },
    {
      id: 5,
      role: "student",
      rating: 5,
      description:
        "Demanding but fair. The standards were high, yet the support was constant. I learned discipline, autonomy, and how to truly understand what I build.",
      author: "Judicael Randrianjato, Promotion Mpamakilay, HEI (2021-2024)",
      thumbnail: "https://picsum.photos/200",
    },
    {
      id: 6,
      role: "collaborator",
      rating: 5,
      description:
        'From algorithm storytelling to backend architecture, every lesson connected theory with practice. It pushed me to go beyond just "making it work."',
      author: "Mayah Andriatsitohaina, Promotion Avotra, HEI (2023-2026)",
      thumbnail: "https://picsum.photos/200",
    },
    {
      id: 7,
      role: "collaborator",
      rating: 4,
      description:
        "The way operating systems and databases were taught made abstract concepts concrete. I now approach technical problems with clarity and structure.",
      author: "Axel, Promotion Mpamakilay, HEI (2022-2025)",
      thumbnail: "https://picsum.photos/200",
    },
    {
      id: 8,
      role: "collaborator",
      rating: 5,
      description:
        "Beyond coding, I gained professional communication skills and technical English confidence. That made a real difference during internships.",
      author: "Tolojanahary Randrambelo, Promotion Avotra, HEI (2023-2026)",
      thumbnail: "https://picsum.photos/200",
    },
    {
      id: 9,
      role: "collaborator",
      rating: 5,
      description:
        "The rigor in project reviews and exam preparation pushed me to exceed my limits. It was challenging, but it prepared me for industry expectations.",
      author: "Fiantso Harena, Promotion Mpamakilay, HEI (2021-2024)",
      thumbnail: "https://picsum.photos/200",
    },
    {
      id: 10,
      role: "collaborator",
      rating: 4,
      description:
        "A rare combination of technical depth and pedagogical clarity. Working alongside Tokimahery elevated the quality of everything we built together.",
      author: "Ravo Rakotondrabe",
      thumbnail: "https://picsum.photos/200",
    },
    {
      id: 11,
      role: "customer",
      rating: 5,
      description:
        "The translation work delivered was precise, fast, and culturally nuanced. Exactly what our project needed.",
      author: "Hery Andriantsoa",
      thumbnail: "https://picsum.photos/200",
    },
    {
      id: 12,
      role: "customer",
      rating: 5,
      description:
        "We hired Tokimahery to consult on our backend architecture. The recommendations were pragmatic and immediately actionable.",
      author: "Lalaina Rasolofo",
      thumbnail: "https://picsum.photos/200",
    },
    {
      id: 13,
      role: "customer",
      rating: 4,
      description:
        "Professional, responsive, and thorough. The deliverables exceeded our expectations in both quality and timeliness.",
      author: "Miora Randriamihaja",
      thumbnail: "https://picsum.photos/200",
    },
    {
      id: 14,
      role: "customer",
      rating: 5,
      description:
        "Tokimahery helped us untangle a legacy codebase that had been holding us back for years. Clear roadmap, clean execution.",
      author: "Njaka Rakotomalala",
      thumbnail: "https://picsum.photos/200",
    },
    {
      id: 15,
      role: "customer",
      rating: 5,
      description:
        "From scoping to delivery, the whole process was smooth and transparent. I would not hesitate to work together again.",
      author: "Sitraka Andriamanantena",
      thumbnail: "https://picsum.photos/200",
    },
  ],

  // -------------------------
  // BLOG
  // -------------------------

  posts: [
    {
      id: 1,
      title: "Join me at HEI",
      description:
        "Since 2021, I have been a part of HEI - Haute École d'Informatique, from the ground up, and until its evolution, struggles, and first students, I have been there, and it was a lot of fun.",
      creationDate: new Date("2026-03-08"),
      thumbnail: "https://picsum.photos/400",
      tags: ["education", "HEI"],
    },
    {
      id: 2,
      title: "Teaching Databases the Right Way",
      description:
        "Too many students jump directly into ORMs without understanding relational thinking. In my courses, we start with normalization, constraints, and real SQL joins before touching any abstraction layer. Strong foundations create confident engineers.",
      creationDate: new Date("2026-01-12"),
      thumbnail: "https://picsum.photos/400",
      tags: ["databases", "SQL", "education"],
    },
    {
      id: 3,
      title: "Why Git Is a Survival Skill",
      description:
        "Version control is not optional. I teach Git before advanced frameworks because collaboration, clean commit history, and conflict resolution are what make or break real-world software projects.",
      creationDate: new Date("2026-02-03"),
      thumbnail: "https://picsum.photos/400",
      tags: ["git", "software-engineering", "education"],
    },
    {
      id: 4,
      title: "Building a Secure Exam Platform",
      description:
        "Designing a live exam platform with strict tab-focus control and paste restrictions pushed me to combine pedagogy and engineering. Fair assessment requires both technical precision and educational clarity.",
      creationDate: new Date("2026-03-19"),
      thumbnail: "https://picsum.photos/400",
      tags: ["svelte", "typescript", "assessment"],
    },
    {
      id: 5,
      title: "Operating Systems: From Theory to Practice",
      description:
        "Processes, threads, memory management — these concepts only make sense when students experiment with them. I prioritize simulations and real concurrency problems to make operating systems tangible.",
      creationDate: new Date("2026-04-08"),
      thumbnail: "https://picsum.photos/400",
      tags: ["operating-systems", "computer-science", "education"],
    },
    {
      id: 6,
      title: "Spring Boot Beyond CRUD",
      description:
        "Teaching Spring Boot is not about generating controllers. It is about architecture: layered design, validation, security, JPA relationships, and writing backend systems that remain maintainable years later.",
      creationDate: new Date("2026-05-27"),
      thumbnail: "https://picsum.photos/400",
      tags: ["spring-boot", "java", "backend"],
    },
    {
      id: 7,
      title: "Technical English Is a Career Lever",
      description:
        "Reading documentation, writing clear README files, and communicating ideas internationally are critical skills for developers. Integrating technical English into IT training unlocks global opportunities.",
      creationDate: new Date("2026-07-14"),
      thumbnail: "https://picsum.photos/400",
      tags: ["english", "career", "education"],
    },
    {
      id: 8,
      title: "SEO for Engineers",
      description:
        "SEO is not just marketing. It is structured HTML, accessibility, performance optimization, and semantic clarity. Developers who understand search engines build better web applications.",
      creationDate: new Date("2026-09-02"),
      thumbnail: "https://picsum.photos/400",
      tags: ["seo", "web-development", "performance"],
    },
    {
      id: 9,
      title: "Narrative-Driven Programming Exercises",
      description:
        "I design algorithm problems with storytelling elements while keeping strict technical constraints. Students engage more deeply, and still practice loops, accumulators, edge cases, and structured thinking.",
      creationDate: new Date("2026-11-18"),
      thumbnail: "https://picsum.photos/400",
      tags: ["algorithms", "pedagogy", "education"],
    },
  ],

  youtubeVideos: [
    { id: "cdWNlGD_FzQ", title: "Counter App with Pharo" },
    { id: "cfS4XP4bBEk", title: "Build a DSL with Pharo" },
    { id: "Ut2aeuFc2KY", title: "My keyboard addiction" },
  ],

  archives: [
    { label: "January 2026", slug: "2026-01", count: 2 },
    { label: "February 2026", slug: "2026-02", count: 1 },
  ],

  // -------------------------
  // RESEARCH
  // -------------------------

  papers: [
    {
      id: 1,
      title: "Automatic Generation of Thematic Maps Using Multi-Agent Systems",
      abstract:
        "This paper presents an approach to automating the generation of thematic maps through multi-agent systems. Agents collaborate to process, interpret, and spatially organize geographic data, reducing the manual effort typically required in cartographic workflows. The system is demonstrated and evaluated within the GAMA simulation platform.",
      publishedDate: new Date("2024-11-01"),
      journal: "GAMA Days 2024",
      authors: [
        "I. H. Maminiaina",
        "H. Rakotonirainy",
        "J. Dinaharison",
        "T. Ramarozaka",
        "A. Razafinimaro",
      ],
      tags: ["multi-agent systems", "cartography", "GAMA"],
      url: "https://hal.science/hal-04890215v1/file/Gama_days_2024_Maminiaina.pdf",
      pdfUrl:
        "https://hal.science/hal-04890215v1/file/Gama_days_2024_Maminiaina.pdf",
    },
    {
      id: 2,
      title: "Prise en compte des normes dans les comportements des agents",
      abstract:
        "Cette thèse de doctorat explore comment les normes sociales et organisationnelles peuvent être intégrées dans les comportements des agents autonomes. Elle propose un cadre formel permettant aux agents de percevoir, interpréter et respecter des normes dans des environnements multi-agents complexes, avec des applications en simulation sociale et en systèmes distribués.",
      publishedDate: new Date("2024-01-01"),
      journal: "Université de Fianarantsoa — Thèse de doctorat en Informatique",
      authors: ["T. Ramarozaka"],
      tags: ["multi-agent systems", "norms", "PhD thesis"],
      url: "https://agritrop.cirad.fr/610658/1/THESE%20Tokimahery%20FINALE.pdf",
      pdfUrl:
        "https://agritrop.cirad.fr/610658/1/THESE%20Tokimahery%20FINALE.pdf",
    },
    {
      id: 3,
      title:
        "Extending Partial-Order Planning to Account for Norms in Agent Behavior",
      abstract:
        "This paper proposes an extension of partial-order planning to integrate normative constraints into agent behavior. By incorporating norms directly into the planning process, agents can reason about socially acceptable action sequences while still achieving their goals. The approach is evaluated in the context of multi-agent simulations and discussed within the European Social Simulation community.",
      publishedDate: new Date("2022-09-01"),
      journal:
        "Conference of the European Social Simulation Association, Springer Nature Switzerland",
      authors: ["T. Ramarozaka", "J. P. Müller", "H. L. Rakotonirainy"],
      tags: ["multi-agent systems", "norms", "planning"],
      url: "https://edepot.wur.nl/641647#page=144",
      pdfUrl: "https://edepot.wur.nl/641647#page=144",
    },
  ],
};

const courseListEl = document.getElementById("courseList");
const selectTech = document.getElementById("selectTech");
const selectLevel = document.getElementById("selectLevel");
const rangeMinEl = document.getElementById("rangeMin");
const rangeMaxEl = document.getElementById("rangeMax");
const searchEl = document.getElementById("searchInput");
const clearBtn = document.getElementById("clearAll");
const resultCountEl = document.getElementById("resultCount");
const flagsEl = document.querySelectorAll(".flags button span");
const priceRange = document.getElementById("price-range");
const minRange = document.getElementById("rangeMin");
const maxRange = document.getElementById("rangeMax");
const filterBtn = document.getElementById("filterBtn");
const filterPanel = document.getElementById("filterPanel");
const closeFilterBtn = document.getElementById("closeFilter");
let searchTerm = "";
let allowedLevels = [];
let allowedLangs = ["MG", "FR", "EN"];
let allowedTechs = [];
const numberResults = data.courses.length;

clearBtn.addEventListener("click", () => {
  searchTerm = "";
  searchEl.value = "";
  flagsEl.forEach((btn) => {
    btn.classList.add("active");
  });
  priceRange.textContent = "0 - 300000 MGA";

  allowedLevels = [];
  allowedLangs = ["MG", "FR", "EN"];
  allowedTechs = [];
  selectLevel.value = "all";
  selectTech.value = "all";
  if (rangeMinEl) rangeMinEl.value = rangeMinEl.min || 0;
  if (rangeMaxEl) rangeMaxEl.value = rangeMaxEl.max || 300000;
  if (rangeMinEl)
    rangeMinEl.dispatchEvent(new Event("input", { bubbles: true }));
  if (rangeMaxEl)
    rangeMaxEl.dispatchEvent(new Event("input", { bubbles: true }));

  currentPage = 1;
  courseListEl.innerHTML = "";
  listCourse(data.courses);
});

selectLevel.addEventListener("change", () => {
  const level = (selectLevel.value || "").toLowerCase();
  if (!level || level === "all") allowedLevels = [];
  else allowedLevels = [level];
  currentPage = 1;
  courseListEl.innerHTML = "";
  listCourse(data.courses);
});

selectTech.addEventListener("change", () => {
  const tech = (selectTech.value || "").toLowerCase();
  if (!tech || tech === "all") allowedTechs = [];
  else allowedTechs = [tech];
  currentPage = 1;
  courseListEl.innerHTML = "";
  listCourse(data.courses);
});

if (rangeMinEl)
  rangeMinEl.addEventListener("input", () => {
    currentPage = 1;
    courseListEl.innerHTML = "";
    listCourse(data.courses);
  });
if (rangeMaxEl)
  rangeMaxEl.addEventListener("input", () => {
    currentPage = 1;
    courseListEl.innerHTML = "";
    listCourse(data.courses);
  });

if (searchEl) {
  searchEl.addEventListener("input", (e) => {
    searchTerm = (e.target.value || "").toLowerCase().trim();
    currentPage = 1;
    courseListEl.innerHTML = "";
    listCourse(data.courses);
  });
}

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
    courseListEl.innerHTML = "";
    listCourse(data.courses);
  });
});
let currentPage = 1;
const itemsPerPage = 5;

function listCourse(courses) {
  if (!Array.isArray(courses)) return "";

  const filteredCourses = courses
    .filter(course => {
      if (!searchTerm) return true;
      const hay = ((course.title || "") + " " + (course.description || "") + " " + (course.technologies || []).join(" ")).toLowerCase();
      return hay.includes(searchTerm);
    })
    .filter(course => !allowedLevels.length || allowedLevels.includes((course.level || "beginner").toLowerCase()))
    .filter(course => {
      if (!allowedTechs.length) return true;
      const techs = Array.isArray(course.technologies) ? course.technologies.map(t => (t || "").toLowerCase()) : [];
      return allowedTechs.some(t => techs.includes(t));
    })
    .filter(course => {
      if (!rangeMinEl && !rangeMaxEl) return true;
      const min = rangeMinEl ? Number(rangeMinEl.value) : Number.NEGATIVE_INFINITY;
      const max = rangeMaxEl ? Number(rangeMaxEl.value) : Number.POSITIVE_INFINITY;
      const price = Number(course.price) || 0;
      return price >= min && price <= max;
    })
    .filter(course => allowedLangs.includes((course.language || "").toUpperCase()));

  if (resultCountEl) {
    if (filteredCourses.length === data.courses.length) {
      resultCountEl.textContent = "";
      resultCountEl.style.display = "none";
    } else if (filteredCourses.length === 0) {
      resultCountEl.textContent = "No items match your filters. Try reducing or clearing them";
      resultCountEl.style.display = "inline";
    } else {
      resultCountEl.textContent = `${filteredCourses.length} course${filteredCourses.length !== 1 ? "s" : ""} found`;
      resultCountEl.style.display = "inline";
    }
  }

  const isMobile = window.innerWidth < 1024;
  let coursesToShow = filteredCourses;

  if (isMobile) {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    coursesToShow = filteredCourses.slice(start, end);
  }

  coursesToShow.forEach(course => {
    const level = (course.level || "beginner").toLowerCase();
    const lang = (course.language || "").toUpperCase();
    const tech = Array.isArray(course.technologies) && course.technologies.length ? course.technologies[0] : "";
    const price = course.price;
    const thumb = course.thumbnail;

    courseListEl.innerHTML += `
      <div class="w-[20vw] min-w-[300px] bg-white rounded-xl shadow overflow-hidden card relative mb-4" data-level="${level}">
        <div class="badge flex gap-1 absolute z-10 top-2 left-2">
          <span class="langue rounded-xl bg-white text-dark text-sm py-1 px-2">${lang}</span>
          ${tech ? `<span class="tech rounded-xl bg-dark text-white text-sm py-1 px-2">${tech}</span>` : ""}
        </div>
        <div class="description relative" data-level="${level}">
          <img src="${thumb}" alt="${course.title}">
        </div>
        <article class="flex flex-col justify-between gap-3 my-2 relative px-1">
          <div class="flex flex-col">
            <h2 class="text-3xl text-red-dark truncate w-full font-semibold">${course.title}</h2>
            <span class="text-dark text-lg font-bold">MGA ${price}</span>
          </div>
          <p class="text-sm text-dark line-clamp-3">${course.description}</p>
          <div class="flex gap-2 items-center justify-center">
            <button class="bg-white text-red hover:scale border border-red py-2 px-4 rounded-lg shadow-xl" id="learnMore">Learn more</button>
            <button class="cartBtn bg-red text-white py-2 px-4 rounded-lg shadow-xl" data-course-id="${course.id}">Add to cart</button>
          </div>
        </article>
      </div>
    `;
  });

  if (isMobile && filteredCourses.length > currentPage * itemsPerPage) {
    const loadMoreBtn = document.getElementById("loadMore");
    loadMoreBtn.style.display = "block";
    loadMoreBtn.onclick = () => {
      currentPage++;
      listCourse(courses);
    };
  } else {
    const loadMoreBtn = document.getElementById("loadMore");
    if (loadMoreBtn) loadMoreBtn.style.display = "none";
  }
}

window.addEventListener("resize", () => {
  currentPage = 1;
  courseListEl.innerHTML = "";
  listCourse(data.courses);
});

currentPage = 1;
courseListEl.innerHTML = "";
listCourse(data.courses);
filterBtn.addEventListener("click", () => {
  filterPanel.classList.toggle("hidden");
});
closeFilterBtn.addEventListener("click", () => {
  filterPanel.classList.add("hidden");
});
