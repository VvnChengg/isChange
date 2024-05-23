const Article = require("../models/article");
const Event = require("../models/event");
const Product = require("../models/product");
const Comment = require("../models/comment");
const Member = require("../models/member");
const { validatePut } = require("../middlewares/post");
const { default: mongoose } = require("mongoose");
const moment = require("moment");
const Favorite = require("../models/favorite");
const sharp = require('sharp');


const getAllPosts = async (req, res, next) => {
  let articles, events, products;
  let result = [];
  try {
    // 取得所有文章、活動、商品資訊
    articles = await Article.find({},{article_pic:0});
    events = await Event.find({},{event_pic:0});
    products = await Product.find({},{product_pic:0});

    // 抽取文章需要的資訊並統一格式
    articles.forEach((article) => {
      const item = {
        _id: article._id,
        title: article.article_title,
        content: article.content,
        type: "post",
        coverPhoto: convertToBase64(article.article_pic),
        // location: article.location,
        datetime: article.post_date,
      };
      result.push(item);
    });

    // 抽取活動需要的資訊並統一格式
    events.forEach((event) => {
      const item = {
        _id: event._id,
        title: event.event_title,
        content: event.event_intro,
        type: "tour",
        coverPhoto: convertToBase64(event.event_pic),
        // location: event.location,
        datetime: event.start_time,
        currency: event.currency,
        budget: event.budget,
        end_time: event.end_time,
        people_lb: event.people_lb,
        people_ub: event.people_ub,
        status: event.status,
      };
      result.push(item);
    });

    // 抽取商品需要的資訊並統一格式
    products.forEach((product) => {
      const item = {
        _id: product._id,
        title: product.product_title,
        content: product.description,
        transaction_region_zh: product.transaction_region_zh,
        transaction_region_en: product.transaction_region_en,
        type: "trans",
        coverPhoto: convertToBase64(product.product_pic),
        // location: product.location,
        datetime: product.post_time,
        currency: product.currency,
        price: product.price,
        productType: product.product_type,
        period: product.period,
        status: product.status,
        transactionWay: product.transaction_way,
      };
      result.push(item);
    });
    if (result.length <= 0) {
      return res.status(500).json({ message: "資料庫中無任何內容" });
    }
    // 依時間倒序排序
    result.sort((a, b) => {
      return new Date(b.datetime) - new Date(a.datetime);
    });
  } catch (err) {
    return next(err);
  }
  return res.status(200).json({ result });
};

const getPostDetail = async (req, res, next) => {
  const { pid } = req.params;
  const { userId } = req.query;
  let article, item;
  try {
    article = await Article.findById(pid);
    if (!article) {
      return res.status(404).json({ message: "找不到此文章" });
    }

    let isLiked, isSaved = -1;
    if (userId) {
      // 取得按讚、收藏資料
      isLiked = article.like_by_user_ids.indexOf(userId);
      isSaved = saveList.filter(
        (save) => save.user_id.toString() === userId.toString()
      ).length;
    }

    const saveList = await Favorite.find({
      item_id: pid,
      save_type: "Article",
    });


    // 取得評論資料
    const commentList = await getCommentList(pid);

    // 取得文章發布者的資料
    const member = await Member.findById(article.creator_id);
    if (!member) {
      return res.status(404).json({
        success: false,
        message: "此文章的發布者不存在",
      });
    }

    item = {
      _id: article._id,
      title: article.article_title,
      content: article.content,
      type: "post",
      coverPhoto: convertToBase64(article.article_pic),
      location: article.location,
      datetime: article.post_date,
      creator_id: article.creator_id,
      creator_username: member.username,
      like_count: article.like_by_user_ids.length, // 按讚數
      save_count: saveList.length, // 收藏數
      is_liked: isLiked >= 0 ? true : false, // 使用者是否有按讚
      is_saved: isSaved > 0 ? true : false, // 使用者是否有收藏
      comment_list: commentList, // 評論串
      article_region_en: article.article_region_en,
      article_region_zh: article.article_region_zh,
    };
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "pid 無法轉換成 ObjectId" });
    }
    return res.status(400).json({ message: error });
  }
  return res.status(200).json({ item });
};

