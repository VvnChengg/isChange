const TourModel = require("../models/event.js");
const MemberModel = require("../models/member.js");

class tourApi {
  async createTour(req, res) {
    try {
      console.log("tour file: ", req.file);

      let { location, destination_en, destination_zh } = req.body;
      if (typeof location === "string") {
        location = JSON.parse(location);
      }

      if (typeof destination_en === "string") {
        destination_en = JSON.parse(destination_en);
      }

      if (typeof destination_zh === "string") {
        destination_zh = JSON.parse(destination_zh);
      }
      const {
        userId,
        event_title,
        event_intro,
        start_time,
        end_time,
        people_lb,
        people_ub,
        currency,
        budget,
      } = req.body;

      const event_pic = req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : null; // 判斷是否有文件被上傳

      const payload = {
        event_title,
        event_pic,
        event_intro,
        location,
        destination_en,
        destination_zh,
        start_time,
        end_time,
        people_lb,
        people_ub,
        creator_id: userId,
        status: "ongoing",
        like_by_user_ids: [],
        save_by_user_ids: [],
        currency,
        budget,
      };

      const tour = await TourModel.create(payload);
      console.log("tour", tour);

      return res.status(201).json({
        success: true,
        message: "成功建立新揪團",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "建立新揪團失敗",
      });
    }
  }

  async checkTourDetail(req, res) {
    try {
      const { eid } = req.params;
      const tourDetail = await TourModel.findById(eid);

      // Convert image data to base64
      let photoBase64 = null;
      if (tourDetail.event_pic && tourDetail.event_pic.contentType) {
        photoBase64 = `data:${
          tourDetail.event_pic.contentType
        };base64,${tourDetail.event_pic.data.toString("base64")}`;
      }

      let responseTour = tourDetail.toObject(); // Convert the Mongoose document to a plain JavaScript object
      delete tourDetail.event_pic;
      tourDetail.event_pic = photoBase64;

      if (!tourDetail) {
        return res.status(404).json({
          success: false,
          message: "找不到該揪團",
        });
      }

      // 取得揪團發布者的資料
      const member = await MemberModel.findById(tourDetail.creator_id);
      if (!member) {
        return res.status(404).json({
          success: false,
          message: "此揪團的發布者不存在",
        });
      }

      responseTour.creator_username = member.username;

      return res.status(200).json({
        tour: responseTour,
        success: true,
        message: "查看揪團細節成功",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "查看揪團細節失敗",
      });
    }
  }

  async checkEditingTour(req, res) {
    try {
      const { eid } = req.params;
      const { userId } = req.query;

      const tour = await TourModel.findById(eid);
      console.log("tour creator_id", tour.creator_id);

      // Convert image data to base64
      let photoBase64 = null;
      if (tour.event_pic && tour.event_pic.contentType) {
        photoBase64 = `data:${
          tour.event_pic.contentType
        };base64,${tour.event_pic.data.toString("base64")}`;
      }

      let responseTour = tour.toObject(); // Convert the Mongoose document to a plain JavaScript object
      delete responseTour.event_pic;
      responseTour.event_pic = photoBase64;

      if (userId != tour.creator_id) {
        return res.status(401).json({
          success: false,
          message: "沒有權限編輯該揪團",
        });
      }

      if (!tour) {
        return res.status(404).json({
          success: false,
          message: "找不到該揪團",
        });
      }

      return res.status(200).json({
        tour: tour,
        success: true,
        message: "檢視將要編輯的揪團成功",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "檢視將要編輯的揪團失敗",
      });
    }
  }

  async editTour(req, res) {
    try {
      const { eid } = req.params;
      const { userId } = req.body;
      const event_pic = req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : null; // 判斷是否有文件被上傳
        
      let { location, destination_en, destination_zh } = req.body;
      if (typeof location === "string") {
        location = JSON.parse(location);
      }

      if (typeof destination_en === "string") {
        destination_en = JSON.parse(destination_en);
      }

      if (typeof destination_zh === "string") {
        destination_zh = JSON.parse(destination_zh);
      }
      const payload = {
        ...req.body,
        event_pic,
        location,
        destination_en,
        destination_zh,
      };

      const tour = await TourModel.findById(eid);

      if (!userId.equals(tour.creator_id)) {
        console.log("userId", userId);
        return res.status(401).json({
          success: false,
          message: "沒有權限編輯該揪團",
        });
      }

      await TourModel.findByIdAndUpdate(eid, payload);

      return res.status(200).json({
        success: true,
        message: "編輯揪團成功",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "編輯揪團失敗",
      });
    }
  }

  async deleteTour(req, res) {
    try {
      const { userId, event_id } = req.body;

      if (!event_id) {
        return res.status(400).json({
          success: false,
          message: "請傳遞event_id",
        });
      }

      // 檢查編輯者是否為該揪團的創建者
      const tour = await TourModel.findById(event_id);
      if (userId != tour.creator_id) {
        return res.status(401).json({
          success: false,
          message: "沒有權限編輯該揪團",
        });
      }

      await TourModel.findByIdAndDelete(event_id);
      return res.status(200).json({
        success: true,
        message: "刪除揪團成功",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "刪除揪團失敗",
      });
    }
  }

  async getEstablishedTours(req, res) {
    try {
      const tours = await TourModel.find({ status: "ongoing" });
      return res.status(200).json({
        established_list: tours,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "取得揪團中列表失敗",
      });
    }
  }

  async getFinishedTours(req, res) {
    try {
      const tours = await TourModel.find({ status: "complete" });
      return res.status(200).json({
        finished_list: tours,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "取得已成團列表失敗",
      });
    }
  }

  async getMyEstablishedTours(req, res) {
    try {
      const { userId } = req.params;

      const tours = await TourModel.find({ creator_id: userId });
      return res.status(200).json({
        my_list: tours,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "取得自己創立的揪團列表失敗",
      });
    }
  }
}

module.exports = new tourApi();
