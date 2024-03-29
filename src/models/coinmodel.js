const mongoose = require ("mongoose")

const coinSchema = new mongoose.Schema({
    symbol: { type: String, unique: true },
    name: { type: String, unique: true },
    marketCapUsd: String,
    priceUsd: String,
  });
  
  // Create a model based on the schema
module.exports= mongoose.model('Coin', coinSchema);