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
  referrelId:{
    type:String,
    unique:true,
    required:true,
  },
  referrelCount:{
    default:0,
    type:Number
  },
  submittedFormCount:{
    default:0,
    type:Number
  }
});

module.exports = mongoose.model('OfflineUser', offlineUserSchema);
