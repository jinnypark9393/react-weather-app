import React, { useState } from "react";
import { Button } from "react-bootstrap";

const WeatherButton = ({ cities, selectedCity, handleCityChange }) => {
  // console.log(cities)
  return (
    <div>
      <Button
        as="a"
        variant={`${selectedCity == "" ? "outline-primary" : "primary"}`}
        onClick={() => handleCityChange("current")}
      >
        Current Location
      </Button>
      {cities.map((city) => (
        <Button
          variant={`${selectedCity == city ? "outline-primary" : "primary"}`}
          onClick={() => handleCityChange(city)}
        >
          {city}
        </Button>
      ))}
    </div>
  );
};

export default WeatherButton;
