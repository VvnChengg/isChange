const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "Member",
    },
    item_id: {
        type: Schema.Types.ObjectId,
        refPath: "like_type",
    },
    like_type: {
        type: String,
        enum: ["Article", "Event", "Product"],
    }
});

module.exports = mongoose.model('Like', likeSchema);
