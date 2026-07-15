
const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

// Fetch the data from the source URL
async function getProphetData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    
    // Send the array of prophets directly to the display function
    displayProphets(data.prophets); 
  } catch (error) {
    console.error("Failed to fetch prophet data:", error);
  }
}

// Define the function to build the cards dynamically
const displayProphets = (prophets) => {
  prophets.forEach((prophet) => {
    // Create elements to build the card
    let card = document.createElement('section');
    let fullName = document.createElement('h2');
    let birthDate = document.createElement('p');
    let birthPlace = document.createElement('p');
    let portrait = document.createElement('img');

    // Build the <h2> text showing the prophet's full name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`;

    // Add birth details as requested in instructions
    birthDate.innerHTML = `<strong>Date of Birth:</strong> ${prophet.birthdate}`;
    birthPlace.innerHTML = `<strong>Place of Birth:</strong> ${prophet.birthplace}`;

    // Build the image portrait by setting all relevant attributes
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`);
    portrait.setAttribute('loading', 'lazy'); // Optimizes page loading
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Append the individual elements to the card (section)
    card.appendChild(fullName);
    card.appendChild(birthDate);
    card.appendChild(birthPlace);
    card.appendChild(portrait);

    // Append the completed card to the grid container
    cards.appendChild(card);
  });
};

// Finally
getProphetData();