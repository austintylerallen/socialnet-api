const mongoose = require('mongoose');
const { User } = require('./models'); // Adjust the path as necessary

require('dotenv').config(); // Load environment variables from .env file

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
    const newUser = new User({
      username: 'testuser',
      email: 'testuser@example.com',
    });

    const savedUser = await newUser.save();
    console.log('New user added:', savedUser);

    // Now use the ObjectId of the newly created user
    const userId = savedUser._id;

    const user = await User.findById(userId);
    if (user) {
      console.log('User found:', user);
    } else {
      console.log('User not found');
    }
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
});
