const { Orders, Users, Promotions, Payment } = require("../models");
const { Op } = require("sequelize");
const { createNotification } = require("../services/notification");

const createOrder = async (req, res) => {
  try {
    const { userid, totalprice, phonenumber, address, promotionid, status } =
      req.body;
    const newOrder = await Orders.create({
      userid,
      totalprice,
      phonenumber,
      address,
      promotionid,
      status,
    });
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Orders.findAll({
      include: [
        {
          model: Users,
          attributes: ["name", "phonenumber"],
        },
        {
          model: Promotions,
          attributes: ["code"],
        },
        {
          model: Payment,
        },
      ],
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const detailOrder = await Orders.findOne({
      where: { id },
      include: [
        {
          model: Users,
          attributes: ["name", "phonenumber"],
        },
        {
          model: Promotions,
          attributes: ["code"],
        },
        {
          model: Payment,
        },
      ],
    });
    res.status(200).send(detailOrder);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getOrderByUserId = async (req, res) => {
  const { userid } = req.params;
  try {
    const orders = await Orders.findAll({
      where: { userid },
      include: [
        {
          model: Users,
          attributes: ["name", "phonenumber"],
        },
        {
          model: Promotions,
          attributes: ["code"],
        },
        {
          model: Payment,
        },
      ],
    });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateOrder = async (req, res) => {
  const { id } = req.params;
  const {
    userid,
    totalprice,
    phonenumber,
    address,
    promotionid,
    status,
    process,
    shipping,
    delivered,
  } = req.body;
  try {
    const detailOrder = await Orders.findOne({
      where: { id },
    });

    // Lưu status cũ để so sánh
    const oldStatus = detailOrder.status;
    const oldProcess = detailOrder.process;
    const oldShipping = detailOrder.shipping;
    const oldDelivered = detailOrder.delivered;

    // Cập nhật thông tin đơn hàng
    if (userid !== undefined) detailOrder.userid = userid;
    if (totalprice !== undefined) detailOrder.totalprice = totalprice;
    if (phonenumber !== undefined) detailOrder.phonenumber = phonenumber;
    if (address !== undefined) detailOrder.address = address;
    if (promotionid !== undefined) detailOrder.promotionid = promotionid;
    if (status !== undefined) detailOrder.status = status;
    if (process !== undefined) detailOrder.process = process;
    if (shipping !== undefined) detailOrder.shipping = shipping;
    if (delivered !== undefined) detailOrder.delivered = delivered;
    await detailOrder.save();
    // Đơn hàng được xác nhận
    if (status === 1 && oldStatus !== 1) {
      await createNotification({
        userid: detailOrder.userid,
        type: "order",
        messagekey: "order.confirmed",
        relatedid: detailOrder.id,
      });
      // Cập nhật số lượng sản phẩm trong kho
    }

    // Đơn hàng bị hủy
    if (status === -1 && oldStatus !== -1) {
      await createNotification({
        userid: detailOrder.userid,
        type: "order",
        messagekey: "order.cancelled",
        relatedid: detailOrder.id,
      });
    }

    // Đơn hàng đã được giao
    if (delivered !== null && oldDelivered === null) {
      await createNotification({
        userid: detailOrder.userid,
        type: "order",
        messagekey: "order.delivered",
        relatedid: detailOrder.id,
      });
    }

    // Đơn hàng đang vận chuyển
    if (shipping !== null && oldShipping === null) {
      await createNotification({
        userid: detailOrder.userid,
        type: "order",
        messagekey: "order.shipping",
        relatedid: detailOrder.id,
      });
    }

    // Đơn hàng đang được xử lý
    if (process !== null && oldProcess === null) {
      await createNotification({
        userid: detailOrder.userid,
        type: "order",
        messagekey: "order.processing",
        relatedid: detailOrder.id,
      });
    }

    res.status(200).send(detailOrder);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const detailOrder = await Orders.findOne({
      where: { id },
    });
    await detailOrder.destroy();
    res.status(200).send("Deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

const getTotalOrderAmount = async (req, res) => {
  const { from, to } = req.query; // from và to dạng yyyy-mm-dd
  try {
    const total = await Orders.sum("totalprice", {
      where: {
        createdAt: {
          [Op.gte]: new Date(from),
          [Op.lte]: new Date(to),
        },
        status: 1, // chỉ tính đơn đã hoàn thành, sửa lại nếu cần
      },
    });
    res.status(200).json({ totalOrderAmount: total || 0 });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  getOrderByUserId,
  getTotalOrderAmount,
};
