const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  resumeFilePath: { type: String,required: true},
  linkedinUrl: { type: String, default: '' },
  instagramUrl: { type: String, default: '' },
});

module.exports = mongoose.model('Resume', ResumeSchema);