(function () {
  const INPUT_ID = "site-search";
  const RESULTS_ID = "search-results";
  const INDEX_URL = "/search.json";             // tu site es user.github.io -> raíz
  const MAX_RESULTS = 10;

  const $ = (sel) => document.querySelector(sel);
  const input = document.getElementById(INPUT_ID);
  const results = document.getElementById(RESULTS_ID);
  if (!input || !results) return;

  let index = [];
  let cursor = -1; // para navegación con teclas

  // Utilidades
  const normalize = (s) => (s || "")
    .toString()
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");

  const debounce = (fn, ms = 150) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(null, args), ms);
    };
  };

  const highlight = (text, q) => {
    if (!q) return text;
    try {
      const esc = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return text.replace(new RegExp(`(${esc})`, "ig"), "<mark>$1</mark>");
    } catch {
      return text;
    }
  };

  // Carga índice (posts + writeups)
  fetch(INDEX_URL, { cache: "no-store" })
    .then((r) => r.json())
    .then((json) => {
      index = []
        .concat(json.posts || [])
        .concat(json.writeups || [])
        .map((item) => ({
          ...item,
          _norm: {
            title: normalize(item.title),
            excerpt: normalize(item.excerpt),
            tags: normalize((item.tags || []).join(" ")),
            categories: normalize((item.categories || []).join(" ")),
            content: normalize(item.content).slice(0, 2000) // recorta para rendimiento
          }
        }));
    })
    .catch((e) => {
      console.error("[search] No se pudo cargar /search.json", e);
    });

  // Render resultados
  const render = (items, q) => {
    if (!items.length) {
      results.innerHTML = "";
      results.hidden = true;
      cursor = -1;
      return;
    }
    results.innerHTML = items
      .slice(0, MAX_RESULTS)
      .map((it, i) => {
        const type = it.type === "writeup" ? "Writeup" : "Briefing";
        return `
          <a class="search-item" href="${it.url}" data-idx="${i}" role="option">
            <div class="search-item-title">${highlight(it.title, q)}</div>
            <div class="search-item-meta">${type} • ${it.date || ""}</div>
          </a>
        `;
      })
      .join("");
    results.hidden = false;
    cursor = -1;
  };

  // Búsqueda
  const doSearch = debounce(() => {
    const q = normalize(input.value.trim());
    if (!q || index.length === 0) {
      results.innerHTML = "";
      results.hidden = true;
      cursor = -1;
      return;
    }
    const tokens = q.split(/\s+/).filter(Boolean);
    const filtered = index.filter((it) =>
      tokens.every((t) =>
        it._norm.title.includes(t) ||
        it._norm.tags.includes(t) ||
        it._norm.categories.includes(t) ||
        it._norm.excerpt.includes(t)
        // si quieres incluir contenido completo, añade:
        // || it._norm.content.includes(t)
      )
    );
    render(filtered, input.value.trim());
  }, 120);

  // Interacción
  input.addEventListener("input", doSearch);
  input.addEventListener("focus", () => {
    if (results.innerHTML) results.hidden = false;
  });

  input.addEventListener("keydown", (e) => {
    const items = Array.from(results.querySelectorAll(".search-item"));
    if (!items.length || results.hidden) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        cursor = (cursor + 1) % items.length;
        items.forEach((el, i) => el.classList.toggle("is-active", i === cursor));
        items[cursor].scrollIntoView({ block: "nearest" });
        break;
      case "ArrowUp":
        e.preventDefault();
        cursor = (cursor - 1 + items.length) % items.length;
        items.forEach((el, i) => el.classList.toggle("is-active", i === cursor));
        items[cursor].scrollIntoView({ block: "nearest" });
        break;
      case "Enter":
        e.preventDefault();
        if (cursor >= 0) items[cursor].click();
        else items[0]?.click();
        break;
      case "Escape":
        results.hidden = true;
        cursor = -1;
        break;
    }
  });

  document.addEventListener("click", (e) => {
    if (!results.contains(e.target) && e.target !== input) {
      results.hidden = true;
    }
  });
})();
