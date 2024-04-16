const Chat = require("../models/chat");
const Message = require("../models/message");
const Member = require("../models/member");

// GET 確認聊天是否已存在
const checkChat = async (req, res) => {
    try {
        const { receiver_id } = req.params;
        const { userId } = req.body; // 使用者的 member._id, 如果是 object 就轉成 string
        
        console.log(userId, receiver_id)

        const chat = await Chat.findOne({
            $or: [
                { first_person: userId, second_person: receiver_id },
                { first_person: receiver_id, second_person: userId }
            ]
        });

        // console.log(chat)

        if (!chat) {
            return res.status(200).json({
                chat_id: null,
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
        // const { userId, receiver_id } = req.body;
        // const { receiver_id } = req.query; // test receiver_id 放在 query 裡

        // for 0416 demo
        const { userId } = req.body;
        const receiver_id = "660bbad71dd21a48510f209c";

        console.log(userId, receiver_id)

        const receiver = await Member.findById(receiver_id);
        if (!receiver) {
            res.status(404).json({
                error: 'Receiver not found.',
            });
        }

        // 創建新的聊天
        const newChat = await Chat.create({
            first_person: userId,
            second_person: receiver_id,
            last_message: null,
            last_sender: userId,
            last_update: Date.now(),
            stranger: false // phase 1: accept all chat
        });

        console.log(newChat)

        // 更新兩個使用者的聊天 ID 列表
        await Member.updateMany(
            { _id: { $in: [userId, receiver_id] } },
            { $addToSet: { chat_ids: newChat._id } }
        );

        res.status(201).json({
            new_chat_id: newChat._id,
            message: 'New chat created.'
        });
    } catch (error) {
        console.error('Failed to create chat:', error);
        res.status(500).json({ error: 'Failed to create chat' })
    }
};

// GET 對話細節 ok
const getChatDetail = async (req, res) => {
    try {
        const { cid } = req.params;
        const { userId } = req.body; // 使用者的 member._id, 如果是 object 就轉成 string
        const chat = await Chat.findById(cid);

        // 檢查 chat 是否存在
        if (!chat) {
            return res.status(404).json({ error: "This chat doesn't exist." });
        }

        // 檢查使用者是不是聊天成員
        if (userId != chat.first_person.toString() && userId != chat.second_person.toString()) {
            return res.status(400).json({ error: "You are not one of members in this chat." });
        }

        // 聊天對象的 id
        let chat_to_id;
        if (userId == chat.first_person.toString()) {
            chat_to_id = chat.second_person;
        } else {
            chat_to_id = chat.first_person;
        }

        // 找出聊天對象，回傳照片跟 username
        const member = await Member.findById(chat_to_id);
        const messages = await Message.find({ chat_id: cid });
        // console.log(messages);

        res.status(200).json({
            chat_to_photo: member.photo,
            chat_to_username: member.username,
            messages
        });
    } catch (error) {
        console.error('Failed to show chat detail:', error);
        res.status(500).json({ error: 'Failed to show chat detail' });
    }
};

// GET 聊天列表 ok
const getChatList = async (req, res) => {
    try {
        const userId = req.body.userId;  // 使用者透過 token 或是某方式，抓自己的 member._id
        console.log(userId);

        // 直接從 user 的 chat_ids list 抓出聊天
        const user = await Member.findById(userId);
        const chatData = [];

        console.log(user.chat_ids);

        // 如果用戶沒有聊天，chats 回傳 null
        if (user.chat_ids == null) {
            res.status(200).json({
                chats: null,
                message: "You don't have any chat."
            });
        }

        // 一筆一筆挑出聊天來看
        for (const chatId of user.chat_ids) {
            const chat = await Chat.findById(chatId);
            // 確定聊天對象的 id
            let chat_to_id;
            if (userId.toString() == chat.first_person.toString()) {
                chat_to_id = chat.second_person;
            } else {
                chat_to_id = chat.first_person;
            }

            // 找出聊天對象，回傳照片和使用者名稱
            const member = await Member.findById(chat_to_id);

            // 將資料添加到 chatData 中
            chatData.push({
                chat_to_photo: member.photo,
                chat_to_username: member.username,
                chat_id: chat._id,
                first_person: chat.first_person,
                second_person: chat.second_person,
                last_message: chat.last_message,
                last_sender: chat.last_sender,
                last_update: chat.last_update,
                stranger: chat.stranger
            });
        }

        res.status(200).json({ chats: chatData });
    } catch (error) {
        console.error('Failed to show chatlist:', error);
        res.status(500).json({ error: 'Failed to show chatlist' });
    }
};

// POST 傳送訊息，未完成
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