const { Promotions } = require("../models");

const createPromotions = async (req, res) => {
  try {
    const {
      code,
      description,
      type,
      value,
      min_order_value,
      max_value,
      require_point,
      max_uses,
      userid,
      start,
      end,
      status,
    } = req.body;
    const newPromotion = await Promotions.create({
      code,
      description,
      type,
      value,
      min_order_value,
      max_value,
      require_point,
      max_uses,
      used_count: 0, // khởi tạo = 0
      userid,
      start,
      end,
      status,
    });
    res.status(201).send(newPromotion);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllPromotions = async (req, res) => {
  try {
    const { status, type, userid } = req.query;
    const where = {};

    if (status !== undefined) where.status = status;
    if (type) where.type = type;
    if (userid) where.userid = userid;

    const promotionsList = await Promotions.findAll({ where });
    res.status(200).send(promotionsList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailPromotions = async (req, res) => {
  const { id } = req.params;
  try {
    const detailPromotion = await Promotions.findOne({
      where: { id },
    });
    if (!detailPromotion) {
      return res.status(404).send({ message: "Promotion not found" });
    }
    res.status(200).send(detailPromotion);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailPromotionsByCode = async (req, res) => {
  const { code } = req.params;
  try {
    const detailPromotion = await Promotions.findOne({
      where: { code },
    });
    if (!detailPromotion) {
      return res.status(404).send({ message: "Promotion not found" });
    }
    res.status(200).send(detailPromotion);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updatePromotions = async (req, res) => {
  const { id } = req.params;
  const {
    code,
    description,
    type,
    value,
    min_order_value,
    max_value,
    require_point,
    max_uses,
    used_count,
    userid,
    start,
    end,
    status,
  } = req.body;
  try {
    const detailPromotion = await Promotions.findOne({
      where: { id },
    });
    if (!detailPromotion) {
      return res.status(404).send({ message: "Promotion not found" });
    }

    if (code !== undefined) detailPromotion.code = code;
    if (description !== undefined) detailPromotion.description = description;
    if (type !== undefined) detailPromotion.type = type;
    if (value !== undefined) detailPromotion.value = value;
    if (min_order_value !== undefined)
      detailPromotion.min_order_value = min_order_value;
    if (max_value !== undefined) detailPromotion.max_value = max_value;
    if (require_point !== undefined)
      detailPromotion.require_point = require_point;
    if (max_uses !== undefined) detailPromotion.max_uses = max_uses;
    if (used_count !== undefined) detailPromotion.used_count = used_count;
    if (userid !== undefined) detailPromotion.userid = userid;
    if (start !== undefined) detailPromotion.start = start;
    if (end !== undefined) detailPromotion.end = end;
    if (status !== undefined) detailPromotion.status = status;

    await detailPromotion.save();
    res.status(200).send(detailPromotion);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deletePromotions = async (req, res) => {
  const { id } = req.params;
  try {
    const detailPromotion = await Promotions.findOne({
      where: { id },
    });
    if (!detailPromotion) {
      return res.status(404).send({ message: "Promotion not found" });
    }
    await detailPromotion.destroy();
    res.status(200).send({ message: "Promotion deleted successfully" });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createPromotions,
  getAllPromotions,
  getDetailPromotions,
  updatePromotions,
  deletePromotions,
  getDetailPromotionsByCode,
};
