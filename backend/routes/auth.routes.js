// auth.routes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Public routes
router.post('/login', authController.login);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password', authController.resetPassword);

// Protected routes
router.get('/validate-token', 
  authMiddleware.verifyToken, 
  authController.validateToken
);

router.get('/me', 
  authMiddleware.verifyToken, 
  authController.getCurrentUser
);

module.exports = router;