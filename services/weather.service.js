function getCityWeatherByDay(d) {
  return {
    date: d.dt_txt,
    maxTemp: d.main.temp_max,
    minTemp: d.main.temp_min,
    isRain: isRain(d.weather[0].main),
  }
}

function getCityTempMaxMin(cityWeatherByDate) {
  return cityWeatherByDate.reduce((acc, cw) => {
    const key = cw.date.substring(8, 10)
    if (!acc[key]) {
      acc[key] = cw
    } else {
      if (acc[key].maxTemp < cw.maxTemp) acc[key].maxTemp = cw.maxTemp
      if (acc[key].minTemp > cw.minTemp) acc[key].minTemp = cw.minTemp
    }
    return acc
  }, {})
}
function getDayWeatherMaxMin(citiesForcast) {
  return citiesForcast.reduce((acc, cf) => {
    for (day in cf.cityWeatherMaxMin) {
      if (!acc[day]) {
        acc[day] = {
          maxTempCity: { city: cf.city, maxTemp: cf.cityWeatherMaxMin[day].maxTemp },
          minTempCity: { city: cf.city, minTemp: cf.cityWeatherMaxMin[day].minTemp },
          citiesWithRain: [],
        }
      } else {
        if (acc[day].maxTempCity.maxTemp < cf.cityWeatherMaxMin[day].maxTemp) {
          acc[day].maxTempCity.maxTemp = cf.cityWeatherMaxMin[day].maxTemp
          acc[day].maxTempCity.city = cf.city
        }
        if (acc[day].minTempCity.minTemp > cf.cityWeatherMaxMin[day].minTemp) {
          acc[day].minTempCity.minTemp = cf.cityWeatherMaxMin[day].minTemp
          acc[day].minTempCity.city = cf.city
        }
      }
      if (cf.cityWeatherMaxMin[day].isRain) {
        acc[day].citiesWithRain.push(cf.city)
      }
    }
    return acc
  }, {})
}
function isRain(weather) {
  return weather === 'Rain'
}

module.exports = {
  getCityWeatherByDay,
  getCityTempMaxMin,
  getDayWeatherMaxMin,
}
