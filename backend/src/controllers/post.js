const Article = require('../models/article');
const Event = require('../models/event');
const Product = require('../models/product');
const Comment = require('../models/comment');
const Member = require('../models/member');
const { validatePut } = require('../middlewares/post');
const { default: mongoose } = require('mongoose');
const moment = require('moment');
const Favorite = require('../models/favorite');

const getAllPosts = async (req, res, next) => {
    let articles, events, products;
    let result = [];
    try {
        // 取得所有文章、活動、商品資訊
        articles = await Article.find({},);
        events = await Event.find({},);
        products = await Product.find({},);

        // 抽取文章需要的資訊並統一格式
        articles.forEach(article => {
            const item = {
                _id: article._id,
                title: article.article_title,
                content: article.content,
                type: "post",
                coverPhoto: convertToBase64(article.article_pic),
                // location: article.location,
                datetime: article.post_date
            };
            result.push(item);
        });

        // 抽取活動需要的資訊並統一格式
        events.forEach(event => {

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
                status: event.status
            };
            result.push(item);
        });

        // 抽取商品需要的資訊並統一格式
        products.forEach(product => {
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
                productType: product.product_type,
                period: product.period,
                status: product.status,
                transactionWay: product.transaction_way
            };
            result.push(item);
        });
        if (result.length <= 0) {
            return res.status(500).json({ message: "資料庫中無任何內容" });
        }   
        // 依時間倒序排序
        result.sort((a, b) => {
            return new Date(b.datetime) - new Date(a.datetime);
        }
        );
    } catch (err) {
        return next(err);
    }
    return res.status(200).json({ result });
};

const getPostDetail = async (req, res, next) => {
    const { pid } = req.params;
    const { userId } = req.body;
    let article, item;
    try {
        article = await Article.findById(pid);
        if (!article) {
            return res.status(404).json({ message: "找不到此文章" });
        }
        // 取得按讚、收藏資料
        const isLiked = article.like_by_user_ids.indexOf(userId);
        const saveList = await Favorite.find({ item_id: pid, save_type: "Article" });
        const isSaved = saveList.filter((save) => save.user_id.equals(userId)).length;

        // 取得評論資料
        const commentList = await getCommentList(pid);

        // 取得文章發布者的資料
        const member = await Member.findById(article.creator_id);
        if (!member) {
            return res.status(404).json({
                success: false,
                message: '此文章的發布者不存在',
            });
        }

        item = {
            _id: article._id,
            title: article.article_title,
            content: article.content,
            type: "post",
            coverPhoto: convertToBase64(article.article_pic),
            // location: article.location,
            datetime: article.post_date,
            creator_id: article.creator_id,
            creator_username: member.username,
            like_count: article.like_by_user_ids.length,  // 按讚數
            save_count: saveList.length,            // 收藏數
            is_liked: isLiked >= 0 ? true : false,   // 使用者是否有按讚
            is_saved: isSaved > 0 ? true : false,   // 使用者是否有收藏
            comment_list: commentList               // 評論串
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
        articles.forEach(article => {
            const item = {
                _id: article._id,
                title: article.article_title,
                content: article.content,
                type: "post",
                coverPhoto: convertToBase64(article.article_pic),
                // location: article.location,
                datetime: article.post_date
            };
            result.push(item);
        });

        events.forEach(event => {
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
                status: event.status
            };
            result.push(item);
        });

        // 抽取商品需要的資訊並統一格式
        products.forEach(product => {
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
                transaction_way: product.transaction_way
            };
            result.push(item);
        });

        // 依時間倒序排序
        result.sort((a, b) => {
            return new Date(b.datetime) - new Date(a.datetime);
        }
        );
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
    if (!post) {
        return res.status(400).json({ message: "未傳入文章創建資訊" });
    }

    try {
        const article_pic = req.file ? {
            data: req.file.buffer,
            contentType: req.file.mimetype
        } : null;
        let newPost = new Article({
            article_title: post.title,
            content: post.content,
            article_pic: article_pic,
            creator_id: post.user_id
            // article_region: post.location
        })
        await newPost.save();
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }

    return res.status(200).json({
        success: true,
        message: "成功創建文章"
    });
}

