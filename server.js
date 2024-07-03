const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));  // Serve static files

app.use('/api', routes);  // Use API routes under /api

// Serve the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Handle 404 for API routes
app.use((req, res) => {
  res.status(404).send('Not Found');
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
