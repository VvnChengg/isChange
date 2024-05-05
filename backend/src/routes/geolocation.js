const express = require("express");
const router = express.Router();
const geolocationController = require("../controllers/geolocation.js");
const ipLocation = require("../middlewares/ipLocation.js");

router.get("/sort", ipLocation, geolocationController.sortDistance);
router.get("/filter", ipLocation, geolocationController.filterDistance);

module.exports = router;
