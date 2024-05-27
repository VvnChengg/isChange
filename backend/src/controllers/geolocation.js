const Event = require("../models/event");
const Article = require("../models/article");
const Product = require("../models/product");
require("dotenv").config(); // 加了這行就可以抓到 ipdata api key

// filter：取得附近文章、揪團、商品
const filterDistanceAll = async (req, res) => {
  const { longitude, latitude } = req.body;
  const { radius } = req.query;
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
          _id: 1,
          title: "$article_title",
          content: 1,
          type: { $literal: "post" },
          // coverPhoto: "$article_pic",
          location: "$location",
          article_region_en: "$article_region_en",
          article_region_zh: "$article_region_zh",
          datetime: "$post_date",
          distance: "$dist.calculated",
          status: "$status",
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
          _id: 1,
          title: "$event_title",
          content: "$event_intro",
          type: { $literal: "tour" },
          // event_pic: "$event_pic",
          location: "$location",
          destination_en: "$destination_en",
          destination_zh: "$destination_zh",
          distance: "$dist.calculated",
          currency: "$currency",
          budget: "$budget",
          datetime: "$start_time",
          end_time: "$end_time",
          people_lb: "$people_lb",
          people_ub: "$people_ub",
          creator_id: "$creator_id",
          status: "$status",
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
          _id: 1,
          title: "$product_title",
          content: "$description",
          type: { $literal: "trans" },
          // coverPhoto: "$product_pic",
          location: "$location",
          transaction_region_en: "$transaction_region_en",
          transaction_region_zh: "$transaction_region_zh",
          datetime: "$post_time",
          distance: "$dist.calculated",
          currency: "$currency",
          price: "$price",
          product_type: "$product_type",
          period: "$period",
          status: "$status",
          transaction_way: "$transaction_way",
        },
      },
    ]);

    // 合併所有結果
    let result = [...articles, ...events, ...products];

    result = result.filter(result => result.status !== 'delete');

    result.sort((a, b) => {
      return b.distance - a.distance;
    });

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
          _id: 1,
          title: "$article_title",
          content: 1,
          type: { $literal: "post" },
          // coverPhoto: "$article_pic",
          location: "$location",
          article_region_en: "$article_region_en",
          article_region_zh: "$article_region_zh",
          datetime: "$post_date",
          distance: "$dist.calculated",
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
          _id: 1,
          title: "$event_title",
          content: "$event_intro",
          type: { $literal: "tour" },
          // event_pic: "$event_pic",
          location: "$location",
          destination_en: "$destination_en",
          destination_zh: "$destination_zh",
          distance: "$dist.calculated",
          currency: "$currency",
          budget: "$budget",
          datetime: "$start_time",
          end_time: "$end_time",
          people_lb: "$people_lb",
          people_ub: "$people_ub",
          status: "$status",
          creator_id: "$creator_id",
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
          _id: 1,
          title: "$product_title",
          content: "$description",
          type: { $literal: "trans" },
          // coverPhoto: "$product_pic",
          location: "$location",
          transaction_region_en: "$transaction_region_en",
          transaction_region_zh: "$transaction_region_zh",
          datetime: "$post_time",
          distance: "$dist.calculated",
          currency: "$currency",
          price: "$price",
          product_type: "$product_type",
          period: "$period",
          status: "$status",
          transaction_way: "$transaction_way",
        },
      },
    ]);

    // 合併所有結果
    let result = [...articles, ...events, ...products];

    result = result.filter(result => result.status !== 'delete');

    result.sort((a, b) => {
      return b.distance - a.distance;
    });

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
