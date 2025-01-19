const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Your routes, middlewares, etc.
app.get('/', (req, res) => {
  res.send('Hello from Kollektiv!');
});

// Export the app (important for serverless environment)
module.exports = app;