const { ROLES } = require("../../../config");
const { authJwtMiddleware } = require("../../lib/authentication");
const OrderController = require("./controller");

class OrderRouter {
  static getRouter() {
    const router = require("express").Router();

    const userMiddleware = authJwtMiddleware();
    const adminMiddleware = authJwtMiddleware(ROLES.admin);

    router.route("/:id").get(userMiddleware, OrderController.getOrderById);
    router.route("/").get(adminMiddleware, OrderController.getAllOrders);
    router.route("/").post(userMiddleware, OrderController.createOrder);

    return router;
  }
}

module.exports = OrderRouter;
