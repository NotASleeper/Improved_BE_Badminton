const express = require("express");
const {
  getChatHistory,
  getListConversations,
} = require("../controllers/chats.controllers");

const chatsRouter = express.Router();

chatsRouter.get("/", getListConversations);
chatsRouter.get("/:room", getChatHistory);

module.exports = {
  chatsRouter,
};
