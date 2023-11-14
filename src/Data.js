import React, { useEffect } from 'react';
import axios from 'axios';
import './Data.css';

function Data() {
  var data = [];

  const loadDataFromTable = () => {
    axios
      .get('http://172.17.29.171:5000/api/temperature')
      .then((response) => {
        if (response.status === 200) {
          const tempData = response.data;
          data = tempData;
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
          <div>
            <li>
              {/* Enter Table Data Here */}
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Data;
