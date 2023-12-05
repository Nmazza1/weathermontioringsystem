import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [temperature, setTemperature] = useState(20);
  const [humidity, setHumidity] = useState(50);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === 'admin' && password === 'admin') {
      setIsLoggedIn(true);
    }
  };

  const handleTemperatureChange = (event) => {
    setTemperature(parseInt(event.target.value, 10));
  };

  const handleHumidityChange = (event) => {
    setHumidity(parseInt(event.target.value, 10));
  };

const loadDataFromTable = () => {
  axios
    .get('http://127.0.0.1:5000/api/temperature')
    .then((response) => {
      if (response.status === 200) {
        // Parse the string into JSON
        const jsonData = JSON.parse(response.data);
        console.log("Fetched Data:", jsonData); // Log the fetched data

        if (Array.isArray(jsonData) && jsonData.length > 0) {
          const mostRecentData = jsonData[jsonData.length - 1];
          console.log("Most Recent Data:", mostRecentData); // Log the most recent data

          setTemperature(mostRecentData.temp);
          setHumidity(mostRecentData.humidity);
        } else {
          console.error("Data is not an array or is empty");
        }
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
};




  useEffect(() => {
    loadDataFromTable();
  }, []);

  if (!isLoggedIn) {
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }

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
