const Geolocation = require("../models/geolocation");
const http = require("http");
const socketIo = require("socket.io");
const gpsd = require("node-gpsd");

// 取得使用者位置
const io = socketIo(server);
const daemon = new gpsd.Listener();

const getUserLocation = (req, res) => {
  // 在後端監聽位置資訊，並且傳送到前端
  daemon.on("TPV", (data) => {
    if (data.lat && data.lon) {
      const location = {
        longitude: data.lon,
        latitude: data.lat,
      };
      io.emit("locationUpdate", location);
    }
  });
};

// 取得附近使用者
const findNearbyUsers = (req, res) => {
  const { longitude, latitude } = req.body;

  if (!longitude || !latitude) {
    return res
      .status(400)
      .json({ error: "Longitude and latitude are required" });
  }

  const options = {
    location: {
      $geoWithin: {
        $centerSphere: [[longitude, latitude], 15 / 3963.2],
      },
    },
  };

  Geolocation.find(options)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error("Error finding users:", error);
      res.status(500).json({ error: "An error occurred while finding users" });
    });
};

module.exports = {};