const updatePost = async (req, res, next) => {
    // 測試可用 http://localhost:3000/api/post/6617996b1067c62b7d70464e
    const uId = req.body.userId;
    const pid = req.params.pid;
    const article_pic = req.file ? {
        data: req.file.buffer,
        contentType: req.file.mimetype
    } : null;
    const updates = { article_title: req.body.title, content: req.body.content, article_pic: article_pic };

    let post = await Article.findById(pid);
    try {
        if (!(Boolean(updates.article_title)) && !(Boolean(updates.content)) && !(Boolean(updates.article_pic))) {
            return res.status(400).json({ message: '沒有收到任何需要更新的資料' })
        }
        // 檢查貼文是否存在
        if (!post) {
            return res.status(404).json({ message: '貼文不存在' });
        }

        // 檢查使用者是否有權限編輯文章
        if (!post.creator_id.equals(uId)) {
            return res.status(401).json({ message: "您沒有權限編輯此文章" });
        }

        // 檢查更新內容是否符合規範
        const { error } = await validatePut.validateAsync(updates);
        if (error) {
            return res.status(400).json({ error });
        }
        post = await Article.findByIdAndUpdate(pid, updates, { new: true });
        res.status(200).json({ message: '成功更新貼文' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    };
}

const deleteContent = async (req, res, next) => {
    const { userId, type, id } = req.body;
    let deleteItem, itemType, model;

    // 檢查 body 是否傳入所有需要的資訊
    if (!userId) {
        return res.status(401).json({ message: "請先登入" });
    }
    if (!id) {
        return res.status(400).json({ message: "請傳入 type (商品種類)和 id (要刪除內容的 id )" });
    }
    try {

        // 依據 type 設定相關內容
        switch (type) {
            case 'post':
                model = Article;
                itemType = "文章";
                break;
            case 'trans':
                model = Product;
                itemType = "商品";
                break;
            case 'tour':
                model = Event;
                itemType = "揪團";
                break;
            default:
                return res.status(400).json({ message: "輸入的 type 不正確，請使用 post, trans 或 tour" });
        }

        deleteItem = await model.findById(id);

        // 檢查是否有找到文章
        if (!deleteItem) {
            return res.status(404).json({ message: itemType + '不存在，或者商品種類設定錯誤' });
        }

        // 檢查使用者是否有權限刪除文章
        if (!deleteItem.creator_id.equals(userId)) {
            return res.status(401).json({ message: "您沒有權限刪除此" + itemType });
        }
        deleteItem = await model.findByIdAndDelete(id);
        res.status(200).json({ message: '成功刪除' + itemType });
    } catch (err) {
        if (err.name === "CastError") {
            return res.status(400).json({ message: "id 無法正確轉換成 ObjectId，請檢查 id 格式" });
        }
        res.status(500).json({ message: err.message });
    }
};

const likePost = async (req, res, next) => {
    const pid = req.params.pid;
    const uId = req.body.userId;
    let res_message = "";

    if (!pid) {
        return res.status(400).json({ message: '請傳入文章id' });
    }

    try {
        // 從資料庫取得貼文內容
        let post = await Article.findById(pid);

        if (!post) {
            return res.status(404).json({ message: '貼文不存在' });
        }

        // 存取按讚人員清單
        let like_list = post.like_by_user_ids;

        // 尋找目前使用者是否在清單中，是 -> 回傳索引值； 否 -> 回傳 -1
        const liked = like_list.indexOf(uId);

        if (liked > -1) {               // 使用者原本有按讚
            like_list.splice(liked, 1);
            res_message = '成功取消按讚'
        } else {                      // 使用者原本沒按讚
            like_list.splice(like_list.length, 0, new mongoose.Types.ObjectId(uId));
            res_message = '成功按讚'
        }

        // 更新資料庫內容
        post = await Article.findByIdAndUpdate(pid, { like_by_user_ids: like_list });
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
        const comments = await Comment.find({ '_id': { $in: post.comment_ids } });
        return comments;
    } catch (err) {
        throw new Error(err);
    }
};

const commentPost = async (req, res, next) => {
    const { pid, text, datetime, userId } = req.body;
    try {
        if (!pid || !text) {
            return res.status(400).json({ message: "請傳入 pid (文章id), text(評論內容)" })
        }

        // 撈要評論的文章資料
        let post = await Article.findById(pid);
        if (!post) {
            return res.status(404).json({ message: "找不到文章" })
        }

        // 製作新的評論物件，並檢查傳入的日期是否符合格式 (YYYY-MM-DDTHH:mm:ssZ)
        // 如果合格就用傳入的時間(datetime)，如果不合格就用現在時間建立
        const parsedDate = moment(datetime, 'YYYY-MM-DDTHH:mm:ssZ', true)
        let newComment = new Comment({
            content: text,
            created_at: parsedDate.isValid() ? parsedDate : Date.now(),
            commentor_id: userId
        })

        // 等待剛才的物件製作完成再繼續
        await newComment.save();

        // 從文章資料中撈出目前的評論列表
        let this_comment_ids = post.comment_ids;

        // 將這則評論塞到列表的最後，並將評論依時間順序進行排列
        this_comment_ids.push(newComment._id);
        const comments = await Comment.find({ '_id': { $in: this_comment_ids } }, 'created_at').sort({ created_at: 1 });
        const sorted_comment_list = comments.map(comment => comment._id);

        // 更新資料庫資料
        await Article.findByIdAndUpdate(pid, { comment_ids: sorted_comment_list });
        res.status(200).json({ message: "留言成功" });
    } catch (err) {
        if (err.name === 'CastError') {
            return res.status(400).json({ message: "pid 無法轉換成 ObjectId" })
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
            save_type: "Article"
        };

        const collection = await Favorite.find({ user_id: userId, item_id: pid, save_type: "Article" });
        if (!collection || collection.length === 0) {
            const fav = await Favorite.create(payload);
            return res.status(201).json({
                success: true,
                message: '成功收藏文章',
                favId: fav._id,
            });
        } else {
            await Favorite.deleteMany({ user_id: userId, item_id: pid, save_type: "Article" });
            return res.status(200).json({
                success: true,
                message: '成功取消收藏文章',
            });
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: '收藏/取消收藏 文章失敗',
        });
    }
}

const getAllPostsSortedByLikes = async (req, res, next) => {
    try {
        // 取得文章、活動、商品資訊
        let articles = await Article.aggregate([
            {
                $project: {
                    title: '$article_title',
                    content: 1,
                    type: { $literal: "post" },
                    coverPhoto: '$article_pic',
                    location: '$article_region',
                    datetime: '$post_date',
                    likesCount: {
                        $size: { $ifNull: ["$like_by_user_ids", []] }
                    }
                }
            }
        ]);

        let events = await Event.aggregate([
            {
                $project: {
                    title: '$event_title',
                    content: '$event_intro',
                    type: { $literal: "tour" },
                    location: '$destination',
                    datetime: '$start_time',
                    likesCount: {
                        $size: { $ifNull: ["$like_by_user_ids", []] }  // 如果 like_by_user_ids 不存在，使用空数组
                    }
                }
            }
        ]);

        let products = await Product.aggregate([
            {
                $project: {
                    title: '$product_title',
                    content: '$description',
                    type: { $literal: "trans" },
                    coverPhoto: '$product_pic',
                    location: '$transaction_region',
                    datetime: '$post_time',
                    likesCount: {
                        $size: { $ifNull: ["$like_by_user_ids", []] }  // 如果 like_by_user_ids 不存在，使用空数组
                    }
                }
            }
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
        return res.status(400).json({ message: '搜尋內容不能為空' });
    }
    
    let result = [];
    try {
        // 正則表達，'i'代表不區分大小寫
        const searchRegex = new RegExp(keyword, 'i');

        let articles = await Article.find({
            $or: [{ article_title: { $regex: searchRegex } }, { content: { $regex: searchRegex } }]
        });
        let events = await Event.find({
            $or: [{ event_title: { $regex: searchRegex } }, { event_intro: { $regex: searchRegex } }]
        });
        let products = await Product.find({
            $or: [{ product_title: { $regex: searchRegex } }, { description: { $regex: searchRegex } }]
        });

        articles.forEach(article => {
            const item = {
                _id: article._id,
                title: article.article_title,
                content: article.content,
                type: "post",
                coverPhoto: convertToBase64(article.article_pic),
                // location: article.location,
                datetime: article.post_date
            };
            result.push(item);
        });

        events.forEach(event => {

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
                status: event.status
            };
            result.push(item);
        });

        products.forEach(product => {
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
                transaction_way: product.transaction_way
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
            message: err.message
        });
    }
};

function convertToBase64(image) {
    let photoBase64 = null;
    if (image && image.contentType) {
        photoBase64 = `data:${image.contentType};base64,${image.data.toString("base64")}`;
    }
    return photoBase64;
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