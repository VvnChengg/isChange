const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const memberAuthSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'Member',
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6 // 最小長度為 6
  },
  source: {
    type: String,
    required: true,
    enum: ['credentials', 'google']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/ // 驗證 email 格式
  },
  is_verified: {
    type: Boolean,
    default: false
  },
  verification_code: {
    type: String,
    maxlength: 6 // 最大長度為 6
  },
  student_verification: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now,
  }
});

memberAuthSchema.pre('save', function(next) {
    const memberAuth = this;
    if (!memberAuth.isModified('password')) return next();
  
    bcrypt.hash(memberAuth.password, 10, function(err, hash) {
      if (err) return next(err);
      memberAuth.password = hash;
      next();
    });
  });  

module.exports = mongoose.model('MemberAuth', memberAuthSchema);
