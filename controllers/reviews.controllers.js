const { Reviews, Users, Orders, Ordersdetail } = require("../models");
const { createNotification } = require("../services/notification.js");

const createReviews = async (req, res) => {
  try {
    const {
      userid,
      rating,
      content,
      toxicscore,
      status,
      productid,
      orderid,
      prereviewid,
    } = req.body;
    console.log(req.body);
    const user = await Users.findOne({
      where: { id: userid },
    });
    if (!user || user.roleid !== 1) {
      return res
        .status(403)
        .send({ message: "Bạn không có quyền đánh giá sản phẩm này!" });
    }
    const orderDetail = await Ordersdetail.findOne({
      where: { productid },
      include: [
        {
          model: Orders,
          where: { userid },
        },
      ],
    });
    if (!orderDetail) {
      return res
        .status(400)
        .send({ message: "Bạn chưa mua sản phẩm này nên không thể đánh giá!" });
    }
    const newReview = await Reviews.create({
      userid,
      rating,
      content,
      toxicscore,
      status,
      productid,
      orderid,
      prereviewid,
    });

    await createNotification({
      userid: userid,
      type: "review",
      messagekey: "comment.new",
      relatedid: 1,
    });

    res.status(201).send(newReview);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllReviewsbyProductid = async (req, res) => {
  try {
    const { productid } = req.params;
    const reviewsList = await Reviews.findAll({
      where: { productid },
    });
    res.status(200).send(reviewsList);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getDetailReviews = async (req, res) => {
  const { id } = req.params;
  try {
    const detailReviews = await Reviews.findOne({
      where: { id },
    });
    res.status(200).send(detailReviews);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateReviews = async (req, res) => {
  const { id } = req.params;
  const { userid, rating, content, productid, orderid, prereviewid } = req.body;
  try {
    const detailReviews = await Reviews.findOne({
      where: { id },
    });
    detailReviews.userid = userid;
    detailReviews.rating = rating;
    detailReviews.content = content;
    detailReviews.productid = productid;
    detailReviews.orderid = orderid;
    detailReviews.prereviewid = prereviewid;
    await detailReviews.save();
    res.status(200).send(detailReviews);
  } catch (error) {
    res.status(500).send(error);
  }
};

const deleteReviews = async (req, res) => {
  const { id } = req.params;
  try {
    const detailReviews = await Reviews.findOne({
      where: { id },
    });
    await detailReviews.destroy();
    res.status(200).send("Review deleted successfully");
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createReviews,
  getAllReviewsbyProductid,
  getDetailReviews,
  updateReviews,
  deleteReviews,
};
