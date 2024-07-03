const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [
    {
      reactionBody: String,
      username: String,
    },
  ],
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
