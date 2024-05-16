const { ROLES } = require("../../../config");
const { authJwtMiddleware } = require("../../loader/authentication");
const UserController = require("./controller");

class UserRouter {
  static getRouter() {
    const router = require("express").Router();

    const userAuth = authJwtMiddleware();
    const adminAuth = authJwtMiddleware(ROLES.admin);

    router.use(userAuth).route("/info").get(UserController.getUserInfo);
    router.use(adminAuth).route("/:id").get(UserController.getUser);
    router.use(adminAuth).route("/:id").delete(UserController.deleteUser);
    router.use(userAuth).route("/").patch(UserController.updateUser);
    router.use(adminAuth).route("/").get(UserController.getUsers);
    router.use(adminAuth).route("/").post(UserController.createUser);

    return router;
  }
}

module.exports = UserRouter;
