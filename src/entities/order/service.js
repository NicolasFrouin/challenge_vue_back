const { Op } = require("sequelize");
const { ROLES } = require("../../../config");
const { Return } = require("../../lib");
const { Order, User, OrderLine, Product } = require("../../models");
const { mongoOrder } = require("../../database/mongodb/models");

class OrderService {
  static async getAllOrders(user) {
    if (user.role === ROLES.admin) return Return.from(Order.findAll());
    return Return.from(Order.findAll({ where: { user_id: user.id } }));
  }

  static async getOrderById(id) {
    return Return.from(Order.findByPk(id));
  }

  static async createOrder(user, products) {
    const orderData = {};
    const orderUser = await User.findByPk(user.id);
    if (!orderUser) return Return.error(404);
    orderData.user_id = user.id;
    const orderLines = products.map((product) => ({ product_id: product.id, quantity: product.qty }));
    const orderProducts = await Product.findAll({
      where: { id: { [Op.in]: orderLines.map((line) => line.product_id) } },
    });
    if (orderProducts.length !== orderLines.length) return Return.error(400);
    orderData.order_lines = orderLines;
    const lines = await OrderLine.bulkCreate(orderLines);
    const order = await Order.create({ user_id: user.id, statis: Order.STATUS_DRAFT });
    for (const l of lines) {
      await OrderLine.update({ order_id: order.id }, { where: { id: l.id } });
    }
    const res = await Order.update({ status: Order.STATUS_VALIDATED }, { where: { id: order.id } });
    await order.reload();
    const mongoLines = await OrderLine.findAll({ where: { order_id: order.toJSON().id }, include: Product });
    console.log({ mongoLines: mongoLines });
    const orderDataMongo = {
      ...order.toJSON(),
      lines: mongoLines.map((l) => l.toJSON()),
    };
    console.log(orderDataMongo);
    mongoOrder.create(orderDataMongo);
    // mongodb.connection.models.mongoOrder.create(order.getFullData());
    return Return.from(res, 201);
    // return Return.from(
    //   Order.create(orderData, {
    //     include: [
    //       {
    //         model: OrderLine,
    //         include: [Product, Order],
    //       },
    //       User,
    //     ],
    //   }),
    // );
  }
}

module.exports = OrderService;
