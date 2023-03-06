import { useState, useEffect } from 'react'
import { getWeather } from '../services/weather'

export function useWeather (pais, ciudad) {
  const [main, setMain] = useState()
  const [coord, setCoord] = useState()
  const [weather, setWeather] = useState()

  const getWeatherData = (pais, ciudad) => {
    getWeather(pais, ciudad).then(newWeather => {
      setMain(newWeather.main)
      setCoord(newWeather.coord)
      setWeather(newWeather.weather)
    })
  }

  useEffect(() => {
    getWeatherData(pais, ciudad)
  }, [])

  return { weather, coord, main, getWeatherData }
}
