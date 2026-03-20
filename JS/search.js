(function () {
  const SEARCH_TARGET_KEY = "globalSearchTarget";

  function debounce(fn, wait) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  function collectItems() {
    const items = [];
    const globalData = window.sharedData || window.data || null;
    if (!globalData) return items;

    (globalData.posts || []).forEach((p) => {
      items.push({
        type: "post",
        id: p.id,
        title: p.title,
        text: p.description || "",
        page: p.page || `blog.html#post-${p.id}`,
      });
    });

    (globalData.papers || []).forEach((p) => {
      items.push({
        type: "paper",
        id: p.id,
        title: p.title,
        text: p.abstract || p.summary || "",
        page: p.page || `research.html#paper-${p.id}`,
      });
    });

    (globalData.courses || []).forEach((c) => {
      items.push({
        type: "course",
        id: c.id,
        title: c.title,
        text: c.description || "",
        page: c.page || `courses.html#course-${c.id}`,
      });
    });

    (globalData.youtubeVideos || []).forEach((v) => {
      items.push({
        type: "youtube",
        id: v.id,
        title: v.title,
        text: v.title || "",
        page: v.page || `blog.html#youtube-${v.id}`,
      });
    });

    (globalData.archives || []).forEach((a) => {
      items.push({
        type: "archive",
        id: a.slug || a.label,
        title: a.label,
        text: a.label || "",
        page:
          a.page ||
          `blog.html#archive-${(a.slug || a.label).replace(/[^a-z0-9\-]/gi, "-")}`,
      });
    });

    return items;
  }

  function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function highlight(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${escapeRegExp(query)})`, "ig");
    return text.replace(regex, "<strong>$1</strong>");
  }

  function makeSnippet(text, query) {
    const plain = text || "";
    const idx = plain.toLowerCase().indexOf(query.toLowerCase());
    const maxSnippet = 80;

    if (idx === -1) {
      return plain.length > maxSnippet ? `${plain.slice(0, maxSnippet)}...` : plain;
    }

    const start = Math.max(0, idx - 20);
    const end = Math.min(plain.length, idx + 40);
    let snippet = `${start > 0 ? "..." : ""}${plain.slice(start, end)}${end < plain.length ? "..." : ""}`;
    if (snippet.length > maxSnippet) {
      snippet = `${snippet.slice(0, maxSnippet - 3)}...`;
    }
    return highlight(snippet, query);
  }

  function positionContainer(inputEl, container) {
    const rect = inputEl.getBoundingClientRect();
    const desiredWidth = Math.max(300, rect.width + 120);
    const maxAllowed = Math.max(200, window.innerWidth - 24);
    const width = Math.min(desiredWidth, maxAllowed, 900);
    const leftCandidate = rect.left + window.scrollX;
    let left = leftCandidate;

    if (leftCandidate + width > window.scrollX + window.innerWidth - 20) {
      left = Math.max(20 + window.scrollX, window.scrollX + window.innerWidth - width - 20);
    }

    container.style.boxSizing = "border-box";
    container.style.width = `${width}px`;
    container.style.left = `${left}px`;
    container.style.right = "auto";
    container.style.top = `${rect.bottom + window.scrollY + 6}px`;
  }

  function renderResults(results, inputEl) {
    let container = document.getElementById("searchResults");
    if (!container) {
      container = document.createElement("div");
      container.id = "searchResults";
      container.className = "fixed bg-white shadow-lg rounded p-2 z-50";
      document.body.appendChild(container);
    }

    if (!results.length) {
      container.innerHTML = '<div class="text-sm text-muted p-2">No results</div>';
      positionContainer(inputEl, container);
      return;
    }

    container.innerHTML = results
      .slice(0, 8)
      .map(
        (result) => `
          <div class="p-2 hover:bg-gray-100 rounded">
            <div class="flex justify-between items-center">
              <a class="text-sm font-semibold text-dark" href="${result.page}" data-search-link="true">${result.title}</a>
              <a class="text-xs text-red hover:underline" href="${result.page}" data-search-link="true">Voir</a>
            </div>
            <div class="text-xs text-muted mt-1">${makeSnippet(result.text, result.query)}</div>
          </div>
        `,
      )
      .join("\n");

    positionContainer(inputEl, container);
  }

  function doSearch(query, inputEl) {
    const items = collectItems();
    if (!query) {
      renderResults([], inputEl);
      return;
    }

    const lowered = query.toLowerCase();
    const results = items
      .filter(
        (item) =>
          (item.title && item.title.toLowerCase().includes(lowered)) ||
          (item.text && item.text.toLowerCase().includes(lowered)),
      )
      .map((item) => Object.assign({}, item, { query }));

    renderResults(results, inputEl);
  }

  function parseSearchTarget(urlLike) {
    try {
      const parsed = new URL(urlLike, window.location.href);
      return {
        pathname: parsed.pathname,
        hash: parsed.hash,
      };
    } catch (_) {
      return null;
    }
  }

  function saveSearchTarget(href) {
    const target = parseSearchTarget(href);
    if (!target || !target.hash) return;
    sessionStorage.setItem(SEARCH_TARGET_KEY, JSON.stringify(target));
  }

  function readSearchTarget() {
    const raw = sessionStorage.getItem(SEARCH_TARGET_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch (_) {
      sessionStorage.removeItem(SEARCH_TARGET_KEY);
      return null;
    }
  }

  function clearSearchTarget() {
    sessionStorage.removeItem(SEARCH_TARGET_KEY);
  }

  function flashTarget(targetEl) {
    targetEl.classList.remove("highlight");
    void targetEl.offsetWidth;
    targetEl.classList.add("highlight");
    targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
    setTimeout(() => {
      targetEl.classList.remove("highlight");
    }, 500);
  }

  function tryHighlightSearchTarget() {
    const pendingTarget = readSearchTarget();
    if (!pendingTarget || !pendingTarget.hash) return false;

    const targetEl = document.querySelector(pendingTarget.hash);
    if (!targetEl) return false;

    flashTarget(targetEl);
    clearSearchTarget();
    return true;
  }

  function queueHighlightSearchTarget(startDelay) {
    let attempts = 0;
    const maxAttempts = 20;
    const tryLater = () => {
      attempts += 1;
      if (tryHighlightSearchTarget() || attempts >= maxAttempts) return;
      setTimeout(tryLater, 150);
    };
    setTimeout(tryLater, startDelay || 0);
  }

  function attach(input) {
    const handler = debounce((e) => doSearch(e.target.value.trim(), input), 250);
    input.addEventListener("input", handler);
    input.addEventListener("focus", (e) => {
      if (e.target.value.trim()) {
        doSearch(e.target.value.trim(), input);
      }
    });

    document.addEventListener("click", (ev) => {
      const link = ev.target.closest('[data-search-link="true"]');
      if (link && link.href) {
        saveSearchTarget(link.href);
      }
    });

    document.addEventListener("click", (ev) => {
      const container = document.getElementById("searchResults");
      if (!container) return;
      if (ev.target === input || container.contains(ev.target)) return;
      container.remove();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    const navInput = document.getElementById("navSearch");
    if (!navInput) return;
    attach(navInput);
  });

  window.addEventListener("load", () => {
    queueHighlightSearchTarget(1000);
  });

  window.addEventListener("hashchange", () => {
    queueHighlightSearchTarget(100);
  });
})();
