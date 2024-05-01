const express =  require('express');
const productApi = require('../controllers/product.js');
const validateToken = require("../../src/middlewares/validateToken");

const router = express.Router();

router.post('/create', validateToken, productApi.createProduct);
router.get('/edit/:tid', validateToken, productApi.checkEditingProduct);
router.put('/edit/:tid', validateToken, productApi.editProduct);
router.delete('/delete', validateToken, productApi.deleteProduct);
router.get('/detail/:tid', productApi.productDetail);
router.get('/share/:tid', productApi.shareProduct);
router.post('/collect', validateToken, productApi.collectProduct);
router.get('/collect/:user_id', validateToken, productApi.viewCollection);

module.exports = router;