// auth.middleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Verify JWT token middleware
exports.verifyToken = (req, res, next) => {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  const token = authHeader.split(' ')[1];
  
  try {
    // Verify and decode token
    const decoded = jwt.verify(token, config.jwtSecret);
    
    // Add user info to request object
    req.userId = decoded.id;
    req.userRole = decoded.role;
    
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Role-based authorization middleware
exports.authorize = (...roles) => {
  return (req, res, next) => {
    // Check if user role is in the allowed roles
    if (!roles.includes(req.userRole)) {
      return res.status(403).json({
        message: 'Unauthorized: You do not have permission to access this resource'
      });
    }
    next();
  };
};