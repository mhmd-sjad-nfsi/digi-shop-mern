const express = require('express');

const path = require('path');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// simple health route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// example api route (ready to expand)
app.get('/api', (req, res) => {
  res.json({ message: 'سلام از بک‌اند دیجی‌شاپ!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running in development mode on port ${PORT}`);
});