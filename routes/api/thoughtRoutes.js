const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// GET all thoughts
router.get('/', getAllThoughts);

// GET thought by ID
router.get('/:id', getThoughtById);

// POST new thought
router.post('/', createThought);

// PUT update thought by ID
router.put('/:id', updateThought);

// DELETE thought by ID
router.delete('/:id', deleteThought);

// POST add a reaction to thought
router.post('/:thoughtId/reactions', addReaction);

// DELETE remove a reaction from thought
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;
