import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

const API_KEY = "8bb11e864a47dfa3ad700abab4cc86cc"; 

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const getWeather = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            units: 'metric',
            appid: API_KEY,
          }
        }
      );
      setWeather(response.data);
    } catch {
      setError('City not found. Please try another city.');
      setWeather(null);
    }
  };

  return (
    <div className="weather-container">
      <form onSubmit={getWeather}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          className="city-input"
        />
        <button type="submit" className="search-btn">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <img
            alt="weather icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <p>{weather.weather[0].description}</p>
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p>
            Feels like: {Math.round(weather.main.feels_like)}°C
          </p>
          <p>
            Humidity: {weather.main.humidity}%
          </p>
        </div>
      )}
    </div>
  );
}

export default Weather;
