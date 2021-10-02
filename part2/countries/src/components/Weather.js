import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({ temperature: null, weather_icons: null, wind_speed: null, wind_dir: null })

  const params = {
    access_key: process.env.REACT_APP_API_KEY,
    query: country.capital[0]
  }

  useEffect(() => {
    axios
      .get("http://api.weatherstack.com/current", { params })
      .then(response => {
        setWeather({
          ...weather, temperature: response.data.current.temperature,
          weather_icons: response.data.current.weather_icons,
          wind_speed: response.data.current.wind_speed,
          wind_dir: response.data.current.wind_dir
        })
      })
  }, [])

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p><b>Temperature:</b> {weather.temperature} °C</p>
      <img src={weather.weather_icons} alt="weather" />
      <p><b>Wind:</b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
    </div>
  )
}

export default Weather
