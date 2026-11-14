const { Schema } = require("mongoose");

// A Position is a stop-loss watch on a holding: if the stock's price drops
// to or below triggerPrice, Vestora sells it automatically and credits the
// sale back to the user's wallet.
const PositionsSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    qty: { type: Number, required: true },
    triggerPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["active", "triggered", "cancelled"],
      default: "active",
    },
    triggeredAt: { type: Date },
  },
  { timestamps: true }
);

// Speeds up every lookup by user.
PositionsSchema.index({ userId: 1 });
PositionsSchema.index({ status: 1 });

module.exports = { PositionsSchema };