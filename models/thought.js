const { Schema, Types, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactSchema = new Schema(
    {
        reactId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactBody: {
            type: String,
            required: true,
            maxlength: 300,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    }


);

const thoughtSchema = new Schema(
    {
        thoughtId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },

        thoughtText: {
            type: String,
            required: true,
            maxlength: 200
        },

        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        },
        reacts: [reactSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);
thoughtSchema.virtual('reactCount').get(function () {
    return this.reacts.length;
})
const Thought = model('thought', thoughtSchema);
module.exports = Thought;