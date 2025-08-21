const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['patient', 'admin', 'doctor', 'nurse'],
    default: 'patient'
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;