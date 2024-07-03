// seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const usersSeedData = require('./usersSeedData');
const thoughtsSeedData = require('./thoughtsSeedData');
const User = require('../models/User'); // Adjust the path as per your project structure
const Thought = require('../models/Thought'); // Adjust the path as per your project structure

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('debug', true);

// Seed function
async function seedDatabase() {
  try {
    // Clear existing data (optional)
    await User.deleteMany();
    await Thought.deleteMany();

    // Seed users
    const createdUsers = await User.insertMany(usersSeedData);
    console.log(`${createdUsers.length} users seeded.`);

    // Establish friendships
    const user1 = createdUsers.find(user => user.username === 'user1');
    const user2 = createdUsers.find(user => user.username === 'user2');
    
    // Example: User1 adds User2 as a friend
    user1.friends.push(user2._id);

    // Example: User2 adds User1 as a friend
    user2.friends.push(user1._id);

    // Save updated users with friends
    await user1.save();
    await user2.save();

    // Seed thoughts
    const thoughtsWithUserIds = thoughtsSeedData.map(thought => ({
      ...thought,
      userId: createdUsers.find(user => user.username === thought.username)._id
    }));
    const createdThoughts = await Thought.insertMany(thoughtsWithUserIds);
    console.log(`${createdThoughts.length} thoughts seeded.`);

    console.log('Database seeding completed.');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    mongoose.disconnect();
  }
}

// Execute seed function
seedDatabase();
