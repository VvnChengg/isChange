const TourModel = require('../models/event.js');

class tourApi {
    async createTour(req, res) {
        try {
            const { event_title, destination, event_intro, start_time, end_time, people_lb, people_ub,  user_id, currency, budget } = req.body;
    
            const payload = {
                event_title,
                destination,
                event_intro,
                start_time,
                end_time,
                people_lb,
                people_ub,
                creator_id: user_id,
                status: 'ongoing',
                like_by_user_ids: [],
                save_by_user_ids: [],
                currency,
                budget
            };
    
            const tour = await TourModel.create(payload);
            console.log("tour", tour);
    
            return res.status(201).json({
                success: true,
                message: '成功建立新揪團',
            });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: '建立新揪團失敗',
            });
        }
    }

    async checkTourDetail(req, res) {
        try {
            const { eid } = req.params;
            const tourDetail = await TourModel.findById(eid);
    
            if (!tourDetail) {
                return res.status(404).json({
                    success: false,
                    message: '找不到該揪團',
                });
            }
    
            // console.log("tourDetail: ", tourDetail);
    
            return res.status(200).json({
                tour: tourDetail,
                success: true,
                message: '查看揪團細節成功',
            });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: '查看揪團細節失敗',
            });
        }
    }

    async checkEditingTour(req, res) {
        try {
            const { eid } = req.params;
            const { user_id } = req.body;
    
            const tour = await TourModel.findById(eid);
            console.log("tour creator_id", tour.creator_id);
    
            if (user_id != tour.creator_id) {
                return res.status(401).json({
                    success: false,
                    message: '沒有權限編輯該揪團',
                });
            }
    
            if (!tour) {
                return res.status(404).json({
                    success: false,
                    message: '找不到該揪團',
                });
            }
    
            return res.status(200).json({
                tour: tour,
                success: true,
                message: '檢視將要編輯的揪團成功',
            });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: '檢視將要編輯的揪團失敗',
            });
        }
    }

    async editTour(req, res) {
        try {
            const { eid } = req.params;
            const payload = req.body;
    
            if (!payload.user_id) {
                return res.status(401).json({
                    success: false,
                    message: '請傳遞user_id',
                });
            }
    
            const tour = await TourModel.findById(eid);
    
            if (payload.user_id != tour.creator_id) {
                return res.status(401).json({
                    success: false,
                    message: '沒有權限編輯該揪團',
                });
            }
    
            await TourModel.findByIdAndUpdate(eid, payload);
    
            return res.status(200).json({
                success: true,
                message: '編輯揪團成功',
            });
    
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                success: false,
                message: '編輯揪團失敗',
            });
        }
    };
}

module.exports = new tourApi();