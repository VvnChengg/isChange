// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors') ;

require('dotenv').config(); // 加了這行就可以抓到 port

const app = express();

app.use(cors());

// app.use('/api/名稱', 路徑)

// const server = app.listen(process.env.PORT, '0.0.0.0', () =>
//     console.log(`Server running on port http://localhost:${process.env.PORT}`),
// );

const chatRoutes = require("./src/routes/chat");
app.use("/api/chat", chatRoutes);

// show member info: localhost:3000/api/members
const memberRoutes = require('./src/routes/test');
app.use('/api', memberRoutes);

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