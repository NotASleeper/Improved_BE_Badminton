const { raw } = require("express");
const { Notifications, Users, Promotions } = require("../models");
const { translate } = require("../utils/translator");
const { Op } = require("sequelize");

const getAllNotifications = async (req, res) => {
  try {
    const { lang, userid, isread, type } = req.query;
    const where = {};

    const user = await Users.findOne({ where: { id: userid } });

    if (userid) where.userid = userid;
    if (isread !== undefined) where.isread = isread === "true";
    if (type) where.type = type;

    const notificationsList = await Notifications.findAll({
      where,
      order: [["createdAt", "DESC"]], // mới nhất trước,
      raw: true,
    });

    const translatedNoti = notificationsList.map((noti) => {
      // Parse relatedid từ JSON string thành object
      let params = { user_name: user.name };

      if (noti.relatedid) {
        try {
          const relatedData =
            typeof noti.relatedid === "string"
              ? JSON.parse(noti.relatedid)
              : noti.relatedid;

          // Merge relatedData vào params (không ghi đè)
          params = { ...params, ...relatedData };
        } catch (e) {
          console.error("Parse relatedid error:", e);
        }
      }

      // Dịch message với params
      const message = translate(lang || "vi", noti.messagekey, params);

      // Trả về object đầy đủ
      return {
        id: noti.id,
        userid: noti.userid,
        messagekey: noti.messagekey,
        type: noti.type,
        isread: noti.isread,
        relatedid: noti.relatedid, // Giữ nguyên JSON string
        createdAt: noti.createdAt,
        updatedAt: noti.updatedAt,
        message: message, // Message đã được dịch
      };
    });
    res.status(200).send(translatedNoti);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notifications.findOne({
      where: { id },
    });
    if (!notification) {
      return res.status(404).send({ message: "Notification not found" });
    }
    res.status(200).send(notification);
  } catch (error) {
    res.status(500).send(error);
  }
};

const markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notifications.findOne({
      where: { id },
    });
    if (!notification) {
      return res.status(404).send({ message: "Notification not found" });
    }
    notification.isread = true;
    await notification.save();
    res.status(200).send(notification);
  } catch (error) {
    res.status(500).send(error);
  }
};

const markAllAsRead = async (req, res) => {
  const { userid } = req.body;
  try {
    await Notifications.update(
      { isread: true },
      {
        where: {
          userid,
          isread: false,
        },
      }
    );
    res.status(200).send({ message: "All notifications marked as read" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const notification = await Notifications.findOne({
      where: { id },
    });
    if (!notification) {
      return res.status(404).send({ message: "Notification not found" });
    }
    await notification.destroy();
    res.status(200).send({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUnreadCount = async (req, res) => {
  const { userid } = req.query;
  try {
    const count = await Notifications.count({
      where: {
        userid,
        isread: false,
      },
    });
    res.status(200).send({ unreadCount: count });
  } catch (error) {
    res.status(500).send(error);
  }
};

const sendPromotionNoti = async (req, res) => {
  const { userid, promotionid } = req.body;
  const promotion = await Promotions.findOne({
    where: { id: promotionid },
  });
  try {
    if (promotion.userid && promotion.userid == userid) {
      const noti = await Notifications.create({
        userid,
        type: "promotion",
        messagekey: "promotion.new",
        relatedid: promotionid,
      });
      const message = translate("vi", noti.messagekey, {
        promotion_code: promotion.code,
      });
      return res.status(200).send({ ...noti.dataValues, message });
    } else if (promotion.require_point > 0) {
      const listusers = await Users.findAll({
        where: {
          point: {
            [Op.gte]: promotion.require_point,
          },
        },
      });
      for (const user of listusers) {
        const noti = await Notifications.create({
          userid: user.id,
          type: "promotion",
          messagekey: "promotion.new",
          relatedid: promotionid,
        });
      }
      return res
        .status(200)
        .send({ message: "Promotion notifications sent to eligible users" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Error sending promotion notification" });
  }
};

module.exports = {
  getAllNotifications,
  getDetailNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
  sendPromotionNoti,
};
