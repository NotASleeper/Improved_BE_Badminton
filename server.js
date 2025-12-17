const express = require("express");
const path = require("path");
const http = require("http");
const { Server } = require("socket.io");
const { sequelize } = require("./models");
const { rootRouter } = require("./routers");
const app = express();
const cors = require("cors");
const chatbotService = require("./services/chatbot");

require("dotenv").config();

app.use(cors());
// cài ứng dụng sử dụng kiểu json
app.use(express.json());

// cài đặt static file
const publicPathDirectory = path.join(__dirname, "./public");
app.use(express.static(publicPathDirectory));

// cài đặt router
app.use("/api/v1", rootRouter);

// Tạo http server từ Express App
const httpServer = http.createServer(app);

// Khởi tạo Socket.io
const io = new Server(httpServer, {
  cors: {
    origin: ".", // Cấu hình CORS cho phép Frontend kết nổi
    methods: ["GET", "POST"],
  },
});

// Xử lý logic kết nối Socket
const socketService = require("./services/socket.service");
const { initVectorStore } = require("./services/chatbot");
socketService.connection(io);

// Lắng nghe trên httpServer thay vì app
const PORT = 3000;
httpServer.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  try {
    await sequelize.authenticate();
    console.log("Kết nối thành công đến cơ sở dữ liệu MySQL.");
    await chatbotService.initVectorStore();
  } catch (error) {
    console.error("Không thể kết nối đến cơ sở dữ liệu MySQL:", error);
  }
});

// // lắng nghe sự kiện kết nối
// app.listen(3000, async () => {
//   console.log("App listening on http://localhost:3000");
//   try {
//     await sequelize.authenticate();
//     console.log("Kết nối thành công đến cơ sở dữ liệu MySQL.");
//   } catch (error) {
//     console.error("Không thể kết nối đến cơ sở dữ liệu MySQL:", error);
//   }
// });
