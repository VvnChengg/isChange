const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const { Server } = require("socket.io");

require("dotenv").config(); // 加了這行就可以抓到 port

const socketPort = process.env.SOCKET_PORT || 8080;
const corsOrigin =
  process.env.CORS_ORIGIN ||
  `http://localhost:${process.env.CLIENT_PORT || 3001}`;

const io = new Server(socketPort, {
  cors: {
    origin: [corsOrigin], // client
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
}); // 初始化 WebSocket 伺服器

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
const chatRoutes = require("./src/routes/chat");
const postRoutes = require("./src/routes/post");
const tourRoutes = require("./src/routes/tour.js");
const memberAuthRoutes = require("./src/routes/memberAuth");
const memberRoutes = require("./src/routes/member");
const productRoutes = require("./src/routes/product");
const ssoRoutes = require("./src/routes/SSO");
const commonRoutes = require("./src/routes/common");
const geoRoutes = require("./src/routes/geolocation");

// app.use('/api/名稱', 路徑)
app.use("/api/chat", chatRoutes);
app.use("/api/post", postRoutes);
app.use("/api/tour", tourRoutes);
app.use("/api/member-auth", memberAuthRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/trans", productRoutes);
app.use("/api/sso", ssoRoutes);
app.use("/api/common", commonRoutes);
app.use("/api/geo", geoRoutes);

// 啟動 HTTP 伺服器
const server = app.listen(process.env.PORT || 3000, () =>
  console.log(
    `Server running on port http://localhost:${server.address().port}`
  )
);

// Socket 連接事件處理邏輯
io.on("connection", (socket) => {
  // 使用者點開某聊天室細節時，加入此聊天室的（chatid)
  socket.on("join-room", (room) => {
    socket.join(room);
  });

  // 當收到客戶端發送的訊息時，將訊息發送給所有客戶端
  socket.on("send-message", (newMsg, room) => {
    socket.to(room).emit("receive-message", newMsg); // 傳送到私人聊天室
  });

  // 當客戶端與後端斷開連接時
  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

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
