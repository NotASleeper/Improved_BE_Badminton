const express = require("express");
const { categoriesRouter } = require("./categories.routers");
const { usersRouter } = require("./users.routers");
const { roleRouter } = require("./roles.routers");
const { productRouter } = require("./products.routers");
const { reviewsRouter } = require("./reviews.routers");
const { promotionsRouter } = require("./promotions.routers");
const { cartsRouter } = require("./carts.routers");
const { grnRouter } = require("./grn.routers");
const { grndetailsRouter } = require("./grndetails.routers");
const { orderRouter } = require("./orders.routers");
const { orderdetailRouter } = require("./orderdetails.routers");
const { imgproductRouter } = require("./imagesproduct.routers");
const { imguserRouter } = require("./imagesuser.routers");
const paymentRouter = require("./payment.routers");
const { notificationsRouter } = require("./notifications.router");
const { proTranslationRouter } = require("./protranslation.routers");
const { chatsRouter } = require("./chats.routers");

const rootRouter = express.Router();

rootRouter.use("/categories", categoriesRouter);
rootRouter.use("/users", usersRouter);
rootRouter.use("/roles", roleRouter);
rootRouter.use("/products", productRouter);
rootRouter.use("/reviews", reviewsRouter);
rootRouter.use("/promotions", promotionsRouter);
rootRouter.use("/carts", cartsRouter);
rootRouter.use("/grns", grnRouter);
rootRouter.use("/grndetails", grndetailsRouter);
rootRouter.use("/orders", orderRouter);
rootRouter.use("/orderdetails", orderdetailRouter);
rootRouter.use("/imgproduct", imgproductRouter);
rootRouter.use("/imguser", imguserRouter);
rootRouter.use("/payment", paymentRouter);
rootRouter.use("/notifications", notificationsRouter);
rootRouter.use("/protranslations", proTranslationRouter);
rootRouter.use("/chats", chatsRouter);

module.exports = {
  rootRouter,
};
