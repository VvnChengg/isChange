const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message_type: {
        type: String,
        maxlength: 5,
        required: true,
        enum: ['pic', 'text']
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        maxlength: 200,
        required: true,
        validate: {
            validator: function(value) {
                // 如果 message_type 是 'pic'，則確認 content 是圖片連結
                if (this.message_type === 'pic') {
                    return /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(value);
                }
                // 否則返回 true（不進行驗證）
                return true;
            },
            message: 'Invalid URL format'
        }
    },
    sender_id: {
        type: Schema.Types.ObjectId,
        ref: 'Member',
        required: true
    },
    chat_id: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    read: {
        type: Boolean,
        default: false,
        required: true
    }
});

module.exports = mongoose.model('Message', messageSchema);
