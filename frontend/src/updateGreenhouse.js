import React from 'react';
import axios from 'axios';

function GreenHouseDetails() {
  const updateGreenhouseWindow = async () => {
    const updateData = {
      name: 'New Name',
      id: 123,
      window: true
    };

    try {
      const response = await axios.put('/api/updateGreenhouse', updateData);
      console.log(response.data.message);
      // Optionally, update the local state or trigger a re-fetch of the JSON data
    } catch (error) {
      console.error('Error updating greenhouse data:', error);
    }
  };

  return (
    <div className='container'>
      <button onClick={updateGreenhouseWindow}>Update Window Status</button>
    </div>
  );
}

export default GreenHouseDetails;
