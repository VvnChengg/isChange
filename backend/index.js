const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors') ;
const app = express();
app.use(express.json());
require('dotenv').config(); // 加了這行就可以抓到 port

app.use(cors());
app.use(express.json())

const chatRoutes = require("./src/routes/chat");
const postRoutes = require('./src/routes/post');
const tourRoutes = require('./src/routes/tour.js');

// app.use('/api/名稱', 路徑)
app.use("/chat", chatRoutes);
app.use('/post', postRoutes);
app.use('/api/tour', tourRoutes);

// for test
// const memberRoutes = require('./src/routes/test');
// app.use('api/', memberRoutes);


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