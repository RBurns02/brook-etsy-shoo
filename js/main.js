/* =========================================
   Brook's Designs — Main JS
   ========================================= */

// Sticky header
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Mobile nav toggle
const hamburger = document.getElementById('hamburger');
const nav       = document.getElementById('main-nav');
let overlay;

function openNav() {
  nav.classList.add('open');
  overlay.classList.add('show');
  hamburger.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  nav.classList.remove('open');
  overlay.classList.remove('show');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  overlay = document.createElement('div');
  overlay.className = 'nav-overlay';
  document.body.appendChild(overlay);
  overlay.addEventListener('click', closeNav);

  hamburger.addEventListener('click', () => {
    nav.classList.contains('open') ? closeNav() : openNav();
  });

  // Close nav on link click
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeNav));

  // Scroll-triggered fade-ins
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    '.category-card, .product-card, .step, .testimonial, .about-inner > *'
  ).forEach((el, i) => {
    el.classList.add('fade-in');
    el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    observer.observe(el);
  });
});
