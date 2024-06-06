"use strict";

const { slugify } = require("../lib/helpers");
const { Product } = require("../models");
const { fakerFR: faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up() {
    const productStatus = [Product.STATUS_DRAFT, Product.STATUS_PUBLISHED];

    const productData = [
      ...Array.from({ length: 100 }, () => {
        return {
          name: faker.commerce.department(),
          description: faker.commerce.productDescription(),
          status: productStatus[faker.number.int({ min: 0, max: productStatus.length - 1 })],
        };
      }),
    ];

    for (const categ of productData) {
      categ.slug = slugify(categ.name);
      console.log("Product created: %s", categ.name);
      await Product.create(categ);
    }
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete(Product.tableName, null, {});
  },
};
