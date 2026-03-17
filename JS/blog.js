document.addEventListener("DOMContentLoaded", () => {
  const data = {
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
  };
  const videoContainer = document.getElementById("videoContainer");
  const closeVideoBtn = document.getElementById("closeVideo");
  const translateVideo = document.getElementById("translateVideo");

  let open = true;

  if (closeVideoBtn && translateVideo) {
    closeVideoBtn.addEventListener("click", () => {
      if (open) {
        translateVideo.style.transform = "translateX(calc(100% - 5px))";
        closeVideoBtn.innerText = "<<";
      } else {
        translateVideo.style.transform = "translateX(0%)";
        randomVideo =
          data.youtubeVideos[
            Math.floor(Math.random() * data.youtubeVideos.length)
          ];
        closeVideoBtn.innerText = ">>";
      }

      open = !open;
    });
  }
  console.log(window.innerWidth);

  if (window.innerWidth <= 1024) {
    let randomVideo =
      data.youtubeVideos[Math.floor(Math.random() * data.youtubeVideos.length)];
    if (videoContainer && randomVideo) {
      videoContainer.innerHTML = `
      <iframe class="w-full h-full" src="https://www.youtube.com/embed/${randomVideo.id}" title="${randomVideo.title}" frameborder="0" allowfullscreen></iframe>
    `;
    }
    setTimeout(() => {
      translateVideo.style.display = "block";
      setTimeout(() => {
        translateVideo.style.transform = "translateX(0px)";
      }, 100);
    }, 6000);
  }

  function renderPostCard(post) {
    const date = post.creationDate
      ? new Date(post.creationDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "";
    const tagsHtml = (post.tags || [])
      .map(
        (t) =>
          `<span class="bg-blue-500 text-white px-3 py-1 rounded-full text-xs mr-2">${t}</span>`,
      )
      .join("");
    return `
      <div class="w-full rounded-lg shadow-lg p-4 flex flex-col lg:flex-row gap-5 mb-6">
        <img src="${post.thumbnail || "assets/square-image.jpg"}" class="w-[100%] lg:w-[15%] rounded-xl" alt="">
        <div class="flex flex-col justify-between w-[85%]">
          <div>
            <h3 class="text-2xl text-red font-bold">${post.title}</h3>
            <span class="font-bold text-sm">${date}</span>
            <p class="text-sm mt-2">${post.description}</p>
          </div>
          <div class="badgeContainer mt-3 w-full flex flex-wrap gap-2">
            ${tagsHtml}
          </div>
        </div>
      </div>
    `;
  }

  const blogContainer = document.getElementById("blogContainer");

  const postsPerPage = window.innerWidth >= 1024 ? 5 : 3;
  console.log(postsPerPage);
  let currentPage = 1;

  function showPage(page) {
    const allItems = blogContainer.querySelectorAll(":scope > div");
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;

    allItems.forEach((item, index) => {
      item.style.display = index >= start && index < end ? "flex" : "none";
    });

    renderPagination(allItems.length);
  }

  function renderPagination(totalItems) {
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = "";
    const totalPages = Math.ceil(totalItems / postsPerPage);

    const prevBtn = document.createElement("button");
    prevBtn.innerText = "← Prev";
    prevBtn.className = "px-2 py-1 m-1 shadow rounded-lg";
    if (currentPage === 1) prevBtn.classList.add("disabled");
    prevBtn.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
      }
    });
    pagination.appendChild(prevBtn);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");
      btn.innerText = i;
      btn.className = "px-2 py-1 m-1 shadow  rounded-lg";
      if (i === currentPage) btn.classList.add("bg-red", "text-white");

      btn.addEventListener("click", () => {
        currentPage = i;
        showPage(currentPage);
      });

      pagination.appendChild(btn);
    }
    const nextBtn = document.createElement("button");
    nextBtn.innerText = "Next →";
    nextBtn.className = "px-2 py-1 m-1 shadow rounded-lg";
    if (currentPage === totalPages) nextBtn.classList.add("disabled");
    nextBtn.addEventListener("click", () => {
      if (currentPage < totalPages) {
        currentPage++;
        showPage(currentPage);
      }
    });
    pagination.appendChild(nextBtn);
  }

  blogContainer.innerHTML = data.posts.map(renderPostCard).join("");
  showPage(currentPage);

  function renderArchiveList(archives) {
    if (!archives || !archives.length) return "";
    const items = archives
      .map(
        (a) => `
      <li class="flex items-center justify-between text-sm text-dark">${a.label} <span class="text-muted">${a.count}</span></li>
    `,
      )
      .join("\n");
    return `
      <div class="w-full shadow-lg p-3 rounded-2xl bg-warm">
        <div class="text-muted text-sm flex gap-3 items-center"><hr class="text-red w-[10%] border-2">Archives</div>
        <ul class="flex flex-col gap-1 mt-5">
          ${items}
        </ul>
      </div>
    `;
  }

  const archiveContainer = document.getElementById("archiveContainer");
  if (archiveContainer) {
    archiveContainer.innerHTML = renderArchiveList(data.archives);
  }

  function renderYouTubeList(videos) {
    if (!videos || !videos.length) return "";
    return videos
      .map(
        (v) => `
      <div>
        <iframe
          src="https://www.youtube.com/embed/${v.id}"
          title="${v.title}"
          frameborder="0"
          class="rounded-lg w-full aspect-video"
          allowfullscreen>
        </iframe>
        <h4 class="text-xs mt-2">${v.title}</h4>
      </div>
    `,
      )
      .join("\n");
  }

  const ytContainer = document.getElementById("youtubeContainer");
  if (ytContainer) {
    ytContainer.innerHTML = renderYouTubeList(data.youtubeVideos);
  }
});
