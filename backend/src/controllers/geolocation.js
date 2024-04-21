const Event = require("../models/event");
const Article = require("../models/article");
const Product = require("../models/product");
const Member = require("../models/member");

const http = require("http");
const socketIo = require("socket.io");
const gpsd = require("node-gpsd");

// 在使用者同意後，取得使用者位置
const io = socketIo(server);
const daemon = new gpsd.Listener();

const getUserLocation = (req, res) => {
  const { userId } = req.body;

  const user = Member.findOne({ _id: userId });
  const agreeLocation = user.agree_location;

  if (agreeLocation) {
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
  } else {
    daemon.removeAllListeners("TPV");
  }
};

// 取得附近文章、揪團、商品
const findNearby = (req, res) => {
  const { type, longitude, latitude, radius } = req.body; // type: event, article, product

  if (!longitude || !latitude) {
    return res
      .status(400)
      .json({ error: "Longitude and latitude are required" });
  }

  if (type == "event") {
    const options = {
      destination: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], radius / 3963.2],
        },
      },
    };

    Event.find(options)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error("Error finding events:", error);
        res
          .status(500)
          .json({ error: "An error occurred while finding events" });
      });
  } else if (type == "article") {
    const options = {
      article_region: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], radius / 3963.2],
        },
      },
    };

    Article.find(options)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error("Error finding articles:", error);
        res
          .status(500)
          .json({ error: "An error occurred while finding articles" });
      });
  } else if (type == "product") {
    const options = {
      transaction_region: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], radius / 3963.2],
        },
      },
    };

    Product.find(options)
      .then((data) => {
        res.json(data);
      })
      .catch((error) => {
        console.error("Error finding products:", error);
        res
          .status(500)
          .json({ error: "An error occurred while finding products" });
      });
  }
};

module.exports = { getUserLocation, findNearby };
