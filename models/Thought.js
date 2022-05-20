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
        ref: User},

    reactions: [{
        
    }]
})