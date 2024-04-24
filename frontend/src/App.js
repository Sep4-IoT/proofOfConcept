import React, { useState, useEffect } from 'react';
const token = process.env.REACT_APP_GITHUB_PAT;

function GreenHouseDetails() {
 const [greenhouse, setGreenhouse] = useState(null);

 useEffect(() => {
    fetch('https://githubraw.com/kubista9/greenhouse/tree/main')
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

//test commit 13:14 24.5.2024

export default GreenHouseDetails;
