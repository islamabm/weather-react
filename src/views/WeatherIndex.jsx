import { useState, useEffect } from 'react'
import { weatherService } from '../services/weather.service'
import { useDispatch, useSelector } from 'react-redux'
import { getWeather } from '../store/actions/weather.actions'
import { GetGptAdvice } from '../cmps/GetGptAdvice'
import { countriesService } from '../services/countries.service'
import Confetti from 'react-dom-confetti'
export function WeatherIndex() {
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [showChatGptModal, setShowChatGptModal] = useState(false)
  const [countries, setCountries] = useState([])

  const [confetti, setConfetti] = useState(false)

  const confettiConfig = {
    angle: 90,
    spread: 360,
    startVelocity: 20,
    elementCount: 70,
    dragFriction: 0.12,
    duration: 3000,
    stagger: 3,
    width: '10px',
    height: '10px',
    perspective: '500px',
    colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a'],
  }

  const theWeather = useSelector(
    (storeState) => storeState.weatherModule.currWeather
  )

  const dispatch = useDispatch()

  useEffect(() => {
    setCountries(countriesService.getCountries())
  }, [])

  async function handleGetWeather(event) {
    event.preventDefault()
    setConfetti(true)
    try {
      console.log('country', country)
      const res = await weatherService.check(city, country)
      if (res.exists && res.isSameDay) {
        console.log('same day')
        return
      }
      if (res.exists && !res.isSameDay) {
        console.log('only update')
        return
      }
      dispatch(getWeather(city, country))
      console.log('theWeather', theWeather)
      console.log('get the weather and add to data base')
    } catch (error) {
      console.error('Failed to check city', error)
    }
  }

  function handleShowChatGptModal() {
    setShowChatGptModal(true)
  }

  function handleCloseGptModal() {
    setShowChatGptModal(false)
  }

  useEffect(() => {
    if (confetti) {
      const timer = setTimeout(() => setConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [confetti])

  return (
    <section className="weather-index">
      <h1 className="neon-effect" onClick={handleShowChatGptModal}>
        {' '}
        Click Here to Try Our New AI-Powered Feature!
      </h1>
      <form onSubmit={handleGetWeather} className="formWrapper">
        <div className="formGroup">
          <label>
            City:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="formGroup">
          <label>
            Country:
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a country
              </option>
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button type="submit">
          Get weather
          <Confetti active={confetti} config={confettiConfig} />
        </button>
        {theWeather && (
          <div className="weatherData">
            <p>Temperature: {theWeather.temp_c} °C</p>
          </div>
        )}
      </form>

      {showChatGptModal && <GetGptAdvice closeGptModal={handleCloseGptModal} />}
    </section>
  )
}
