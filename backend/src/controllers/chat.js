const Chat = require("../models/chat");
const Message = require("../models/message");
const Member = require("../models/member");
const mongoose = require('mongoose');

// GET 確認聊天是否已存在
const checkChat = async (req, res) => {
    try {
        const user_id = req.body.user_id; // 使用者透過 token 或是某方式，抓自己的 member._id
        // const user_id = "660bbad71dd21a48510f209c"; // test ok
        const { receiver_id } = req.query; // 聊天對象的 id 放在 query 或 params 裡？待討論

        console.log(user_id, receiver_id)

        const chat = await Chat.findOne({
            $or: [
                { first_person: user_id, second_person: receiver_id },
                { first_person: receiver_id, second_person: user_id }
            ]
        });

        console.log(chat)

        if (!chat) {
            return res.status(200).json({
                chat_id: "",
                message: "No chat found."
            });
        } else {
            return res.status(200).json({
                chat_id: chat._id,
                message: "Chat found."
            });
        }
    } catch (error) {
        console.error('Failed to check chat:', error);
        res.status(500).json({ error: 'Failed to check chat' });
    }
};

// POST 建立聊天
const createChat = async (req, res) => {
    try {
        const user_id = req.body.user_id;
        const receiver_id = req.body.receiver_id;
        // const user_id = "660bbad71dd21a48510f209c"; // test 
        // const { receiver_id } = req.query; // test receiver_id 放在 query 裡

        console.log(user_id, receiver_id)

        const receiver = await Member.findById(receiver_id);
        if (!receiver) {
            res.status(404).json({
                success: false,
                message: 'Receiver not found.',
            });
        }

        // 創建新的聊天
        const newChat = await Chat.create({
            first_person: user_id,
            second_person: receiver_id,
            last_message: "",
            last_sender: user_id,
            last_update: Date.now(),
            stranger: false // phase 1: accept all chat
        });

        console.log(newChat)

        // 更新兩個使用者的聊天 ID 列表
        await Member.updateMany(
            { _id: { $in: [user_id, receiver_id] } },
            { $addToSet: { chat_ids: newChat._id } }
        );

        res.status(201).json({
            success: true,
            message: 'New chat created.',
            newChatId: newChat._id
        });
    } catch (error) {
        console.error('Failed to create chat:', error);
        res.status(500).json({ error: 'Failed to create chat' })
    }
};

// const createChat = async (user_id, receiver_id) => {
//     try {
//         // 創建新的聊天
//         const newChat = await Chat.create({
//             first_person: user_id,
//             second_person: receiver_id,
//             last_message: "",
//             last_sender: "",
//             last_update_time: Date.now(),
//             stranger: false // phase 1: accept all chat
//         });

//         console.log("New chat created");
//         console.log(newChat)

//         return newChat;
//     } catch (error) {
//         console.error('Failed to create chat:', error);
//     }
// };

// GET 對話細節 ok
const getChatDetail = async (req, res) => {
    try {
        const { cid } = req.params;
        const messages = await Message.find({
            chat_id: cid
        });

        console.log(messages);

        res.status(200).json({ messages });

    } catch (error) {
        console.error('Failed to show chat detail:', error);
        res.status(500).json({ error: 'Failed to show chat detail' });
    }
};

// GET 聊天列表 應該 ok
const getChatList = async (req, res) => {
    try {
        const { uid } = req.body.user_id;  // 使用者透過 token 或是某方式，抓自己的 member._id
        // const uid = "660bbad71dd21a48510f209c"; // test ok

        console.log(uid);

        const chats = await Chat.find({
            $or: [
                { first_person: uid },
                { second_person: uid }
            ]
        });

        // 直接從 user 的 chat_ids list 抓出聊天
        // const user = await Member.findById(uid);
        // const chats = await Chat.find({
        //      _id: { $in: user.chat_ids } 
        // });

        res.status(200).json({ chats });
    } catch (error) {
        console.error('Failed to show chatlist:', error);
        res.status(500).json({ error: 'Failed to show chatlist' });
    }
};

// POST 傳送訊息，尚未測試
const sendMessage = async (req, res) => {
    try {
        const { cid } = req.params;
        const msg = req.body;

        // 找出聊天，新增訊息
        const chat = await Chat.findById(cid);

        if (msg.sender_id != chat.first_person && msg.sender_id != chat.second_person) {
            return res.status(401).json({
                success: false,
                message: 'User is not in this chat.',
            });
        }

        const updateChat = {
            last_message: req.body.content,
            
        }

        await Chat.findByIdAndUpdate(cid, updateChat);
        
        // 抓出所有訊息
        const messages = await Message.find({
            chat_id: cid
        });

        console.log(messages);

        res.status(200).json({ messages });
    } catch (error) {
        console.error('Failed to send message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

module.exports = {
    checkChat,
    createChat,
    getChatList,
    getChatDetail,
    sendMessage
};