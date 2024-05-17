const { AuthEntity, UserEntity, CategoryEntity } = require("../entities");

module.exports = (app) => {
  app.use("/auth", AuthEntity.authRouter);
  app.use("/users", UserEntity.userRouter);
  app.use("/categories", CategoryEntity.categoryRouter);
};
