const { ROLES } = require("../../../config");
const { Return } = require("../../lib");
const { Order } = require("../../models");

class OrderService {
  static async getAllOrders(user) {
    if (user.role === ROLES.admin) return Return.from(Order.findAll());
    return Return.from(Order.findAll({ where: { user_id: user.id } }));
  }

  static async getOrderById(id) {
    return Return.from(Order.findByPk(id));
  }

  static async createOrder(data) {
    return Return.from(Order.create(data));
  }
}

module.exports = OrderService;
