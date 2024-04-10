const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat");

router.get("/check", chatController.checkChat);
router.post("/create", chatController.createChat);
router.get("/chatlist", chatController.getChatList);
router.get("/detail/:cid", chatController.getChatDetail);
router.post("/sendtext/:cid", chatController.sendMessage);

module.exports = router;