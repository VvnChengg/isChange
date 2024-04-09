const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memberSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "MemberAuth",
    required: true,
  },
  username: {
    type: String,
    maxlength: 15,
    required: true,
  },
  intro: {
    type: String,
    maxlength: 200,
  },
  photo: {
    type: String,
    validate: {
      validator: function (v) {
        // 檢查是否為合法的 URL 格式
        return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(v);
      },
      message: "Invalid URL format",
    },
  },
  exchange_school_name: {
    type: String,
    maxlength: 50,
  },
  region: {
    type: String,
    required: true,
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
