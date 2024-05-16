const jwt = require("jsonwebtoken");
const { ROLES } = require("../../config");

/**
 * Middleware to authenticate JWT token and check user role
 *
 * @param {string} role Role to authenticate - defaults to {@link ROLES.user}
 *
 * @returns {function} Middleware authentication function
 *
 * @see {@link ROLES}
 *
 * @example
 * const express = require("express");
 * const { authJwtMiddleware } = require("./auth");
 * const { ROLES } = require("./config");
 *
 * const app = express();
 *
 * const adminMiddleware = authJwtMiddleware(ROLES.admin);
 *
 * app.get("/user", authJwtMiddleware(), (req, res) => {
 *  res.send("Hello user");
 * }
 *
 * app.get("/admin", adminMiddleware, (req, res) => {
 *  res.send("Hello admin");
 * }
 */
exports.authJwtMiddleware = (role = ROLES.user) => {
  return (req, res, next) => {
    if (process.env.NODE_ENV === "development") {
      const result = {};

      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];
      if (!token) {
        result.error = "No token provided";
        result.code = 401;
        console.log("\x1b[31m%d\x1b[0m - \x1b[34m%s\x1b[0m", result.code, result.error);
        return next();
      }

      if (!result.error) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
          if (err) {
            result.error = "Invalid token";
            result.code = 401;
            console.log("\x1b[31m%d\x1b[0m - \x1b[34m%s\x1b[0m", result.code, result.error);
            return next();
          }
          if (role !== ROLES.user && user.role !== role) {
            result.error = "Unauthorized";
            result.code = 403;
            console.log("\x1b[31m%d\x1b[0m - \x1b[34m%s\x1b[0m", result.code, result.error);
            return next();
          }
          req.user = user;
          return next();
        });
      }
    }

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) return res.sendStatus(401);
      if (role !== ROLES.user && user.role !== role) return res.sendStatus(403);
      req.user = user;
      next();
    });
  };
};

/**
 * Generate JWT access token
 *
 * @param {object} user User object to generate token
 *
 * @returns {string} JWT token
 */
exports.generateAccessToken = (user) => {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

/**
 * Generate JWT refresh token
 *
 * @param {object} user User object to generate token
 *
 * @returns {string} JWT token
 */
exports.generateRefreshToken = (user) => {
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN });
};
