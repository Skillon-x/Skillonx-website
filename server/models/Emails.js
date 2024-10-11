// models/Email.js
const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    trim: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@(gmail|yahoo|hotmail|outlook|live)\.com$/i, // Regex for specific email domains
      'Please enter a valid email address with a recognized domain (gmail, yahoo, hotmail, outlook, live).'
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now  // Automatically sets the current date and time
  },
  
});

const Email = mongoose.model('Email', emailSchema);

module.exports = Email;
