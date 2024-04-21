const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
