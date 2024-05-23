const express =  require('express');
const productApi = require('../controllers/product.js');
const validateToken = require("../../src/middlewares/validateToken");

const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/create', validateToken, upload.single('product_pic'), productApi.createProduct);
router.get('/edit/:tid', validateToken, productApi.checkEditingProduct);
router.put('/edit/:tid', validateToken, upload.single('product_pic'), productApi.editProduct);
router.delete('/delete', validateToken, productApi.deleteProduct);
router.get('/detail/:tid', productApi.productDetail);
router.get('/share/:tid', productApi.shareProduct);

module.exports = router;