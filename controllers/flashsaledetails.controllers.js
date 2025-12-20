const { Products, FlashSales, Flashsaledetails, Pro_translation } = require("../models");

const createFlashsaleDetail = async (req, res) => {
  try {
    const { flashsaleid, productid, type, value, max_uses, user_count } =
      req.body;
    const newFlashsaleDetail = await Flashsaledetails.create({
      flashsaleid,
      productid,
      type,
      value,
      max_uses,
      used_count: user_count,
    });
    res.status(201).send(newFlashsaleDetail);
  } catch (error) {
    res.status(500).send({ error: "Failed to create flash sale detail" });
  }
};

const getAllFlashsaleDetails = async (req, res) => {
  const { flashsaleid } = req.params;
  const { lang } = req.query;
  try {
    const flashsaleDetails = await Flashsaledetails.findAll({
      where: { flashsaleid: flashsaleid },
      include: [
        {
          model: Products,
          attributes: ["id", "price", "brand"],
          include: [
            {
              model: Pro_translation,
              as: "translations",
              attributes: ["languagecode", "name", "description"],
              where: { languagecode: lang },
            },
          ],
        },
      ],
    });
    res.status(200).send(flashsaleDetails);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailFlashsalebyid = async (req, res) => {
  const { id, flashsaleid } = req.params;
  const { lang } = req.query;
  try {
    const flashsaleDetail = await Flashsaledetails.findOne({
      where: {
        id: id,
        flashsaleid: flashsaleid,
      },
      include: [
        {
          model: Products,
          attributes: ["id", "price", "brand"],
          include: [
            {
              model: Pro_translation,
              as: "translations",
              attributes: ["languagecode", "name", "description"],
              where: { languagecode: lang },
            },
          ],
        },
      ],
    });
    res.status(200).send(flashsaleDetail);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateFlashsaleDetail = async (req, res) => {
  const { id, flashsaleid } = req.params;
  const {
    flashsaleid: newFlashsaleid,
    productid,
    type,
    value,
    max_uses,
    used_count,
  } = req.body;
  try {
    const flashsaleDetail = await Flashsaledetails.findOne({
      where: {
        id: id,
        flashsaleid: flashsaleid,
      },
    });
    if (flashsaleDetail) {
      flashsaleDetail.flashsaleid = newFlashsaleid;
      flashsaleDetail.productid = productid;
      flashsaleDetail.type = type;
      flashsaleDetail.value = value;
      flashsaleDetail.max_uses = max_uses;
      flashsaleDetail.used_count = used_count;
      await flashsaleDetail.save();
      res.status(200).send(flashsaleDetail);
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to update flash sale detail" });
  }
};

const deleteFlashsaleDetail = async (req, res) => {
  const { id, flashsaleid } = req.params;
  try {
    const flashsaleDetail = await Flashsaledetails.findOne({
      where: {
        id: id,
        flashsaleid: flashsaleid,
      },
    });
    if (flashsaleDetail) {
      await flashsaleDetail.destroy();
      res.status(204).send();
    } else {
      res.status(404).send({ error: "Flash sale detail not found" });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to delete flash sale detail" });
  }
};

module.exports = {
  createFlashsaleDetail,
  getAllFlashsaleDetails,
  getDetailFlashsalebyid,
  updateFlashsaleDetail,
  deleteFlashsaleDetail,
};
