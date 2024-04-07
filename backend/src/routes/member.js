const express = require("express");
const router = express.Router();
const memberController = require("../controllers/member");
const cookieJwtAuth = require("../middlewares/cookieJwtAuth");

router.put("/edit-page", cookieJwtAuth, memberController.modifyInfo);
router.get("/edit-page", cookieJwtAuth, memberController.showInfo);
router.get("/member/:uid", cookieJwtAuth, memberController.showDetailedInfo);

module.exports = router;
