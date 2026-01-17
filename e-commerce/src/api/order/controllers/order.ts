/**
 * order controller
 */

import { factories } from "@strapi/strapi";
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET);

export default factories.createCoreController(
  "api::order.order",
  () => ({
    async create(ctx) {
      const {
        amount,
        shippingAddress,
        city,
        state,
        pin,
        token,
        items,
      } = ctx.request.body;

      // 🔐 Protect route
      if (!ctx.state.user) {
        return ctx.unauthorized("You must be logged in");
      }

      // 💳 Stripe payment
      await stripe.charges.create({
        amount: amount * 100, // convert to paise here ONLY
        currency: "INR",
        source: token,
        description: `Order by ${ctx.state.user.email}`,
      });

      // 🛒 Save order
      const order = await strapi.db
        .query("api::order.order")
        .create({
          data: {
            shippingAddress,
            city,
            state,
            pin,
            amount,
            items,
            user: ctx.state.user.email,
          },
        });

      return order;
    },
  })
);
