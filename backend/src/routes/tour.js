const express =  require('express');
const tourApi = require('../controllers/tour.js');
const validateToken = require("../../src/middlewares/validateToken");

const router = express.Router();

router.post('/create', validateToken, tourApi.createTour);
router.get('/detail/:eid', tourApi.checkTourDetail);
router.get('/edit/:eid', validateToken, tourApi.checkEditingTour);
router.put('/edit/:eid', validateToken, tourApi.editTour);
router.delete('/delete', validateToken, tourApi.deleteTour);
router.get('/list/established', validateToken, tourApi.getEstablishedTours);
router.get('/list/finished', validateToken, tourApi.getFinishedTours);

module.exports = router;