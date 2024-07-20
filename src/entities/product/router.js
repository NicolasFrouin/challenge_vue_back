const { ROLES } = require("../../../config");
const { authJwtMiddleware } = require("../../lib/authentication");
const ProductController = require("./controller");

class ProductRouter {
  static getRouter() {
    const router = require("express").Router();

    const accountantMiddleware = authJwtMiddleware(ROLES.accountant);

    router.route("/:id/stock").patch(accountantMiddleware, ProductController.updateStock);
    router.route("/:id").get(ProductController.getProductById);
    router.route("/:id").patch(accountantMiddleware, ProductController.updateProduct);
    router.route("/:id").delete(accountantMiddleware, ProductController.deleteProduct);
    router.route("/").get(ProductController.getAllProducts);
    router.route("/").post(accountantMiddleware, ProductController.createProduct);

    return router;
  }
}

module.exports = ProductRouter;
