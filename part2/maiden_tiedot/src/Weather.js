import { useState, useEffect } from "react";

const Weather = ({city}) => {
  const [weatherInfo, setWeatherInfo] = useState({});

  const getIconUrl = (iconCode) => `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const apiKey = process.env.REACT_APP_API_KEY;
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    fetch(weatherUrl)
      .then((response) => response.json())
      .then((data) => setWeatherInfo(data));
  }, [weatherUrl]);
  
  return (
    <div>
      <h1>Weather in {city}</h1>
      <div>Temperature: {weatherInfo.main ? weatherInfo.main.temp  : ''} celcius</div>
      <img src={getIconUrl(weatherInfo.main ? weatherInfo.weather[0].icon : '')} alt={'Weather icon'} />
      <div>Wind: {weatherInfo.main ? weatherInfo.wind.speed : ''} m/s</div>
    </div>
  )
}

export default Weather;