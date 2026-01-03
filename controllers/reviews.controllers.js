const { Reviews, Users, Orders, Ordersdetail } = require("../models");
const { censorContent } = require("../services/censorship.js");
const { createNotification } = require("../services/notification.js");

const createReviews = async (req, res) => {
  try {
    const { userid, rating, content, productid, orderid, prereviewid } =
      req.body;
    console.log(req.body);
    const user = await Users.findOne({
      where: { id: userid },
    });
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

    let status = "";
    const toxicscore = await censorContent(content);
    if (parseInt(toxicscore) >= 70) {
      status = "rejected"; // Tự động từ chối
    } else if (parseInt(toxicscore) >= 40) {
      status = "pending"; // Chuyển về trạng thái chờ duyệt
    } else {
      status = "approved"; // Tự động duyệt
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

    if (status === "rejected") {
      await createNotification({
        userid: userid,
        type: "review",
        messagekey: "review.rejected",
        relatedid: newReview.id,
      });
    } else if (prereviewid && status === "approved") {
      const prereview = await Reviews.findOne({
        where: { id: prereviewid },
      });
      if (prereview) {
        await createNotification({
          userid: prereview.userid,
          type: "review",
          messagekey: "review.new_response",
          relatedid: newReview.id,
        });
      }
    }

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
  const { userid, rating, content, productid, orderid, prereviewid, status } =
    req.body;
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
    detailReviews.status = status;
    await detailReviews.save();
    res.status(200).send(detailReviews);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllReviewsbystatus = async (req, res) => {
  try {
    const { status } = req.query;
    const whereClause = status !== undefined ? { status } : {};
    const reviewsList = await Reviews.findAll({
      where: whereClause,
    });
    res.status(200).send(reviewsList);
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
  getAllReviewsbystatus,
};
