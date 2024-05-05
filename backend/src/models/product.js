const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  product_title: {
    type: String,
    maxlength: 15,
    required: true,
  },
  product_pic: {
    data: Buffer,
    contentType: String,
  },
  description: {
    type: String,
    maxlength: 1000,
    required: true,
  },
  product_type: {
    type: String,
    maxlength: 20,
    required: true,
    enum: [
      "kitchen",
      "living room",
      "restroom",
      "cosmetic",
      "clothing",
      "others",
    ],
  },
  post_time: {
    type: Date,
    required: true,
    default: Date.now,
  },
  currency: {
    type: String,
    required: true,
    enum: ["USD", "GBP", "EUR", "TWD", "CAD", "AUD"],
  },
  price: {
    type: Schema.Types.Decimal128,
    required: true,
  },
  period: {
    type: String,
    maxlength: 100,
  },
  status: {
    type: String,
    maxlength: 10,
    required: true,
    default: "draft",
    enum: ["draft", "in stock", "reserved", "sold"],
  },
  transaction_region: {
    type: String,
    maxlength: 30,
  },
  location: {
    type: "Point",
    coordinates: [
      { type: "Number", float: "double" },
      { type: "Number", float: "double" },
    ],
  },
  transaction_way: {
    type: String,
    maxlength: 10,
    required: true,
    default: "sell",
    enum: ["sell", "purchase", "lend", "borrow"],
  },
  creator_id: {
    type: Schema.Types.ObjectId,
    ref: "Member",
    required: true,
  },
  like_by_user_ids: {
    type: [Schema.Types.ObjectId],
    ref: "Member",
  },
  save_by_user_ids: {
    type: [Schema.Types.ObjectId],
    ref: "Member",
  },
});

// transaction_region 換成經緯度後要加這行
// productSchema.index({ transaction_region: "2dsphere" });

module.exports = mongoose.model("Product", productSchema);
