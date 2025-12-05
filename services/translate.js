require("dotenv").config();

async function translateText(text, sourceLang, targetLang) {
  const url = `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${process.env.CHATBOT_API_KEY}`;
  const body = {
    contents: [
      {
        parts: [
          {
            text: `Dịch đoạn văn sau từ ${sourceLang} sang ${targetLang} và **chỉ trả về đoạn dịch**, không thêm gì khác:\n\n${text}`,
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
  return json.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
}

async function translateJSON(obj, sourceLang = "vi", targetLang = "en") {
  if (typeof obj === "string") {
    return await translateText(obj, sourceLang, targetLang);
  }

  if (Array.isArray(obj)) {
    const result = [];
    for (const item of obj) {
      result.push(await translateJSON(item, sourceLang, targetLang));
    }
    return result;
  }

  if (obj && typeof obj === "object") {
    const result = {};
    for (const key in obj) {
      result[key] = await translateJSON(obj[key], sourceLang, targetLang);
    }
    return result;
  }

  return obj; // số, boolean, null giữ nguyên
}

module.exports = { translateText, translateJSON };
