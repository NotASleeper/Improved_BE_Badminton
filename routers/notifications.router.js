const express = require("express");
const {
  getAllNotifications,
} = require("../controllers/notifications.controllers.js");

const notificationsRouter = express.Router();

notificationsRouter.get("/", getAllNotifications);

module.exports = { notificationsRouter };
