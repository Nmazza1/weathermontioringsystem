import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Data.css';

function Data() {
  const [data, setData] = useState([]);

  const loadDataFromTable = () => {
    axios
      .get('http://127.0.0.1:5000/api/temperature')
      .then((response) => {
        if (response.status === 200) {
          const jsonData = JSON.parse(response.data);
          console.log(jsonData); // Log the parsed data
          setData(jsonData);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    console.log('Promise is being made');
    loadDataFromTable();
  }, []);

  return (
    <div className="Data">
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/data">Data</a>
          </li>
        </ul>
      </nav>

      <h1>Weather Monitoring System</h1>
      <div className="container">
        <h2>Weather Data</h2>
        <div className="weather-info">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Temperature</th>
                <th>Humidity</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(data) && data.map((item, index) => (
                <tr key={index}>
                  <td>{item.timestamp}</td>
                  <td>{item.temp}°C</td>
                  <td>{item.humidity}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/*<footer className="footer">*/}
      {/*  <p>&copy; BMV IOT2, 2023</p>*/}
      {/*</footer>*/}
    </div>
  );
}

export default Data;