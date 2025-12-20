const express = require("express");
const {
  createFlashsale,
  getAllFlashsales,
  getFlashsaleById,
  updateFlashsale,
  deleteFlashsale,
} = require("../controllers/flashsales.controllers");

const flashsalesRouter = express.Router();

flashsalesRouter.post("/", createFlashsale);
flashsalesRouter.get("/", getAllFlashsales);
flashsalesRouter.get("/:id", getFlashsaleById);
flashsalesRouter.put("/:id", updateFlashsale);
flashsalesRouter.delete("/:id", deleteFlashsale);

module.exports = {
  flashsalesRouter,
};
