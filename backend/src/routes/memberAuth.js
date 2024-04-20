const express = require("express");
const router = express.Router();
const memberAuthController = require("../controllers/memberAuth");

//會員註冊或登入
router.get("/login-or-register", memberAuthController.LOR);
router.post("/login", memberAuthController.login);
router.post("/register/email", memberAuthController.registerMember);
router.post(
  "/register/verification",
  memberAuthController.verifyRegisterMember
);
router.get("/register/checkuser", memberAuthController.checkUsername);
router.patch("/register", memberAuthController.verifiedMember);
router.patch("/forget-pwd", memberAuthController.forgetPwd);
router.delete("/delete", memberAuthController.deleteTestMember); //後端測試用

module.exports = router;
