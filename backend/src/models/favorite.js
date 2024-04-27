const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: "Member",
    },
    item_id: {
        type: Schema.Types.ObjectId,
        refPath: "save_type",
    },
    save_type: {
        type: String,
        enum: ["Article", "Event", "Product"],
    }
});

module.exports = mongoose.model('Favorite', favoriteSchema);
