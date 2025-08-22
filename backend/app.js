// app.js
require('dotenv').config(); // load .env
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200', // ✅ from .env
  })
);

// Routes
const userRoutes = require('./src/routes/userRoutes');
const authRoutes = require('./src/routes/authRoutes');

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Health check / Test route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the KTU Clinic API 🚑' });
});

module.exports = app;
