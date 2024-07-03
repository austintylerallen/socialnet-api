// const { Schema, model } = require('mongoose');

// const userSchema = new Schema(
//   {
//     username: {
//       type: String,
//       unique: true,
//       required: true,
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       match: [/.+@.+\..+/, 'Must match a valid email address'],
//     },
//     thoughts: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: 'Thought',
//       },
//     ],
//     friends: [
//       {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//       },
//     ],
//   },
//   {
//     toJSON: {
//       virtuals: true,
//     },
//     id: false,
//   }
// );

// userSchema.virtual('friendCount').get(function () {
//   return this.friends.length;
// });

// const User = model('User', userSchema);

// module.exports = User;


const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat'); // Adjust the path as necessary

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: [true, 'Path `username` is required.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Path `email` is required.'],
      unique: true,
      match: [/.+@.+\..+/, 'Must match a valid email address'],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
