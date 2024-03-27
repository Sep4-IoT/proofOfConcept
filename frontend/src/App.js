import React, { useState, useEffect } from 'react';

function GreenHouseDetails() {
const [greenhouse, setgreenhouse] = useState([]);

 useEffect(() => {
  fetch('#')
  .then(response => response.json())
      .then(data => {
        return Promise.all(data.results.map(greenhouse => 
          fetch(greenhouse.url)
          .then(response => response.json())
          ))
      })
      .then(greenhouseDataArray => {
        const greenhouseDetails = greenhouseDataArray.map( greenhouseData => ({
          name: greenhouseData.name,
          id: greenhouseData.id,
          description: greenhouseData.description,
          window: greenhouseData.window,
          temperature: greenhouseData.temperature,
          humidity: greenhouseData.humidity,
          co2: greenhouseData.co2,
          light: greenhouseData.light,
          plants: greenhouseData.plants,
        }));
        setgreenhouse(greenhouseDetails);
      })
      .catch(error => {
        console.error("There was a problem with your fetch operation", error);
      });
 }, []);

return (
  <div id='paginator'>
    {greenhouse.map((greenhouse, index) => (
      <div key={index}>
        <p>{greenhouse.name}</p>
        <p>{greenhouse.id}</p>
        <p>{greenhouse.description}</p>
        <p>{greenhouse.window}</p>
        <p>{greenhouse.temperature}</p>
        <p>{greenhouse.humidity}</p>
        <p>{greenhouse.co2}</p>
        <p>{greenhouse.light}</p>
        <p>{greenhouse.plants}</p>
      </div>
    ))}
  </div>
);
}

export default GreenHouseDetails;