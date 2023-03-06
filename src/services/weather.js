const APPID = 'fe45a7c6ad0948be418a88f00ba462af'

export const getWeather = async (pais, ciudad) => {
  const res = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${APPID}`)
  const data = await res.json()
  return data
}
