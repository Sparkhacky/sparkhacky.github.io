function toggleMenu(btn){
  const menu = document.getElementById('menu');
  const open = menu.classList.toggle('open');
  btn.setAttribute('aria-expanded', open ? 'true' : 'false');
}
