import React, { useState, useEffect } from 'react';
const token = process.env.REACT_APP_GITHUB_PAT;

function GreenHouseDetails() {
 const [greenhouse, setGreenhouse] = useState(null);

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

 const updateGreenhouseWindow = async () => {
    const token = 'token'; 
    const owner = 'kubista9';
    const repo = 'greenhouse';
    const path = 'main/greenhouse.json';
    const message = 'Update window status';
    const content = JSON.stringify({
      "greenhouse": {
        "name": "Name Namesen",
        "id": 69,
        "window": true
      }
    }, null, 2);
    const base64Content = btoa(content);

    try {
      const response = await fetch(`https://github.com/kubista9/greenhouse`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message,
          content: base64Content,
          sha: '5542c15d9c677b6c4571aac45387968c1a6e9a2d' 
        })
      });

      if (response.ok) {
        console.log('File updated successfully');
        // Optionally, update the state to reflect the new window status
        setGreenhouse(prevState => ({ ...prevState, window: true }));
      } else {
        console.error('Failed to update file', response.statusText);
      }
    } catch (error) {
      console.error('Error updating file', error);
    }
 };

 return (
    <div className='container'>
      {greenhouse ? (
        <div className='wrapper'>
          <p>Name: {greenhouse.name}</p>
          <p>ID: {greenhouse.id}</p>
          <p>Window opened: {greenhouse.window ? 'Yes' : 'No'}</p>
          <button onClick={updateGreenhouseWindow}>Update Window Status</button>
        </div>
      ) : (
        <p>Loading greenhouse details...</p>
      )}
    </div>
 );
}

//test commit 13:14 24.5.2024

export default GreenHouseDetails;
