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

  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert demo users and thoughts
    const thought1 = await Thought.create({
      _id: new mongoose.Types.ObjectId(),
      thoughtText: 'This is a thought by John',
      username: 'john_doe',
    });

    const thought2 = await Thought.create({
      _id: new mongoose.Types.ObjectId(),
      thoughtText: 'This is a thought by Jane',
      username: 'jane_doe',
    });

    const user1 = await User.create({
      username: 'john_doe',
      email: 'john@example.com',
      thoughts: [thought1._id],
    });

    const user2 = await User.create({
      username: 'jane_doe',
      email: 'jane@example.com',
      thoughts: [thought2._id],
    });

    console.log('Inserted demo users and thoughts');
    console.log('User 1 ID:', user1._id);
    console.log('User 2 ID:', user2._id);
    console.log('Thought 1 ID:', thought1._id);
    console.log('Thought 2 ID:', thought2._id);

  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
});
