const express =  require('express');
const commonApi = require('../controllers/common.js');
const validateToken = require("../../src/middlewares/validateToken");

const router = express.Router();

router.post('/favorite', validateToken, commonApi.addToFavorite);
router.get('/favorite/:user_id', validateToken, commonApi.viewFavorite);
router.get('/favorite_list/:user_id', validateToken, commonApi.viewFavoriteList);

module.exports = router;