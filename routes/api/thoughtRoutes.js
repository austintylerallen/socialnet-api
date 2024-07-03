const router = require('express').Router();
const mongoose = require('mongoose');
const { Thought } = require('../../models');

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    console.error('Error fetching thoughts:', err.message);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

// GET a single thought by ID
router.get('/:thoughtId', async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;

    if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
      return res.status(400).json({ error: 'Invalid thoughtId' });
    }

    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    console.error('Error fetching thought by ID:', err.message);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

// POST create a new thought
router.post('/', async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    res.status(201).json(newThought);
  } catch (err) {
    console.error('Error creating thought:', err.message);
    res.status(400).json({ error: 'Bad Request', message: err.message });
  }
});

// PUT update a thought by ID
router.put('/:thoughtId', async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;

    if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
      return res.status(400).json({ error: 'Invalid thoughtId' });
    }

    const updatedThought = await Thought.findByIdAndUpdate(thoughtId, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(updatedThought);
  } catch (err) {
    console.error('Error updating thought:', err.message);
    res.status(400).json({ error: 'Bad Request', message: err.message });
  }
});

// DELETE a thought by ID
router.delete('/:thoughtId', async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;

    if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
      return res.status(400).json({ error: 'Invalid thoughtId' });
    }

    const deletedThought = await Thought.findByIdAndDelete(thoughtId);
    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json({ message: 'Thought deleted successfully' });
  } catch (err) {
    console.error('Error deleting thought:', err.message);
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

module.exports = router;
