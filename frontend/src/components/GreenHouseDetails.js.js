import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios

function GreenHouseDetails() {
  const [greenhouse, setGreenhouse] = useState(null);

  useEffect(() => {
    const fetchGreenhouseData = async () => {
      try {
        const response = await fetch('https://kubista9.github.io/greenhouse/greenhouse.json');
        if (!response.ok) {
          throw new Error('Failed to fetch greenhouse data');
        }
        const data = await response.json();
        setGreenhouse(data.greenhouse);
      } catch (error) {
        console.error('Error fetching greenhouse data:', error);
      }
    };

    fetchGreenhouseData();
  }, []);

  const updateGreenhouseWindow = async () => {
    if (!greenhouse) return; // Ensure greenhouse data is loaded
  
    try {
      const newWindowStatus = !greenhouse.window; // Toggle window status
      const response = await axios.put('http://localhost:3000/api/updateGreenhouse', {
        window: newWindowStatus
      });
      console.log(response.data.message);
  
      // Update local state with the updated window status
      setGreenhouse({
        ...greenhouse,
        window: newWindowStatus
      });
    } catch (error) {
      console.error('Error updating greenhouse window status:', error);
    }
  };
  
  return (
    <div className='container'>
      {greenhouse ? (
        <div className='wrapper'>
          <p>Name: {greenhouse.name}</p>
          <p>ID: {greenhouse.id}</p>
          <p>Window opened: {greenhouse.window ? 'Yes' : 'No'}</p>
          <button onClick={updateGreenhouseWindow}>
            {greenhouse.window ? 'Close Window' : 'Open Window'}
          </button>
        </div>
      ) : (
        <p>Loading greenhouse details...</p>
      )}
    </div>
  );
}

export default GreenHouseDetails;
