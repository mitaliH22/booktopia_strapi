"use strict";

/**
 * `me` middleware
 */

module.exports = (config, { strapi }) => {
  // Add your own logic here.
  return async (ctx, next) => {
    const authUser = ctx.state.user;
    if (!authUser) {
      return ctx.unauthorized();
    }

    ctx.query = {
      filters: { user: { id: { $eq: authUser.id } } },
      ...ctx.query,
    };

    await next();
  };
};
