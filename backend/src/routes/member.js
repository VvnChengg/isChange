const express = require("express");
const router = express.Router();
const memberController = require("../controllers/member");
const validateToken = require("../../src/middlewares/validateToken");

// router.get("/edit-page", validateToken, memberController.showMember);
// router.patch("/edit-page", validateToken, memberController.modifyMember);
// router.get("/member/:uid", validateToken, memberController.showMemberDetail);

module.exports = router;
