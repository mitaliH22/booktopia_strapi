const utils = require("@strapi/utils");
const { sanitize } = utils;

module.exports = {
  getMyOrders: async (ctx, next) => {
    const { myOrders } = ctx.params;
    const query = {
      filters: { myOrders },
      ...ctx.query,
    };

    let jwtToken;
    const token = await ctx.request.header.authorization;
    
    const tokenParts = token.split(" ");
    if (tokenParts.length === 2 && tokenParts[0] === "Bearer") {
      const tokenValue = tokenParts[1];
      jwtToken = tokenValue;
    } else {
      console.log("Invalid token format");
    }

    if (jwtToken) {
        const get = await strapi.entityService.findMany("api::order.order", query);
        const user = await strapi.plugins["users-permissions"].services.jwt.verify(jwtToken);
        let obj = get.filter((o) => o.customer_id === user.id);
        return obj;
    }else{
        ctx.body = "Invalid token";
    }   
  }
};