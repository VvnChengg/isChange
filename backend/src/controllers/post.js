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
                title: article.article_title,
                content: article.content,
                type: "post",
                coverPhoto: article.article_pic,
                datetime: article.post_date,
                region: article.article_region
            };
            result.push(item);
            // console.log("creator id: ", article.creator_id);
        });

        // 抽取活動需要的資訊並統一格式
        events.forEach(event => {
            const item = {
                title: event.event_title,
                content: event.event_intro,
                type: "tour",
                datetime: event.start_time,
                region: event.event_region,
                currency: event.currency,
                budget: event.budget,
                destination: event.destination,
                end_time: event.end_time,
                people_lb: event.people_lb,
                people_ub: event.people_ub,
                creator_id: event.creator_id,
                status: event.status
            };
            result.push(item);
        });

        // 抽取商品需要的資訊並統一格式
        products.forEach(product => {
            const item = {
                title: product.product_title,
                content: product.description,
                type: "trans",
                coverPhoto: product.product_pic,
                datetime: product.post_time,
                region: product.transaction_region,
                currency: product.currency,
                price: product.currency,
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
    if (!articles && !events && !products) {
        return res.status(500).json({ message: err.message });
    }
    return res.status(200).json({ result });
};

const getUserPosts = async (req, res, next) => {
    let articles;
    let result = [];
    const searchId = req.params.uid;
    const uId = req.body.userId;
    try {
        // const user = await memberAuth.findOne({user_id: uId});
        // if(!user){
        //     return res.status(404).json({message: "User not found"});
        // }
        // 若查看的不是自己的文章，只能看到已發佈的文章(狀態:complete)
        if(uId == searchId){
            articles = await Article.find({creator_id: searchId},);
        }else{
            articles = await Article.find({creator_id: searchId, status:"complete"},);
        }
        // 抽取文章需要的資訊並統一格式
        articles.forEach(article => {
            const item = {
                title: article.article_title,
                content: article.content,
                type: "article",
                status: article.status,
                coverPhoto: article.article_pic,
                datetime: article.post_date
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
    if (!articles) {
        return res.status(500).json({ message: "尚未發文" });
    }
    return res.status(200).json({ result });
};

const createPost = async (req, res, next) => {
    const postData = req.body;
    const uId = req.body.userId;
    if (!postData) {
        return res.status(404).json({ message: "未傳入文章創建資訊" });
    }
    try {
        newPost = new Article({
            article_title: postData.title,
            content: postData.content,
            article_pic: postData.photo,
            status: postData.status,
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
    try {
        const pId = req.params.pid;
        const updates = { article_title: req.body.title, content: req.body.content, status: req.body.status};
        let post = await Article.findById(pId);

        // 檢查貼文是否存在
        if (!post) {
            return res.status(404).json({ message: '貼文不存在' });
        }

        // 檢查使用者是否有權限編輯文章
        if(!post.creator_id.equals(uId)){
            return res.status(401).json({message:"您沒有權限編輯此文章"});
        }

        // 檢查更新內容是否符合規範
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
    const uId = req.body.userId;
    let post;
    try {
        // 找到貼文內容
        post = await Article.findByIdAndDelete(pId);

        // 檢查是否有找到文章
        if (!post) {
            return res.status(404).json({ message: '貼文不存在' });
        }

        // 檢查使用者是否有權限刪除文章
        if(!post.creator_id.equals(uId)){
            return res.status(401).json({message:"您沒有權限刪除此文章"});
        }
        res.status(200).json({ message: '成功刪除貼文'});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllPosts = getAllPosts;
exports.getUserPosts = getUserPosts;
exports.createPost = createPost;
exports.updatePost = updatePost;
exports.deletePost = deletePost;