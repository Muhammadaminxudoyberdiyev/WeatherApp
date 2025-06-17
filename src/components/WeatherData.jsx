import React, { useEffect, useState } from "react";

function WeatherData() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const KEY = import.meta.env.VITE_APP_WEATHER_KEY

  const fetchWeather = async () => {
    if (!city) {
      setError("Shahar nomini kiriting");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${KEY}`
      );
      if (!response.ok) {
        throw new Error("Shahar nomi topilmadi!");
      }
      const data = await response.json();
      setWeather(data);
      setError("");
      console.log(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  return (
    <div className="site_wrapper">
      <div className="container">
        <h1>Weather App</h1>
        <input
          type="text"
          placeholder="Shahar nomi"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Qidirish</button>
        {error && <p className="error">{error}</p>}
      </div>
      {weather && <div className="container2">
        {error && <p className="error">{error}</p>}

        <div className="weather-info">
          <div className="index_wrapper">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="icon"
                className="weather_icon"
              />
              <h2>
                {weather.name}, {weather.sys.country}
              </h2>
          </div>
          <div className="other">
              <p>Harorat: {Math.round(weather.main.temp)}°C</p>
              <p>Holat: {weather.weather[0].main}</p>
              {/* <p>Tavsif: {weather.weather[0].description}</p> */}
              <p>Namlik: {weather.main.humidity}%</p>
              <span>
                  <p>Shamol tezligi: {weather.wind.speed} m/s</p>
              </span>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default WeatherData;
