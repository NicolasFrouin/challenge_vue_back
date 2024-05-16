const { authJwtMiddleware } = require("../../loader/authentication");
const AuthController = require("./controller");

class AuthRouter {
  static getRouter() {
    const router = require("express").Router();

    router.route("/login").post(AuthController.login);
    router.route("/register").post(AuthController.register);
    router.use(authJwtMiddleware()).route("/refresh").post(AuthController.refresh);
    router.use(authJwtMiddleware()).route("/me").get(AuthController.me);

    return router;
  }
}

module.exports = AuthRouter;
