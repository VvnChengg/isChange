const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.js");
const validateToken = require("../../src/middlewares/validateToken");

router.get("/check", validateToken, chatController.checkChat);
router.post("/create", validateToken, chatController.createChat);
router.get("/chatlist", validateToken, chatController.getChatList);
router.get("/detail/:cid", validateToken, chatController.getChatDetail);
router.post("/sendtext/:cid", validateToken, chatController.sendMessage);

module.exports = router;