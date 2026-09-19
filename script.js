const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
const closeMenu = () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open menu');
  nav?.classList.remove('is-open');
};

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  menuToggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  nav.classList.toggle('is-open', !open);
});

nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  closeMenu();
}));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.querySelector('#contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = event.currentTarget.querySelector('.form-message');
  message.textContent = 'Thanks — we’ll be in touch within one working day.';
  event.currentTarget.reset();
});
