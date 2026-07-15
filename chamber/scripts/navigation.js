// Clean toggle mechanism handling layout changes
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const primaryNav = document.getElementById('primary-nav');

    menuToggle.addEventListener('click', () => {
        primaryNav.classList.toggle('show');
        menuToggle.classList.toggle('open');
    });
});