const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware for parsing JSON bodies
app.use(bodyParser.json());

// Endpoint to fetch and return JSON data
app.get('/api/greenhouse', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/kubista9/greenhouse/main/greenhouse.json');
    const data = response.data;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch JSON data' });
  }
});

// Endpoint to update JSON data
app.put('/api/greenhouse', async (req, res) => {
  try {
    const response = await axios.get('https://raw.githubusercontent.com/kubista9/greenhouse/main/greenhouse.json');
    let data = response.data;
    
    // Update the window value
    data.greenhouse.window = req.body.window;

    // Prepare updated file data
    const updatedFileData = {
      message: 'Update greenhouse window status',
      content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
      sha: req.body.sha
    };

    // Update the file on GitHub
    const githubResponse = await axios.put('https://api.github.com/repos/kubista9/greenhouse/contents/greenhouse.json', updatedFileData, {
      headers: {
        Authorization: `token YOUR_GITHUB_ACCESS_TOKEN`,
        'Content-Type': 'application/json'
      }
    });

    res.json(githubResponse.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update JSON data' });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
