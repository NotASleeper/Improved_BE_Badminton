const fs = require("fs");
const path = require("path");

// Load toàn bộ JSON trong thư mục /locales
const locales = {};
const dir = path.join(__dirname, "..", "locales");

fs.readdirSync(dir).forEach((file) => {
  const lang = file.replace(".json", "");
  locales[lang] = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
});

function translate(lang = "vi", key, params = {}) {
  let template = locales[lang]?.[key] || locales["vi"]?.[key] || key;

  Object.keys(params).forEach((p) => {
    template = template.replace(`{{${p}}}`, params[p]);
  });

  return template;
}

module.exports = { translate };
