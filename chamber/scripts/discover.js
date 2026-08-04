import { attractions } from '../data/discover.mjs';

document.addEventListener('DOMContentLoaded', () => {
    handleVisitCounter();
    renderAttractionCards();
});

/**
 * Handles localStorage calculation for page visits
 */
function handleVisitCounter() {
    const messageContainer = document.getElementById('visit-message');
    if (!messageContainer) return;

    const lastVisitKey = 'chamber-last-visit';
    const currentMs = Date.now();
    const lastVisitMs = localStorage.getItem(lastVisitKey);

    if (!lastVisitMs) {
        // First Visit
        messageContainer.textContent = "Welcome! Let us know if you have any questions.";
    } else {
        const timeDifferenceMs = currentMs - parseInt(lastVisitMs, 10);
        const msInDay = 1000 * 60 * 60 * 24;
        const daysBetween = Math.floor(timeDifferenceMs / msInDay);

        if (daysBetween < 1) {
            messageContainer.textContent = "Back so soon! Awesome!";
        } else if (daysBetween === 1) {
            messageContainer.textContent = "You last visited 1 day ago.";
        } else {
            messageContainer.textContent = `You last visited ${daysBetween} days ago.`;
        }
    }

    // Store current visit date in localStorage
    localStorage.setItem(lastVisitKey, currentMs.toString());
}

/**
 * Dynamically renders 8 attraction cards built with correct semantic markup
 */
function renderAttractionCards() {
    // 1. Get reference to the container element
    const gridContainer = document.getElementById('discover-grid');
    if (!gridContainer) return;

    // 2. Clear out existing static content
    gridContainer.innerHTML = '';

    // 3. Loop through imported items
    attractions.forEach((item, index) => {
        const card = document.createElement('article');
        card.className = 'discover-card';
        card.id = item.id;

        // Do NOT lazy load the first 2 images that appear above the fold
        const loadingStrategy = index < 2 ? 'eager' : 'lazy';

        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="${item.image}" alt="${item.alt}" width="300" height="200" loading="${loadingStrategy}">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button type="button" class="learn-more-btn">Learn More</button>
        `;

        gridContainer.appendChild(card);
    });
}