const axios = require('axios');
require('dotenv').config();
const weatherService = require('./services/weather.service');
const csvService = require('./services/csv.service');

const cities = ['jerusalem', 'new york', 'dubai', 'lisbon', 'oslo', 'paris', 'berlin', 'athens', 'seoul', 'singapore'];

function getWeatherForecast() {
  const { API_KEY } = process.env;
  const BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast';

  const weatherForecastsPrms = cities.map((city) => axios
    .get(`${BASE_URL}?q=${city}&units=metric&appid=${API_KEY}`)
    .then((res) => {
      const data = res.data.list;
      const cityWeatherByDate = data.map(weatherService.getCityWeatherByDay);
      const cityWeatherMaxMin = weatherService.getCityTempMaxMin(cityWeatherByDate);
      return { city, cityWeatherMaxMin };
    })
    .catch((err) => {
      console.log(err);
    }));
  Promise.all(weatherForecastsPrms).then((citiesForcast) => {
    const dayWeatherMaxMin = weatherService.getDayWeatherMaxMin(citiesForcast);
    const days = Object.keys(dayWeatherMaxMin).sort();
    days.pop();
    let csvStr = 'Day,MaxTemp,MinTemp,CitiesWithRain\r\n';

    days.forEach((day) => {
      csvStr += `${day},${dayWeatherMaxMin[day].maxTempCity.city},${dayWeatherMaxMin[day].minTempCity.city},"${dayWeatherMaxMin[day].citiesWithRain.join(',')}"\r\n`;
    });
    csvService.writeToCsv(csvStr);
  });
}

getWeatherForecast();
console.log('changes in dev branch');
console.log('deleted change from branch1');
