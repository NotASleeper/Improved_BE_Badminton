const { Chats } = require("../models");
const jwt = require("jsonwebtoken");

// Hàm khởi tạo kết nối
const connection = (io) => {
  // Middleware kiểm tra token trước khi cho kết nối
  io.use((socket, next) => {
    const token = socket.handshake.auth.token || socket.handshake.headers.token;
    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    try {
      const decoded = jwt.verify(token, "badmintonweb"); // Dùng khóa bí mật trong code cũ của bạn
      socket.user = decoded; // Lưu thông tin user vào socket để dùng sau này
      next();
    } catch (err) {
      return next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    console.log(
      `User ${socket.user.username} (ID: ${socket.user.userid}) connected`
    );

    // Tự động cho user join vào room riêng của họ
    const userRoom = `user_${socket.user.userid}`;
    socket.join(userRoom);
    if (socket.user.roleid !== 2) {
      console.log(
        `User ${socket.user.username} (Room ID: ${userRoom}) connected`
      );
    }

    // Nếu là Admin (roleid = 2), cho phép join vào các room khác để hỗ trợ
    if (socket.user.roleid === 2) {
      socket.on("admin_join_room", (targetRoom) => {
        socket.join(targetRoom);
        console.log(`Admin joined room: ${targetRoom}`);
      });
    }

    // 2. Sự kiện gửi tin nhắn (Client gửi lên)
    // Data có thể bao gồm: { room: "user_1", author: "User", message: "Alo shop ơi", type: "text" }
    socket.on("send_message", async (data) => {
      try {
        // Lưu vào DB
        await Chats.create({
          room: data.room,
          senderid: data.senderid,
          senderrole: data.senderrole,
          content: data.content,
          productid: data.productid,
          isread: false,
        });

        // Gửi realtime
        io.in(data.room).emit("receive_message", data);
      } catch (error) {
        console.error("Lỗi lưu tin nhắn:", error);
      }
    });

    // 3. Sự kiện ngắt kết nối
    socket.on("disconnect", () => {
      console.log("Người dùng đã ngắt kết nối:", socket.id);
    });
  });
};

module.exports = {
  connection,
};
