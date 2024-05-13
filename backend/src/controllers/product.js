const ProductModel = require("../models/product.js");
const FavoriteModel = require("../models/favorite.js");
const MemberModel = require("../models/member.js");

class productApi {
  async createProduct(req, res) {
    try {
      console.log(req.file);

      let { location, transaction_region_en, transaction_region_zh } = req.body;

      if (typeof location === "string") {
        location = JSON.parse(location);
      }
      if (typeof transaction_region_en === "string") {
        transaction_region_en = JSON.parse(transaction_region_en);
      }
      if (typeof transaction_region_zh === "string") {
        transaction_region_zh = JSON.parse(transaction_region_zh);
      }

      const {
        product_title,
        description,
        product_type,
        currency,
        price,
        period,
        transaction_way,
        user_id,
      } = req.body;

      const product_pic = req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : null; // 判斷是否有文件被上傳

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
        transaction_region_en,
        transaction_region_zh,
        location,
        transaction_way,
        creator_id: user_id,
        like_by_user_ids: [],
        save_by_user_ids: [],
      };

      const trans = await ProductModel.create(payload);

      return res.status(201).json({
        success: true,
        message: "成功建立新商品",
        transId: trans._id,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "建立新商品失敗",
      });
    }
  }

  async checkEditingProduct(req, res) {
    try {
      const { tid } = req.params;
      const { user_id } = req.query;

      const trans = await ProductModel.findById(tid);
      console.log("check before" + user_id);

      // Convert image data to base64
      let photoBase64 = null;
      if (trans.product_pic && trans.product_pic.contentType) {
        photoBase64 = `data:${
          trans.product_pic.contentType
        };base64,${trans.product_pic.data.toString("base64")}`;
      }

      let responseTrans = trans.toObject(); // Convert the Mongoose document to a plain JavaScript object
      delete responseTrans.product_pic;
      responseTrans.product_pic = photoBase64;

      if (user_id !== trans.creator_id.toString()) {
        return res.status(401).json({
          success: false,
          message: "沒有權限編輯該交易",
        });
      }

      if (!trans) {
        return res.status(404).json({
          success: false,
          message: "找不到該交易",
        });
      }

      return res.status(200).json({
        trans: responseTrans,
        success: true,
        message: "檢視將要編輯的交易成功",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "檢視將要編輯的交易失敗",
      });
    }
  }

  async editProduct(req, res) {
    try {
      let { location, transaction_region_en, transaction_region_zh } = req.body;
      if (typeof location === "string") {
        location = JSON.parse(location);
      }

      if (typeof transaction_region_en === "string") {
        transaction_region_en = JSON.parse(transaction_region_en);
      }

      if (typeof transaction_region_zh === "string") {
        transaction_region_zh = JSON.parse(transaction_region_zh);
      }

      // console.log(location, transaction_region_en, transaction_region_zh);
      const { tid } = req.params;
      const user_id = req.body.userId;
      const product_pic = req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : null; // 判斷是否有文件被上傳

      const payload = {
        ...req.body,
        product_pic,
        location,
        transaction_region_en,
        transaction_region_zh,
      };

      //   console.log(req.body);
      //   console.log(payload);
      //   console.log(tid);

      const trans = await ProductModel.findById(tid);

      //   console.log("check before" + user_id);
      //   console.log(trans.creator_id.toString());
      if (user_id !== trans.creator_id.toString()) {
        return res.status(401).json({
          success: false,
          message: "沒有權限編輯該交易",
        });
      }

      const newTrans = await ProductModel.findByIdAndUpdate(tid, payload);

      return res.status(200).json({
        success: true,
        message: "編輯交易成功",
        trans: newTrans,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "編輯交易失敗",
      });
    }
  }
  async deleteProduct(req, res) {
    try {
      const { trans_id } = req.body;

      if (!trans_id) {
        return res.status(400).json({
          success: false,
          message: "請傳遞trans_id",
        });
      }

      await ProductModel.findByIdAndDelete(trans_id);
      return res.status(200).json({
        success: true,
        message: "刪除交易成功",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "刪除交易失敗",
      });
    }
  }

  async productDetail(req, res) {
    try {
      const { tid } = req.params;

      const trans = await ProductModel.findById(tid);

      // Convert image data to base64
      let photoBase64 = null;
      if (trans.product_pic && trans.product_pic.contentType) {
        photoBase64 = `data:${
          trans.product_pic.contentType
        };base64,${trans.product_pic.data.toString("base64")}`;
      }

      let responseTrans = trans.toObject(); // Convert the Mongoose document to a plain JavaScript object
      delete responseTrans.product_pic;
      responseTrans.product_pic = photoBase64;

      if (!trans) {
        return res.status(404).json({
          success: false,
          message: "找不到該交易",
        });
      }

      // 取得交易發布者的資料
      const member = await MemberModel.findById(trans.creator_id);
      if (!member) {
        return res.status(404).json({
          success: false,
          message: "此交易的發布者不存在",
        });
      }
      responseTrans.creator_username = member.username;

      return res.status(200).json({
        success: true,
        message: "檢視交易詳細資訊成功",
        trans: responseTrans,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "檢視交易詳細資訊失敗",
      });
    }
  }

  async shareProduct(req, res) {
    try {
      const { tid } = req.params;

      return res.status(200).json({
        success: true,
        message: "已複製商品連結",
        url: process.env.FRONTEND_URL + `/trans/detail/${tid}`,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "分享商品失敗",
      });
    }
  }

  async collectProduct(req, res) {
    try {
      const { user_id, tid } = req.body;

      const payload = {
        user_id,
        item_id: tid,
        save_type: "Product",
      };

      const collection = await FavoriteModel.find({
        user_id,
        item_id: tid,
        save_type: "Product",
      });
      if (!collection || collection.length === 0) {
        const fav = await FavoriteModel.create(payload);
        return res.status(201).json({
          success: true,
          message: "成功收藏商品",
          favId: fav._id,
        });
      } else {
        await FavoriteModel.deleteMany({
          user_id,
          item_id: tid,
          save_type: "Product",
        });
        return res.status(200).json({
          success: true,
          message: "成功取消收藏商品",
        });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "收藏/取消收藏 商品失敗",
      });
    }
  }

  async viewCollection(req, res) {
    try {
      const { user_id } = req.params;
      const collection = await FavoriteModel.find({
        user_id,
        save_type: "Product",
      });

      return res.status(200).json({
        success: true,
        message: "查看收藏成功",
        collection: collection,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "查看收藏失敗",
      });
    }
  }
}

module.exports = new productApi();
