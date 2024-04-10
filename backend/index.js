const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
app.use(express.json());
require("dotenv").config(); // 加了這行就可以抓到 port

app.use(cors());
app.use(express.json());

const chatRoutes = require("./src/routes/chat");
const postRoutes = require("./src/routes/post");
const tourRoutes = require("./src/routes/tour.js");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use('/api/名稱', 路徑)
app.use("/api/chat", chatRoutes);
app.use('/api/post', postRoutes);
app.use('/api/tour', tourRoutes);

// for test
// const memberRoutes = require('./src/routes/test');
// app.use('api/', memberRoutes);

// show member info: localhost:3000/api/members
// const memberRoutes = require("./src/routes/test");
// app.use("/api", memberRoutes);
const memberAuthRoutes = require("./src/routes/memberAuth");
app.use("/api/member-auth", memberAuthRoutes);
const memberRoutes = require("./src/routes/member");
app.use("/api/member", memberRoutes);

const server = app.listen(process.env.PORT || 3000, () =>
  console.log(
    `Server running on port http://localhost:${server.address().port}`
  )
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL, { dbName: "isChange" })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Failed to connect to MongoDB");
    console.log(error.message);
  });
