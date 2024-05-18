const Event = require("../models/event");
const Article = require("../models/article");
const Product = require("../models/product");
const Member = require("../models/member");
require("dotenv").config(); // 加了這行就可以抓到 ipdata api key

// const http = require("http");
// const socketIo = require("socket.io");
// const gpsd = require("node-gpsd");

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

// // 法二:在使用者同意後，透過request header的ip address取得使用者位置
// // https://hackernoon.com/how-to-find-location-using-ip-address-in-nodejs
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

// // 法三:在使用者同意後，透過request header的ip address取得使用者位置
// const geoip = require("node-geolocation");

// const getIpLocation2 = async (req, res) => {
//   try {
//     const ip = req.ip;
//     const location = geoip.getLocation(ip);
//     if (!location) {
//       res.status(404).json({ error: "Location not found" });
//     }
//     res
//       .status(200)
//       .json({ longitude: location.longitude, latitude: location.latitude });
//   } catch (error) {
//     console.error("Error getting IP location:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while getting IP location" });
//   }
// };

// filter：取得附近文章、揪團、商品
const filterDistance = async (req, res) => {
  const { type, longitude, latitude, radius } = req.body; // type: event, article, product
  // console.log(longitude, latitude);
  if (!longitude || !latitude) {
    return res
      .status(400)
      .json({ error: "Longitude and latitude are required" });
  }

  const constructOptions = (locationField) => ({
    // Use $geoWithin when you need to select documents within a specific area, regardless of their order.
    // [locationField]: {
    //   $geoWithin: {
    //     $centerSphere: [[longitude, latitude], radius / 3963.2], // 3963.2 is the radius of the Earth in miles
    //   },
    // },
    // Use $nearSphere when you want to find documents sorted by their distance from a point.
    [locationField]: {
      $nearSphere: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: radius,
      },
    },
  });

  let model;

  switch (type) {
    case "tour":
      model = Event;
      break;
    case "post":
      model = Article;
      break;
    case "trans":
      model = Product;
      break;
    // default:
    //   return res.status(400).json({ error: "Invalid type" });
  }

  // const data = await Product.find({});
  // console.log(data);
  const options = constructOptions("location.coordinates");

  model
    .find(options)
    .then((data) => {
      const items = [];
      switch (type) {
        case "trans":
          data.forEach((product) => {
            const item = {
              _id: product._id,
              title: product.product_title,
              content: product.description,
              type: "trans",
              coverPhoto: product.product_pic,
              transaction_region_en: product.transaction_region_en,
              transaction_region_zh: product.transaction_region_zh,
              datetime: product.post_time,
              currency: product.currency,
              price: product.price,
              product_type: product.product_type,
              period: product.period,
              status: product.status,
              transaction_way: product.transaction_way,
            };
            items.push(item);
          });
          break;
        case "tour":
          data.forEach((event) => {
            const item = {
              _id: event._id,
              title: event.event_title,
              content: event.event_intro,
              type: "tour",
              destination_en: event.destination_en,
              destination_zh: event.destination_zh,
              datetime: event.start_time,
              currency: event.currency,
              budget: event.budget,
              end_time: event.end_time,
              people_lb: event.people_lb,
              people_ub: event.people_ub,
              status: event.status,
            };
            items.push(item);
          });
          break;
        case "post":
          data.forEach((article) => {
            const item = {
              _id: article._id,
              title: article.article_title,
              content: article.content,
              type: "post",
              coverPhoto: article.article_pic,
              article_region_en: article.article_region_en,
              article_region_ah: article.article_region_zh,
              datetime: article.post_date,
            };
            items.push(item);
          });
          break;
      }
      return res.json(items);
    })
    .catch((error) => {
      console.error(`Error finding ${type}s:`, error);
      return res
        .status(500)
        .json({ error: `An error occurred while finding ${type}s` });
    });
};
// sort：文章、揪團、商品依距離排序
const sortDistance = (req, res) => {
  const { type, longitude, latitude } = req.body; // type: event, article, product

  if (!longitude || !latitude) {
    return res
      .status(400)
      .json({ error: "Longitude and latitude are required" });
  }

  const maxDistanceEarth = 40075 * 1000;
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
        $maxDistance: maxDistanceEarth,
      },
    },
  });

  let model;

  switch (type) {
    case "tour":
      model = Event;
      break;
    case "post":
      model = Article;
      break;
    case "trans":
      model = Product;
      break;
    default:
      return res.status(400).json({ error: "Invalid type" });
  }

  const options = constructOptions("location.coordinates");

  model
    .find(options)
    .then((data) => {
      const items = [];
      switch (type) {
        case "trans":
          data.forEach((product) => {
            const item = {
              _id: product._id,
              title: product.product_title,
              content: product.description,
              type: "trans",
              coverPhoto: product.product_pic,
              transaction_region_en: product.transaction_region_en,
              transaction_region_zh: product.transaction_region_zh,
              datetime: product.post_time,
              currency: product.currency,
              price: product.price,
              product_type: product.product_type,
              period: product.period,
              status: product.status,
              transaction_way: product.transaction_way,
            };
            items.push(item);
          });
          break;
        case "tour":
          data.forEach((event) => {
            const item = {
              _id: event._id,
              title: event.event_title,
              content: event.event_intro,
              type: "tour",
              destination_en: event.destination_en,
              destination_zh: event.destination_zh,
              datetime: event.start_time,
              currency: event.currency,
              budget: event.budget,
              end_time: event.end_time,
              people_lb: event.people_lb,
              people_ub: event.people_ub,
              status: event.status,
            };
            items.push(item);
          });
          break;
        case "post":
          data.forEach((article) => {
            const item = {
              _id: article._id,
              title: article.article_title,
              content: article.content,
              type: "post",
              coverPhoto: article.article_pic,
              article_region_en: article.article_region_en,
              article_region_ah: article.article_region_zh,
              datetime: article.post_date,
            };
            items.push(item);
          });
          break;
      }
      return res.json(items);
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

module.exports = {
  filterDistance,
  sortDistance,
};
