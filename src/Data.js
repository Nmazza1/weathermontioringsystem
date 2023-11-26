import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Data.css';

function Data() {
  const [data, setData] = useState([]);

  const loadDataFromTable = () => {
    axios
      .get('http://172.17.29.171:5000/api/temperature')
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
          console.log(response);
        }
      })
      .catch((error) => {});
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
                <th>Time</th>
                <th>Temperature</th>
                <th>Humidity</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>{item.temperature}</td>
                  <td>{item.humidity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; BMV IOT2, 2023</p>
      </footer>
    </div>
  );
}

export default Data;