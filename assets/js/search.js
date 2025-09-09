/* Lunr search for SparkHacky */
(function () {
  const $input = document.querySelector('#global-search');
  const $results = document.querySelector('#search-results');

  if (!$input || !$results) return;

  // util: quitar acentos
  const fold = (s) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();

  // debounce para no indexar cada tecla
  const debounce = (fn, ms=120) => {
    let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms) };
  };

  let idx;     // índice lunr
  let store = []; // documentos planos

  const load = async () => {
    try {
      const res = await fetch((window.__BASEURL__ || '') + '/search.json', { cache: 'no-store' });
      const data = await res.json();

      store = []
        .concat(data.posts || [])
        .concat(data.writeups || [])
        .map(doc => ({
          id: doc.id,
          title: doc.title || '',
          url: doc.url,
          type: doc.type,
          date: doc.date || '',
          tags: (doc.tags || []).join(' '),
          categories: (doc.categories || []).join(' '),
          excerpt: doc.excerpt || '',
          content: doc.content || ''
        }));

      // crear índice
      idx = lunr(function () {
        this.ref('id');
        this.field('title', { boost: 10 });
        this.field('tags',  { boost: 6 });
        this.field('categories', { boost: 4 });
        this.field('excerpt', { boost: 2 });
        this.field('content');

        store.forEach(d => {
          this.add({
            id: d.id,
            title: fold(d.title),
            tags: fold(d.tags),
            categories: fold(d.categories),
            excerpt: fold(d.excerpt),
            content: fold(d.content)
          });
        }, this);
      });

    } catch (e) {
      console.error('Search init error:', e);
    }
  };

  const template = (hit) => {
    const doc = store.find(d => d.id === hit.ref);
    if (!doc) return '';
    const badge = doc.type === 'writeup' ? 'Writeup' : 'Briefing';
    return `
      <a class="search-item" href="${doc.url}">
        <strong>${doc.title}</strong>
        <span class="meta">· ${badge}${doc.date ? ' · ' + doc.date : ''}</span>
      </a>
    `;
  };

  const render = (html) => {
    $results.innerHTML = html;
    $results.style.display = html ? 'block' : 'none';
  };

  const onSearch = debounce((q) => {
    const query = fold(q.trim());
    if (!query) return render('');
    // búsqueda flexible: palabras sueltas y comodines
    let r = idx.search(query + '* ' + query.split(/\s+/).map(s => '+'+s+'*').join(' '));
    // limitar resultados
    r = r.slice(0, 10);
    render(r.map(template).join(''));
  }, 90);

  // eventos
  $input.addEventListener('input', (e) => onSearch(e.target.value));
  document.addEventListener('click', (e) => {
    if (!$results.contains(e.target) && e.target !== $input) render('');
  });
  $input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { render(''); $input.blur(); }
  });

  // iniciar
  load();
})();
