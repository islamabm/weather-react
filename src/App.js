import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import './assets/scss/global.scss'

import { WeatherIndex } from './views/WeatherIndex'

function App() {
  return (
    <Router>
      <section className="main-app">
        <main className="container">
          <Routes>
            <Route path="/" element={<WeatherIndex />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}

export default App
