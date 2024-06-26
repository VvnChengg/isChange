const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  event_title: {
    type: String,
    maxlength: 30,
    required: true,
  },
  event_pic: {
    data: Buffer,
    contentType: String,
  },
  destination_en: {
    type: [String], // [country, city]
    required: true,
  },
  destination_zh: {
    type: [String], // [country, city]
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      index: "2dsphere",
    },
  },
  event_intro: {
    type: String,
    maxlength: 200,
  },
  start_time: {
    type: Date,
    required: true,
    validate: {
      validator: function (value) {
        return value <= this.end_time;
      },
      message: "Start time must be before or equal end time",
    },
  },
  end_time: {
    type: Date,
    required: true,
  },
  people_lb: {
    type: Number,
    validate: {
      validator: function (value) {
        return value <= this.people_ub;
      },
      message: "People lower bound must be less than or equal to upper bound",
    },
  },
  people_ub: {
    type: Number,
  },
  creator_id: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  status: {
    type: String,
    maxlength: 10,
    required: true,
    default: "ongoing",
    enum: ["ongoing", "complete", "end", "delete"],
  },
  like_by_user_ids: {
    type: [Schema.Types.ObjectId],
    ref: "Member",
    default: [],
  },
  save_by_user_ids: {
    type: [Schema.Types.ObjectId],
    ref: "Member",
  },
  currency: {
    type: String,
    maxlength: 10,
    enum: ["USD", "GBP", "EUR", "TWD", "CAD", "AUD"],
  },
  budget: {
    type: Number,
  },
});

// destination 換成經緯度後要加這行
// eventSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Event", eventSchema);
