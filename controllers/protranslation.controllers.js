const { Pro_translation } = require("../models");
const { translateJSON } = require("../services/translate.js");

const createProTranslation = async (req, res) => {
  try {
    const { productid, languagecode, name, description } = req.body;
    const protranslation = await Pro_translation.create({
      productid,
      languagecode,
      name,
      description,
    });
    res.status(201).send(protranslation);
  } catch (error) {
    res.status(500).send(error);
  }
};

const createtranslatedProduct = async (req, res) => {
  try {
    const { productid, lang, targetlang } = req.query;

    // Lấy bản ghi gốc
    const translated = await Pro_translation.findOne({
      where: { productid, languagecode: lang },
      raw: true,
      attributes: ["name", "description"],
    });

    if (!translated) {
      return res.status(404).send({ message: "Không tìm thấy sản phẩm." });
    }

    console.log("Original JSON:", translated);

    // Dịch từng trường
    const result = await translateJSON(translated, lang, targetlang);

    return res.status(201).send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ error: "Lỗi server", details: err });
  }
};

const updateProtranslation = async (req, res) => {
  try {
    const { id } = req.params;
    const { languagecode, name, description } = req.body;
    const protranslation = await Pro_translation.findByPk(id);
    if (!protranslation) {
      return res.status(404).send({ message: "Pro_translation not found" });
    }
    protranslation.languagecode = languagecode;
    protranslation.name = name;
    protranslation.description = description;
    await protranslation.save();
    res.status(200).send(protranslation);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteProtranslation = async (req, res) => {
  try {
    const { id } = req.params;
    const protranslation = await Pro_translation.findByPk(id);
    if (!protranslation) {
      return res.status(404).send({ message: "Pro_translation not found" });
    }
    await protranslation.destroy();
    res.status(200).send({ message: "Pro_translation deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailtranslationbyProid_lang = async (req, res) => {
  try {
    const { productid, languagecode } = req.params;
    const protranslation = await Pro_translation.findOne({
      where: { productid, languagecode },
    });
    if (!protranslation) {
      return res.status(404).send({ message: "Pro_translation not found" });
    }
    res.status(200).send(protranslation);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createProTranslation,
  createtranslatedProduct,
  updateProtranslation,
  deleteProtranslation,
  getDetailtranslationbyProid_lang,
};
