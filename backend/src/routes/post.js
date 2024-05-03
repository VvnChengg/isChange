const express = require('express');
const router = express.Router();
const validateToken = require("../../src/middlewares/validateToken");
const checkTokenExist = require("../middlewares/checkTokenExist")

// 載入controller.
var { getAllPosts, getUserPosts, createPost, updatePost, getPostDetail, deleteContent, likePost, commentPost, collectProduct } = require("../controllers/post");

// 指定route對應的controller
router.get('/all', getAllPosts);
router.get('/:uid', getUserPosts);
router.post('/create', validateToken, createPost);
router.put('/:pid', validateToken, updatePost);
router.get('/detail/:pid', checkTokenExist, getPostDetail);
router.delete('/delete', validateToken, deleteContent);
router.put('/like/:pid', validateToken, likePost);
router.post('/comment', validateToken, commentPost);
router.post('/save/:pid', validateToken, collectProduct);
module.exports = router;