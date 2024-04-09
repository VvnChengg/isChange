// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors') ;
const app = express();
require('dotenv').config(); // 加了這行就可以抓到 port

app.use(cors());
app.use(express.json())

// app.use('/api/名稱', 路徑)

// const server = app.listen(process.env.PORT, '0.0.0.0', () =>
//     console.log(`Server running on port http://localhost:${process.env.PORT}`),
// );


// 載入controller
const postRoutes = require('./src/routes/post');
const memberRoutes = require('./src/routes/test');

// 指定route對應的controller
app.use('/post', postRoutes);
app.use('api/', memberRoutes);


const server = app.listen(process.env.PORT || 3000, () =>
    console.log(`Server running on port http://localhost:${server.address().port}`),
);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {dbName: 'isChange'})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Failed to connect to MongoDB');
        console.log(error.message);
    });