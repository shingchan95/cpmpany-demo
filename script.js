const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const isMobile = () => window.matchMedia('(max-width: 760px)').matches;
const closeMenu = () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open menu');
  nav?.classList.remove('is-open');
  if (isMobile()) nav?.setAttribute('aria-hidden', 'true');
  else nav?.removeAttribute('aria-hidden');
};

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  menuToggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  nav.classList.toggle('is-open', !open);
  if (open) {
    if (isMobile()) nav.setAttribute('aria-hidden', 'true');
    else nav.removeAttribute('aria-hidden');
  } else {
    nav.setAttribute('aria-hidden', 'false');
    nav.querySelector('a')?.focus();
  }
});

// Keep the collapsed mobile navigation out of the accessibility tree until opened.
if (nav && menuToggle && isMobile()) {
  nav.setAttribute('aria-hidden', 'true');
}

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  closeMenu();
}));

document.addEventListener('click', (event) => {
  if (!nav?.classList.contains('is-open')) return;
  if (!nav.contains(event.target) && !menuToggle?.contains(event.target)) closeMenu();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.querySelector('#contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = event.currentTarget.querySelector('.form-message');
  message.textContent = 'Thanks — we’ll be in touch within one working day.';
  event.currentTarget.reset();
});
