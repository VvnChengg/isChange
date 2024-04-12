const Article = require('../models/article');
const Event = require('../models/event');
const Product = require('../models/product');
const { validatePost, validatePut } = require('../middlewares/post');
const article = require('../models/article');

const getAllPosts = async (req, res, next) => {
    let articles, events, products;
    let result = [];
    try {
        // 取得所有文章、活動、商品資訊
        articles = await Article.find({},);   
        events = await Event.find({},);
        products = await Product.find({},); 

        // 抽取文章需要的資訊並統一格式
        articles.forEach(article => {
            const item = {
                title: article.article_title,
                content: article.content,
                type: "article",
                coverPhoto: article.article_pic,
                datetime: article.post_date
            };
            result.push(item);
            console.log("creator id: ", article.creator_id);
        });

        // 抽取活動需要的資訊並統一格式
        events.forEach(event => {
            const item = {
                title: event.event_title,
                content: event.event_intro,
                type: "event",
                datetime: event.start_time
            };
            result.push(item);
        });

        // 抽取商品需要的資訊並統一格式
        products.forEach(product => {
            const item = {
                title: product.product_title,
                content:product.description,
                type: "product",
                coverPhoto:product.product_pic,
                datetime: product.post_time
            };
            result.push(item);
        });

        // 依時間倒序排序
        result.sort((a, b) => {
            return new Date(b.datetime) - new Date(a.datetime);
        }
        );
    } catch (err) {
        return next(err);
    }
    if (!articles && !events && !products) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(200).json({ result });
};

const updatePost = async (req, res, next) => {
    // 測試可用 http://localhost:3000/api/post/6617996b1067c62b7d70464e
    try {
        const pId = req.params.pid;
        const updates = {article_title: req.body.title,content: req.body.content};
        let post = await Article.findById(pId);
        if (!post) {
            return res.status(404).json({ message: '貼文不存在' });
        }
        const { error } = await validatePut.validateAsync(updates);
        if (error) {
            return res.status(400).json({ error });
        }
        post = await Article.findByIdAndUpdate(pId, updates, { new: true });
        res.status(200).json({ message: '成功更新貼文' });
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
            return res.status(404).json({ message: '貼文不存在' });
        }
        res.status(200).json({ message: '成功刪除貼文', post });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllPosts = getAllPosts;
exports.updatePost = updatePost;
exports.deletePost = deletePost;