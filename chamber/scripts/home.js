// OpenWeatherMap API & Member Spotlight Configuration
const apiKey = "256c6be0a8bc24a3b6617ec405d3fa03"; 
const lat = "5.3599"; 
const lon = "-4.0083"; 

const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const membersUrl = "data/members.json";

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Footer Metadata
    const currentYearEl = document.getElementById('current-year');
    const lastModifiedEl = document.getElementById('last-modified');
    if (currentYearEl) currentYearEl.textContent = new Date().getFullYear();
    if (lastModifiedEl) lastModifiedEl.textContent = `Last Modification: ${document.lastModified}`;

    // 2. Execute Data Operations
    fetchCurrentWeather();
    fetchForecast();
    fetchSpotlights();
});

/* --- WEATHER API OPERATIONS --- */
async function fetchCurrentWeather() {
    try {
        const response = await fetch(weatherUrl);
        if (!response.ok) throw new Error(`Weather HTTP Error: ${response.status}`);
        const data = await response.json();

        // 1. Temperature & Description
        const temp = Math.round(data.main.temp);
        const desc = data.weather[0].description;
        
        document.getElementById('current-temp').textContent = temp;
        document.getElementById('weather-desc').textContent = desc;

        // 2. Dynamic Weather Icon Injection
        const iconCode = data.weather[0].icon; 
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.setAttribute('src', iconUrl);
        weatherIcon.setAttribute('alt', desc);

    } catch (error) {
        console.error("Error retrieving current weather:", error);
        document.getElementById('weather-desc').textContent = "Weather unavailable";
    }
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error(`Forecast HTTP Error: ${response.status}`);
        const data = await response.json();

        const forecastContainer = document.getElementById('forecast-container');
        forecastContainer.innerHTML = "";

        // OpenWeather forecast returns 3-hour intervals (8 intervals per day)
        const dailyForecasts = data.list.filter(item => item.dt_txt.includes("12:00:00")).slice(0, 3);

        dailyForecasts.forEach(forecast => {
            const date = new Date(forecast.dt * 1000);
            const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
            
            const card = document.createElement('div');
            card.className = "forecast-day";
            card.innerHTML = `
                <p class="day-name">${dayName}</p>
                <p class="day-temp">${Math.round(forecast.main.temp)}°C</p>
                <p class="day-desc">${forecast.weather[0].main}</p>
            `;
            forecastContainer.appendChild(card);
        });
    } catch (error) {
        console.error("Error retrieving forecast:", error);
    }
}

/* --- SPOTLIGHT DATA OPERATIONS --- */
async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);
        if (!response.ok) throw new Error(`Spotlight HTTP Error: ${response.status}`);
        const members = await response.json();

        // Filter strictly for Silver (2) and Gold (3) members
        const qualifiedMembers = members.filter(member => member.level === 2 || member.level === 3);

        // Randomize list using Fisher-Yates shuffle algorithm
        const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

        // Pick 2 or 3 spotlights
        const selectedSpotlights = shuffled.slice(0, 3);

        displaySpotlights(selectedSpotlights);
    } catch (error) {
        console.error("Error generating spotlights:", error);
    }
}

function displaySpotlights(spotlights) {
    const spotlightContainer = document.getElementById('spotlight-container');
    spotlightContainer.innerHTML = "";

    spotlights.forEach(member => {
        const levelLabel = member.level === 3 ? "Gold Member" : "Silver Member";
        const badgeClass = member.level === 3 ? "gold-badge" : "silver-badge";

        const card = document.createElement('section');
        card.className = "member-card spotlight-card";
        card.innerHTML = `
            <div class="spotlight-header">
                <h4>${member.name}</h4>
                <span class="badge ${badgeClass}">${levelLabel}</span>
            </div>
            <p class="tagline">${member.tagline}</p>
            <img src="images/${member.image}" alt="${member.name} logo" width="150" height="100" loading="lazy">
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><a href="${member.url}" target="_blank" rel="noopener">Visit Website</a></p>
        `;
        spotlightContainer.appendChild(card);
    });
}