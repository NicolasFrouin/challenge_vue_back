const { Op } = require("sequelize");
const { Return } = require("../../lib");
const { Product, Category } = require("../../models");

class ProductService {
  static async getAllProducts(req) {
    const where = { status: Product.STATUS_PUBLISHED };
    const categoryWhere = {};
    const { q, price = "", sort, categ = "" } = req.query;
    if (q) {
      where[Op.or] = [{ name: { [Op.iLike]: `%${q}%` } }, { description: { [Op.iLike]: `%${q}%` } }];
    }
    if (price) {
      const { priceLow = 0, priceHigh = Number.MAX_SAFE_INTEGER } = price.split("-").map(Number);
      where.price = { [Op.between]: [priceLow, priceHigh] };
    }
    if (categ) {
      categoryWhere.slug = categ;
    }
    const productSort = ["relevance", "lth", "htl", "new"].includes(sort) ? sort : "relevance";
    let order = [];
    switch (productSort) {
      case "lth":
        order = [["price", "ASC"]];
        break;
      case "htl":
        order = [["price", "DESC"]];
        break;
      case "new":
        order = [["createdAt", "DESC"]];
        break;
      default:
        order = [["id", "ASC"]];
    }
    return Return.from(Product.findAll({ where, order, include: [{ model: Category, where: categoryWhere }] }));
  }

  static async getProductById(id) {
    // return Return.from(Product.findByPk(id));
    return Return.from(Product.findOne({ slug: id }));
  }

  static async createProduct(data) {
    return Return.from(Product.create(data));
  }

  static async updateProduct(id, data) {
    return Return.from(Product.update(data, { where: { id } }));
  }

  static async deleteProduct(id) {
    return Return.from(Product.destroy({ where: { id } }));
  }

  static async updateStock(id, stock) {
    return Return.from(Product.update({ stock }, { where: { id } }));
  }
}

module.exports = ProductService;
