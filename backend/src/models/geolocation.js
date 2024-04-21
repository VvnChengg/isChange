const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Member",
  },
  location: {
    type: { type: String },
    coordinates: [Number],
  },
});

module.exports = mongoose.model("Geolocation", locationSchema);
