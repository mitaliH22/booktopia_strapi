'use strict';

module.exports = ({ strapi }) => ({
  index(ctx) {
    ctx.body = strapi
      .plugin('contact-us-template')
      .service('myService')
      .getWelcomeMessage();
  },
});
