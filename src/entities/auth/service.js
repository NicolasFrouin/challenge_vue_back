const { Return } = require("../../lib");
const { generateAccessToken } = require("../../loader/authentication");
const { User } = require("../../models");

class AuthService {
  static async login(email, password) {
    return await Return.from(User.login(email, password));
  }

  static async register({ email, password, firstname, lastname, role }) {
    return await Return.from(User.create({ email, password, firstname, lastname, role }), undefined, 201);
  }

  static async refreshAccessToken(data) {
    const accessToken = generateAccessToken(data);
    return Return.success({ accessToken });
  }
}

module.exports = AuthService;
