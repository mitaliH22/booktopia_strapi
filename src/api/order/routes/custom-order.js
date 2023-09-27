module.exports = {
  routes: [
    {
      method: "GET",
      path: "/orders/:myOrders",
      handler: "custom.getMyOrders",
      auth: {
        scope: ["find"],
      },
    },
  ],
};
