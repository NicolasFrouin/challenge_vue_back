const _ = require("lodash");
const Return = require("./return");

class Helpers {
  static checkProps(req, paramsToCheck = []) {
    const result = new Return(200, {});
    paramsToCheck.forEach((param) => {
      if (_.has(req, param)) {
        result.data[param] = req[param];
      } else {
        result.code = 400;
        result.setError({ message: `Missing parameter : ${param}`, code: 400 });
      }
    });
    return result;
  }
}

module.exports = Helpers;
