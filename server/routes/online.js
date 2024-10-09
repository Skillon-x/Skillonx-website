// backend/routes/online.js
const express = require('express');
const OnlineUser = require('../models/OnlineUser');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const onlineUser = new OnlineUser(req.body);
    await onlineUser.save();
    res.status(201).json(onlineUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
