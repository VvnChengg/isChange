const express = require("express");
const router = express.Router();
const geolocationController = require("../controllers/geolocation.js");
const validateToken = require("../middlewares/validateToken.js");

// router.get("/check/:receiver_id", validateToken, chatController.checkChat);

module.exports = router;
