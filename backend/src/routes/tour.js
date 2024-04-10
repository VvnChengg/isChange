const express =  require('express');
const tourApi = require('../controllers/tour.js');

const router = express.Router();

router.post('/create', tourApi.createTour);
router.get('/detail/:eid', tourApi.checkTourDetail);
router.get('/edit/:eid', tourApi.checkEditingTour);
router.put('/edit/:eid', tourApi.editTour);
router.delete('/delete', tourApi.deleteTour);
router.get('/list/established', tourApi.getEstablishedTours);
router.get('/list/finished', tourApi.getFinishedTours);

module.exports = router;