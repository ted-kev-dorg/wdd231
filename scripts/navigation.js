document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const primaryNav = document.getElementById('primary-nav');

    menuToggle.addEventListener('click', () => {
        primaryNav.classList.toggle('show');
        // Toggle an open class on the button to make CSS styling straightforward
        menuToggle.classList.toggle('open');
    });
});