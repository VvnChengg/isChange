const express = require("express");
const router = express.Router();
const memberAuthController = require("../controllers/memberAuth");

//會員註冊或登入
router.get("/login-or-register", memberAuthController.LOR);
router.post("/login", memberAuthController.login);
router.post("/register", memberAuthController.registerMember);
router.get("/register", memberAuthController.verifyRegisterMember);
router.patch("/register", memberAuthController.verifiedMember);
router.delete("/delete", memberAuthController.deleteTestMember); //後端測試用

module.exports = router;
