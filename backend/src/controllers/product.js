const ProductModel = require('../models/product.js');

class productApi {
    async createProduct(req, res) {
        try {
            const { product_title, product_pic, description, product_type, currency, price, period, transaction_region, transaction_way, user_id } = req.body;

            const payload = {
                product_title,
                product_pic,
                description,
                product_type,
                post_time: new Date().getTime(),
                currency,
                price,
                period,
                status: "in stock",
                transaction_region,
                transaction_way,
                creator_id: user_id,
                like_by_user_ids: [],
                save_by_user_ids: []
            };
    
            const trans = await ProductModel.create(payload);
    
            return res.status(201).json({
                success: true,
                message: '成功建立新商品',
                transId: trans._id,
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: '建立新商品失敗',
            });
        }
    }

    async checkEditingProduct(req, res) {
        try {
            const { tid } = req.params;
            const { user_id } = req.body;
    
            const trans = await ProductModel.findById(tid);
    
            if (user_id != trans.creator_id) {
                return res.status(401).json({
                    success: false,
                    message: '沒有權限編輯該交易',
                });
            }
    
            if (!trans) {
                return res.status(404).json({
                    success: false,
                    message: '找不到該交易',
                });
            }
    
            return res.status(200).json({
                trans: trans,
                success: true,
                message: '檢視將要編輯的交易成功',
            });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: '檢視將要編輯的交易失敗',
            });
        }
    }

    async editProduct(req, res) {
        try {
            const { tid } = req.params;
            const { user_id } = req.body;
            const payload = req.body;

            const trans = await ProductModel.findById(tid);
    
            if (user_id != trans.creator_id) {
                return res.status(401).json({
                    success: false,
                    message: '沒有權限編輯該交易',
                });
            }
    
            const newTrans = await ProductModel.findByIdAndUpdate(tid, payload);
    
            return res.status(200).json({
                success: true,
                message: '編輯交易成功',
                trans: newTrans
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: '編輯交易失敗',
            });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { trans_id } = req.body;

            if (!trans_id) {
                return res.status(400).json({
                    success: false,
                    message: '請傳遞trans_id',
                });
            }

            await ProductModel.findByIdAndDelete(trans_id);
            return res.status(200).json({
                success: true,
                message: '刪除交易成功'
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: '刪除交易失敗',
            });
        }
    }

    async productDetail(req, res) {
        try {
            const { tid } = req.params;
    
            const trans = await ProductModel.findById(tid);
            if (!trans) {
                return res.status(404).json({
                    success: false,
                    message: '找不到該交易',
                });
            }
    
            return res.status(200).json({
                success: true,
                message: '檢視交易詳細資訊成功',
                trans: trans,
            });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: '檢視交易詳細資訊失敗',
            });
        }
    }

    async shareProduct(req, res) {
        try {
            const { tid } = req.params;

            return res.status(200).json({
                success: true,
                message: '已複製商品連結',
                url: process.env.FRONTEND_URL + `/trans/detail/${tid}`,
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: '分享商品失敗',
            });
        }
    }
}

module.exports = new productApi();