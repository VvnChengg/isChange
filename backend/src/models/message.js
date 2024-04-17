const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message_type: {
        type: String,
        maxlength: 5,
        required: true,
        enum: ['pic', 'text']
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        maxlength: 200,
        default: null
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    sender_id: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    chat_id: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    read: {
        type: Boolean,
        default: false,
        required: true
    }
});

module.exports = mongoose.model('Message', messageSchema);
