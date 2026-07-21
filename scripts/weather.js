const currentTemp = document.querySelector('#current-temp');
const weatherIcone = document.querySelector('#weather-icon');
const captionDescription= document.querySelector('figcaption');
const myTown = document.querySelector('#my-town');


const myKey = '256c6be0a8bc24a3b6617ec405d3fa03';
const myLat = "49.75";
const myLong = "6.64";


const url = `//api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}`;

// Grab current weather data
async function apiFetch() {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      console.log(data); // testing only
      // displayResults(data); // uncomment when ready
      displayResults(data);
    } else {
        throw Error(await response.text());
    }
  } catch (error) {
      console.log(error);
  }
}

apiFetch();

function displayResults(data) {
  // currentTemp.innerHTML = `${data._____}&deg;F`;
  // const iconsrc = `https://openweathermap.org/img/w/${______}.___`;
  // let desc = data.weather[0].______;
  // weatherIcon.setAttribute('___', _____);
  // weatherIcon.setAttribute('___', _____);
  // captionDesc.textContent = `${desc}`;
  console.log('hello');
  myTown.innerHTML = data.name;
  captionDescription.innerHTML = data.weather[0].description;
  temperature = data.main.temp;
  currentTemp.innerHTML = `${temperature}°F`;
  const icon = `https://openweathermap.org/payload/api/media/file/${data.weather[0].icon}.png`
  // const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  weatherIcone.setAttribute('src', icon);
  weatherIcone.setAttribute('alt', data.weather[0].description);

}  
  

