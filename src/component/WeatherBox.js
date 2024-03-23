import React from 'react'

const WeatherBox = ({weather}) => {
  //  ES6 Desctructuring = 키 값만 언급하면 가져올 수 있음
  console.log("weather: ", weather)

  return (
    <div className='weather-box'>
        <div>{weather?.name}</div>
        <h2>{weather?.main.temp}°C / {Math.ceil((weather?.main.temp)*1.8+32)}°F</h2>
        <h4>{weather?.weather[0].description}</h4>
    </div>
  )
}

export default WeatherBox