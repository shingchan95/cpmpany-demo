const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const isMobile = () => window.matchMedia('(max-width: 760px)').matches;
const setMenuIcon = (open) => {
  const icon = menuToggle?.querySelector('span');
  if (icon) icon.textContent = open ? '×' : '☰';
};
const syncMenuAccessibility = () => {
  if (!nav || !menuToggle) return;
  if (isMobile()) {
    nav.setAttribute('aria-hidden', menuToggle.getAttribute('aria-expanded') !== 'true' ? 'true' : 'false');
  } else {
    nav.removeAttribute('aria-hidden');
    nav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
    setMenuIcon(false);
  }
};
const closeMenu = () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open menu');
  setMenuIcon(false);
  nav?.classList.remove('is-open');
  syncMenuAccessibility();
};

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  menuToggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  setMenuIcon(!open);
  nav.classList.toggle('is-open', !open);
  if (!open) {
    nav.setAttribute('aria-hidden', 'false');
    nav.querySelector('a')?.focus();
  }
});

// Keep the collapsed mobile navigation out of the accessibility tree until opened.
syncMenuAccessibility();
window.addEventListener('resize', syncMenuAccessibility);

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  closeMenu();
}));

document.addEventListener('click', (event) => {
  if (!nav?.classList.contains('is-open')) return;
  if (!nav.contains(event.target) && !menuToggle?.contains(event.target)) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && nav?.classList.contains('is-open')) {
    closeMenu();
    menuToggle?.focus();
  }
});

document.querySelector('#contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = event.currentTarget.querySelector('.form-message');
  message.textContent = 'Thanks — your message has been received in this demo.';
  event.currentTarget.reset();
});
