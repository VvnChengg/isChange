const Event = require("../models/event");
const Article = require("../models/article");
const Product = require("../models/product");
const Member = require("../models/member");
require("dotenv").config(); // 加了這行就可以抓到 ipdata api key

const http = require("http");
const socketIo = require("socket.io");
const gpsd = require("node-gpsd");

// 法一:在使用者同意後，後端監聽，取得使用者位置
// const io = socketIo(server);
// const daemon = new gpsd.Listener();

// const getUserLocation = async (req, res) => {
//   const { userId } = req.body;

//   const user = await Member.findOne({ _id: userId });
//   const agreeLocation = user.agree_location;

//   if (agreeLocation) {
//     // 在後端監聽位置資訊，並且傳送到前端
//     daemon.on("TPV", (data) => {
//       if (data.lat && data.lon) {
//         const location = {
//           longitude: data.lon,
//           latitude: data.lat,
//         };
//         io.emit("locationUpdate", location);
//       }
//     });
//   } else {
//     daemon.removeAllListeners("TPV");
//   }
// };

// 法二:在使用者同意後，透過request header的ip address取得使用者位置
// https://hackernoon.com/how-to-find-location-using-ip-address-in-nodejs
// const { SuperfaceClient } = require("@superfaceai/one-sdk");
// const sdk = new SuperfaceClient();
// app.set("trust proxy", true);

// const getIpLocation1 = async (req, res) => {
//   const ip = req.ip;
//   const profile = await sdk.getProfile("address/ip-geolocation@1.0.1");
//   const result = await profile.getUseCase("IpGeolocation").perform(
//     {
//       ipAddress: ip,
//     },
//     {
//       provider: "ipdata",
//       security: {
//         apikey: {
//           apikey: process.env.IPDATA_API_KEY,
//         },
//       },
//     }
//   );

//   try {
//     const data = result.unwrap();
//     return res
//       .status(500)
//       .json({ longitude: data.longitude, latitude: data.latitude });
//   } catch (error) {
//     console.error(error);
//   }
// };

// 法三:在使用者同意後，透過request header的ip address取得使用者位置
const geoip = require("node-geolocation");

const getIpLocation2 = async (req, res) => {
  try {
    const ip = req.ip;
    const location = geoip.getLocation(ip);
    if (!location) {
      res.status(404).json({ error: "Location not found" });
    }
    res
      .status(200)
      .json({ longitude: location.longitude, latitude: location.latitude });
  } catch (error) {
    console.error("Error getting IP location:", error);
    res
      .status(500)
      .json({ error: "An error occurred while getting IP location" });
  }
};

// filter：取得附近文章、揪團、商品
const filterDistance = (req, res) => {
  const { type, longitude, latitude, radius } = req.body; // type: event, article, product

  if (!longitude || !latitude) {
    return res
      .status(400)
      .json({ error: "Longitude and latitude are required" });
  }

  const constructOptions = (locationField) => ({
    // Use $geoWithin when you need to select documents within a specific area, regardless of their order.
    [locationField]: {
      $geoWithin: {
        $centerSphere: [[longitude, latitude], radius / 3963.2],
      },
    },
    // Use $nearSphere when you want to find documents sorted by their distance from a point.
    // [locationField]: {
    //   $nearSphere: {
    //     $geometry: [[longitude, latitude], $ maxDistance: radius],
    //   },
    // },
  });

  let model;
  let locationField;

  switch (type) {
    case "event":
      model = Event;
      locationField = "destination";
      break;
    case "article":
      model = Article;
      locationField = "article_region";
      break;
    case "product":
      model = Product;
      locationField = "transaction_region";
      break;
    default:
      return res.status(400).json({ error: "Invalid type" });
  }

  const options = constructOptions(locationField);

  model
    .find(options)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(`Error finding ${type}s:`, error);
      res
        .status(500)
        .json({ error: `An error occurred while finding ${type}s` });
    });
};

// sort：文章、揪團、商品依距離排序
const sortDistance = (req, res) => {
  const { type, longitude, latitude, radius } = req.body; // type: event, article, product

  if (!longitude || !latitude) {
    return res
      .status(400)
      .json({ error: "Longitude and latitude are required" });
  }

  const constructOptions = (locationField) => ({
    // Use $geoWithin when you need to select documents within a specific area, regardless of their order.
    // [locationField]: {
    //   $geoWithin: {
    //     $centerSphere: [[longitude, latitude], radius / 3963.2],
    //   },
    // },
    // Use $nearSphere when you want to find documents sorted by their distance from a point.
    [locationField]: {
      $nearSphere: {
        $geometry: { type: "Point", coordinates: [longitude, latitude] },
        $maxDistance: radius,
      },
    },
  });

  let model;
  let locationField;

  switch (type) {
    case "event":
      model = Event;
      locationField = "destination";
      break;
    case "article":
      model = Article;
      locationField = "article_region";
      break;
    case "product":
      model = Product;
      locationField = "transaction_region";
      break;
    default:
      return res.status(400).json({ error: "Invalid type" });
  }

  const options = constructOptions(locationField);

  model
    .find(options)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.error(`Error finding ${type}s:`, error);
      res
        .status(500)
        .json({ error: `An error occurred while finding ${type}s` });
    });
};
//法二:使用aggregate，依距離排序
// model
//   .aggregate([
//     {
//       $geoNear: {
//         near: { type: "Point", coordinates: [longitude, latitude] },
//         distanceField: "dist.calculated",
//         maxDistance: radius,
//         spherical: true,
//       },
//     },
//     { $match: options },
//   ])
//   .exec((err, data) => {
//     if (err) {
//       console.error(`Error finding ${type}s:`, err);
//       return res
//         .status(500)
//         .json({ error: `An error occurred while finding ${type}s` });
//     }
//     res.json(data);
//   });
// };

module.exports = {
  getUserLocation,
  getIpLocation1,
  getIpLocation2,
  findNearby,
};
