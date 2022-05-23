const { Schema, model } = require('mongoose');
const User = require('./User');

const thoughtSchema = new Schema({
    thoughtText: {type: String,
        required: true,
        minlength: 1,
        maxlength: 280},

    createdAt: {type: Date,
        default: Date.now},

    username: {type: String,
        ref: User,
        required: true},

    reactions: [reactionSchema],
},
{
    toJSON: {
        virtuals: true,
    },

    id: false,
});

thoughtSchema.virtual('reactionCount').get(() =>{
    return this.reactions.length;
});