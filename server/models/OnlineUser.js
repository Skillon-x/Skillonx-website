const mongoose = require("mongoose");

const onlineUserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  education: String,
  address: String,
  phone: String,
  dob: Date,
  isStudent: Boolean,
  referrelCount:{
    default:0,
    type:Number
  },
  submittedFormCount:{
    default:0,
    type: Number
  }
});

module.exports = mongoose.model("OnlineUser", onlineUserSchema);
