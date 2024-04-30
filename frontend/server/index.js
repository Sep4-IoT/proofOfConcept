const jsonFilePath = path.join(__dirname, './greenhouse.json');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000; 
const express = require('express');
const fs = require('fs').promises;
const cors = require('cors'); 
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/api/getGreenhouseData', async (req, res) => {
  try {
    const rawData = await fs.readFile(jsonFilePath);
    const jsonData = JSON.parse(rawData);
    const greenhouseData = {
      id: jsonData.greenhouse.id,
      name: jsonData.greenhouse.name,
      window: jsonData.greenhouse.window,
    };
    res.status(200).json(greenhouseData);
  } 
  catch (error) {
    console.error('Error retrieving greenhouse data:', error);
    res.status(500).json({ message: 'Failed to retrieve greenhouse data' });
  }
});

app.put('/api/updateGreenhouse', async (req, res) => {
  try {
    const { window } = req.body;
    const rawData = await fs.readFile(jsonFilePath);
    const jsonData = JSON.parse(rawData);
    jsonData.greenhouse.window = window;

    await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));
    res.status(200).json({ message: 'Greenhouse window status updated successfully' });
  } 
  catch (error) {
    console.error('Error updating greenhouse window status:', error);
    res.status(500).json({ message: 'Failed to update greenhouse window status' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
