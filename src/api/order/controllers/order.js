"use strict";

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", {
  async create(ctx) {
    try {
      for (const product of ctx.request.body.data.order_products) {
        const { id, quantity, stock } = product;
        const foundProduct = await strapi
          .controller("api::book.book")
          // @ts-ignore
          .findProduct(id);

        if (foundProduct) {
          ctx.body = foundProduct;
          const updatedStock = foundProduct.stock - quantity;
          
          // @ts-ignore
          await strapi.controller("api::book.book").updateQty(id, updatedStock)
        }
      }

      const order = await strapi.entityService.create(
        "api::order.order",
        ctx.request.body
      );
      return order;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
});
