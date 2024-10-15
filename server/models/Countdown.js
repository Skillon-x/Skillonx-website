const mongoose = require('mongoose');

const countdownSchema = new mongoose.Schema({
  startDate: { type: Date, required: true },
  duration: { type: Number, required: true, default: 4 * 24 * 60 * 60 * 1000 } 
});

const Countdown = mongoose.model('Countdown', countdownSchema);
module.exports = Countdown;
