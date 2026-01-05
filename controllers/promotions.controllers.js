const { Promotions, Users } = require("../models");
const { createNotification } = require("../services/notification");
const { Op } = require("sequelize");

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

    // Gửi thông báo cho khách hàng khi tạo mã giảm giá mới
    if (status === 1) {
      // Chỉ gửi thông báo nếu promotion đang active
      let targetUsers;

      if (userid) {
        // Mã giảm giá dành cho user cụ thể
        targetUsers = await Users.findAll({
          where: { id: userid },
          attributes: ["id"],
        });
      } else if (require_point) {
        // Mã giảm giá yêu cầu điểm loyalty
        targetUsers = await Users.findAll({
          where: {
            loyaltypoint: {
              [Op.gte]: require_point,
            },
          },
          attributes: ["id"],
        });
      } else {
        // Mã giảm giá công khai cho tất cả khách hàng
        targetUsers = await Users.findAll({
          where: { roleid: 1 }, // Giả sử roleid=1 là customer
          attributes: ["id"],
        });
      }

      // Tạo thông báo cho từng user
      const notificationPromises = targetUsers.map((user) =>
        createNotification({
          userid: user.id,
          type: "promotion",
          messagekey: userid
            ? "promotion.exclusive"
            : require_point
            ? "promotion.loyalty"
            : "promotion.new",
          relatedid: newPromotion.id,
        })
      );

      await Promise.all(notificationPromises);
      console.log(
        `✅ Sent ${targetUsers.length} notifications for promotion ${code}`
      );
    }

    res.status(201).send(newPromotion);
  } catch (error) {
    console.error("Error in createPromotions:", error);
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

const calculatePromotionValue = async (promotion, orderTotal, userid) => {
  let discount = 0;
  const now = new Date();
  const user = await Users.findOne({ where: { id: userid } });

  if (!promotion || Number(promotion.status) !== 3) {
    return 0;
  }
  const startDate = new Date(promotion.start);
  const endDate = new Date(promotion.end);
  if (startDate > now || endDate < now) {
    return 0;
  }
  if (promotion.userid && Number(promotion.userid) !== Number(userid)) {
    return 0;
  }

  if (
    promotion.require_point &&
    (!user || user.loyaltypoint < promotion.require_point)
  ) {
    return 0;
  }

  if (orderTotal < promotion.min_order_value) {
    return 0;
  }
  if (promotion.used_count >= promotion.max_uses) {
    return 0;
  }
  if (Number(promotion.type) === 0) {
    discount = (orderTotal * promotion.value) / 100;
  } else if (Number(promotion.type) === 1) {
    discount = promotion.value;
  }

  if (promotion.max_value !== null && discount > promotion.max_value) {
    discount = promotion.max_value;
  }

  console.log("Calculated discount:", discount);

  return discount;
};

const suggestedPromotions = async (req, res) => {
  try {
    const { orderTotal, userid } = req.query;
    if (!orderTotal || !userid) {
      return res.status(400).json({
        error: "orderTotal và userid là bắt buộc",
      });
    }

    const orderValue = parseFloat(orderTotal);

    // Lấy tất cả promotion đang active (status = 3)
    const allPromotions = await Promotions.findAll({
      where: { status: 3 },
      raw: true,
    });

    // Tính giá trị giảm giá cho từng promotion
    const promotionsWithDiscount = await Promise.all(
      allPromotions.map(async (promotion) => {
        const discount = await calculatePromotionValue(
          promotion,
          orderValue,
          userid
        );
        return {
          ...promotion,
          discountAmount: discount,
        };
      })
    );
    // Lọc các promotion có thể áp dụng (discount > 0)
    const applicablePromotions = promotionsWithDiscount
      .filter((p) => p.discountAmount > 0)
      .sort((a, b) => b.discountAmount - a.discountAmount); // Sắp xếp giảm dần theo giá trị giảm
    res.status(200).send(applicablePromotions);
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
  calculatePromotionValue,
  suggestedPromotions,
};
