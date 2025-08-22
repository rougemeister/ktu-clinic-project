// app.js
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' })); // Angular frontend

// Routes
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes'); // ✅ import auth routes

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); // ✅ mount auth routes

// Test route
app.get('/', (req, res) => {
  res.send('Welcome to the KTU Clinic API');
});

module.exports = app;
