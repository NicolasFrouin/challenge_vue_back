const { authRouter } = require("../entities/auth");

module.exports = (app) => {
  app.use("/auth", authRouter);
};
