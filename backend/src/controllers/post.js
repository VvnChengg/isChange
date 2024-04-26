const Article = require('../models/article');
const Event = require('../models/event');
const Product = require('../models/product');
const { validatePut } = require('../middlewares/post');
const Member = require('../models/member');
const memberAuth = require('../models/member-auth');

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
                _id: article._id,
                title: article.article_title,
                content: article.content,
                type: "post",
                coverPhoto: article.article_pic,
                location: article.article_region,
                datetime: article.post_date
            };
            result.push(item);
            // console.log("creator id: ", article.creator_id);
        });

        // 抽取活動需要的資訊並統一格式
        events.forEach(event => {
            const item = {
                _id: event._id,
                title: event.event_title,
                content: event.event_intro,
                type: "tour",
                location: event.destination,
                datetime: event.start_time,
                currency: event.currency,
                budget: event.budget,
                end_time: event.end_time,
                people_lb: event.people_lb,
                people_ub: event.people_ub,
                status: event.status
            };
            result.push(item);
        });

        // 抽取商品需要的資訊並統一格式
        products.forEach(product => {
            const item = {
                _id: product._id,
                title: product.product_title,
                content: product.description,
                type: "trans",
                coverPhoto: product.product_pic,
                location: product.transaction_region,
                datetime: product.post_time,
                currency: product.currency,
                price: product.price,
                product_type: product.product_type,
                period: product.period,
                status: product.status,
                transaction_way: product.transaction_way
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
    if (result.length<=0) {
        return res.status(500).json({ message: "資料庫中無任何內容" });
    }
    return res.status(200).json({ result });
};

const getPostDetail = async (req, res, next) => {
    const { pid } = req.params;
    let article;
    try {
        article = await Article.findOne({ _id: pid },);
        if (!article) {
            return res.status(404).json({ message: "文章不存在" });
        }
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({ message: "pid 無法轉換成 ObjectId" });
        }
        return res.status(400).json({ message: error });
    }
    return res.status(200).json({ article });
};

const getUserPosts = async (req, res, next) => {
    let articles, events, products;
    let result = [];
    const searchId = req.params.uid;
    // const uId = req.body.userId;
    try {
        // 因為取消"草稿"狀態，所以不會有差別了 -> 若查看的不是自己的文章，只能看到已發佈的文章(狀態:complete)
        // if (uId == searchId) {
        //     articles = await Article.find({ creator_id: searchId },);
        // } else {
        //     articles = await Article.find({ creator_id: searchId, status: "complete" },);
        // }
        articles = await Article.find({ creator_id: searchId });
        events = await Event.find({ creator_id: searchId });
        products = await Product.find({ creator_id: searchId });
        console.log(products);
        // 抽取文章需要的資訊並統一格式
        articles.forEach(article => {
            const item = {
                _id: article._id,
                title: article.article_title,
                content: article.content,
                type: "post",
                coverPhoto: article.article_pic,
                location: article.article_region,
                datetime: article.post_date
            };
            result.push(item);
        });

        events.forEach(event => {
            const item = {
                _id: event._id,
                title: event.event_title,
                content: event.event_intro,
                type: "tour",
                location: event.destination,
                datetime: event.start_time,
                currency: event.currency,
                budget: event.budget,
                end_time: event.end_time,
                people_lb: event.people_lb,
                people_ub: event.people_ub,
                status: event.status
            };
            result.push(item);
        });

        // 抽取商品需要的資訊並統一格式
        products.forEach(product => {
            const item = {
                _id: product._id,
                title: product.product_title,
                content: product.description,
                type: "trans",
                coverPhoto: product.product_pic,
                location: product.transaction_region,
                datetime: product.post_time,
                currency: product.currency,
                price: product.price,
                product_type: product.product_type,
                period: product.period,
                status: product.status,
                transaction_way: product.transaction_way
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
    if (result.length<=0) {
        return res.status(500).json({ message: "使用者無創建任何內容" });
    }
    return res.status(200).json({ result });
};

const createPost = async (req, res, next) => {
    const post = req.body;
    const uId = req.body.userId;
    if (!post) {
        return res.status(404).json({ message: "未傳入文章創建資訊" });
    }
    try {
        newPost = new Article({
            article_title: post.title,
            content: post.content,
            article_pic: post.photo,
            status: post.status,
            creator_id: uId
        })
        await newPost.save();
        console.log("new post: ", newPost);
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
    // console.log("發布文章",newPost);
    return res.status(200).json({ message: "成功創建文章" });
}

const updatePost = async (req, res, next) => {
    // 測試可用 http://localhost:3000/api/post/6617996b1067c62b7d70464e
    const uId = req.body.userId;
    const pid = req.params.pid;
    const updates = { article_title: req.body.title, content: req.body.content, status: req.body.status };
    let post = await Article.findById(pid);
    try {
        // 檢查貼文是否存在
        if (!post) {
            return res.status(404).json({ message: '貼文不存在' });
        }

        // 檢查使用者是否有權限編輯文章
        if (!post.creator_id.equals(uId)) {
            return res.status(401).json({ message: "您沒有權限編輯此文章" });
        }

        // 檢查更新內容是否符合規範
        const { error } = await validatePut.validateAsync(updates);
        if (error) {
            return res.status(400).json({ error });
        }
        post = await Article.findByIdAndUpdate(pid, updates, { new: true });
        res.status(200).json({ message: '成功更新貼文' });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    };
}

const deletePost = async (req, res, next) => {
    const { pid } = req.params;
    const uId = req.body.userId;
    let post;
    try {
        // 找到貼文內容
        console.log("pid: ", pid);
        post = await Article.findOne({ "_id": pid },);
        console.log("post", post);
        // 檢查是否有找到文章
        if (!post) {
            return res.status(404).json({ message: '貼文不存在' });
        }

        // 檢查使用者是否有權限刪除文章
        if (!post.creator_id.equals(uId)) {
            return res.status(401).json({ message: "您沒有權限刪除此文章" });
        }
        Article.findOneAndDelete({ "_id": pid },);
        res.status(200).json({ message: '成功刪除貼文' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



exports.getAllPosts = getAllPosts;
exports.getUserPosts = getUserPosts;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;
exports.getPostDetail = getPostDetail;