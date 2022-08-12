const { Schema, model } = require('mongoose');


const userSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: 'Must enter a unique username',
      trim: true
    },
    email: {
      type: String,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thoughts'
      }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      // getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);


userSchema.virtual('thoughtCount').get(function() {
  return this.thoughts.reduce(
    (total, thoughts) => total + thoughts.length + 1,
    0
  );
});

const User = model('User', userSchema);

module.exports = User;