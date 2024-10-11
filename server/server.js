// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Email = require('./models/Emails');
const OnlineUser = require("./models/OnlineUser")
const OfflineUser = require("./models/OfflineUser")
const {sendMail} = require("./helper/SendMail")
const app = express();
const PORT = process.env.PORT || 5000;
// const MongoDb = process.env.MONGO_
// Middleware
app.use(cors({
  origin: ["http://localhost:5173","https://skillonx.com","https://skillonx.com/"],
  // methods:['GET','POST'],
  credentials:true,
}));
// app.options("*",cors())
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB is connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// POST route to save email
app.post('/api/emails', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }
  try {
    const newEmail = new Email({ email });
    await newEmail.save();
    // sendMail(newEmail,"welcome to our website ","hi we are glad that you are here")
    res.status(201).json({ message: 'Email saved successfully' });
  } catch (error) {  
    if (error.code === 11000) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: "Please check the format of your email" }); 
    }

    res.status(500).json({ message: 'Internal server error or check your domain is right' });
  }
});
app.post("/api/online",async (req,res)=>{
  const onlineUser = new OnlineUser(req.body)

  try {
    await onlineUser.save();
    res.status(201).json({message:"form data saved successfully"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})
app.post("/api/offline",async (req,res)=>{
  const offlineUser = new OfflineUser(req.body)

  try {
    await offlineUser.save();
    res.status(201).json({message:"form data saved successfully"});
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
})



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
