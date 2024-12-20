const express = require('express');
const FastSpeedTest = require('fast-speedtest-api');
const cors = require("cors");

const app = express();
const port = process.env.MY_PORT || 5000;
app.use(cors());

const speedtest = new FastSpeedTest({
  token: "YXNkZmFzZGxmbnNkYWZoYXNkZmhrYWxm&urlCount=5", // Replace with your actual token
  verbose: false,
  timeout: 10000,
  https: true,
  urlCount: 5,
  bufferSize: 8,
  unit: FastSpeedTest.UNITS.Mbps,
});
app.get('/api/speedtest', async (req, res) => {
  try {
    const speed = await speedtest.getSpeed();
    res.json({ speed });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port);
