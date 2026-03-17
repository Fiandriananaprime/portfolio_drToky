import data from './tokimahery.data.mjs';

document.addEventListener("DOMContentLoaded", () => {
  // data imported from central JS/tokimahery.data.mjs
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
        <div id="post-${post.id}" class="w-full rounded-lg shadow-lg p-4 flex flex-col lg:flex-row gap-5 mb-6">
        <img src="${post.thumbnail || "assets/square-image.jpg"}" class="w-[100%] lg:w-[15%] rounded-xl" alt="">
        <div class="flex flex-col justify-between w-[85%]">
          <div>
            <h3 class="text-2xl text-red font-bold">${post.title}</h3>
            <span class="font-bold text-sm">${date}</span>
              <p class="text-sm mt-2">${post.description || ''}</p>
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
      <li id="archive-${a.slug}" class="flex items-center justify-between text-sm text-dark"><a href="${a.page || `blog.html#archive-${a.slug}`}" class="flex-1">${a.label}</a> <span class="text-muted">${a.count}</span></li>
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
      <div id="youtube-${v.id}">
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
