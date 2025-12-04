const { Notifications, Users } = require("../models");
const { translate } = require("../utils/translator");

async function createNotification({
  lang,
  userid,
  type,
  messagekey,
  relatedid,
  params = {},
}) {
  try {
    // Dịch message từ messagekey
    const message = translate(lang, messagekey, params);
    console.log("Translated message:", message);

    // Lưu vào DB
    const newNotification = await Notifications.create({
      userid,
      type,
      messagekey,
      relatedid,
      isread: false,
    });

    return newNotification;
  } catch (error) {
    console.error("createNotification error:", error);
    throw error;
  }
}

module.exports = { createNotification };
