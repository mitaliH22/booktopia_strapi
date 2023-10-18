"use strict";

/**
 * wishlist router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::wishlist.wishlist", {
  config: {
    find: {
      middlewares: ["global::me"],
    },
  },
});
