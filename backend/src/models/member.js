const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  username: {
    type: String,
    maxlength: 15,
    required: true,
    unique: true,
  },
  intro: {
    type: String,
    maxlength: 200,
    default: null,
  },
  // photo: {
  //   type: String,
  //   validate: {
  //     validator: function (v) {
  //       // 檢查是否為合法的 URL 格式
  //       return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
  //     },
  //     message: "Photo has to be in a valid URL format",
  //   },
  // },
  photo: {
    data: Buffer,
    contentType: String,
  },
  exchange_school_name: {
    type: String,
    maxlength: 50,
  },
  exchange_school_email: {
    type: String,
    unique: true,
    match: /^\S+@\S+\.\S+$/, // 驗證 email 格式
  },
  region: {
    type: String,
    // required: true,
  },
  region_list: {
    type: [String],
  },
  review_list: {
    type: [Number],
  },
  recognition: {
    type: Boolean,
  },
  chat_ids: {
    type: [Schema.Types.ObjectId], // 參考到 chat 集合的 ObjectId
    ref: "Chat", // 設置參考的集合名稱
  },
  follow_ids: {
    type: [Schema.Types.ObjectId], // 參考到 chat 集合的 ObjectId
    ref: "Member", // 設置參考的集合名稱
  },
});

module.exports = mongoose.model("Member", memberSchema);
