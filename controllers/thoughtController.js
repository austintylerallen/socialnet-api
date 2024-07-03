// controllers/thoughtController.js

const Thought = require('../models/Thought');

// GET all thoughts
exports.getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET a single thought by ID
exports.getThoughtById = async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST a new thought
exports.createThought = async (req, res) => {
  const { thoughtText, username } = req.body;
  try {
    const newThought = await Thought.create({ thoughtText, username });
    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update a thought by ID
exports.updateThought = async (req, res) => {
  const { thoughtId } = req.params;
  const { thoughtText } = req.body;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },
      { new: true }
    );
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE delete a thought by ID
exports.deleteThought = async (req, res) => {
  const { thoughtId } = req.params;
  try {
    const deletedThought = await Thought.findByIdAndDelete(thoughtId);
    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
