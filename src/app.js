const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

// Mock data generation function
function generateMockData(symbol, period) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30); // Generating data for the last 30 days

  const mockData = {
    symbol,
    period,
    data: [],
  };

  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const dataPoint = {
      date: date.toISOString().split('T')[0],
      close: getRandomNumber(100, 200),
      high: getRandomNumber(150, 250),
      low: getRandomNumber(50, 120),
      volume: getRandomNumber(50000, 200000),
    };

    mockData.data.push(dataPoint);
  }

  return mockData;
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// API endpoint
app.get('/api/search', (req, res) => {
  console.log ("Api called")
  const { symbol, period } = req.query;
  const mockData = generateMockData(symbol, period);
  console.log("Symbol", symbol);
  console.log ("Period", period)
  res.json(mockData);
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});



module.exports = app;
