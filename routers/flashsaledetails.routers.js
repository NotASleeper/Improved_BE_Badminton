const express = require("express");
const {
  createFlashsaleDetail,
  getAllFlashsaleDetails,
  getDetailFlashsalebyid,
  updateFlashsaleDetail,
  deleteFlashsaleDetail,
} = require("../controllers/flashsaledetails.controllers");

const flashsaledetailsRouter = express.Router();

flashsaledetailsRouter.post("/", createFlashsaleDetail);
flashsaledetailsRouter.get("/:flashsaleid", getAllFlashsaleDetails);
flashsaledetailsRouter.get("/:flashsaleid/:id", getDetailFlashsalebyid);
flashsaledetailsRouter.put("/:id", updateFlashsaleDetail);
flashsaledetailsRouter.delete("/:flashsaleid/:id", deleteFlashsaleDetail);

module.exports = {
  flashsaledetailsRouter,
};
