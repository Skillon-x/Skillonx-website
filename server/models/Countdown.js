const mongoose = require('mongoose');

const countdownSchema = new mongoose.Schema({
  endTime: { type: Date, required: true },
});

const Countdown = mongoose.model('Countdown', countdownSchema);
module.exports = Countdown;
