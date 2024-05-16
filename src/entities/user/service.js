const { Return } = require("../../lib");
const { User } = require("../../models");

class UserService {
  static async getUserInfo(id) {
    return await Return.from(User.findByPk(id));
  }

  static async addUser(user) {
    return await Return.from(User.create(user), undefined, 201);
  }

  static async getUsers() {
    return await Return.from(User.findAll());
  }

  static async getUser(id) {
    return await Return.from(User.findByPk(id));
  }

  static async updateUser(id, data) {
    return await Return.from(User.update(data, { where: { id } }));
  }

  static async deleteUser(id) {
    return await Return.from(User.destroy({ where: { id } }));
  }
}

module.exports = UserService;
