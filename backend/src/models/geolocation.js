const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// 如果之後要顯示附近使用者的功能，需要使用 geolocationSchema
const geolocationSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "Member",
  },
  location: {
    type: { type: String },
    coordinates: [Number],
  },
});
geolocationSchema.index({ location: "2dsphere" }); // Ensure index for geospatial queries

module.exports = mongoose.model("Geolocation", geolocationSchema);
