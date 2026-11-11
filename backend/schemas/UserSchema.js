const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  // Virtual cash every new user starts with, so they can practice investing
  // without putting real money on the line.
  walletBalance: {
    type: Number,
    default: 100000
  },

  // Favourite stock symbols, capped at 50 (enforced in watchlistRoutes.js).
  watchlist: {
    type: [String],
    default: []
  }

}, { timestamps: true });

module.exports = UserSchema;
