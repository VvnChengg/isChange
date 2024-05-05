const geoip = require("node-geolocation");

const getIpLocation = (req, res, next) => {
  try {
    const ip = req.ip; // Assuming req.ip holds the IP address of the client
    const location = geoip.getLocation(ip);
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    req.longitude = location.longitude; // Set longitude in request object
    req.latitude = location.latitude; // Set latitude in request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error("Error getting IP location:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting IP location" });
  }
};

module.exports = getIpLocation;