const getUserPosts = async (req, res, next) => {
  let articles, events, products;
  let result = [];
  const searchId = req.params.uid;
  // const uId = req.body.userId;
  try {
    articles = await Article.find({ creator_id: searchId });
    events = await Event.find({ creator_id: searchId });
    products = await Product.find({ creator_id: searchId });

    // 抽取文章需要的資訊並統一格式
    articles.forEach((article) => {
      const item = {
        _id: article._id,
        title: article.article_title,
        content: article.content,
        type: "post",
        coverPhoto: convertToBase64(article.article_pic),
        // location: article.location,
        datetime: article.post_date,
      };
      result.push(item);
    });

    events.forEach((event) => {
      const item = {
        _id: event._id,
        title: event.event_title,
        content: event.event_intro,
        type: "tour",
        coverPhoto: convertToBase64(event.event_pic),
        // location: event.location,
        datetime: event.start_time,
        currency: event.currency,
        budget: event.budget,
        end_time: event.end_time,
        people_lb: event.people_lb,
        people_ub: event.people_ub,
        status: event.status,
      };
      result.push(item);
    });

    // 抽取商品需要的資訊並統一格式
    products.forEach((product) => {
      const item = {
        _id: product._id,
        title: product.product_title,
        content: product.description,
        type: "trans",
        coverPhoto: convertToBase64(product.product_pic),
        // location: product.location,
        datetime: product.post_time,
        currency: product.currency,
        price: product.price,
        product_type: product.product_type,
        period: product.period,
        status: product.status,
        transaction_way: product.transaction_way,
      };
      result.push(item);
    });

    // 依時間倒序排序
    result.sort((a, b) => {
      return new Date(b.datetime) - new Date(a.datetime);
    });
  } catch (err) {
    return next(err);
  }
  if (result.length <= 0) {
    return res.status(500).json({ message: "使用者無創建任何內容" });
  }
  return res.status(200).json({ result });
};

