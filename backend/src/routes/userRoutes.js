const express = require('express')

const router = express.Router();

const User = require('../model/User');

//Get Users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(`Error fetching users: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Post create   Users

router.post('/', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//PUT : update

router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    console.error(`Error updating user: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//Delete: remove
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(`Error deleting user: ${error}`);
    res.status(500).json({ error: 'Internal server error' });
  }
});




module.exports = router;