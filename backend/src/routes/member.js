const express = require("express");
const router = express.Router();
const memberController = require("../controllers/member");

router.put("/edit-page", memberController.modifyInfo);
router.get("/edit-page", memberController.showInfo);
router.get("/member/:uid", memberController.showDetailedInfo);

module.exports = router;
