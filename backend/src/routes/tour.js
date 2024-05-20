const express =  require('express');
const tourApi = require('../controllers/tour.js');
const validateToken = require("../../src/middlewares/validateToken");

const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/create', validateToken, upload.single('event_pic'), tourApi.createTour);
router.get('/detail/:eid', tourApi.checkTourDetail);
router.get('/edit/:eid', validateToken, tourApi.checkEditingTour);
router.put('/edit/:eid', validateToken, upload.single('event_pic'), tourApi.editTour);
router.delete('/delete', validateToken, tourApi.deleteTour);
router.get('/list/established', validateToken, tourApi.getEstablishedTours);
router.get('/list/finished', validateToken, tourApi.getFinishedTours);
router.get('/list/:userId', validateToken, tourApi.getMyEstablishedTours);

module.exports = router;