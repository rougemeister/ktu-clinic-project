const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

// @route   GET /api/users
// @access  Private/Admin
router.get('/', protect, admin, getUsers);

// @route   GET /api/users/:id
// @access  Private
router.get('/:id', protect, getUserById);

// @route   PUT /api/users/:id
// @access  Private
router.put('/:id', protect, updateUser);

// @route   DELETE /api/users/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;