const createPost = async (req, res, next) => {
  const post = req.body;
  const uId = req.body.userId;
  if (!post) {
    return res.status(400).json({ message: "未傳入文章創建資訊" });
  }

  try {
    let { location, article_region_en, article_region_zh } = req.body;
    if (typeof location === "string") {
      location = JSON.parse(location);
    }

    if (typeof article_region_en === "string") {
      article_region_en = JSON.parse(article_region_en);
    }

    if (typeof article_region_zh === "string") {
      article_region_zh = JSON.parse(article_region_zh);
    }
    const article_pic = req.file
      ? {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      }
      : null;
    let newPost = new Article({
      article_title: post.title,
      location: location,
      article_region_en: article_region_en,
      article_region_zh: article_region_zh,
      content: post.content,
      article_pic: article_pic,
      creator_id: uId,
      // article_region: post.location
    });
    await newPost.save();
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  return res.status(200).json({
    success: true,
    message: "成功創建文章",
  });
};

const updatePost = async (req, res, next) => {
  // 測試可用 http://localhost:3000/api/post/6617996b1067c62b7d70464e
  const uId = req.body.userId;
  const pid = req.params.pid;
  let { location, article_region_en, article_region_zh } = req.body;
  if (typeof location === "string") {
    location = JSON.parse(location);
  }

  if (typeof article_region_en === "string") {
    article_region_en = JSON.parse(article_region_en);
  }

  if (typeof article_region_zh === "string") {
    article_region_zh = JSON.parse(article_region_zh);
  }
  const article_pic = req.file
    ? {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    }
    : null;
  const updates = {
    article_title: req.body.title,
    location: location,
    article_region_en: article_region_en,
    article_region_zh: article_region_zh,
    content: req.body.content,
    status: req.body.status,
  };
  let post = await Article.findById(pid);
  try {
    if (
      !Boolean(updates.article_title) &&
      !Boolean(updates.location) &&
      !Boolean(updates.content) &&
      !Boolean(updates.article_pic)
    ) {
      return res.status(400).json({ message: "沒有收到任何需要更新的資料" });
    }
    // 檢查貼文是否存在
    if (!post) {
      return res.status(404).json({ message: "貼文不存在" });
    }

    // 檢查使用者是否有權限編輯文章
    if (post.creator_id.toString() !== uId.toString()) {
      return res.status(401).json({ message: "您沒有權限編輯此文章" });
    }

    // 檢查更新內容是否符合規範
    const { error } = await validatePut.validateAsync(updates);
    if (error) {
      return res.status(400).json({ error });
    }
    post = await Article.findByIdAndUpdate(pid, updates, { new: true });
    res.status(200).json({ message: "成功更新貼文" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteContent = async (req, res, next) => {
  const { userId, type, id } = req.body;
  let deleteItem, itemType, model;

  // 檢查 body 是否傳入所有需要的資訊
  if (!userId) {
    return res.status(401).json({ message: "請先登入" });
  }
  if (!id) {
    return res
      .status(400)
      .json({ message: "請傳入 type (商品種類)和 id (要刪除內容的 id )" });
  }
  try {
    // 依據 type 設定相關內容
    switch (type) {
      case "post":
        model = Article;
        itemType = "文章";
        break;
      case "trans":
        model = Product;
        itemType = "商品";
        break;
      case "tour":
        model = Event;
        itemType = "揪團";
        break;
      default:
        return res
          .status(400)
          .json({ message: "輸入的 type 不正確，請使用 post, trans 或 tour" });
    }

    deleteItem = await model.findById(id);

    // 檢查是否有找到文章
    if (!deleteItem) {
      return res
        .status(404)
        .json({ message: itemType + "不存在，或者商品種類設定錯誤" });
    }

    // 檢查使用者是否有權限刪除文章
    if (deleteItem.creator_id.toString() !== userId.toString()) {
      return res.status(401).json({ message: "您沒有權限刪除此" + itemType });
    }
    deleteItem = await model.findByIdAndDelete(id);
    res.status(200).json({ message: "成功刪除" + itemType });
  } catch (err) {
    if (err.name === "CastError") {
      return res
        .status(400)
        .json({ message: "id 無法正確轉換成 ObjectId，請檢查 id 格式" });
    }
    res.status(500).json({ message: err.message });
  }
};

const likePost = async (req, res, next) => {
  const pid = req.params.pid;
  const { userId, type } = req.body;
  let res_message = "";

  if (!pid) {
    return res.status(400).json({ message: "請傳入要按讚的內容id" });
  }

  try {
    // 從資料庫取得貼文內容

    switch (type) {
      case "post":
        model = Article;
        break;
      case "trans":
        model = Product;
        break;
      case "tour":
        model = Event;
        break;
      default:
        return res
          .status(400)
          .json({ message: "輸入的 type 不正確，請使用 post, trans 或 tour" });
    }
    let post = await model.findById(pid);

    if (!post) {
      return res.status(404).json({ message: "找不到指定id的內容" });
    }

    // 存取按讚人員清單
    let like_list = post.like_by_user_ids;

    // 尋找目前使用者是否在清單中，是 -> 回傳索引值； 否 -> 回傳 -1
    let liked = like_list.indexOf(userId);

    if (liked > -1) {
      // 使用者原本有按讚
      like_list.splice(liked, 1);
      res_message = "成功取消按讚";
    } else {
      // 使用者原本沒按讚
      like_list.splice(
        like_list.length,
        0,
        new mongoose.Types.ObjectId(userId)
      );
      res_message = "成功按讚";
    }

    // 更新資料庫內容
    post = await model.findByIdAndUpdate(pid, {
      like_by_user_ids: like_list,
    });
    res.status(200).json({ message: res_message });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "pid 無法轉換成 ObjectId" });
    }
    res.status(500).json({ message: err.message });
  }
};

async function getCommentList(pid) {
  const post = await Article.findById(pid);
  if (!post) {
    throw new Error("找不到文章");
  }
  try {
    const comments = await Comment.find({ _id: { $in: post.comment_ids } });
    const creatorList = comments?.map(item => item.commentor_id);
    const creatorInfo = await Member.find({ _id: { $in: creatorList } }, { username: 1, photo: 1 });
    const result = comments.map(comment => {
      const info = creatorInfo.find(info => info._id.equals(comment.commentor_id));
      return {
        _id: comment._id,
        comment_content: comment.content,
        comment_created_at: comment.created_at,
        username: info ? info.username : null,
        photo: info ? convertToBase64(info.photo) : null,
      };
    });
    return result;

  } catch (err) {
    throw new Error(err);
  }
}

const commentPost = async (req, res, next) => {
  const { pid, text, datetime, userId } = req.body;
  try {
    if (!pid || !text) {
      return res
        .status(400)
        .json({ message: "請傳入 pid (文章id), text(評論內容)" });
    }

    // 撈要評論的文章資料
    let post = await Article.findById(pid);
    if (!post) {
      return res.status(404).json({ message: "找不到文章" });
    }

    // 製作新的評論物件，並檢查傳入的日期是否符合格式 (YYYY-MM-DDTHH:mm:ssZ)
    // 如果合格就用傳入的時間(datetime)，如果不合格就用現在時間建立
    const parsedDate = moment(datetime, "YYYY-MM-DDTHH:mm:ssZ", true);
    let newComment = new Comment({
      content: text,
      created_at: parsedDate.isValid() ? parsedDate : Date.now(),
      commentor_id: userId,
    });

    // 等待剛才的物件製作完成再繼續
    await newComment.save();

    // 從文章資料中撈出目前的評論列表
    let this_comment_ids = post.comment_ids;

    // 將這則評論塞到列表的最後，並將評論依時間順序進行排列
    this_comment_ids.push(newComment._id);
    const comments = await Comment.find(
      { _id: { $in: this_comment_ids } },
      "created_at"
    ).sort({ created_at: 1 });
    const sorted_comment_list = comments.map((comment) => comment._id);

    // 更新資料庫資料
    await Article.findByIdAndUpdate(pid, { comment_ids: sorted_comment_list });
    res.status(200).json({ message: "留言成功" });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ message: "pid 無法轉換成 ObjectId" });
    }
    res.status(500).json({ message: err.message });
  }
};

const collectProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const { userId } = req.body;
    const payload = {
      user_id: userId,
      item_id: pid,
      save_type: "Article",
    };

    const collection = await Favorite.find({
      user_id: userId,
      item_id: pid,
      save_type: "Article",
    });
    if (!collection || collection.length === 0) {
      const fav = await Favorite.create(payload);
      return res.status(201).json({
        success: true,
        message: "成功收藏文章",
        favId: fav._id,
      });
    } else {
      await Favorite.deleteMany({
        user_id: userId,
        item_id: pid,
        save_type: "Article",
      });
      return res.status(200).json({
        success: true,
        message: "成功取消收藏文章",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "收藏/取消收藏 文章失敗",
    });
  }
};

const getAllPostsSortedByLikes = async (req, res, next) => {
  try {
    // 取得文章、活動、商品資訊
    let articles = await Article.aggregate([
      {
        $project: {
          title: "$article_title",
          content: 1,
          type: { $literal: "post" },
          // coverPhoto: "$article_pic",
          location: "$article_region",
          datetime: "$post_date",
          likesCount: {
            $size: { $ifNull: ["$like_by_user_ids", []] },
          },
        },
      },
    ]);

    let events = await Event.aggregate([
      {
        $project: {
          title: "$event_title",
          content: "$event_intro",
          type: { $literal: "tour" },
          location: "$destination",
          datetime: "$start_time",
          currency: "$currency",
          budget: "$budget",
          end_time: "$end_time",
          people_lb: "$people_lb",
          people_ub: "$people_ub",
          status: "$status",
          likesCount: {
            $size: { $ifNull: ["$like_by_user_ids", []] }, // 如果 like_by_user_ids 不存在，使用空数组
          },
        },
      },
    ]);

    let products = await Product.aggregate([
      {
        $project: {
          title: "$product_title",
          content: "$description",
          type: { $literal: "trans" },
          coverPhoto: "$product_pic",
          location: "$transaction_region",
          datetime: "$post_time",
          currency: "$currency",
          price: "$price",
          productType: "$product_type",
          period: "$period",
          status: "$status",
          transactionWay: "$transaction_way",

          likesCount: {
            $size: { $ifNull: ["$like_by_user_ids", []] }, // 如果 like_by_user_ids 不存在，使用空数组
          },
        },
      },
    ]);

    // 合併所有結果
    let result = [...articles, ...events, ...products];

    // 依按讚數量倒序排序
    result.sort((a, b) => b.likesCount - a.likesCount);

    if (result.length === 0) {
      return res.status(404).json({ message: "沒有找到任何內容" });
    }

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const searchPosts = async (req, res) => {
  const { keyword } = req.query;
  if (!keyword) {
    return res.status(400).json({ message: "搜尋內容不能為空" });
  }

  let result = [];
  try {
    // 正則表達，'i'代表不區分大小寫
    const searchRegex = new RegExp(keyword, "i");

    let articles = await Article.find({
      $or: [
        { article_title: { $regex: searchRegex } },
        { content: { $regex: searchRegex } },
      ],
    });
    let events = await Event.find({
      $or: [
        { event_title: { $regex: searchRegex } },
        { event_intro: { $regex: searchRegex } },
      ],
    });
    let products = await Product.find({
      $or: [
        { product_title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
      ],
    });

    articles.forEach((article) => {
      const item = {
        _id: article._id,
        title: article.article_title,
        content: article.content,
        type: "post",
        coverPhoto: convertToBase64(article.article_pic),
        // location: article.location,
        datetime: article.post_date,
      };
      result.push(item);
    });

    events.forEach((event) => {
      const item = {
        _id: event._id,
        title: event.event_title,
        content: event.event_intro,
        type: "tour",
        coverPhoto: convertToBase64(event.event_pic),
        // location: event.location,
        datetime: event.start_time,
        currency: event.currency,
        budget: event.budget,
        end_time: event.end_time,
        people_lb: event.people_lb,
        people_ub: event.people_ub,
        status: event.status,
      };
      result.push(item);
    });

    products.forEach((product) => {
      const item = {
        _id: product._id,
        title: product.product_title,
        content: product.description,
        type: "trans",
        coverPhoto: convertToBase64(product.product_pic),
        // location: product.location,
        datetime: product.post_time,
        currency: product.currency,
        price: product.price,
        product_type: product.product_type,
        period: product.period,
        status: product.status,
        transaction_way: product.transaction_way,
      };
      result.push(item);
    });

    if (result.length === 0) {
      return res.status(200).json({ message: "資料庫中無任何內容" });
    }

    // 依時間倒序排序
    result.sort((a, b) => {
      return new Date(b.datetime) - new Date(a.datetime);
    });

    return res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

function convertToBase64(image) {
  let photoBase64 = null;
  if (image && image.contentType) {
    photoBase64 = `data:${image.contentType};base64,${image.data.toString(
      "base64"
    )}`;
  }
  return photoBase64;
}

const chunkedImage = async (req, res, next) => {
  const { imageIds } = req.body;
  const BATCH_SIZE = 2;
  console.log("imageIds: ", imageIds);

  // 初始化响应头，设置为分块传输编码
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Transfer-Encoding': 'chunked'
  });

  let startIndex = 0;
  try {

    while (startIndex < imageIds.length) {
      const batchIds = imageIds.slice(startIndex, startIndex + BATCH_SIZE);
      console.log('Processing batchIds:', batchIds); // 確認當前批次的 ID
      // 使用 Promise.all 並行執行三個查詢
      const [articleImages, eventImages, productImages] = await Promise.all([
        Article.find({ _id: { $in: batchIds } }, { _id:1, article_pic: 1 }),
        Event.find({ _id: { $in: batchIds } }, { _id:1, event_pic: 1 }),
        Product.find({ _id: { $in: batchIds } }, { _id:1, product_pic: 1 })
      ]);

      // 合併結果
      const images = [
        ...articleImages.map(img => ({ pid: img._id, coverPhoto: convertToBase64(img.article_pic) })),
        ...eventImages.map(img => ({ pid: img._id, coverPhoto: convertToBase64(img.event_pic) })),
        ...productImages.map(img => ({ pid: img._id, coverPhoto: convertToBase64(img.product_pic) }))
      ];
      // 如果找到了圖片，將其寫入响应
      console.log(images);
      if (images.length > 0) {
        res.write(JSON.stringify(images));
        res.write("\n"); // 每批之間增加一個換行符作為分隔
      }

      // 更新起始索引
      startIndex += BATCH_SIZE;
      // await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  } finally {
    // 結束响应
    res.end();
  }
};

const getImage = async (req, res) => {
  const { imageIds } = req.body;
  try {
    const [articleImages, eventImages, productImages] = await Promise.all([
      Article.find({ _id: { $in: imageIds } }, { _id: 1, article_pic: 1 }),
      Event.find({ _id: { $in: imageIds } }, { _id: 1, event_pic: 1 }),
      Product.find({ _id: { $in: imageIds } }, { _id: 1, product_pic: 1 })
    ]);

    // 合併結果
    const images = [
      ...articleImages.map(img => ({ pid: img._id, coverPhoto: convertToBase64(img.article_pic) })),
      ...eventImages.map(img => ({ pid: img._id, coverPhoto: convertToBase64(img.event_pic) })),
      ...productImages.map(img => ({ pid: img._id, coverPhoto: convertToBase64(img.product_pic) }))
    ];
    // 測試壓縮圖片用的
    // let post = await Article.findById("6648f06ee94efb2b30f6521c");
    // let updates = {
    //   article_pic: await compressImage(post.article_pic)
    // };
    // console.log("updates.article_pic", post.article_pic);
    // post = await Article.findByIdAndUpdate("6648e7645fe4372dd1c6f444", updates, { new: true });
    // console.log("post", post.article_pic);
    return res.status(200).json({ images });
  }
  catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};



async function compressImage(image) {
  let photoBase64 = null;
  try {
    if (image && image.contentType) {
      const base64Data = image.data; // 从数据库中获取的 Base64 数据
      const imageBuffer = Buffer.from(base64Data, 'base64');

      const compressedBuffer = await sharp(imageBuffer)
        .resize({ width: 50, withoutEnlargement: true }) // 调整宽度以压缩图片，保持合适的大小
        // .toFormat('jpeg') // 选择一种常见的压缩格式，如 jpeg
        .jpeg({ quality: 80 }) // 设置压缩质量（0-100）
        .toBuffer();

      // photoBase64 = `data:${image.contentType};base64,${compressedBuffer.toString('base64')}`;
      image = {
        data:compressedBuffer.toString('base64'),
        contentType: 'image/jpeg'
      }
      return image
      // return photoBase64;
    }
  } catch (error) {
    console.error('Error compressing image:', error);
    throw new Error('Image compression failed');
  }
}



exports.getAllPosts = getAllPosts;
exports.getUserPosts = getUserPosts;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.getPostDetail = getPostDetail;
exports.deleteContent = deleteContent;
exports.likePost = likePost;
exports.commentPost = commentPost;
exports.collectProduct = collectProduct;
exports.getAllPostsSortedByLikes = getAllPostsSortedByLikes;
exports.searchPosts = searchPosts;
exports.chunkedImage = chunkedImage;
exports.getImage = getImage;
