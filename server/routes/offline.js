// backend/routes/offline.js
const express = require('express');
const OfflineUser = require('../models/OfflineUser');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const offlineUser = new OfflineUser(req.body);
    await offlineUser.save();
    res.status(201).json(offlineUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
