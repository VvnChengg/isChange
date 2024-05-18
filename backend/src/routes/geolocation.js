const express = require("express");
const router = express.Router();
const geolocationController = require("../controllers/geolocation.js");
const validateToken = require("../middlewares/validateToken.js");
const getIpLocation = require("../middlewares/ipLocation.js");

router.get("/sort", getIpLocation, geolocationController.sortDistanceAll);
router.get("/filter", getIpLocation, geolocationController.filterDistanceAll);

module.exports = router;
