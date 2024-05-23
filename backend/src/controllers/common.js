const FavoriteModel = require('../models/favorite.js');

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
}

module.exports = new commonApi();