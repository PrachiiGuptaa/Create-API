const express = require('express');
const app = express();
const mongoose = require('mongoose');

// Create the database connection
mongoose.connect("mongodb+srv://Rubi_db:T2P9R5d5lWl7SRAF@cluster0.tvyoi.mongodb.net/group41Database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Start the server
app.listen(3000, () => {
    console.log('Server listening on port 3000');
    console.log('connected to mongodb')
  });