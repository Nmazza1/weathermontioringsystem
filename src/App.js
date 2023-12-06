import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [temperature, setTemperature] = useState(20);
  const [humidity, setHumidity] = useState(50);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRegister = (event) => {
  event.preventDefault();
  axios.post('http://127.0.0.1:5000/api/user', {
    username: registerUsername,
    password: registerPassword
  })
  .then(response => {
    if (response && response.data) {
      alert(response.data.message);
    }
  })
  .catch(error => {
    if (error.response && error.response.data) {
      alert(error.response.data.error);
    } else {
      console.error("An error occurred:", error);
    }
  });
};

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('http://127.0.0.1:5000/api/login', { username, password })
        .then(response => {
            alert(response.data.message);
            setIsLoggedIn(true);
        })
        .catch(error => alert(error.response.data.error));
};

  const loadDataFromServer = () => {
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
    loadDataFromServer();
  }, []);

  if (!isLoggedIn) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <input type="submit" value="Login" />
        </form>

        <form onSubmit={handleRegister}>
          <h2>Register</h2>
          <label>
            Username:
            <input type="text" value={registerUsername} onChange={e => setRegisterUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} />
          </label>
          <input type="submit" value="Register" />
        </form>
      </div>
    );
  }

  let temperatureEmoji = temperature > 24 ? '🔥' : temperature < 18 ? '❄️' : '🌱';
  let humidityEmoji = humidity > 60 ? '💧' : humidity < 40 ? '🏜️' : '🌱';

  const emojiStyle = {
    fontSize: '2em',
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
            <span style={emojiStyle}>{temperatureEmoji}</span>
          </div>
          <div className="weather-entry">
            <span>Humidity: {humidity}%</span>
            <span style={emojiStyle}>{humidityEmoji}</span>
          </div>
        </div>
      </div>
      <footer className="footer">
        <p>&copy; BMV IOT2, 2023</p>
      </footer>
    </div>
  );
}

export default App;
