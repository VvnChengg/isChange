const Chat = require("../models/chat");
const Message = require("../models/message");
const Member = require("../models/member");

// GET 確認聊天是否已存在 ok
const checkChat = async (req, res) => {
    try {
        const { receiver_id } = req.params;
        const { userId } = req.body;

        const chat = await Chat.findOne({
            $or: [
                { first_person: userId, second_person: receiver_id },
                { first_person: receiver_id, second_person: userId }
            ]
        });

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
        console.error("Failed to check chat:", error);
        res.status(500).json({ error: "Failed to check chat" });
    }
};

// POST 建立聊天 ok
const createChat = async (req, res) => {
    try {
        const { userId, receiver_id } = req.body;

        const receiver = await Member.findById(receiver_id);
        if (!receiver) {
            res.status(404).json({
                error: "Receiver not found.",
            });
        }

        // 創建新的聊天
        const newChat = await Chat.create({
            first_person: userId,
            second_person: receiver_id,
            last_message: null,
            last_sender: userId,
            last_update: Date.now(),
            stranger: true // phase 3: default is stranger
        });

        // 更新兩個使用者的聊天 ID 列表
        await Member.updateMany(
            { _id: { $in: [userId, receiver_id] } },
            { $addToSet: { chat_ids: newChat._id } }
        );

        res.status(201).json({
            new_chat_id: newChat._id,
            message: "New chat created."
        });
    } catch (error) {
        console.error("Failed to create chat:", error);
        res.status(500).json({ error: "Failed to create chat" })
    }
};

// GET 對話細節 ok
const getChatDetail = async (req, res) => {
    try {
        const { cid } = req.params;
        const { userId } = req.body;

        const [chat, member] = await Promise.all([
            Chat.findById(cid),
            Member.findById(userId)
        ]);

        if (!chat) {
            return res.status(404).json({ error: "Chat not found." });
        }

        // 檢查使用者是否為聊天成員
        if (![chat.first_person.toString(), chat.second_person.toString()].includes(userId.toString())) {
            return res.status(400).json({ error: "You are not one of the members in this chat." });
        }

        // 聊天對象
        const chatToId = chat.first_person.toString() === userId.toString() ? chat.second_person : chat.first_person;
        const chatTo = await Member.findById(chatToId);

        const messages = await Message.find({ chat_id: cid });

        const msgData = messages.map(msg => ({
            _id: msg._id,
            message_type: msg.message_type,
            timestamp: msg.timestamp,
            content: msg.content,
            photo: msg.message_type === "pic" ? `data:${msg.photo.contentType};base64,${msg.photo.data.toString("base64")}` : null,
            sender_id: msg.sender_id,
            read: msg.read
        }));

        // 將對方傳來的訊息設置為已讀
        await Message.updateMany({ chat_id: cid, sender_id: { $ne: userId }, read: false }, { read: true });

        res.status(200).json({
            chat_to_photo: (chatTo.photo && chatTo.photo.contentType) ? `data:${chatTo.photo.contentType};base64,${chatTo.photo.data?.toString("base64")}` : null,
            chat_to_username: chatTo.username,
            messages: msgData
        });
    } catch (error) {
        console.error("Failed to show chat detail:", error);
        res.status(500).json({ error: "Failed to show chat detail" });
    }
};

// GET 聊天列表 ok
const getChatList = async (req, res) => {
    try {
        const userId = req.body.userId;

        // 直接從 user 的 chat_ids list 抓出聊天
        const user = await Member.findById(userId);
        const chatData = [];

        // console.log(user.chat_ids);

        // 如果用戶沒有聊天，chats 回傳 null；如果有就搜
        if (user.chat_ids.length === 0) {
            res.status(200).json({
                chats: null,
                message: "You don't have any chat."
            });
        } else {
            let unread = 0;
            // 一筆一筆挑出聊天來看
            for (const chatId of user.chat_ids) {
                const chat = await Chat.findById(chatId);

                if (!chat) {
                    console.log("There are non-exist chat in your chat_ids.")
                } else {
                    unread = await Message.countDocuments({ chat_id: chatId, sender_id: { $ne: userId }, read: false });
                }

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
                    chat_to_photo: (member.photo && member.photo.contentType) ? `data:${member.photo.contentType};base64,${member.photo.data?.toString("base64")}` : null, // photoBase64,
                    chat_to_username: member.username,
                    chat_id: chat._id,
                    first_person: chat.first_person,
                    second_person: chat.second_person,
                    last_message: chat.last_message,
                    last_sender: chat.last_sender,
                    last_update: chat.last_update,
                    stranger: chat.first_person.toString() === userId.toString() ? false : chat.stranger,
                    unread_cnt: unread
                });
                // console.log(member.username, unread);
            }
            res.status(200).json({ chats: chatData });
        }
    } catch (error) {
        console.error("Failed to show chatlist:", error);
        res.status(500).json({ error: "Failed to show chatlist" });
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
                message: "Invalid content or userId.",
            });
        }

        // 找出聊天，並檢查 chat 是否存在
        const chat = await Chat.findById(cid);
        if (!chat) {
            return res.status(404).json({ error: "Chat not found." });
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

        // 回傳新訊息
        res.status(200).json({ new_message: newMessage });
    } catch (error) {
        console.error("Failed to send message:", error);
        res.status(500).json({ error: "Failed to send message" });
    }
};

