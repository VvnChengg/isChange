const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat.js");
const validateToken = require("../../src/middlewares/validateToken");

router.get("/check/:receiver_id", validateToken, chatController.checkChat);
router.post("/create", validateToken, chatController.createChat);
router.get("/chatlist", validateToken, chatController.getChatList);
router.get("/detail/:cid", validateToken, chatController.getChatDetail);
router.post("/sendtext/:cid", validateToken, chatController.sendTextMsg);
router.post("/sendpic/:cid", validateToken, chatController.sendPic);
router.post("/savepic/:mid", validateToken, chatController.savePic);
router.delete("/delete/:cid", validateToken, chatController.deleteChat); // phase 3

module.exports = router;