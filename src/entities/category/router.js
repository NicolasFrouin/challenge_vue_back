const { ROLES } = require("../../../config");
const { authJwtMiddleware } = require("../../lib/authentication");
const CategoryController = require("./controller");

class CategoryRouter {
  static getRouter() {
    const router = require("express").Router();

    const adminMiddleware = authJwtMiddleware(ROLES.admin);

    router.route("/:id").get(CategoryController.getCategoryById);
    router.route("/:id").patch(adminMiddleware, CategoryController.updateCategory);
    router.route("/:id").delete(adminMiddleware, CategoryController.deleteCategory);
    router.route("/").get(CategoryController.getAllCategories);
    router.route("/").post(adminMiddleware, CategoryController.createCategory);

    return router;
  }
}

module.exports = CategoryRouter;
