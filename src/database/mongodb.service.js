const mongodb = require("mongoose");

const { MONGO_URL: url, DB_NAME: database } = process.env;

mongodb
  .connect(`${url}/${database}`)
  .then(() => {
    console.log("Mongodb connection has been established successfully.");
  })
  .catch((error) => {
    throw new Error(`Unable to connect to the mongodb database: ${error}`);
  });

module.exports = mongodb;
