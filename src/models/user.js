const mongoose = require('../db');

const userSchema = new mongoose.Schema({
  userName: { type: String },
  email: { type: String },
  password: { type: String },
  gender: { type: String },
  createTime: { type: Number },
  avatar: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User; 
