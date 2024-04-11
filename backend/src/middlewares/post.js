const Joi = require('joi');

// 創建文章時需要的驗證
const validatePost = Joi.object({
    article_title: Joi.string().max(30).required(),
    article_pic: Joi.string().uri(),
    post_date: Joi.date().required(),
    content: Joi.string().max(2000).required(),
    status: Joi.string().valid('draft', 'complete').required()
}).unknown(true);

// 修改文章時的驗證(不會更新所有欄位，所以沒有設定必填)
const validatePut = Joi.object({
    article_title: Joi.string().max(30),
    article_pic: Joi.string().uri()
    // post_date: Joi.date(),
    // content: Joi.string().max(2000),
    // status: Joi.string().valid('draft', 'complete')
}).unknown(true);


module.exports = {
    validatePost,
    validatePut
};

