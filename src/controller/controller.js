const express = require('express');
const axios = require('axios');

const Coin=require('../models/coinmodel')

// Create an Express.js app
const app = express();

// Define the route for fetching the top 100 coins
app.get('/assets', async (req, res) => {
  try {
    // Fetch the list of top 100 coins from the API
    const response = await axios.get('https://api.coincap.io/v2/assets');
    const coins = response.data; // Assuming the API response is an array of coins

    // Save the coins in the database
    await Coin.deleteMany({}); // Clear existing data from the collection

    for (const coin of coins) {
      await Coin.findOneAndUpdate(
        { symbol: coin.symbol },
        {
          symbol: coin.symbol,
          name: coin.name,
          marketCapUsd: coin.marketCapUsd,
          priceUsd: coin.priceUsd,
        },
        { upsert: true }
      );
    }

    // Fetch the sorted list of coins based on their growth in the last 24 hours
    const sortedCoins = await Coin.find().sort({ changePercent24Hr: -1 });

    // Send the sorted coins as the API response
    res.json(sortedCoins);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

