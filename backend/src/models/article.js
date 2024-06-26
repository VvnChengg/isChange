const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  article_title: {
    type: String,
    required: true,
    maxlength: 30,
  },
  article_pic: {
    data: Buffer,
    contentType: String,
  },
  post_date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000,
  },
  status: {
    type: String,
    enum: ["draft", "complete", "delete"],
    default: "draft",
    required: true,
  },
  creator_id: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true,
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
  comment_ids: {
    type: [Schema.Types.ObjectId],
    ref: "Comment",
  },
  article_region_en: {
    type: [String], // [country, city]
  },
  article_region_zh: {
    type: [String], // [country, city]
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
  },
});

// article_region 換成經緯度後要加這行
// articleSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("Article", articleSchema);
