const { Schema } = require("mongoose");

const OrdersSchema = new Schema(
  {
    name: String,
    qty: Number,
    price: Number,
    mode: String,

    // Why the user says they made this trade — only meaningful for BUY
    // orders, captured in the Buy window. Powers the trade journal.
    reason: {
      type: String,
      enum: ["trending", "tip", "research", "trying_out", null],
      default: null,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = { OrdersSchema };