'use strict';

/**
 * wishlist controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::wishlist.wishlist',{
    async create(ctx){
        for (const product of ctx.request.body){
console.log(product);
        }
          
    }
});
