const express = require("express");
const {
  getAllNotifications,
  getUnreadCount,
  markAllAsRead,
  markAsRead,
} = require("../controllers/notifications.controllers.js");

const notificationsRouter = express.Router();

notificationsRouter.get("/", getAllNotifications);
notificationsRouter.get("/unread-count", getUnreadCount);
notificationsRouter.post("/mark-all-read", markAllAsRead);
notificationsRouter.post("/mark-as-read/:id", markAsRead);

module.exports = { notificationsRouter };
