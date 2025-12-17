// file: services/chatbot.js
const { Products, Categories, Pro_translation } = require("../models");
const {
  GoogleGenerativeAIEmbeddings,
  ChatGoogleGenerativeAI,
} = require("@langchain/google-genai");

// --- SỬA ĐỔI QUAN TRỌNG TẠI ĐÂY ---
// Thay vì dùng MemoryVectorStore (bị lỗi), chúng ta dùng HNSWLib từ gói Community
const { HNSWLib } = require("@langchain/community/vectorstores/hnswlib");

const { Document } = require("@langchain/core/documents");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const {
  ChatPromptTemplate,
  MessagesPlaceholder,
} = require("@langchain/core/prompts");
const { HumanMessage, AIMessage } = require("@langchain/core/messages");
require("dotenv").config();

const chatHistoryMemory = {};

const embeddings = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: process.env.GOOGLE_API_KEY,
});

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash",
  apiKey: process.env.GOOGLE_API_KEY,
  temperature: 0.3,
});

let vectorStore = null;

// Hàm hỗ trợ "ngủ" (delay) để tránh spam API
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const initVectorStore = async () => {
  try {
    console.log(
      "🔄 Đang nạp dữ liệu (Cấu trúc: Products + Pro_translation)..."
    );

    const products = await Products.findAll({
      attributes: ["id", "price"],
      include: [
        { model: Categories, as: "cate", attributes: ["name"] },
        {
          model: Pro_translation,
          as: "translations",
          attributes: ["languagecode", "name", "description"],
        },
      ],
    });

    if (!products.length) return console.log("⚠️ Không có dữ liệu sản phẩm.");

    const docs = [];

    // Xử lý dữ liệu
    products.forEach((p) => {
      let contentString = `
        [SẢN PHẨM ID: ${p.id}]
        Giá bán: ${p.price} VND
        Danh mục: ${p.cate ? p.cate.name : "Khác"}
      `;

      // [DEBUG QUAN TRỌNG] Kiểm tra xem có lấy được bản dịch không
      // Nếu p.translations rỗng -> Lỗi Association (Bước 1 chưa sửa đúng)
      if (p.translations && p.translations.length > 0) {
        p.translations.forEach((t) => {
          // Xử lý languagecode an toàn
          const langLabel = t.languagecode
            ? t.languagecode.toUpperCase()
            : "VI";
          contentString += `\n
          (${langLabel}) Tên: ${t.name}
          (${langLabel}) Mô tả: ${t.description}
          `;
        });
      } else {
        // Nếu dòng này hiện ra nhiều -> Cần xem lại models/products.js
        contentString += `\n(Chưa có thông tin mô tả chi tiết)`;
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            `⚠️ SP ID ${p.id} không tìm thấy bản dịch! Check lại quan hệ hasMany.`
          );
        }
      }

      docs.push(
        new Document({
          pageContent: contentString,
          metadata: { id: p.id, price: p.price },
        })
      );
    });

    const BATCH_SIZE = 5; // Chỉ nạp 5 sản phẩm mỗi lần

    // 1. Tạo Store với lô đầu tiên
    const initialDocs = docs.slice(0, BATCH_SIZE);
    vectorStore = await HNSWLib.fromDocuments(initialDocs, embeddings);
    console.log(`✅ Đã nạp lô đầu tiên (${initialDocs.length} sản phẩm)`);

    // 2. Nạp các lô còn lại
    for (let i = BATCH_SIZE; i < docs.length; i += BATCH_SIZE) {
      // QUAN TRỌNG: Nghỉ 2 giây trước khi nạp tiếp
      console.log("⏳ Đang nghỉ 2 giây để tránh spam API...");
      await sleep(2000);

      const chunk = docs.slice(i, i + BATCH_SIZE);
      await vectorStore.addDocuments(chunk); // Thêm vào store đã có

      console.log(
        `✅ Đã nạp tiếp lô ${i / BATCH_SIZE + 1} (${chunk.length} sản phẩm)`
      );
    }

    console.log(`🎉 Hoàn tất! Tổng cộng ${docs.length} sản phẩm đã sẵn sàng.`);
  } catch (error) {
    console.error("❌ Lỗi initVectorStore:", error);
  }
};

