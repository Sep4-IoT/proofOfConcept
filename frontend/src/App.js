import React, { useState, useEffect } from 'react';

function GreenHouseDetails() {
  const [greenhouse, setGreenhouse] = useState(null); // Use null for initial state

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/kubista9/greenhouse/main/greenhouse.json')
      .then(response => response.json())
      .then(data => {
        const { name, id, window } = data.greenhouse;
        setGreenhouse({
          name: name,
          id: id,
          window: window
        });
      })
      .catch(error => {
        console.error("There was a problem with your fetch operation", error);
      });
  }, []);
  
   
  return (
    <div>
      {greenhouse ? ( // Check if greenhouse details are available
        <div>
          <p>Name: {greenhouse.name}</p>
          <p>ID: {greenhouse.id}</p>
          <p>Window opened: {greenhouse.window ? 'Yes' : 'No'}</p>
        </div>
      ) : (
        <p>Loading greenhouse details...</p>
      )}
    </div>
  );
}

export default GreenHouseDetails;
