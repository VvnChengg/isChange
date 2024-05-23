const express = require('express');
const router = express.Router();

// token 相關模組
const validateToken = require("../../src/middlewares/validateToken");
const checkTokenExist = require("../middlewares/checkTokenExist")

// 圖片相關模組
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// 載入controller.
var { getAllPosts, getUserPosts, createPost, updatePost, getPostDetail, deleteContent, likePost, commentPost, collectProduct, getAllPostsSortedByLikes, searchPosts, chunkedImage, getImage } = require("../controllers/post");

// 指定route對應的controller
router.get('/all', getAllPosts);
router.get('/hot', getAllPostsSortedByLikes);
router.get('/search', searchPosts);
router.get('/:uid', getUserPosts);
router.post('/create', validateToken, upload.single('article_pic'), createPost);
router.put('/:pid', validateToken, upload.single('article_pic'), updatePost);
router.get('/detail/:pid', checkTokenExist, getPostDetail);
router.delete('/delete', validateToken, deleteContent);
router.put('/like/:pid', validateToken, likePost);
router.post('/comment', validateToken, commentPost);
router.post('/save/:pid', validateToken, collectProduct);
router.post('/coverPhotos', chunkedImage);
router.post('/getPhoto', getImage);
module.exports = router;