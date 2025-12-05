const express = require("express");
const { Products } = require("../models");
const {
  createProducts,
  getAllProducts,
  getDetailProducts,
  updateProducts,
  deleteProducts,
  getTop5ProductsByMonth,
} = require("../controllers/products.controllers");
const { checkExist } = require("../middlewares/validation/checkExist");
const { authenticate } = require("../middlewares/auth/authenticate");
const { authorize } = require("../middlewares/auth/authorize");

const productRouter = express.Router();

productRouter.post("/", authenticate, authorize, createProducts);

productRouter.get("/", getAllProducts);
productRouter.get("/:id", getDetailProducts);
productRouter.put("/:id", checkExist(Products), updateProducts);
productRouter.delete("/:id", checkExist(Products), deleteProducts);
productRouter.get("/best-sale/top5", getTop5ProductsByMonth);

module.exports = {
  productRouter,
};
