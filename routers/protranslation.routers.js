const express = require("express");
const { Pro_Translation } = require("../models");
const {
  createProTranslation,
  createtranslatedProduct,
  getDetailtranslationbyProid_lang,
  updateProtranslation,
  deleteProtranslation,
} = require("../controllers/protranslation.controllers");

const proTranslationRouter = express.Router();

proTranslationRouter.post("/", createProTranslation);
proTranslationRouter.get("/translate", createtranslatedProduct);
proTranslationRouter.get(
  "/:productid/:languagecode",
  getDetailtranslationbyProid_lang
);
proTranslationRouter.put("/:id", updateProtranslation);
proTranslationRouter.delete("/:id", deleteProtranslation);

module.exports = {
  proTranslationRouter,
};
