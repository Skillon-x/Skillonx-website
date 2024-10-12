// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const Email = require("./models/Emails");
const OnlineUser = require("./models/OnlineUser");
const OfflineUser = require("./models/OfflineUser");
const Countdown = require("./models/Countdown")
const { sendMail , userMail } = require("./helper/SendMail");

const app = express();
const PORT = process.env.PORT || 5000;
// const MongoDb = process.env.MONGO_
// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://skillonx.com",
      "https://skillonx.com/",
    ],
    // methods:['GET','POST'],
    credentials: true,
  })
);
// app.options("*",cors())
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// POST route to save email
app.get('/api/countdown', async (req, res) => {
  try {
    const countdown = await Countdown.findOne();
    if (!countdown) {
      return res.status(404).json({ message: 'Countdown not found' });
    }

    const now = new Date();
    const timeDiff = countdown.endTime - now;

    if (timeDiff <= 0) {
      return res.json({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    res.json({ days, hours, minutes, seconds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a countdown entry if it doesn't exist
const createCountdown = async () => {
  const existingCountdown = await Countdown.findOne();
  if (!existingCountdown) {
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + 4); // 4 days from now
    await new Countdown({ endTime }).save();
    console.log('Countdown created');
  }
};


app.post("/api/emails", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const newEmail = new Email({
      email,
    });

    await newEmail.save();
    sendMail(
      email,
      "Thank You for Your Interest in SkillonX",
      `Thank you for showing interest in SkillonX. We're excited to have you here!
Our website is currently under development, but we'll update you as soon as it goes live. In the meantime, we invite you to follow us on our social media channels to stay connected:
LinkedIn: https://www.linkedin.com/company/skillonx/
Facebook: https://www.facebook.com/profile.php?id=61566923306085
Instagram: https://www.instagram.com/skillonx/
We look forward to sharing more with you soon.
Best regards,
Bibin Antony K
Product Head @ https://skillonx.com/`
    );
    res.status(201).json({ message: "Email saved successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Please check the format of your email" });
    }

    res
      .status(500)
      .json({ message: "Internal server error or check your domain is right" });
  }
});
app.post("/api/online", async (req, res) => {
  // const onlineUser = new OnlineUser(req.body);
  const{firstName,lastName,email,education,address,phone,dob,isStudent} = req.body
  try {
    const onlineUser = new OnlineUser({firstName,lastName,email,education,address,phone,dob,isStudent})
    await onlineUser.save();
    userMail(email,"Thank You for Your Interest in SkillonX",`Thank you for showing interest in SkillonX. We're excited to have you here!
Our website is currently under development, but we'll update you as soon as it goes live. In the meantime, we invite you to follow us on our social media channels to stay connected:
LinkedIn: https://www.linkedin.com/company/skillonx/
Facebook: https://www.facebook.com/profile.php?id=61566923306085
Instagram: https://www.instagram.com/skillonx/
We look forward to sharing more with you soon.
Best regards,
Bibin Antony K
Product Head @ https://skillonx.com/`)
    res.status(201).json({ message: "form data saved successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.post("/api/offline", async (req, res) => {
  // const offlineUser = new OfflineUser(req.body);
  const{firstName,lastName,email,education,address,phone,dob,isStudent} = req.body

  try {
    const offlineUser = new OnlineUser({firstName,lastName,email,education,address,phone,dob,isStudent})
    await offlineUser.save();
    userMail(email,"Thank You for Your Interest in SkillonX",`Thank you for showing interest in SkillonX. We're excited to have you here!
      Our website is currently under development, but we'll update you as soon as it goes live. In the meantime, we invite you to follow us on our social media channels to stay connected:
      LinkedIn: https://www.linkedin.com/company/skillonx/
      Facebook: https://www.facebook.com/profile.php?id=61566923306085
      Instagram: https://www.instagram.com/skillonx/
      We look forward to sharing more with you soon.
      Best regards,
      Bibin Antony K
      Product Head @ https://skillonx.com/`)
    res.status(201).json({ message: "form data saved successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
