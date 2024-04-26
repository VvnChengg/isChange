const Chat = require("../models/chat");
const Message = require("../models/message");
const Member = require("../models/member");

// GET 確認聊天是否已存在
const checkChat = async (req, res) => {
    try {
        const { receiver_id } = req.params;
        const { userId } = req.body; // 使用者的 member._id, 如果是 object 就轉成 string

        // console.log(userId, receiver_id)

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
        const { userId, receiver_id } = req.body;

        // console.log(userId, receiver_id)

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

        // console.log(newChat)

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

        // Convert photo data to base64
        let photoBase64 = null;
        if (member.photo && member.photo.contentType) {
            photoBase64 = `data:${member.photo.contentType
                };base64,${member.photo.data.toString("base64")}`;
        }

        res.status(200).json({
            chat_to_photo: photoBase64,
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

        // 直接從 user 的 chat_ids list 抓出聊天
        const user = await Member.findById(userId);
        const chatData = [];

        // console.log(user.chat_ids);

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

            // Convert photo data to base64
            let photoBase64 = null;
            if (member.photo && member.photo.contentType) {
                photoBase64 = `data:${member.photo.contentType
                    };base64,${member.photo.data.toString("base64")}`;
            }

            // 將資料添加到 chatData 中
            chatData.push({
                chat_to_photo: photoBase64,
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

// POST 傳送訊息 ok
const sendTextMsg = async (req, res) => {
    try {
        const { cid } = req.params;
        const { userId, content } = req.body;

        // 確保 content 和 userId 是有效的
        if (!content || !userId) {
            return res.status(400).json({
                message: 'Invalid content or userId.',
            });
        }

        // 找出聊天，並檢查 chat 是否存在
        const chat = await Chat.findById(cid);
        if (!chat) {
            return res.status(404).json({ error: "This chat doesn't exist." });
        }

        // 檢查使用者是不是聊天成員
        if (userId != chat.first_person.toString() && userId != chat.second_person.toString()) {
            return res.status(400).json({ error: "You are not one of members in this chat." });
        }

        // 建立新訊息
        const newMessage = await Message.create({
            message_type: "text",
            content: content,
            sender_id: userId,
            chat_id: cid,
            timestamp: Date.now(),
        });

        // 更新聊天
        const updateChat = {
            last_message: content,
            last_sender: userId,
            last_update: Date.now(),
        };

        await Chat.findByIdAndUpdate(cid, updateChat);

        // 重新查詢整個聊天的訊息
        const messages = await Message.find({ chat_id: cid });
        // console.log(messages);

        // 回傳整個聊天的訊息
        res.status(200).json({ messages });
    } catch (error) {
        console.error('Failed to send message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

// POST 傳送圖片，未測試
const sendPic = async (req, res) => {
    try {
        const { cid } = req.params;
        const { userId, photo } = req.body;

        const user = await Member.findById(userId);

        // 確保 content 和 userId 是有效的
        if (!photo || !userId) {
            return res.status(400).json({
                message: 'Invalid photo or userId.',
            });
        }

        // 找出聊天，並檢查 chat 是否存在
        const chat = await Chat.findById(cid);
        if (!chat) {
            return res.status(404).json({ error: "This chat doesn't exist." });
        }

        // 檢查使用者是不是聊天成員
        if (userId != chat.first_person.toString() && userId != chat.second_person.toString()) {
            return res.status(400).json({ error: "You are not one of members in this chat." });
        }

        // 取得上傳的圖片
        let photoData;
        if (photo) {
            try {
                photoData = {
                    data: photo.buffer,
                    contentType: photo.mimetype,
                };
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Failed to process photo upload" });
            }
        }

        // 建立新訊息
        const newMessage = await Message.create({
            message_type: "pic",
            photo: photoData,
            sender_id: userId,
            chat_id: cid,
            timestamp: Date.now(),
        });

        console.log(newMessage);

        // 更新聊天
        const updateChat = {
            last_message: user.username + " 傳送了圖片",
            last_sender: userId,
            last_update: Date.now(),
        };

        await Chat.findByIdAndUpdate(cid, updateChat);

        // 重新查詢整個聊天的訊息
        const messages = await Message.find({ chat_id: cid });

        // 回傳整個聊天的訊息
        res.status(200).json({ messages });
    } catch (error) {
        console.error('Failed to send message:', error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

// GET 下載圖片，不確定是什麼效果
const savePic = async (req, res) => {
    try {
        const { mid } = req.params;
        const message = await Message.findById(mid);

        // 檢查是否找到了對應的訊息
        if (!message || !message.photo) {
            return res.status(404).json({ error: 'Message or photo not found' });
        }

        // 設定 HTTP 響應的標頭，告訴瀏覽器返回的是圖片
        res.set('Content-Type', 'image/jpeg'); // 假設圖片是 JPEG 格式

        // 將圖片資料作為回應主體直接發送
        res.send(message.photo);
    } catch (error) {
        console.error('Failed to download image:', error);
        res.status(500).json({ error: 'Failed to download image' });
    }
}

// 刪除聊天 ok
const deleteChat = async (req, res) => {
    try {
        const { cid } = req.params;

        // 查找與該聊天相關聯的所有成員
        const chat = await Chat.findById(cid);
        if (!chat) {
            console.log('Chat not found.');
            return res.status(400).json({
                message: 'Invalid chat id.',
            });;
        }
        const { first_person, second_person } = chat;

        // 從兩個聊天成員的 chat_ids 中刪除 chat_id
        await Member.updateMany(
            { _id: { $in: [first_person, second_person] } },
            { $pull: { chat_ids: cid }, }
        );

        // 刪除聊天本身
        await Chat.findByIdAndDelete(cid);

        return res.status(200).json({ msg: 'Chat deleted successfully.' });
    } catch (error) {
        console.error('Failed to delete chat:', error);
        res.status(500).json({ error: 'Failed to delete chat' });
    }
};

module.exports = {
    checkChat,
    createChat,
    getChatList,
    getChatDetail,
    sendTextMsg,
    sendPic,
    savePic,
    deleteChat
};