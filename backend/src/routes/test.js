const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// 定義路由
router.get('/test', async (req, res) => {
    try {
        // 獲取所有資料庫的名稱
        const databases = await mongoose.connection.db.admin().listDatabases();
        const databaseNames = databases.databases.map(db => db.name);
        console.log('List of databases:', databaseNames);
        res.json({ databases: databaseNames });
    } catch (error) {
        console.error('Failed to list databases:', error);
        res.status(500).json({ error: 'Failed to list databases' });
    }
});

module.exports = router;
