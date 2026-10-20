/* =========================================
   Sweet Rayne Cottage — Main JS
   ========================================= */

// Sticky header
const header = document.getElementById('site-header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });
}

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('main-nav');
let overlay;

function openNav() {
  nav.classList.add('open');
  overlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeNav() {
  nav.classList.remove('open');
  overlay.classList.remove('show');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  if (hamburger && nav) {
    overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);
    overlay.addEventListener('click', closeNav);
    hamburger.addEventListener('click', () => nav.classList.contains('open') ? closeNav() : openNav());
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));
  }

  // Scroll fade-ins
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.category-card, .step').forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 4) * 0.07}s`;
    observer.observe(el);
  });
});
