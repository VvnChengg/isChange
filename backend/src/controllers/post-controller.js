const Article = require('../models/article');
const { validatePost, validatePut } = require('../middlewares/post-validation');

const getAllPosts = async (req, res, next) => {
    let articles;
    try {
        articles = await Article.find({}, 'article_title post_date');   // find 後面接的是要取的欄位
        console.log(articles[0]);
    } catch (err) {
        return next(err);
    }
    if (!articles) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(200).json({ articles });
};

const updatePost = async (req, res, next) => {
    try {
        const pId = req.params.pid;
        const updates = req.body;
        let post = await Article.findById(pId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        const { error } = await validatePut.validateAsync(updates);
        if (error) {
            return res.status(400).json({ error });
        }
        post = await Article.findByIdAndUpdate(pId, updates, { new: true });
        res.status(200).json({ message: 'Update Successfully' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    };
}

const deletePost = async (req, res, next) => {
    const pId = req.params.pid;
    let post;
    try {
        post = await Article.findByIdAndDelete(pId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Delete Successfully', post });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllPosts = getAllPosts;
exports.updatePost = updatePost;
exports.deletePost = deletePost;