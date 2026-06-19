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
async function handleSearch() {
  const data = await fetchWeather('kkkkkfffhhhhf');

  if (!data) {
    console.log('Show error to user: Could not fetch weather.');
    return;
  }

  console.log('Success! Data received:', data);
}
handleSearch();
