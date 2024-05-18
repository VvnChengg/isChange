const Event = require("../models/event");
const Article = require("../models/article");
const Product = require("../models/product");
require("dotenv").config(); // 加了這行就可以抓到 ipdata api key

// filter：取得附近文章、揪團、商品
const filterDistanceAll = async (req, res) => {
  const { longitude, latitude, radius } = req.body;
  const radius_int = parseInt(radius);
  try {
    // 取得文章資訊
    let articles = await Article.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          distanceField: "dist.calculated",
          maxDistance: radius_int,
          spherical: true,
        },
      },
      {
        $project: {
          title: "$article_title",
          content: 1,
          type: { $literal: "post" },
          coverPhoto: "$article_pic",
          location: "$location",
          article_region_en: "$article_region_en",
          article_region_zh: "$article_region_zh",
          datetime: "$post_date",
        },
      },
    ]);

    // 取得活動資訊
    let events = await Event.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          distanceField: "dist.calculated",
          maxDistance: radius_int,
          spherical: true,
        },
      },
      {
        $project: {
          title: "$event_title",
          content: "$event_intro",
          type: { $literal: "tour" },
          location: "$location",
          destination_en: "$destination_en",
          destination_zh: "$destination_zh",
          datetime: "$start_time",
        },
      },
    ]);

    // 取得商品資訊
    let products = await Product.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          distanceField: "dist.calculated",
          maxDistance: radius_int,
          spherical: true,
        },
      },
      {
        $project: {
          title: "$product_title",
          content: "$description",
          type: { $literal: "trans" },
          coverPhoto: "$product_pic",
          location: "$location",
          transaction_region_en: "$transaction_region_en",
          transaction_region_zh: "$transaction_region_zh",
          datetime: "$post_time",
        },
      },
    ]);

    // 合併所有結果
    let result = [...articles, ...events, ...products];

    if (result.length === 0) {
      return res.status(404).json({ message: "沒有找到任何內容" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// sort：文章、揪團、商品依距離排序
const sortDistanceAll = async (req, res) => {
  const { longitude, latitude } = req.body;
  const maxDistanceEarth = 40075 * 1000;
  try {
    // 取得文章資訊
    let articles = await Article.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          distanceField: "dist.calculated",
          maxDistance: maxDistanceEarth,
          spherical: true,
        },
      },
      {
        $project: {
          title: "$article_title",
          content: 1,
          type: { $literal: "post" },
          coverPhoto: "$article_pic",
          location: "$location",
          article_region_en: "$article_region_en",
          article_region_zh: "$article_region_zh",
          datetime: "$post_date",
        },
      },
    ]);

    // 取得活動資訊
    let events = await Event.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          distanceField: "dist.calculated",
          maxDistance: maxDistanceEarth,
          spherical: true,
        },
      },
      {
        $project: {
          title: "$event_title",
          content: "$event_intro",
          type: { $literal: "tour" },
          location: "$location",
          destination_en: "$destination_en",
          destination_zh: "$destination_zh",
          datetime: "$start_time",
        },
      },
    ]);

    // 取得商品資訊
    let products = await Product.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          distanceField: "dist.calculated",
          maxDistance: maxDistanceEarth,
          spherical: true,
        },
      },
      {
        $project: {
          title: "$product_title",
          content: "$description",
          type: { $literal: "trans" },
          coverPhoto: "$product_pic",
          location: "$location",
          transaction_region_en: "$transaction_region_en",
          transaction_region_zh: "$transaction_region_zh",
          datetime: "$post_time",
        },
      },
    ]);

    // 合併所有結果
    let result = [...articles, ...events, ...products];

    if (result.length === 0) {
      return res.status(404).json({ message: "沒有找到任何內容" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  filterDistanceAll,
  sortDistanceAll,
};
