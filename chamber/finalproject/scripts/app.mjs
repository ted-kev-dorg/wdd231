// app.mjs - shared site chrome behavior: hamburger nav + footer dates
export function initNav() {
  const navButton = document.querySelector('#nav-button');
  const navBar = document.querySelector('#nav-bar');

  if (!navButton || !navBar) return;

  navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
  });
}

export function initFooterDates() {
  const yearSpan = document.querySelector('#current-year');
  const modifiedSpan = document.querySelector('#last-modified');

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  if (modifiedSpan) {
    modifiedSpan.textContent = `Last Modified: ${document.lastModified}`;
  }
}

initNav();
initFooterDates();