const generateReply = async (userQuery, roomid) => {
  if (!vectorStore) return "Server đang khởi động AI, vui lòng chờ...";

  try {
    const history = chatHistoryMemory[roomid] || [];

    // --- [DEBUG] IN RA LỊCH SỬ CHAT ĐỂ KIỂM TRA ---
    console.log(`\n========== 🧠 BỘ NHỚ AI CHO PHÒNG: ${roomid} ==========`);
    if (history.length === 0) {
      console.log("-> (Trống) Chưa có lịch sử nào.");
    } else {
      history.forEach((msg, index) => {
        // Kiểm tra xem tin nhắn là của Khách hay Bot để in ra cho dễ nhìn
        const role =
          msg.constructor.name === "HumanMessage" ? "👤 Khách" : "🤖 Bot";
        console.log(`[${index + 1}] ${role}: ${msg.content}`);
      });
    }
    console.log("====================================================\n");
    // ----------------------------------------------

    const results = await vectorStore.similaritySearch(userQuery, 30);
    // [LOG QUAN TRỌNG] Xem AI tìm thấy gì
    console.log(
      `🔍 AI tìm thấy ${results.length} kết quả cho từ khóa: "${userQuery}"`
    );
    results.forEach((doc, i) => {
      // Chỉ in 100 ký tự đầu để xem
      console.log(
        `--- Kết quả ${i + 1}: ${doc.pageContent
          .replace(/\n/g, " ")
          .substring(0, 100)}...`
      );
    });

    const context = results.map((doc) => doc.pageContent).join("\n---\n");

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `Bạn là nhân viên tư vấn của cửa hàng BadmintonGear.
        
        Dữ liệu sản phẩm (Tiếng Việt "VI" và Tiếng Anh "EN") được cung cấp bên dưới:
        \n{context}\n

        Quy tắc trả lời:
        1. **Tự động phát hiện ngôn ngữ của khách**:
           - Khách hỏi Tiếng Việt -> Trả lời Tiếng Việt (Dùng dữ liệu thẻ VI).
           - Khách hỏi Tiếng Anh -> Trả lời Tiếng Anh (Dùng dữ liệu thẻ EN).
        2. Chỉ cung cấp thông tin có trong dữ liệu.
        3. Luôn hiển thị giá tiền gốc (VND).
        4. Sử dụng **Lịch sử trò chuyện** bên dưới để hiểu ngữ cảnh (Ví dụ: khách hỏi "giá bao nhiêu", hãy hiểu là giá của sản phẩm vừa nhắc đến trước đó).
        5. Trả lời ngắn gọn, thân thiện.
        `,
      ],
      new MessagesPlaceholder("chat_history"),
      ["human", "{question}"],
    ]);

    const chain = prompt.pipe(llm).pipe(new StringOutputParser());
    const response = await chain.invoke({
      context: context,
      chat_history: history,
      question: userQuery,
    });
    // --- QUAN TRỌNG: CẬP NHẬT LỊCH SỬ VÀO RAM ---

    // Thêm câu hỏi của khách
    history.push(new HumanMessage(userQuery));

    // Thêm câu trả lời của Bot
    history.push(new AIMessage(response));

    // Giới hạn bộ nhớ: Chỉ giữ 5 tin nhắn gần nhất để không bị tràn RAM
    if (history.length > 5) {
      // Xóa bớt tin nhắn cũ nhất (giữ lại 5 cái cuối)
      chatHistoryMemory[roomid] = history.slice(-5);
    } else {
      chatHistoryMemory[roomid] = history;
    }

    return response;
  } catch (error) {
    console.error("Lỗi Chatbot:", error);
    return "Hệ thống đang bận, vui lòng thử lại sau.";
  }
};

/**
 * Hàm 3: Express handler cho route chatbot
 * @param {Request} req - Express request
 * @param {Response} res - Express response
 */
const handlechat = async (req, res) => {
  try {
    const { message, userid } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        success: false,
        error: "Vui lòng gửi câu hỏi trong trường 'message'",
      });
    }

    const roomid = `chat_${userid}_bot`;

    const reply = await generateReply(message, roomid);

    return res.status(200).json({
      success: true,
      reply: reply,
    });
  } catch (error) {
    console.error("Lỗi xử lý chat request:", error);
    return res.status(500).json({
      success: false,
      error: "Lỗi hệ thống, vui lòng thử lại sau",
    });
  }
};

module.exports = {
  initVectorStore,
  generateReply,
  handlechat,
};
