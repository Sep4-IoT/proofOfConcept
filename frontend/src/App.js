import React, { useState, useEffect } from 'react';

function GreenHouseDetails() {
const [greenhouse, setgreenhouse] = useState([]);

 useEffect(() => {
  fetch('https://javierperalta.dk/greenhouse.json')
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
          window: greenhouseData.window
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
        <p>{greenhouse.window}</p>
      </div>
    ))}
  </div>
);
}

export default GreenHouseDetails;