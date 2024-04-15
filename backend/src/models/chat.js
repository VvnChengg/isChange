const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    first_person: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    second_person: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    last_message: {
        type: String,
    },
    last_sender: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
    },
    last_update: {
        type: Date,
        default: Date.now,
        required: true
    },
    stranger: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Chat', chatSchema);
