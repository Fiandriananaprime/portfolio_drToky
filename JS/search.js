
(function () {
  const SEARCH_TARGET_KEY = 'globalSearchTarget';

  function debounce(fn, wait) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  function collectItems() {
    const items = [];
    const globalData = window.sharedData || ((typeof data !== 'undefined') ? data : (window.data || window.blogData || null));
    if (globalData && globalData.posts) {
      globalData.posts.forEach(p => items.push({
        type: 'post',
        id: p.id,
        title: p.title,
        text: (p.description || ''),
        page: p.page || `blog.html#post-${p.id}`
      }));
    }
    if (globalData && globalData.papers) {
      globalData.papers.forEach(p => items.push({
        type: 'paper',
        id: p.id,
        title: p.title,
        text: (p.abstract || p.summary || ''),
        page: p.page || `research.html#paper-${p.id}`
      }));
    } else {
      const globalResearch = (typeof researchPapers !== 'undefined') ? researchPapers : (window.researchPapers || null);
      if (globalResearch) {
        globalResearch.forEach(p => items.push({
          type: 'paper',
          id: p.id,
          title: p.title,
          text: (p.abstract || ''),
          page: p.page || `research.html#paper-${p.id}`
        }));
      }
    }
    if (globalData && globalData.courses) {
      globalData.courses.forEach(c => items.push({
        type: 'course',
        id: c.id,
        title: c.title,
        text: (c.description || ''),
        page: c.page || `courses.html#course-${c.id}`
      }));
    }
    if (globalData && globalData.youtubeVideos) {
      globalData.youtubeVideos.forEach(v => items.push({
        type: 'youtube',
        id: v.id,
        title: v.title,
        text: v.title || '',
        page: v.page || `blog.html#youtube-${v.id}`
      }));
    }
    if (globalData && globalData.archives) {
      globalData.archives.forEach(a => items.push({
        type: 'archive',
        id: a.slug || a.label,
        title: a.label,
        text: a.label || '',
        page: a.page || `blog.html#archive-${(a.slug || a.label).replace(/[^a-z0-9\-]/ig,'-')}`
      }));
    }
    
    const skipKeys = new Set(['posts','papers','courses','youtubeVideos','archives']);
    if (globalData) {
      for (const k of Object.keys(globalData)) {
        if (skipKeys.has(k)) continue;
        const arr = globalData[k];
        if (!Array.isArray(arr)) continue;
        arr.forEach((el, idx) => {
          if (!el || typeof el !== 'object') return;
          const title = el.title || el.label || el.name || el.author || el.role;
          if (!title) return;
          const text = el.description || el.abstract || el.summary || el.desc || el.body || '';
          const id = el.id || el.slug || idx;
          const page = el.page || `${k}.html#${id}`;
          const type = k.replace(/s$/, '');
          items.push({ type, id, title, text, page });
        });
      }
    }

    return items;
  }

  function highlight(text, q) {
    if (!q) return text;
    const re = new RegExp(`(${escapeRegExp(q)})`, 'ig');
    return text.replace(re, '<strong>$1</strong>');
  }

  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function makeSnippet(text, q) {
    const plain = (text || '');
    const idx = plain.toLowerCase().indexOf(q.toLowerCase());
    
    const MAX_SNIPPET = 80;
    if (idx === -1) return (plain.length > MAX_SNIPPET) ? plain.slice(0, MAX_SNIPPET) + '...' : plain;
    const start = Math.max(0, idx - 20);
    const end = Math.min(plain.length, idx + 40);
    let snippet = (start > 0 ? '...' : '') + plain.slice(start, end) + (end < plain.length ? '...' : '');
    if (snippet.length > MAX_SNIPPET) snippet = snippet.slice(0, MAX_SNIPPET - 3) + '...';
    return highlight(snippet, q);
  }

  function renderResults(results, inputEl) {
    let container = document.getElementById('searchResults');
    if (!container) {
      container = document.createElement('div');
      container.id = 'searchResults';
      container.className = 'absolute bg-white shadow-lg rounded p-2 z-50';
      document.body.appendChild(container);
    }
    if (!results.length) {
      container.innerHTML = '<div class="text-sm text-muted p-2">No results</div>';
      positionContainer(inputEl, container);
      return;
    }
    container.innerHTML = results.slice(0,8).map(r => `
      <div class="p-2 hover:bg-gray-100 rounded">
        <div class="flex justify-between items-center">
          <a class="text-sm font-semibold text-dark" href="${r.page}" data-search-link="true">${r.title}</a>
          <a class="text-xs text-red hover:underline" href="${r.page}" data-search-link="true">Voir</a>
        </div>
        <div class="text-xs text-muted mt-1">${makeSnippet(r.text, r.query)}</div>
      </div>
    `).join('\n');
    positionContainer(inputEl, container);
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
    container.style.boxSizing = 'border-box';
    container.style.width = width + 'px';
    container.style.left = left + 'px';
    container.style.right = 'auto';
    container.style.top = (rect.bottom + window.scrollY + 6) + 'px';
  }
  function doSearch(q, inputEl) {
    const items = collectItems();
    if (!q) { renderResults([], inputEl); return; }
    const results = [];
    const ql = q.toLowerCase();
    items.forEach(i => {
      if ((i.title && i.title.toLowerCase().includes(ql)) || (i.text && i.text.toLowerCase().includes(ql))) {
        results.push(Object.assign({}, i, { query: q }));
      }
    });
    renderResults(results, inputEl);
  }

  function parseSearchTarget(urlLike) {
    try {
      const parsed = new URL(urlLike, window.location.href);
      return {
        pathname: parsed.pathname,
        pageName: getPageName(parsed.pathname),
        hash: parsed.hash,
      };
    } catch (_) {
      return null;
    }
  }

  function getPageName(pathname) {
    const cleanPath = (pathname || '').split('?')[0].split('#')[0];
    const parts = cleanPath.split('/').filter(Boolean);
    return (parts[parts.length - 1] || 'index.html').toLowerCase();
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
    targetEl.classList.remove('highlight');
    void targetEl.offsetWidth;
    targetEl.classList.add('highlight');
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setTimeout(() => {
      targetEl.classList.remove('highlight');
    }, 500);
  }

  function tryHighlightSearchTarget() {
    const pendingTarget = readSearchTarget();
    if (!pendingTarget) return false;

    const targetHash = pendingTarget.hash;
    if (!targetHash) return false;

    const targetEl = document.querySelector(targetHash);
    if (!targetEl) return false;

    flashTarget(targetEl);
    clearSearchTarget();
    return true;
  }

  function queueHighlightSearchTarget(startDelay = 0) {
    let attempts = 0;
    const maxAttempts = 20;
    const tryLater = () => {
      attempts += 1;
      if (tryHighlightSearchTarget() || attempts >= maxAttempts) return;
      setTimeout(tryLater, 150);
    };
    setTimeout(tryLater, startDelay);
  }

  function attach(input) {
    const handler = debounce((e) => doSearch(e.target.value.trim(), input), 250);
    input.addEventListener('input', handler);
    input.addEventListener('focus', (e) => { if (e.target.value.trim()) doSearch(e.target.value.trim(), input); });
    document.addEventListener('click', (ev) => {
      const link = ev.target.closest('[data-search-link="true"]');
      if (link && link.href) {
        saveSearchTarget(link.href);
      }
    });
    document.addEventListener('click', (ev) => {
      const container = document.getElementById('searchResults');
      if (!container) return;
      if (ev.target === input || container.contains(ev.target)) return;
      container.remove();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    ( async function tryLoadSharedData() {
      const scriptEl = document.querySelector('script[src$="search.js"]') || document.currentScript;
      const scriptBase = scriptEl && scriptEl.src ? new URL('.', scriptEl.src).href : new URL('.', location.href).href;
      const candidates = [
        new URL('tokimahery.data.mjs', scriptBase).href,
        new URL('./tokimahery.data.mjs', scriptBase).href,
        new URL('./JS/tokimahery.data.mjs', scriptBase).href,
        new URL('../JS/tokimahery.data.mjs', scriptBase).href,
        '/JS/tokimahery.data.mjs',
      ];

      for (const p of candidates) {
        try {
          const mod = await import(p);
          if (mod && (mod.default || mod.data)) {
            window.sharedData = mod.default || mod.data;
            break;
          }
        } catch (e) {
        }
      }
      if (!window.sharedData && (typeof data !== 'undefined')) window.sharedData = data;
      const navInput = document.getElementById('navSearch');
      if (!navInput) {
        return;
      }
      attach(navInput);
    })();
  });
  window.addEventListener('load', () => {
    queueHighlightSearchTarget(1000);
  });
  window.addEventListener('hashchange', () => {
    queueHighlightSearchTarget(100);
  });
})();
