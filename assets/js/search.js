/* --- search.js --- */
document.addEventListener('DOMContentLoaded', () => {
  // Compat: evitar que un oninput viejo rompa todo
  window.siteSearch = window.siteSearch || function(){};

  const INPUT =
    document.getElementById('q') ||
    document.getElementById('site-search') ||
    document.querySelector('.site-search input[type="search"]');

  if (!INPUT) return;

  let RESULTS = document.getElementById('search-results');
  if (!RESULTS) {
    RESULTS = document.createElement('div');
    RESULTS.id = 'search-results';
    RESULTS.className = 'search-results';
    RESULTS.setAttribute('role', 'listbox');
    RESULTS.hidden = true;
    // metemos el dropdown junto al input
    (INPUT.parentElement || document.body).appendChild(RESULTS);
  }

  let data = [];
  let activeIdx = -1;

  const normalize = s => (s || '')
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  // --------- Carga robusta del índice ---------
  async function loadIndex() {
    const base = document.body?.dataset?.baseurl || '';
    const candidates = [
      `${base}/search.json`, // correcto para project sites y user sites
      '/search.json',        // absoluto desde raíz (user sites)
      'search.json'          // relativo por si el sitio está en raíz
    ];

    for (const url of candidates) {
      try {
        const r = await fetch(url, { cache: 'no-store' });
        if (r.ok) {
          const json = await r.json();
          data = [...(json.posts || []), ...(json.writeups || [])].map(item => ({
            ...item,
            _hay: normalize([
              item.title,
              (item.tags || []).join(' '),
              (item.categories || []).join(' '),
              item.excerpt
            ].join(' '))
          }));
          console.debug('[search] Índice cargado desde', url, '→', data.length, 'items');
          return true;
        }
      } catch (e) {
        // seguimos probando candidatos
      }
    }
    console.warn('[search] No pude cargar search.json en ninguna ruta candidata');
    return false;
  }

  function hide() {
    RESULTS.hidden = true;
    RESULTS.innerHTML = '';
    activeIdx = -1;
  }

  function setActive(i) {
    const items = RESULTS.querySelectorAll('.search-item');
    items.forEach(el => el.classList.remove('is-active'));
    if (i >= 0 && i < items.length) {
      items[i].classList.add('is-active');
      activeIdx = i;
      items[i].scrollIntoView({ block: 'nearest' });
    }
  }

  function render(list, tokens) {
    RESULTS.innerHTML = '';
    if (!list.length) { hide(); return; }

    const frag = document.createDocumentFragment();
    list.forEach((it, idx) => {
      const a = document.createElement('a');
      a.className = 'search-item';
      a.href = it.url;
      a.setAttribute('role', 'option');
      a.dataset.index = idx;

      // Resaltado básico en el título
      let htmlTitle = it.title;
      tokens.forEach(tok => {
        if (!tok) return;
        const re = new RegExp(`(${tok.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')})`, 'ig');
        htmlTitle = htmlTitle.replace(re, '<mark>$1</mark>');
      });

      a.innerHTML = `
        <span class="badge ${it.type}">${it.type === 'writeup' ? 'Writeup' : 'Briefing'}</span>
        <span class="title">${htmlTitle}</span>
        ${it.date ? `<span class="meta">${it.date}</span>` : ''}
      `;
      a.addEventListener('mousemove', () => setActive(idx));
      a.addEventListener('click', () => hide());
      frag.appendChild(a);
    });

    RESULTS.appendChild(frag);
    RESULTS.hidden = false;
    activeIdx = -1;
  }

  INPUT.addEventListener('input', (e) => {
    const q = normalize(e.target.value.trim());
    if (q.length < 2 || !data.length) { hide(); return; }
    const toks = q.split(/\s+/).filter(Boolean);

    const list = data
      .filter(it => toks.every(tok => it._hay.includes(tok)))
      .slice(0, 10);

    render(list, toks);
  });

  INPUT.addEventListener('keydown', (e) => {
    if (RESULTS.hidden) return;
    const items = RESULTS.querySelectorAll('.search-item');
    if (!items.length) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActive((activeIdx + 1) % items.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActive((activeIdx - 1 + items.length) % items.length);
        break;
      case 'Enter':
        if (activeIdx >= 0) {
          e.preventDefault();
          items[activeIdx].click();
        }
        break;
      case 'Escape':
        hide();
        break;
    }
  });

  INPUT.addEventListener('blur', () => setTimeout(hide, 150));

  // Dispara la carga del índice
  loadIndex();
});
