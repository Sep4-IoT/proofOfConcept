const express = require('express');
const fs = require('fs').promises;
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors middleware
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

const jsonFilePath = path.join(__dirname, '../greenhouse.json'); // Resolve path to greenhouse.json

// Endpoint to update greenhouse data
app.put('/api/updateGreenhouse', async (req, res) => {
  try {
    const { window } = req.body;

    // Read existing JSON data
    const rawData = await fs.readFile(jsonFilePath);
    const jsonData = JSON.parse(rawData);

    // Update window property
    jsonData.greenhouse.window = window;

    // Write updated JSON data back to file
    await fs.writeFile(jsonFilePath, JSON.stringify(jsonData, null, 2));

    res.status(200).json({ message: 'Greenhouse window status updated successfully' });
  } catch (error) {
    console.error('Error updating greenhouse window status:', error);
    res.status(500).json({ message: 'Failed to update greenhouse window status' });
  }
});

// Define a different port (e.g., 3000)
const PORT = process.env.PORT || 3000; // Use port 3000 as an example

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
