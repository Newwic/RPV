document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');

  if (!toggle || !nav) return;

  const current = location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('a').forEach((link) => {
    const href = link.getAttribute('href') || '';
    const target = href.split('/').pop() || 'index.html';
    if (target === current || (current === '' && target === 'index.html')) {
      link.classList.add('active');
    }
  });

  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('active');
    toggle.setAttribute('aria-expanded', String(open));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
});
