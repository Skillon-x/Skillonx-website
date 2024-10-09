import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Define Schema and Model for Emails
const emailSchema = new mongoose.Schema({
  email: String
});

const Email = mongoose.model('Email', emailSchema);

// Route to handle email submissions
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  try {
    await new Email({ email }).save();
    res.status(201).send('Email saved successfully!');
  } catch (error) {
    console.error('Error saving email:', error);
    res.status(500).send('Error saving email');
  }
});

// Server listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
