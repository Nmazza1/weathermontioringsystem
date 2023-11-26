import React, { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  
  var data = [];

  
  const [temperature, setTemperature] = useState(20);
  const [humidity, setHumidity] = useState(50);

  const handleTemperatureChange = (event) => {
    const newTemperature = parseInt(event.target.value);
    setTemperature(newTemperature);
  };

  const handleHumidityChange = (event) => {
    const newHumidity = parseInt(event.target.value);
    setHumidity(newHumidity);
  };

  const loadDataFromTable =  () => {

    axios
      .get('http://127.0.0.1:5000/api/temperature')
      .then((response) => {
        if (response.status == 200) {

          const tempData = response.data;
          data = tempData;
        
          console.log(response);
        }
      })
      .catch((error) => {
      })
  }

  useEffect(()=>{
    console.log("Promise is being made")
    loadDataFromTable();
  },[])

  let temperatureEmoji, humidityEmoji;

  if (temperature > 24) {
    temperatureEmoji = '🔥'; // Too hot
  } else if (temperature < 18) {
    temperatureEmoji = '❄️'; // Too cold
  } else {
    temperatureEmoji = '🌱'; // Ideal temperature for a plant
  }

  if (humidity > 60) {
    humidityEmoji = '💧'; // Too humid
  } else if (humidity < 40) {
    humidityEmoji = '🏜️'; // Too dry
  } else {
    humidityEmoji = '🌱'; // Ideal humidity for a plant
  }

  const emojiStyle = {
    fontSize: '2em', // Adjust the font size here for larger emojis
  };

  return (
    <div className="App">
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/data">Data</a></li>
        </ul>
      </nav>

      <h1>Weather Monitoring System</h1>
      <div className="container">
        <h2>Weather</h2>
        <div className="weather-info">
          <div className="weather-entry">
            <span>Temperature: {temperature}°C</span>
            <span style={emojiStyle} role="img" aria-label="Emoji">
              {temperatureEmoji}
            </span>
          </div>
          <div className="weather-entry">
            <span>Humidity: {humidity}%</span>
            <span style={emojiStyle} role="img" aria-label="Emoji">
              {humidityEmoji}
            </span>
          </div>
        </div>

        {/* Input fields and buttons for temperature and humidity update */}
        <div className="input-container">
          <input
            type="number"
            value={temperature}
            onChange={handleTemperatureChange}
            placeholder="Temperature"
          />
          <input
            type="number"
            value={humidity}
            onChange={handleHumidityChange}
            placeholder="Humidity"
          />
        </div>
      </div>

      <footer className="footer">
        <p>&copy; BMV IOT2, 2023</p>
      </footer>
    </div>
  );
}

export default App;
