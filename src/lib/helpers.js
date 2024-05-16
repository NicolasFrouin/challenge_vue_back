const _ = require("lodash");
const Return = require("./return");

class Helpers {
  /**
   * Checks if the given object contains all the specified properties
   *
   * For every missing property, the Return object will have it added to its `errors` array
   *
   * @param {object} object The object to check
   * @param {string[]} paramsToCheck An array of property names to check for - to check nested properties, use dot notation (e.g. "user.name")
   *
   * @returns {Return} An instance of the Return class containing the result of the check
   */
  static checkProps(object, paramsToCheck = []) {
    const result = new Return(200, {});
    paramsToCheck.forEach((param) => {
      if (_.has(object, param)) {
        result.data[param] = object[param];
      } else {
        result.code = 400;
        result.setError({ message: `Missing parameter : ${param}`, code: 400 });
      }
    });
    return result;
  }
}

module.exports = Helpers;
