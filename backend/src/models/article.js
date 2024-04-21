const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    article_title: {
        type: String,
        required: true,
        maxlength: 30
    },
    article_pic: {
        data: Buffer,
        contentType: String,
    },
    post_date: {
        type: Date,
        default: Date.now,
        required: true
    },
    content: {
        type: String,
        required: true,
        maxlength: 2000
    },
    status: {
        type: String,
        enum: ['draft', 'complete'],
        default: 'draft',
        required: true
    },
    creator_id: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    like_by_user_ids: {
        type: [Schema.Types.ObjectId],
        ref: 'Member'
    },
    save_by_user_ids: {
        type: [Schema.Types.ObjectId],
        ref: 'Member'
    },
    comment_ids: {
        type: [Schema.Types.ObjectId],
        ref: 'Comment'
    },
    article_region: {
        type: String,
        maxlength: 30
    }
});

module.exports = mongoose.model('Article', articleSchema);
