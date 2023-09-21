import { weatherService } from '../../services/weather.service'
import { SET_WEATHER } from '../reducers/weather.reducer'

export function getWeather(cityName, countryName) {
  return async (dispatch) => {
    try {
      const weather = await weatherService.getW(cityName, countryName)
      const action = { type: SET_WEATHER, weather }
      dispatch(action)
    } catch (error) {
      console.log('error:', error)
    }
  }
}
