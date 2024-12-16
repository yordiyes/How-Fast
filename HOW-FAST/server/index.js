const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());  // To allow cross-origin requests from your React app

app.get('/api/speedtest', async (req, res) => {
  try {
    const response = await axios.get('https://api.fast.com/netflix-speedtest/v2');
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching speed data:', error);
    res.status(500).json({ error: 'Failed to fetch speed data' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
