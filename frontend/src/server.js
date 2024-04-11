const express = require('express');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3002;

app.get('/api/greenhouse', async (req, res) => {
  try {
    const response = await fetch('https://javierperalta.dk/greenhouse.json');
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
