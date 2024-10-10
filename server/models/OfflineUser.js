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
});

module.exports = mongoose.model('OfflineUser', offlineUserSchema);
