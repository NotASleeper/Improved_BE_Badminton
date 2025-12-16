const { Chats, Users, Imagesuser } = require("../models");
const { Op } = require("sequelize");

// Lấy lịch sử chat của một phòng (dùng cho cả User và Admin khi click vào đoạn chat)
const getChatHistory = async (req, res) => {
  try {
    const { room } = req.params; // Ví dụ: room = "user_1"
    const chats = await Chats.findAll({
      where: { room },
      order: [["createdAt", "ASC"]], // Tin nhắn cũ nhất ở trên
      include: [
        {
          model: Users,
          as: "sender",
          attributes: ["id", "name", "username", "roleid"], // Lấy thông tin người gửi
          include: [
            {
              model: Imagesuser,
              attributes: ["url"], // Lấy ảnh đại diện
            },
          ],
        },
      ],
    });
    res.status(200).send(chats);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Lấy danh sách các user đã nhắn tin (Dành cho Admin)
const getListConversations = async (req, res) => {
  try {
    // --- BƯỚC 1: Lấy danh sách phòng và ID người gửi duy nhất ---
    // Sử dụng raw: true để trả về object thuần, tránh Sequelize tự động thêm các field thừa gây lỗi Group By
    const conversations = await Chats.findAll({
      attributes: ["room", "senderid"],
      where: {
        senderrole: "user" // Chỉ lấy khách hàng
      },
      group: ["room", "senderid"],
      raw: true
    });

    // Nếu chưa có ai chat, trả về mảng rỗng
    if (!conversations || conversations.length === 0) {
      return res.status(200).json([]);
    }

    // --- BƯỚC 2: Lấy thông tin User (Tên, Avatar) dựa trên list ID vừa tìm được ---
    // Gom tất cả sender_id lại thành 1 mảng
    const senderIds = conversations.map((c) => c.senderid);

    const usersInfo = await Users.findAll({
      where: {
        id: senderIds // Tìm tất cả user nằm trong danh sách này
      },
      attributes: ["id", "name", "email"],
      include: [
        {
          model: Imagesuser,
          attributes: ["url"]
        }
      ]
    });

    // --- BƯỚC 3: Ghép thông tin User vào danh sách phòng (Merge data) ---
    const result = conversations.map((conv) => {
      // Tìm thông tin user tương ứng trong list usersInfo
      const user = usersInfo.find((u) => u.id === conv.senderid);

      return {
        room: conv.room,
        sender_id: conv.senderid,
        sender: user
          ? {
              id: user.id,
              name: user.name,
              email: user.email,
              // Lấy url an toàn (phòng trường hợp user chưa có ảnh)
              avatar: user.Imagesuser ? user.Imagesuser.url : null,
            }
          : null, // Trường hợp không tìm thấy user (vd: user đã bị xóa)
      };
    });

    res.status(200).json(result);
  } catch (error) {
    console.error("Lỗi getListConversations:", error);
    res.status(500).send({
      message: "Lỗi lấy danh sách hội thoại",
      error: error.message,
    });
  }
};

module.exports = {
  getChatHistory,
  getListConversations,
};
