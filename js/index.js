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
async function handleSearch(location) {
  const data = await fetchWeather(location);

  // if (!data) {
  //   console.log('Show error to user: Could not fetch weather.');
  //   return;
  // }

  console.log('Success! Data received:', data);
  const processed = processWeatherData(data);
  console.log('Processed:', processed);
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

weatherForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const cityName = locationInput.value;
  handleSearch(cityName);
  console.log('Form submitted! Searching weather for:', cityName);
});
