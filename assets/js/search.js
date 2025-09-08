window.siteIndex = null;
window.siteDocs = [];

async function ensureLunr() {
  if (typeof lunr !== 'undefined') return;
  await new Promise(resolve => {
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/lunr/lunr.min.js';
    s.onload = resolve; s.onerror = resolve;
    document.head.appendChild(s);
  });
  if (typeof lunr === 'undefined') {
    await new Promise(resolve => {
      const s2 = document.createElement('script');
      s2.src = 'https://unpkg.com/lunr/lunr.min.js';
      s2.onload = resolve; s2.onerror = resolve;
      document.head.appendChild(s2);
    });
  }
}

async function loadIndex() {
  if (window.siteIndex) return;
  const res = await fetch('/search.json', { cache: 'no-store' }).catch(() => null);
  if (!res || !res.ok) { console.warn('No se pudo cargar /search.json'); window.siteDocs = []; return; }
  window.siteDocs = await res.json();
  await ensureLunr();
  if (typeof lunr === 'undefined') return;
  window.siteIndex = lunr(function(){
    this.ref('url'); this.field('title'); this.field('content'); this.field('tags'); this.field('type');
    window.siteDocs.forEach(d => this.add(d));
  });
}

window.siteSearch = async function(q){
  const box = document.getElementById('search-results');
  if(!box) return;
  if(!q){ box.style.display='none'; box.innerHTML=''; return; }
  await loadIndex();
  if(!window.siteIndex){ box.style.display='block'; box.innerHTML='<div class="search-item">El índice no está disponible</div>'; return; }
  const results = window.siteIndex.search(q);
  box.style.display='block';
  box.innerHTML = results.slice(0,10).map(r=>{
    const doc = window.siteDocs.find(d=>d.url===r.ref) || {};
    return `<a class="search-item" href="${doc.url||'#'}">
      <strong>${doc.title||'(Sin título)'}</strong><br>
      <small>${doc.type||''} · ${(doc.date||'').slice(0,10)}</small>
    </a>`;
  }).join('') || '<div class="search-item">Sin resultados</div>';
};

loadIndex();
