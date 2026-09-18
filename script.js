const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  nav.style.display = open ? '' : 'flex';
  nav.style.position = open ? '' : 'absolute';
  nav.style.top = open ? '' : '72px';
  nav.style.right = open ? '' : '20px';
  nav.style.flexDirection = open ? '' : 'column';
  nav.style.background = open ? '' : 'var(--paper)';
  nav.style.padding = open ? '' : '18px 24px';
  nav.style.boxShadow = open ? '' : '0 10px 25px #31453c18';
});

document.querySelector('#contact-form')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = event.currentTarget.querySelector('.form-message');
  message.textContent = 'Thanks — we’ll be in touch within one working day.';
  event.currentTarget.reset();
});
