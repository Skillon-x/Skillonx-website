// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const Email = require("./models/Emails");
const OnlineUser = require("./models/OnlineUser");
const OfflineUser = require("./models/OfflineUser");
const Resume = require("./models/Resume");
const Countdown = require("./models/Countdown");
const { sendMail, userMail } = require("./helper/SendMail");
const multer = require("multer");

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
      "https://lucky-yeot-c08cc8.netlify.app/"
    ],
    // methods:['GET','POST'],
    credentials: true,
  })
);
// app.options("*",cors())
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Save files with a timestamp
  },
});

const upload = multer({ storage: storage });
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// POST route to save email
app.get("/api/countdown", async (req, res) => {
  try {
    const countdown = await Countdown.findOne();
    if (!countdown) {
      return res.status(404).json({ message: "Countdown not found" });
    }

    const now = new Date();
    const timeDiff = countdown.endTime - now;

    if (timeDiff <= 0) {
      return res.json({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    }

    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

    res.json({ days, hours, minutes, seconds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Create a countdown entry if it doesn't exist
const createCountdown = async () => {
  const existingCountdown = await Countdown.findOne();
  if (!existingCountdown) {
    const endTime = new Date();
    endTime.setDate(endTime.getDate() + 4); // 4 days from now
    await new Countdown({ endTime }).save();
    console.log("Countdown created");
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
    res.status(201).json({ message: "Email saved successfully" });
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
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: "Email already exists" });
    }
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Please check the format of your email" });
    }
    console.log(error.message);

    res.status(500).json(error);
  }
});
app.post("/api/upload-resume", upload.single("resume"), async (req, res) => {
  const { linkedinUrl, instagramUrl } = req.body;
  const resumeFilePath = req.file ? req.file.path : null;

  try {
    // Save the resume data in MongoDB
    const newResume = new Resume({
      resumeFilePath,
      linkedinUrl,
      instagramUrl,
    });
    await newResume.save();
    res.status(200).json({ message: "Resume uploaded successfully" });
  } catch (error) {
    console.error("Error uploading resume:", error);
    res.status(500).json({ message: "Failed to upload resume" });
  }
});
app.post("/api/online", async (req, res) => {
  // const onlineUser = new OnlineUser(req.body);
  const {
    firstName,
    lastName,
    email,
    education,
    address,
    phone,
    dob,
    isStudent,
    referralCode,
  } = req.body;
  if (referralCode) {
    const referrer = await OnlineUser.findOne({ referralCode: referralCode });

    if (referrer) {
      // Step 3: Increment referralFormSubmitted count for the referrer
      referrer.referrelFormSubmitted += 1;
      await referrer.save(); // Save the updated referrer details
    }
  }
  try {
    const onlineUser = new OnlineUser({
      firstName,
      lastName,
      email,
      education,
      address,
      phone,
      dob,
      isStudent,
    });
    await onlineUser.save();
    userMail(
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
    res.status(201).json({ message: "form data saved successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.post("/api/save-referral", async (req, res) => {
  const { email, referralCode } = req.body;

  try {
    // Find the user by email
    const user = await OnlineUser.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's referral code
    user.referralCode = referralCode;
    await user.save();

    res.status(200).json({ message: "Referral code saved successfully", user });
  } catch (error) {
    console.error("Error saving referral code:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/api/increase-referral", async (req, res) => {
  const { referralCode } = req.body;

  try {
    // Find the user who owns this referral code
    const user = await OnlineUser.findOne({ referralCode });

    if (!user) {
      return res.status(404).json({ message: "Referral code not found" });
    }

    // Increment the referral count by 1
    user.referralCount += 1;

    // Save the updated user
    await user.save();

    res.json({
      message: "Referral count incremented",
      referralCount: user.referralCount,
    });
  } catch (error) {
    console.error("Error incrementing referral count:", error);
    res.status(500).json({ message: "Error incrementing referral count" });
  }
});
app.post("/api/offline", async (req, res) => {
  // const offlineUser = new OfflineUser(req.body);
  const {
    firstName,
    lastName,
    email,
    education,
    address,
    phone,
    dob,
    isStudent,
    referralCode,
  } = req.body;
  if (referralCode) {
    const referrer = await OfflineUser.findOne({ referralCode: referralCode });

    if (referrer) {
      // Step 3: Increment referralFormSubmitted count for the referrer
      referrer.referrelFormSubmitted += 1;
      await referrer.save(); // Save the updated referrer details
    }
  }

  try {
    const offlineUser = new OfflineUser({
      firstName,
      lastName,
      email,
      education,
      address,
      phone,
      dob,
      isStudent,
     
    });
    await offlineUser.save();
    userMail(
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
    res.status(201).json({ message: "form data saved successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
app.post("/api/save-referral/offline", async (req, res) => {
  const { email, referralCode } = req.body;

  try {
    // Find the user by email
    const user = await OfflineUser.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's referral code
    user.referralCode = referralCode;
    await user.save();

    res.status(200).json({ message: "Referral code saved successfully", user });
  } catch (error) {
    console.error("Error saving referral code:", error);
    res.status(500).json({ message: "Server error" });
  }
});
app.post("/api/increase-referral/offline", async (req, res) => {
  const { referralCode } = req.body;

  try {
    // Find the user who owns this referral code
    const user = await OfflineUser.findOne({ referralCode });

    if (!user) {
      return res.status(404).json({ message: "Referral code not found" });
    }

    // Increment the referral count by 1
    user.referralCount += 1;

    // Save the updated user
    await user.save();

    res.json({
      message: "Referral count incremented",
      referralCount: user.referralCount,
    });
  } catch (error) {
    console.error("Error incrementing referral count:", error);
    res.status(500).json({ message: "Error incrementing referral count" });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
