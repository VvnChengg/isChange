const Chat = require("../models/chat")
const Message = require("../models/message")
const mongoose = require('mongoose');

// 確認聊天是否已存在
const checkChat = async (req, res) => {
    try {
        const { user_id, receiver_id } = req.body;

        const chat = await Chat.findOne({
            $or: [
                { first_person: user_id, second_person: receiver_id },
                { first_person: receiver_id, second_person: user_id }
            ]
        });

        console.log(chat)

        if (!chat) {
            return res.status(200).json( {chat_id: ""});
        } else {
            return res.status(200).json( {chat_id: chat._id});
        }

    } catch (error) {
        console.error('Failed to check chat:', error);
        res.status(500).json({ error: 'Failed to check chat' });
    }
};

// 建立聊天
const createChat = async (req, res) => {
    try {
        const { user_id, receiver_id } = req.body;
        // const uid = "660bbad71dd21a48510f209c"; // 

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

        res.status(201).json({
            success: true,
            message: 'New chat created.',
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

// 對話細節 ok
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

// 聊天列表 應該 ok
const getChatList = async (req, res) => {
    try {
        const { uid } = req.body.user_id;  // not sure
        // const uid = "660bbad71dd21a48510f209c"; // test ok

        console.log(uid);

        const chats = await Chat.find({
            $or: [
                { first_person: uid },
                { second_person: uid }
            ]
        });

        res.status(200).json({ chats });
    } catch (error) {
        console.error('Failed to show chatlist:', error);
        res.status(500).json({ error: 'Failed to show chatlist' });
    }
};

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

// get member data
// router.get('/members', async (req, res) => {
//     try {
//         const members = await Member.find({}, 'username intro exchage_school_name region'); // column names
//         res.json({ members });
//     } catch (error) {
//         console.error('Failed to fetch members:', error);
//         res.status(500).json({ error: 'Failed to fetch members' });
//     }
// });
