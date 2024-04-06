const express = require("express");
const router = express.Router();
const memberAuthController = require("../controllers/memberAuth");

router.put("/login-or-register", memberAuthController.LOR);
router.post("/login", memberAuthController.login);
router.post("/register", memberAuthController.verifiedMember);

module.exports = router;
