const express = require('express');
const router = express.Router();
const validateToken = require("../../src/middlewares/validateToken");

// 載入controller.
var { getAllPosts, getUserPosts, createPost, updatePost, deletePost, getPostDetail, deleteContent } = require("../controllers/post");

// 指定route對應的controller
router.get('/all', getAllPosts);
router.get('/:uid', validateToken, getUserPosts);
router.post('/create', validateToken, createPost);
router.put('/:pid', validateToken, updatePost);
// router.put('/:pid', updatePost);
// router.delete('/:pid', validateToken, deletePost);
router.get('/detail/:pid', getPostDetail);
router.delete('/delete', validateToken, deleteContent);
module.exports = router;