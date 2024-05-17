const { ROLES } = require("../../../config");
const { authJwtMiddleware } = require("../../loader/authentication");
const UserController = require("./controller");

class UserRouter {
  static getRouter() {
    const router = require("express").Router();

    const userAuth = authJwtMiddleware();
    const adminAuth = authJwtMiddleware(ROLES.admin);

    router.route("/info").get(userAuth, UserController.getUserInfo);
    router.route("/:id").get(adminAuth, UserController.getUser);
    router.route("/:id").delete(adminAuth, UserController.deleteUser);
    router.route("/").patch(userAuth, UserController.updateUser);
    router.route("/").get(adminAuth, UserController.getUsers);
    router.route("/").post(adminAuth, UserController.createUser);

    return router;
  }
}

module.exports = UserRouter;
