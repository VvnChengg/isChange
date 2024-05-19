// const geoip = require("node-geolocation");
const geoip = require("geoip2-api");

// const getIpLocation = (req, res, next) => {
//   try {
//     const ip = req.ip; // Assuming req.ip holds the IP address of the client
//     const location = geoip.getLocation(ip);
//     if (!location) {
//       return res.status(404).json({ error: "Location not found" });
//     }
//     req.longitude = location.longitude; // Set longitude in request object
//     req.latitude = location.latitude; // Set latitude in request object
//     next(); // Move to the next middleware or route handler
//   } catch (error) {
//     console.error("Error getting IP location:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while getting IP location" });
//   }
// };

const getIpLocation = async (req, res, next) => {
  try {
    const ip = req.ip; // Assuming req.ip holds the IP address of the client
    // const location = geoip.getLocation(ip);
    const location = await geoip.get("114.34.203.100");
    if (!location) {
      return res.status(404).json({ error: "Location not found" });
    }
    // res.status(200).json({
    //   ip: ip,
    //   longitude: location.data.ll[1], // Set latitude in request object
    //   latitude: location.data.ll[0], // Set longitude in request object
    // });
    req.body.longitude = location.data.ll[1]; // Set longitude in request object
    req.body.latitude = location.data.ll[0]; // Set latitude in request object
    next(); // Move to the next middleware or route handler
  } catch (error) {
    console.error("Error getting IP location:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting IP location" });
  }
};

module.exports = getIpLocation;
