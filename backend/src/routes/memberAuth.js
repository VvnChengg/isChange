const express = require("express");
const router = express.Router();
const memberAuthController = require("../controllers/memberAuth");

router.get("/login", memberAuthController.LOR);
router.get("/login", memberAuthController.login);
router.post("/register", memberAuthController.registerMember);
router.get("/register", memberAuthController.verifyRegisterMember);
router.patch("/register", memberAuthController.verifiedMember);
router.delete("/delete", memberAuthController.deleteTestMember);

module.exports = router;
