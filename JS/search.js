// Basic site-wide search: searches across known data objects (posts, researchPapers, courses)
(function () {
  function debounce(fn, wait) {
    let t;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  function collectItems() {
    const items = [];
    // debug info: what globals are available
  console.log('search.js: globals typeof data=', typeof data, 'window.data=', !!window.data, 'window.blogData=', !!window.blogData, 'window.sharedData=', !!window.sharedData, 'typeof researchPapers=', typeof researchPapers);
  // Prefer the dynamically-imported sharedData (set by dynamic import), fall back to legacy globals
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
    // researchPapers may be declared as a top-level const (not on window) or as window.researchPapers
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
    // courses usually live on a `data` object as well
    if (globalData && globalData.courses) {
      globalData.courses.forEach(c => items.push({
        type: 'course',
        id: c.id,
        title: c.title,
        text: (c.description || ''),
        page: c.page || `courses.html#course-${c.id}`
      }));
    }
    // youtube videos (blog)
    if (globalData && globalData.youtubeVideos) {
      globalData.youtubeVideos.forEach(v => items.push({
        type: 'youtube',
        id: v.id,
        title: v.title,
        text: v.title || '',
        page: v.page || `blog.html#youtube-${v.id}`
      }));
    }
    // archives (blog)
    if (globalData && globalData.archives) {
      globalData.archives.forEach(a => items.push({
        type: 'archive',
        id: a.slug || a.label,
        title: a.label,
        text: a.label || '',
        page: a.page || `blog.html#archive-${(a.slug || a.label).replace(/[^a-z0-9\-]/ig,'-')}`
      }));
    }
    // blog.js also defines data variable in some pages (same name) - already covered
    console.log('search.js: collected items count=', items.length, 'posts=', items.filter(i=>i.type==='post').length, 'papers=', items.filter(i=>i.type==='paper').length, 'courses=', items.filter(i=>i.type==='course').length, 'youtube=', items.filter(i=>i.type==='youtube').length, 'archives=', items.filter(i=>i.type==='archive').length);
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
    // show shorter snippets to reduce visual noise
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
          <a class="text-sm font-semibold text-dark" href="${r.page}">${r.title}</a>
          <a class="text-xs text-red hover:underline" href="${r.page}">Voir</a>
        </div>
        <div class="text-xs text-muted mt-1">${makeSnippet(r.text, r.query)}</div>
      </div>
    `).join('\n');
    positionContainer(inputEl, container);
  }

  function positionContainer(inputEl, container) {
    const rect = inputEl.getBoundingClientRect();
    // make the results a bit wider than the input but clamp to viewport
    const desiredWidth = Math.max(300, rect.width + 120);
    const maxAllowed = Math.max(200, window.innerWidth - 24); // leave some margin
    const width = Math.min(desiredWidth, maxAllowed, 900);
    // compute left so the box doesn't overflow the right edge
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
    console.log('search.js: doSearch q="'+q+'"');
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

  function attach(input) {
    console.log('search.js: attach to input', input && (input.id || input.placeholder || input));
    const handler = debounce((e) => doSearch(e.target.value.trim(), input), 250);
    input.addEventListener('input', handler);
    input.addEventListener('focus', (e) => { if (e.target.value.trim()) doSearch(e.target.value.trim(), input); });
    document.addEventListener('click', (ev) => {
      const container = document.getElementById('searchResults');
      if (!container) return;
      if (ev.target === input || container.contains(ev.target)) return;
      container.remove();
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    // attempt to dynamically import the central data module so search works across pages
    (async function tryLoadSharedData() {
      const candidates = [
        './JS/tokimahery.data.mjs',
        '/JS/tokimahery.data.mjs',
        'JS/tokimahery.data.mjs',
        './tokimahery.data.mjs',
        '../JS/tokimahery.data.mjs',
      ];
      for (const p of candidates) {
        try {
          console.log('search.js: attempting dynamic import', p);
          const mod = await import(p);
          if (mod && (mod.default || mod.data)) {
            window.sharedData = mod.default || mod.data;
            console.log('search.js: loaded sharedData from', p, 'keys=', Object.keys(window.sharedData || {}).join(','));
            break;
          }
        } catch (err) {
          // ignore and try next
          // console.debug('search.js: import failed for', p, err);
        }
      }

      // attach to inputs after attempting to load shared data
      let inputs = Array.from(document.querySelectorAll('input[placeholder*="search"], input[placeholder*="keywords"], input[id^="search"]'));
      if (!inputs.length) {
        // fallback: try common ids used in site
        const fallback = [];
        ['searchInput','searchInputMobile','search','q','search-box'].forEach(id => { const el = document.getElementById(id); if (el) fallback.push(el); });
        inputs = fallback;
      }
      console.log('search.js: found search inputs count=', inputs.length);
      inputs.forEach(attach);
    })();
  });
})();
