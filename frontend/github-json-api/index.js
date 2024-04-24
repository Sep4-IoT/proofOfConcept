const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const jsonFilePath = 'path/to/your/greenhouse.json';

// Endpoint to update greenhouse data
app.put('/api/updateGreenhouse', async (req, res) => {
  try {
    const { name, id, window } = req.body;

    // Read existing JSON data
    const rawData = await fs.readFile(jsonFilePath);
    const jsonData = JSON.parse(rawData);

    // Update greenhouse properties
    jsonData.greenhouse.name = name;
    jsonData.greenhouse.id = id;
    jsonData.greenhouse.window = window;

    // Write updated JSON data back to file
    await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));

    res.status(200).json({ message: 'Greenhouse data updated successfully' });
  } catch (error) {
    console.error('Error updating greenhouse data:', error);
    res.status(500).json({ message: 'Failed to update greenhouse data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
