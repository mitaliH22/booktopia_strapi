module.exports = {
  getMyOrders: async (ctx, next) => {
    const authUser = ctx.state.user;

    if (!authUser) {
      return ctx.unauthorized();
    }

    const query = {
      filters: { user: { id: { $eq: authUser.id } } },
      ...ctx.query,
    };

    return await strapi.entityService.findMany("api::order.order", query);
  },
};
