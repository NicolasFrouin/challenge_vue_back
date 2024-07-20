const { Return } = require("../../lib");
const { Category, Product } = require("../../models");

class CategoryService {
  static async getAllCategories() {
    return Return.from(
      Category.findAll({ include: [{ model: Product, where: { status: Product.STATUS_PUBLISHED } }] }),
    );
  }

  static async getCategoryById(id) {
    return Return.from(Category.findOne({ slug: id }));
  }

  static async createCategory(data) {
    return Return.from(Category.create(data));
  }

  static async updateCategory(id, data) {
    return Return.from(Category.update(data, { where: { id } }));
  }

  static async deleteCategory(id) {
    return Return.from(Category.destroy({ where: { id } }));
  }

  // static async getCategoriesWithProducts() {
  //   return Return.from(Category.findAll({ include: "products" }));
  // }

  // static async getCategoryWithProducts(id) {
  //   return Return.from(Category.findByPk(id, { include: "products" }));
  // }

  // static async addProductToCategory(categoryId, productId) {
  //   const category = await Category.findByPk(categoryId);
  //   const product = await Product.findByPk(productId);

  //   if (!category || !product) {
  //     return Return.error(404, "Category or Product not found");
  //   }

  //   await category.addProduct(product);
  //   return Return.success(200, category);
  // }
}

module.exports = CategoryService;
