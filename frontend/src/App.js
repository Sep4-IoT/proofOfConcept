import React, { useState, useEffect } from 'react';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

function GreenHouseDetails() {
  const [greenhouse, setGreenhouse] = useState(null);

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/kubista9/greenhouse/main/greenhouse.json')
      .then(response => response.json())
      .then(data => {
        const { name, id, window, sha } = data.greenhouse;
        setGreenhouse({ name, id, window, sha });
      })
      .catch(error => {
        console.error("There was a problem with your fetch operation", error);
      });
  }, []);

  const updateGreenhouseWindow = async () => {
    const token = process.env.REACT_APP_GITHUB_TOKEN;
    const owner = 'kubista9';
    const repo = 'greenhouse';
    const path = 'greenhouse.json';
    const message = 'Update window status';
    const content = {
      greenhouse: {
        name: 'Name Namesen',
        id: 69,
        window: true
      }
    };
    const fileContent = JSON.stringify(content, null, 2);
    const base64Content = Buffer.from(fileContent).toString('base64');

    try {
      const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          content: base64Content,
          sha: greenhouse.sha
        }),
      });

      if (response.ok) {
        console.log('File updated successfully');
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

export default GreenHouseDetails;
