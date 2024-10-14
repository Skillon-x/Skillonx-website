const mongoose = require('mongoose');

const offlineUserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  education: String,
  address: String,
  phone: String,
  dob: Date,
  isStudent: Boolean,
  referralCode: {
    type: String,
    default: null, // Each user has a unique referral code
  },
  referralCount: {
    type: Number,
    default: 0, // Tracks how many people used this user's referral code
  },
  referrelFormSubmitted:{
    type:Number,
    default:0,
  }
});

module.exports = mongoose.model('OfflineUser', offlineUserSchema);
