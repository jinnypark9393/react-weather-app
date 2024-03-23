import React from 'react'
import { Button } from 'react-bootstrap';

const WeatherButton = ({cities}) => {
  console.log(cities)
  return (
    <div>
        <Button as="a" variant="primary">Current Location</Button>
        {cities.map((item) => (
          <Button variant='primary'>{item}</Button>
        ))}
    </div>
  )
}

export default WeatherButton