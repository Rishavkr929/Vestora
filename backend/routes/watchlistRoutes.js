const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const UserModel = require("../model/UserModel");
const { symbolInfo } = require("../services/marketData");

const router = express.Router();
router.use(authMiddleware);

const MAX_WATCHLIST = 50;

// GET /api/watchlist — the logged-in user's favourite symbols.
router.get("/", async (req, res) => {
  const user = await UserModel.findById(req.user.id);
  res.json(user.watchlist || []);
});

// POST /api/watchlist/:symbol — add a favourite (max 50).
router.post("/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    if (!symbolInfo.has(symbol)) {
      return res.status(400).json({ message: "Unknown stock symbol." });
    }

    const user = await UserModel.findById(req.user.id);
    user.watchlist = user.watchlist || [];

    if (user.watchlist.includes(symbol)) {
      return res.json(user.watchlist);
    }
    if (user.watchlist.length >= MAX_WATCHLIST) {
      return res.status(400).json({
        message: `You can only keep up to ${MAX_WATCHLIST} stocks in your watchlist.`,
      });
    }

    user.watchlist.push(symbol);
    await user.save();
    res.json(user.watchlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not update your watchlist." });
  }
});

// DELETE /api/watchlist/:symbol — remove a favourite.
router.delete("/:symbol", async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const user = await UserModel.findById(req.user.id);
    user.watchlist = (user.watchlist || []).filter((s) => s !== symbol);
    await user.save();
    res.json(user.watchlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not update your watchlist." });
  }
});

module.exports = router;
