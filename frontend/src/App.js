import React, { useState, useEffect } from 'react';

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

  return (
    <div className='container'>
      {greenhouse ? (
        <div className='wrapper'>
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
