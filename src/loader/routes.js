const { AuthEntity, UserEntity } = require("../entities");

module.exports = (app) => {
  app.use("/auth", AuthEntity.authRouter);
  app.use("/users", UserEntity.userRouter);
};
