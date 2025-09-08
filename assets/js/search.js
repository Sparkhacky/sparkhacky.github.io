window.siteIndex = null;
window.siteDocs = [];

async function loadIndex(){
  if(window.siteIndex) return;
  const res = await fetch('/search.json');
  const data = await res.json();
  window.siteDocs = data;
  if(typeof lunr === 'undefined'){
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/lunr/lunr.min.js';
    await new Promise(r=>{ s.onload=r; document.head.appendChild(s); });
  }
  window.siteIndex = lunr(function(){
    this.ref('url');
    this.field('title'); this.field('content'); this.field('tags'); this.field('type');
    data.forEach(d => this.add(d));
  });
}

window.siteSearch = async function(q){
  const box = document.getElementById('search-results');
  if(!q){ box.style.display='none'; box.innerHTML=''; return; }
  await loadIndex();
  const results = window.siteIndex.search(q);
  box.style.display='block';
  box.innerHTML = results.slice(0,10).map(r=>{
    const doc = window.siteDocs.find(d=>d.url===r.ref);
    return `<a class="search-item" href="${doc.url}">
      <strong>${doc.title}</strong><br><small>${doc.type} · ${(doc.date||'').slice(0,10)}</small>
    </a>`;
  }).join('') || '<div class="search-item">Sin resultados</div>';
}
