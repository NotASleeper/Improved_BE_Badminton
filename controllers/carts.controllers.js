const {
  Carts,
  Products,
  Promotions,
  Ordersdetail,
  Orders,
  Users,
} = require("../models");
const { calculatePromotionValue } = require("./promotions.controllers");

const createCarts = async (req, res) => {
  try {
    const { userid, productid, quantity, notes } = req.body;
    const existingCart = await Carts.findOne({
      where: { userid, productid },
    });
    if (existingCart) {
      existingCart.quantity += quantity;
      existingCart.notes = notes;
      await existingCart.save();
      return res.status(200).send(existingCart);
    }
    const newCart = await Carts.create({
      userid,
      productid,
      quantity,
      notes,
    });
    res.status(201).send(newCart);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllCartsbyUserId = async (req, res) => {
  try {
    const { userid } = req.params;
    const cartsList = await Carts.findAll({
      where: { userid },
      include: {
        model: Products,
        attributes: ["id", "name", "price", "description", "brand"],
      },
      include: {
        model: Users,
        attributes: ["id", "name", "email"],
      },
    });
    res.status(200).send(cartsList);
  } catch (error) {
    res.status;
  }
};

const getDetailCarts = async (req, res) => {
  const { id } = req.params;
  try {
    const detailCarts = await Carts.findOne({
      where: { id },
    });
    res.status(200).send(detailCarts);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateCarts = async (req, res) => {
  const { id } = req.params;
  const { userid, productid, quantity, notes } = req.body;
  try {
    const detailCarts = await Carts.findOne({
      where: { id },
    });
    detailCarts.userid = userid;
    detailCarts.productid = productid;
    detailCarts.quantity = quantity;
    detailCarts.notes = notes;
    await detailCarts.save();
    res.status(200).send(detailCarts);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteCarts = async (req, res) => {
  const { id } = req.params;
  try {
    const detailCarts = await Carts.findOne({
      where: { id },
    });
    await detailCarts.destroy();
    res.status(200).send("Cart deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

const CheckoutCarts = async (req, res) => {
  const { userid, cartitemid, phonenumber, address, promotioncode } = req.body;
  try {
    // Lấy danh sách sản phẩm trong giỏ hàng của người dùng
    const listItems = await Carts.findAll({
      where: {
        id: cartitemid,
        userid: userid,
      },
      include: {
        model: Products,
      },
    });
    // Kiểm tra xem giỏ hàng có sản phẩm nào không
    if (listItems.length === 0) {
      return res.status(404).send("No items found in the cart");
    }
    // Kiểm tra xem mã khuyến mãi có hợp lệ không
    const promotion = await Promotions.findOne({
      where: {
        code: promotioncode,
      },
    });
    if (promotioncode !== "") {
      if (!promotion) {
        return res.status(404).send("Promotion code not found");
      } else {
        if (promotion.status === 0) {
          return res.status(404).send("Promotion code is not valid");
        }
      }
    }

    // Tính tổng giá trị đơn hàng
    const totalAmount = listItems.reduce((sum, item) => {
      return sum + item.quantity * item.Product.price;
    }, 0);

    // Tạo đơn hàng mới
    let newOrder;
    if (promotioncode === "") {
      newOrder = await Orders.create({
        userid,
        totalprice: totalAmount,
        phonenumber,
        address,
        status: 0,
      });
    } else {
      const discount = calculatePromotionValue(promotion, totalAmount, userid);
      newOrder = await Orders.create({
        userid,
        totalprice: totalAmount - discount,
        phonenumber,
        address,
        promotionid: promotion.id,
        status: 0,
        // 0: Chưa thanh toán, 1: Đã thanh toán
      });
    }

    // Tạo chi tiết đơn hàng cho từng sản phẩm trong giỏ hàng
    const orderDetails = listItems.map((item) => ({
      orderid: newOrder.id,
      productid: item.productid,
      quantity: item.quantity,
    }));
    await Ordersdetail.bulkCreate(orderDetails);
    // Cập nhật lại quantity của từng sản phẩm
    for (const item of listItems) {
      if (item.Product && typeof item.Product.quantity === "number") {
        await Products.update(
          { quantity: item.Product.quantity - item.quantity },
          { where: { id: item.productid } }
        );
      }
    }

    await Carts.destroy({
      where: {
        id: cartitemid,
        userId: userid,
      },
    });
    res
      .status(201)
      .json({ message: "Order created successfully", orderId: newOrder.id });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ message: "Checkout failed" });
  }
};

module.exports = {
  createCarts,
  getAllCartsbyUserId,
  getDetailCarts,
  updateCarts,
  deleteCarts,
  CheckoutCarts,
};
