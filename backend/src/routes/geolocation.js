const express = require("express");
const router = express.Router();
const geolocationController = require("../controllers/geolocation.js");
const validateToken = require("../middlewares/validateToken.js");
const getIpLocation = require("../middlewares/ipLocation.js");

router.get("/sort", getIpLocation, geolocationController.sortDistance);
router.get("/filter", getIpLocation, geolocationController.filterDistance);

module.exports = router;
