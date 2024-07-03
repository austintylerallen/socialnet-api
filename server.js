const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static('public')); // Serve static files from the 'public' directory

// API routes
app.use('/api', routes); // Mount API routes under '/api'

// Serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// 404 handler for API routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

// MongoDB connection established
db.once('open', () => {
  // Start server
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
