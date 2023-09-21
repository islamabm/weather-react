export const SET_WEATHER = 'SET_WEATHER'

const INITIAL_STATE = {
  currWeather: '',
}

export function weatherReducer(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case SET_WEATHER:
      return {
        ...state,
        currWeather: action.weather,
      }
    default:
      return state
  }
}
