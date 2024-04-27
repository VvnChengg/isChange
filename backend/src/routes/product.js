const express =  require('express');
const productApi = require('../controllers/product.js');
const validateToken = require("../../src/middlewares/validateToken");

const router = express.Router();

router.post('/create', productApi.createProduct);
router.get('/edit/:tid', productApi.checkEditingProduct);
router.put('/edit/:tid', productApi.editProduct);
router.delete('/delete', productApi.deleteProduct);
router.get('/detail/:tid', productApi.productDetail);
router.get('/share/:tid', productApi.shareProduct);

module.exports = router;