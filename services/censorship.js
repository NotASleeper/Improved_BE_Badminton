require("dotenv").config();

async function censorContent(text) {
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.CHATBOT_API_KEY}`;
  const instruction =
    "Bạn là một chuyên gia kiểm duyệt nội dung cho một website bán các sản phẩm liên quan đến cầu lông. Trên thang đo từ 0 đến 100 với mức độ toxic (toxic khác với tiêu cực, giả sử có nội dung là: Sản phẩm này tệ, thì mức độ toxic gần như không có) tối đa là 100, hãy kiểm tra nội dung được gửi và trả về duy nhất một con số từ 0 đến 100. KHÔNG THÊM BẤT CỨ NỘI DUNG GÌ \n\n";
  const body = {
    contents: [
      {
        parts: [
          {
            text: instruction + `Nội dung: ${text} `,
          },
        ],
      },
    ],
  };

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  const json = await response.json();
  console.log(
    "Censorship response:",
    json.candidates?.[0]?.content?.parts?.[0]?.text ?? ""
  );
  return json.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

module.exports = { censorContent };
