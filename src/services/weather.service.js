import { httpService } from './http.service.js'
export const weatherService = {
  check,
  getW,
}

async function check(cityName, countryName) {
  const res = await httpService.post('check', { cityName, countryName })
  return res
}
function getW(cityName, countryName) {
  const weather = httpService.post('weather', {
    cityName,
    countryName,
  })
  console.log(weather)
  return weather
}
