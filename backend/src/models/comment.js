const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
        type: String,
        required: true,
        maxlength: 50
    },
    created_at: {
        type: Date,
        default: Date.now,
        required: true
    },
    commentor_id: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    }
});

module.exports = mongoose.model('Comment', commentSchema);
