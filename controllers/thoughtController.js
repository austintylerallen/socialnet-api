const Thought = require('../models/Thought');

// GET all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET thought by ID
const getThoughtById = async (req, res) => {
  const { id } = req.params;
  try {
    const thought = await Thought.findById(id);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST new thought
const createThought = async (req, res) => {
  const { thoughtText, username } = req.body;
  try {
    const newThought = await Thought.create({ thoughtText, username });
    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT update thought by ID
const updateThought = async (req, res) => {
  const { id } = req.params;
  const { thoughtText } = req.body;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(id, { thoughtText }, { new: true });
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(updatedThought);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE thought by ID
const deleteThought = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedThought = await Thought.findByIdAndDelete(id);
    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST add a reaction to thought
const addReaction = async (req, res) => {
  const { thoughtId } = req.params;
  const { reactionBody, username } = req.body;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: { reactionBody, username } } },
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

// DELETE remove a reaction from thought
const removeReaction = async (req, res) => {
  const { thoughtId, reactionId } = req.params;
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { _id: reactionId } } },
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

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};
