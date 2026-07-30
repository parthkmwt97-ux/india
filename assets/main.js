// ===== Mobile nav toggle =====
(function(){
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.topnav nav');
  if(!toggle || !nav) return;
  toggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));
})();

// ===== Scroll progress bar =====
(function(){
  const bar = document.querySelector('.progress-bar');
  if(!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = scrolled + '%';
  });
})();

// ===== Reveal on scroll =====
(function(){
  const els = document.querySelectorAll('.reveal');
  if(!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, {threshold:0.12});
  els.forEach(el => io.observe(el));
})();

// ===== Case study tag filter (work.html) =====
(function(){
  const bar = document.querySelector('.filter-bar');
  const cards = document.querySelectorAll('[data-tags]');
  if(!bar || !cards.length) return;
  bar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-tag');
    if(!btn) return;
    bar.querySelectorAll('.filter-tag').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    cards.forEach(card => {
      const tags = card.dataset.tags.split(',');
      const show = filter === 'all' || tags.includes(filter);
      card.classList.toggle('dimmed', !show);
    });
  });
})();

// ===== 3D avatar tilt =====
(function(){
  const stage = document.querySelector('.avatar-stage');
  const card = document.querySelector('.avatar-3d');
  if(!stage || !card) return;
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(!window.matchMedia('(pointer:fine)').matches) return;
  stage.addEventListener('mousemove', (e) => {
    const r = stage.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform = `rotateY(${px*22}deg) rotateX(${-py*22}deg)`;
  });
  stage.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateY(0deg) rotateX(0deg)';
  });
})();

// ===== Before/after compare slider =====
(function(){
  const wrap = document.getElementById('msCompare');
  const after = document.getElementById('msCompareAfter');
  if(!wrap || !after) return;
  function setWidth(){
    wrap.style.setProperty('--compare-w', wrap.getBoundingClientRect().width + 'px');
  }
  function setSplit(clientX){
    const r = wrap.getBoundingClientRect();
    let pct = ((clientX - r.left) / r.width) * 100;
    pct = Math.max(4, Math.min(96, pct));
    after.style.width = pct + '%';
    wrap.querySelector('.compare-handle').style.left = pct + '%';
  }
  setWidth();
  window.addEventListener('resize', setWidth);
  let dragging = false;
  wrap.addEventListener('pointerdown', e => { dragging = true; setSplit(e.clientX); });
  window.addEventListener('pointermove', e => { if(dragging) setSplit(e.clientX); });
  window.addEventListener('pointerup', () => dragging = false);
  wrap.addEventListener('touchmove', e => { if(e.touches[0]) setSplit(e.touches[0].clientX); }, {passive:true});
})();
