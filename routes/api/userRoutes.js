const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend
} = require('../../controllers/userController');

// GET all users
router.get('/', getAllUsers);

// GET user by ID
router.get('/:id', getUserById);

// POST new user
router.post('/', createUser);

// PUT update user by ID
router.put('/:id', updateUser);

// DELETE user by ID
router.delete('/:id', deleteUser);

// POST add a new friend to user's friend list
router.post('/:userId/friends/:friendId', addFriend);

// DELETE remove a friend from user's friend list
router.delete('/:userId/friends/:friendId', removeFriend);

module.exports = router;
