// 1. 需先在 cmd 安裝 faker:
//    npm install --save-dev @faker-js/faker
// 2. 執行方式:
//    node src\script\generateFakeData.js
const { faker } = require('@faker-js/faker'); // 可產生假資料的模組
const mongoose = require('mongoose');
const Article = require('../models/article'); 
const Member = require('../models/member');
require('dotenv').config();

NUM_FAKE_DATA = 10; // 要生成幾筆假資料

mongoose.connect(process.env.MONGODB_URL, {dbName: 'isChange'});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Failed to connect to MongoDB:'));

db.once('open', async function() {
    console.log("Connect to MongoDB");

    // 先清空collection內容
    try {
        // 刪除 Article 集合内的所有document
        await Article.deleteMany({});
        console.log('Deleted all documents in collection');

    } catch (error) {
        console.error('Failed to delete all documents in collection:', error);
    }

    // 抓 member collection 的資料
    const randomMembers = await Member.find().distinct('_id');
    const randomMemberIds = randomMembers.map(member => member._id);

    // 生成假資料
    const fakeArticles = [];

    for (let i = 0; i < NUM_FAKE_DATA; i++) { 
        const fakeArticle = {
            article_title: faker.lorem.words({min:1, max:3}),   // 生成1~3個單字 (為了不超過30字)
            article_pic:  faker.image.url(),
            post_date: faker.date.past(),
            content: faker.lorem.paragraphs({min: 2, max: 5}, '<br/>\n'),   //生成 2~5個段落的文章，不同段落使用\n分行
            status: faker.helpers.arrayElement(['draft', 'complete']),  // 從陣列中隨機挑一個狀態
            creator_id: randomMemberIds[Math.floor(Math.random() * randomMemberIds.length)],    // 抽一個發文者
            like_by_user_ids: randomMemberIds.slice(0, Math.floor(Math.random() * randomMemberIds.length)),   // 抽多個按讚者(沒有排除發文者本人、最少0個人)，下面同理
            save_by_user_ids: randomMemberIds.slice(0, Math.floor(Math.random() * randomMemberIds.length)),
            comment_ids: randomMemberIds.slice(0, Math.floor(Math.random() * randomMemberIds.length))
        };

        fakeArticles.push(fakeArticle);
    }

    // 將假資料插入 Article 集合
    try {
        await Article.insertMany(fakeArticles);
        console.log('Inserted fake data');
    } catch (error) {
        console.error('Fail to in sert fake data:', error);
    }

    // 關閉連結
    mongoose.disconnect();
});
