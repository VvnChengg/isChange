const express = require('express');
const router = express.Router();

// 載入models(Schema)
const Article = require('../models/article');

// 載入controller.
var { getAllPosts, updatePost, deletePost} = require("../controllers/post");

// 指定route對應的controller
router.get('/all', getAllPosts);
router.put('/:pid', updatePost);
router.delete('/:pid', deletePost);
module.exports = router;