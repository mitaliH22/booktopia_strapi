"use strict";

/**
 * book controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::book.book", {
  async updateQty(id, qty) {
    strapi.entityService.update("api::book.book", id, {
      data: {
        stock: qty,
      },
    });
  },

  async findProduct(id) {
    const product = await strapi.entityService.findOne("api::book.book", id);
    return product;
  },
});
