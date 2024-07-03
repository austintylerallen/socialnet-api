const router = require('express').Router();
const { Thought } = require('../../models');

// GET all thoughts
router.get('/', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single thought by ID
router.get('/:thoughtId', async (req, res) => {
  try {
    const thoughtId = req.params.thoughtId;
    console.log('Received thoughtId:', thoughtId);  // Debug log

    if (!mongoose.Types.ObjectId.isValid(thoughtId)) {
      return res.status(400).json({ error: 'Invalid thoughtId' });
    }

    const thought = await Thought.findById(thoughtId);
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new thought
router.post('/', async (req, res) => {
  try {
    const newThought = await Thought.create(req.body);
    res.status(201).json(newThought);
  } catch (err) {
    res.status(400).json(err);
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
    res.status(400).json(err);
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
    res.status(500).json(err);
  }
});

module.exports = router;
