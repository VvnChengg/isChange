const FavoriteModel = require('../models/favorite.js');
const Article = require('../models/article.js');
const Event = require('../models/event.js');
const Product = require('../models/product.js');


class commonApi {
    async addToFavorite(req, res) {
        try {
            const { user_id, post_id, type } = req.body;

            const payload = {
                user_id,
                item_id: post_id,
                save_type: type
            };

            const collection = await FavoriteModel.find({ user_id, item_id: post_id, save_type: type });
            if (!collection || collection.length === 0) {
                const fav = await FavoriteModel.create(payload);
                return res.status(201).json({
                    success: true,
                    message: '成功收藏文章',
                    favId: fav._id,
                });
            } else {
                await FavoriteModel.deleteMany({ user_id, item_id: post_id, save_type: type });
                return res.status(200).json({
                    success: true,
                    message: '成功取消收藏文章',
                });
            }
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: '收藏/取消收藏 文章失敗',
            });
        }
    }

    async viewFavorite(req, res) {
        try {
            const { user_id } = req.params;
            const favorite = await FavoriteModel.find({ user_id });

            return res.status(200).json({
                success: true,
                message: '查看收藏成功',
                favorite: favorite,
            })
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: '查看收藏失敗',
            });
        }
    }

    async viewFavoriteList(req, res) {
        try {
            const { user_id } = req.params;
            const favorite = await FavoriteModel.find({ user_id });

            const initialGroups = ["Article", "Event", "Product"];
            const groupedData = favorite.reduce((acc, item) => {
                const { save_type } = item;
                if (!acc[save_type]) {
                    acc[save_type] = [];
                }
                acc[save_type].push(item);
                return acc;
            }, initialGroups.reduce((acc, key) => ({ ...acc, [key]: [] }), {}));

            // 输出分组后的数据
            let articles, events, products;
            let result = [];
            const articleIds = groupedData.Article?.map(item => item.item_id);
            const eventIds = groupedData.Event?.map(item => item.item_id);
            const productIds = groupedData.Product?.map(item => item.item_id);

            articles = await Article.find({ _id: { $in: articleIds } }, { article_pic: 0 });
            events = await Event.find({ _id: { $in: eventIds } }, { event_pic: 0 });
            products = await Product.find({ _id: { $in: productIds } }, { product_pic: 0 });

            // 抽取文章需要的資訊並統一格式
            articles.forEach((article) => {
                // Convert image data to base64
                let photoBase64 = null;
                if (article.article_pic && article.article_pic.contentType) {
                    photoBase64 = `data:${article.article_pic.contentType
                        };base64,${article.article_pic.data.toString("base64")}`;
                }
                const item = {
                    _id: article._id,
                    title: article.article_title,
                    content: article.content,
                    type: "post",
                    coverPhoto: photoBase64,
                    location: article.location,
                    datetime: article.post_date,
                };
                result.push(item);
            });

            events.forEach((event) => {
                console.log("2", event.event_pic);
                // Convert image data to base64
                let photoBase64 = null;
                if (event.event_pic && event.event_pic.contentType) {
                    photoBase64 = `data:${event.event_pic.contentType
                        };base64,${event.event_pic.data.toString("base64")}`;
                }
                const item = {
                    _id: event._id,
                    title: event.event_title,
                    content: event.event_intro,
                    type: "tour",
                    coverPhoto: photoBase64,
                    location: event.location,
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
                console.log("3", product.product_pic);
                // Convert image data to base64
                let photoBase64 = null;
                if (product.product_pic && product.product_pic.contentType) {
                    photoBase64 = `data:${product.product_pic.contentType
                        };base64,${product.product_pic.data.toString("base64")}`;
                }
                const item = {
                    _id: product._id,
                    title: product.product_title,
                    content: product.description,
                    type: "trans",
                    coverPhoto: photoBase64,
                    location: product.location,
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
            if (result.length <= 0) {
                return res.status(200).json({ message: "還沒有收藏內容" });
            }
            // 依時間倒序排序
            result.sort((a, b) => {
                return new Date(b.datetime) - new Date(a.datetime);
            });

            return res.status(200).json({
                success: true,
                message: '查看收藏清單成功',
                result: result,
            })
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: '查看收藏清單失敗',
            });
        }
    }
    async getReactionInfo(item, userId, type) {
        const like_by_user_ids = item.like_by_user_ids;
        const itemId = item._id;
        let isLiked = -1;
        let isSaved = -1;

        const saveList = await FavoriteModel.find({
            item_id: itemId,
            save_type: type,
        });
        if (userId) {
            // 取得按讚、收藏資料
            isLiked = like_by_user_ids.indexOf(userId);
            isSaved = saveList.filter(
                (save) => save.user_id.toString() === userId.toString()
            ).length;
        }
        return { isLiked, isSaved, saveList };
    }
}
module.exports = new commonApi();