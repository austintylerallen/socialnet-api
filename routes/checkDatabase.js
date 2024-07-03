require('dotenv').config(); // Load environment variables from .env file

const mongoose = require('mongoose');
const { User, Thought } = require('../models'); // Adjust the path as necessary

// Check if the MONGODB_URI is defined
if (!process.env.MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in .env file');
  process.exit(1);
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', async () => {
  console.log('MongoDB connected successfully');

  // Replace with actual ObjectId values from your database
  const userId = 'yourActualUserIdHere'; // Replace with an actual ObjectId
  const thoughtId = 'yourActualThoughtIdHere'; // Replace with an actual ObjectId

  try {
    const user = await User.findById(userId);
    if (user) {
      console.log('User found:', user);
    } else {
      console.log('User not found');
    }

    const thought = await Thought.findById(thoughtId);
    if (thought) {
      console.log('Thought found:', thought);
    } else {
      console.log('Thought not found');
    }
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
});