// POST 傳送圖片 ok，return 的 json 檔再確認一下
const sendPic = async (req, res) => {
    try {
        const { cid } = req.params;
        const { userId } = req.body;

        const user = await Member.findById(userId);

        // 確保 userId 是有效的
        if (!userId) {
            return res.status(400).json({
                message: "Invalid userId.",
            });
        }

        // 找出聊天，並檢查 chat 是否存在
        const chat = await Chat.findById(cid);
        if (!chat) {
            return res.status(404).json({ error: "Chat not found." });
        }

        // 檢查使用者是不是聊天成員
        if (userId != chat.first_person.toString() && userId != chat.second_person.toString()) {
            return res.status(400).json({ error: "You are not one of members in this chat." });
        }

        // 取得上傳的圖片
        let photoData;
        if (req.file) {
            try {
                photoData = {
                    data: req.file.buffer,
                    contentType: req.file.mimetype,
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

        // console.log(newMessage);

        // Convert photo data to base64 and return
        let photoBase64 = null;
        if (newMessage.photo && newMessage.photo.contentType) {
            photoBase64 = `data:${newMessage.photo.contentType
                };base64,${newMessage.photo.data.toString("base64")}`;
        }
        const returnMessage = {
            _id: newMessage._id,
            message_type: newMessage.message_type,
            photo: photoBase64,
            sender_id: userId,
            chat_id: cid,
            timestamp: newMessage.timestamp,
        };

        // 更新聊天
        const updateChat = {
            last_message: user.username + " 傳送了圖片",
            last_sender: userId,
            last_update: Date.now(),
        };
        await Chat.findByIdAndUpdate(cid, updateChat);

        // 回傳新訊息
        res.status(200).json({ new_message: returnMessage });
    } catch (error) {
        console.error("Failed to send message:", error);
        res.status(500).json({ error: "Failed to send message" });
    }
};

// PATCH 接受陌生訊息 ok
const acceptStranger = async (req, res) => {
    try {
        const { cid } = req.params;

        // 找出聊天，並檢查 chat 是否存在
        const chat = await Chat.findById(cid);
        if (!chat) {
            return res.status(404).json({ error: "Chat not found." });
        }

        await chat.updateOne({ stranger: false });

        return res.status(200).json({ msg: "Chat updated successfully." });
    } catch (error) {
        console.error("Failed to update chat:", error);
        res.status(500).json({ error: "Failed to update chat" });
    }
};

// DELETE 刪除聊天 ok
const deleteChat = async (req, res) => {
    try {
        const { cid } = req.params;

        // 查找與該聊天相關聯的所有成員
        const chat = await Chat.findById(cid);
        // 檢查 chat 是否存在
        if (!chat) {
            return res.status(404).json({ error: "Chat not found." });
        }
        const { first_person, second_person } = chat;

        // 從兩個聊天成員的 chat_ids 中刪除 chat_id
        await Member.updateMany(
            { _id: { $in: [first_person, second_person] } },
            { $pull: { chat_ids: cid }, }
        );

        // 刪除聊天本身
        await Chat.findByIdAndDelete(cid);

        return res.status(200).json({ msg: "Chat deleted successfully." });
    } catch (error) {
        console.error("Failed to delete chat:", error);
        res.status(500).json({ error: "Failed to delete chat" });
    }
};

module.exports = {
    checkChat,
    createChat,
    getChatList,
    getChatDetail,
    sendTextMsg,
    sendPic,
    acceptStranger,
    deleteChat
};