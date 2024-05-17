const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const socketPort = process.env.SOCKET_PORT || 8080;
const clientPort = process.env.CLIENT_PORT || 3001;

const io = require("socket.io")(socketPort, {
  cors: {
    origin: [`http://localhost:${clientPort}`], // client
  }
}); // 初始化 WebSocket 伺服器

require("dotenv").config(); // 加了這行就可以抓到 port

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const chatRoutes = require("./src/routes/chat");
const postRoutes = require("./src/routes/post");
const tourRoutes = require("./src/routes/tour.js");
const memberAuthRoutes = require("./src/routes/memberAuth");
const memberRoutes = require("./src/routes/member");
const productRoutes = require("./src/routes/product");
const commonRoutes = require("./src/routes/common");

// app.use('/api/名稱', 路徑)
app.use("/api/chat", chatRoutes);
app.use("/api/post", postRoutes);
app.use("/api/tour", tourRoutes);
app.use("/api/member-auth", memberAuthRoutes);
app.use("/api/member", memberRoutes);
app.use("/api/trans", productRoutes);
app.use("/api/common", commonRoutes);

// 啟動 HTTP 伺服器
const server = app.listen(process.env.PORT || 3000, () =>
  console.log(
    `Server running on port http://localhost:${server.address().port}`
  )
);

// WebSocket 連接事件處理邏輯
io.on("connection", (socket) => {
  // console.log(socket.id);
  console.log("A client connected.")

  // 使用者點開某聊天室細節時，加入此聊天室的（chatid)
  socket.on("join-room", room => {
    socket.join(room)
    // console.log("[BE] A user join", room)
  })

  // 當收到客戶端發送的訊息時，將訊息發送給所有客戶端
  socket.on("send-message", (newMsg, room) => {
    // socket.broadcast.emit("receive-message", newMsg) // 傳送給不是自己的人 ok
    // console.log("[BE]", newMsg, room) // 都有接到
    socket.broadcast.to(room).emit("receive-message", newMsg) // 傳送到私人聊天室
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