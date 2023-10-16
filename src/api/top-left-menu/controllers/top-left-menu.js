'use strict';

/**
 * top-left-menu controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::top-left-menu.top-left-menu',{
    async get(id){
// @ts-ignore
strapi.entityService.findOne("api::top-left-menu.top-left-menu", id, {
  populate: { component: { populate: { relation: true } } },
});
    }
    
});
