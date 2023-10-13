"use strict";

/**
 * book controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::book.book", {
  async updateQty(id, qty) {
    // @ts-ignore
    strapi.entityService.update("api::book.book", id, {
      data: {
        stock: qty,
      },
    });
  },

  async findProduct(id) {
    // @ts-ignore
    const product = await strapi.entityService.findOne("api::book.book", id);
    return product;
  },

  async likeBook(ctx) {
    let { id } = ctx.params;
    // get the book
    const book = await strapi.service("api::book.book").findOne(id);

    // if book does not exist
    if (!book) {
      return ctx.badRequest("book does not exist");
    }

    // update function
    const updateFunction = async (whoLiked) => {
      let entity = await strapi
        .service("api::book.book")
        .update(id, { data: { likes: whoLiked } });
      const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
      return this.transformResponse(sanitizedEntity);
    };

    // if no existing likes
    if (book.likes == null || book.likes.length == 0) {
      let peopleWhoLiked = [];
      peopleWhoLiked.push(ctx.username);
      return updateFunction(peopleWhoLiked);
    }
    // if user already liked
    else if (book.likes.includes(ctx.username)) {
      let peopleWhoLiked = book.likes;
      let index = peopleWhoLiked.indexOf(ctx.username);
      if (index > -1) {
        peopleWhoLiked.splice(index, 1);
      }
      return updateFunction(peopleWhoLiked);
    }
    // new like
    else {
      let peopleWhoLiked = book.likes;
      peopleWhoLiked.push(ctx.username);
      return updateFunction(peopleWhoLiked);
    }
  }
});


// "use strict";

// /**
//  * book controller
//  */

// const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController("api::book.book", ({ strapi }) => ({
//   async likeBook(ctx) {
//     let { id } = ctx.params;

//     // get the book
//     const book = await strapi.service("api::book.book").findOne(id);

//     // if book does not exist
//     if (!book) {
//       return ctx.badRequest("book does not exist");
//     }

//     // update function
//     const updateFunction = async (whoLiked) => {
//       let entity = await strapi
//         .service("api::book.book")
//         .update(id, { data: { likes: whoLiked } });
//       const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
//       return this.transformResponse(sanitizedEntity);
//     };

//     // if no existing likes
//     if (book.likes == null || book.likes.length == 0) {
//       let peopleWhoLiked = [];
//       peopleWhoLiked.push(ctx.username);
//       return updateFunction(peopleWhoLiked);
//     }
//     // if user already liked
//     else if (book.likes.includes(ctx.username)) {
//       let peopleWhoLiked = book.likes;
//       let index = peopleWhoLiked.indexOf(ctx.username);
//       if (index > -1) {
//         peopleWhoLiked.splice(index, 1);
//       }
//       return updateFunction(peopleWhoLiked);
//     }
//     // new like
//     else {
//       let peopleWhoLiked = book.likes;
//       peopleWhoLiked.push(ctx.username);
//       return updateFunction(peopleWhoLiked);
//     }
//   },

//   async create(ctx) {
//     const { data } = ctx.request.body;
//     // save creator field from middleware
//     data.creator = ctx.username;

//     // create book
//     let entity = await strapi.service("api::book.book").create({ data });
//     const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
//     return this.transformResponse(sanitizedEntity);
//   },

//   async update(ctx) {
//     let { id } = ctx.params;

//     // get the book
//     const book = await strapi.service("api::book.book").findOne(id);

//     // if book does not exist
//     if (!book) {
//       return ctx.badRequest("book does not exist");
//     }

//     // if book belongs to this user from the middleware
//     if (book.creator !== ctx.username) {
//       return ctx.forbidden("You cannot update this book");
//     }

//     // update book
//     let entity = await strapi
//       .service("api::book.book")
//       .update(id, ctx.request.body);
//     const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
//     return this.transformResponse(sanitizedEntity);
//   },

//   async delete(ctx) {
//     let { id } = ctx.params;

//     // get the book
//     const book = await strapi.service("api::book.book").findOne(id);

//     // if book does not exist
//     if (!book) {
//       return ctx.badRequest("book does not exist");
//     }

//     // delete book
//     let entity = await strapi.service("api::book.book").delete(id);
//     const sanitizedEntity = await this.sanitizeOutput(entity, ctx);
//     return this.transformResponse(sanitizedEntity);
//   },
// }));