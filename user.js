const { truncate } = require('fs');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      lowercase: true,
      required: true
    },
    password: {
      type: String,
      minlength: [6, 'password mid length is 6'],
      required: true
    }
  })
  
const User = mongoose.model('User', userSchema);

module.exports = User