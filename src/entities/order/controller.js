const { checkProps } = require("../../lib/helpers");
const OrderService = require("./service");

class OrderController {
  static async getAllOrders(req, res) {
    const { code, data } = await OrderService.getAllOrders(req.user);
    return res.status(code).json(data);
  }

  static async getOrderById(req, res) {
    const { code, data } = await OrderService.getOrderById(req.params.id);
    return res.status(code).json(data);
  }

  static async createOrder(req, res) {
    const check = checkProps(req.body, ["name"]);
    if (!check.ok) return res.status(check.code).json(check.data);

    const { name, description } = req.body;
    const { code, data } = await OrderService.createOrder({ name, description });
    return res.status(code).json(data);
  }
}

module.exports = OrderController;
