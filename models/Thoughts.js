const { Schema , model } = require('mongoose');
const timestamp = require('time-stamp');

const ReactionSchema = new Schema(
    {
      // set custom id to avoid confusion with parent comment _id
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        maxLength: 280,
        required: true
      },
      userName: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        get:() => (timestamp('YYYY/MM/DD HH:MM')) 
      }
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
);

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: 'You must enter a thought text',
            minLength: 1,
            maxLength: 280,
            trim: true
        },

        createdAt: {
            type: Date,
            get:() => (timestamp('YYYY/MM/DD HH:MM')) 
        },

        userName: {
            type: String,
            required: true,
            trim: true
        },
        reactions: [ReactionSchema],

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
    
)
    thoughtSchema.virtual('reactionCount').get(function() {
        return this.reactions.length;
    });

    const Thoughts = model('Thoughts', thoughtSchema)

    module.exports = Thoughts;