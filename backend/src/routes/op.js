const express = require("express");
const router = express.Router();
const opController = require("../controllers/op");

router.get("/copylink", opController.copylink);

module.exports = router;