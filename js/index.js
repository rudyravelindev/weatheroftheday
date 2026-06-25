const API_KEY = 'Q9UJ5BRFLRUAW7G98F3XTAME3';
async function fetchWeather(location) {
  const requestUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${API_KEY}&contentType=json`;
  try {
    const response = await fetch(requestUrl, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const weatherData = await response.json();

    return weatherData;
  } catch (error) {
    console.error('Fetch error:', error);

    return null;
  }
}

let lastWeatherData = null;
let currentUnit = 'C';

async function handleSearch(location) {
  const data = await fetchWeather(location);

  if (!data) {
    console.log('Show error to user: Could not fetch weather.');
    weatherResults.innerHTML = `<p>Could not find that location. Try again.</p>`;

    return;
  }

  console.log('Success! Data received:', data);
  const processed = processWeatherData(data);
  lastWeatherData = processed;
  console.log('Processed:', processed);
  renderWeather(processed);
}

//Raw Data
function processWeatherData(rawData) {
  const tempC = rawData.currentConditions.temp;

  return {
    location: rawData.resolvedAddress,
    tempC: Math.round(tempC),
    tempF: Math.round((tempC * 9) / 5 + 32),
    condition: rawData.currentConditions.conditions,
    icon: rawData.currentConditions.icon,
  };
}

const weatherForm = document.querySelector('form');
const locationInput = document.getElementById('location-input');
const weatherResults = document.getElementById('weather-results');

weatherForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const cityName = locationInput.value;
  handleSearch(cityName);
  console.log('Form submitted! Searching weather for:', cityName);
});

function renderWeather(processed) {
  let displayTemp;
  let displayUnit;

  if (currentUnit === 'C') {
    displayTemp = processed.tempC;
    displayUnit = 'C';
  } else {
    displayTemp = processed.tempF;
    displayUnit = 'F';
  }

  weatherResults.innerHTML = `
    <h2>${processed.location}</h2>
<p>${displayTemp}°${displayUnit}</p>    <p>${processed.condition}</p>
  `;
}

const unitToggle = document.getElementById('unit-toggle');

unitToggle.addEventListener('click', function () {
  if (currentUnit === 'C') {
    currentUnit = 'F';
  } else {
    currentUnit = 'C';
  }
  if (lastWeatherData) {
    renderWeather(lastWeatherData);
  }
});
