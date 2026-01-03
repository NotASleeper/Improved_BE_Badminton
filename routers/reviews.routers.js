const express = require("express");
const {
  createReviews,
  deleteReviews,
  updateReviews,
  getDetailReviews,
  getAllReviewsbyProductid,
  getAllReviewsbystatus,
} = require("../controllers/reviews.controllers");

const reviewsRouter = express.Router();

reviewsRouter.post("/", createReviews);
reviewsRouter.get("/:productid", getAllReviewsbyProductid);
reviewsRouter.get("/", getAllReviewsbystatus);
// reviewsRouter.get("/:id", getDetailReviews);
reviewsRouter.put("/:id", updateReviews);
reviewsRouter.delete("/:id", deleteReviews);

module.exports = {
  reviewsRouter,
};
