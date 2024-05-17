const express =  require('express');
const commonApi = require('../controllers/common.js');
const validateToken = require("../../src/middlewares/validateToken");

const router = express.Router();

router.post('/favorite', validateToken, commonApi.addToFavorite);
router.get('/favorite/:user_id', validateToken, commonApi.viewFavorite);

module.exports = router;