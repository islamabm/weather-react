import React, { useState } from 'react'
import { aiService } from '../services/ai.service'
import { useSelector } from 'react-redux'
export function GetGptAdvice({ closeGptModal }) {
  const [inputValue, setInputValue] = useState('')
  const [gptRes, setGptRes] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const theWeather = useSelector(
    (storeState) => storeState.weatherModule.currWeather
  )

  function handleChange(e) {
    setInputValue(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await aiService.askChatGpt(
        inputValue,
        'advice-giver',
        theWeather.temp_c
      )
      setGptRes(res)
    } catch (error) {
      console.error('Error getting advice:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <div className="backdrop">
        <div className="modal">
          <h1 className="chat-gpt-title">Get chat gpt advice</h1>
          <button className="closeBtn" onClick={closeGptModal}>
            X
          </button>
          <form onSubmit={handleSubmit}>
            <input
              placeholder="ask gpt for advice"
              type="text"
              id="gptInput"
              name="gptInput"
              value={inputValue}
              onChange={handleChange}
            />
            <button class="btn-generate" type="submit">
              <span>Get advice</span>
            </button>
            {isLoading && <div className="loader"></div>}
            {gptRes && <p className="gpt-res">{gptRes}</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
