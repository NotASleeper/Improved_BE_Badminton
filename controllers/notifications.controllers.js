const { Notifications } = require("../models");
const { Op } = require("sequelize");

const createNotification = async (req, res) => {
  try {
    const { userid, type, messagekey, relatedid } = req.body;
    const newNotification = await Notifications.create({
      userid,
      type,
      messagekey,
      relatedid,
      isread: false, // mặc định chưa đọc
    });
    res.status(201).send(newNotification);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllNotifications = async (req, res) => {
  try {
    const { userid, isread, type } = req.query;
    const where = {};

    if (userid) where.userid = userid;
    if (isread !== undefined) where.isread = isread === "true";
    if (type) where.type = type;

    const notificationsList = await Notifications.findAll({
      where,
      order: [["createdAt", "DESC"]], // mới nhất trước
    });
    res.status(200).send(notificationsList);
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

module.exports = {
  createNotification,
  getAllNotifications,
  getDetailNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  getUnreadCount,
};
