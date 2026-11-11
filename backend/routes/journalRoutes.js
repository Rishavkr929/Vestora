const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const { OrdersModel } = require("../model/OrdersModel");
const { HoldingsModel } = require("../model/HoldingsModel");
const { PositionsModel } = require("../model/PositionsModel");
const UserModel = require("../model/UserModel");

const router = express.Router();
router.use(authMiddleware);

const REASON_LABELS = {
  trending: "Saw it trending",
  tip: "A tip or news",
  research: "My own research",
  trying_out: "Just trying it out",
};

// GET /api/journal — trade history plus "which reasons make/lose money"
// insights, computed from currently-held positions' most recent buy reason.
router.get("/", async (req, res) => {
  try {
    const [orders, holdings] = await Promise.all([
      OrdersModel.find({ userId: req.user.id }).sort({ createdAt: -1 }).limit(100),
      HoldingsModel.find({ userId: req.user.id }),
    ]);

    const trades = orders.map((o) => ({
      id: o._id,
      name: o.name,
      qty: o.qty,
      price: o.price,
      mode: o.mode,
      reason: o.reason,
      reasonLabel: o.reason ? REASON_LABELS[o.reason] : null,
      date: o.createdAt,
    }));

    const groups = {};
    for (const h of holdings) {
      if (!h.lastBuyReason) continue;
      const pnl = (h.price - h.avg) * h.qty;
      if (!groups[h.lastBuyReason]) {
        groups[h.lastBuyReason] = { reason: h.lastBuyReason, reasonLabel: REASON_LABELS[h.lastBuyReason], count: 0, totalPnl: 0 };
      }
      groups[h.lastBuyReason].count += 1;
      groups[h.lastBuyReason].totalPnl += pnl;
    }
    const insights = Object.values(groups).map((g) => ({ ...g, totalPnl: +g.totalPnl.toFixed(2) }));

    res.json({ trades, insights });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not load your trade journal." });
  }
});

// GET /api/journal/mistakes — gentle, explained behavioural flags. Nothing
// punitive — just patterns worth noticing.
router.get("/mistakes", async (req, res) => {
  try {
    const [user, holdings, positions, orders] = await Promise.all([
      UserModel.findById(req.user.id),
      HoldingsModel.find({ userId: req.user.id }),
      PositionsModel.find({ userId: req.user.id, status: "active" }),
      OrdersModel.find({ userId: req.user.id }).sort({ createdAt: 1 }),
    ]);

    const flags = [];

    // 1. Over-concentration: one stock making up more than 40% of net worth.
    const holdingsValue = holdings.reduce((sum, h) => sum + h.qty * h.price, 0);
    const netWorth = user.walletBalance + holdingsValue;
    if (netWorth > 0) {
      for (const h of holdings) {
        const value = h.qty * h.price;
        const pct = (value / netWorth) * 100;
        if (pct > 40) {
          flags.push({
            type: "concentration",
            severity: "warning",
            message: `${h.name} makes up ${pct.toFixed(0)}% of your net worth. If it drops, so does most of your portfolio — spreading investments across more stocks reduces that risk.`,
          });
        }
      }
    }

    // 2. Holdings with no stop-loss protecting them (only flag meaningful positions).
    const protectedSymbols = new Set(positions.map((p) => p.name));
    for (const h of holdings) {
      const value = h.qty * h.price;
      if (value > 1000 && !protectedSymbols.has(h.name)) {
        flags.push({
          type: "no_stop_loss",
          severity: "info",
          message: `${h.name} (worth ₹${value.toFixed(0)}) has no stop-loss set. A stop-loss limits how much you could lose if the price falls sharply.`,
        });
      }
    }

    // 3. Panic selling: sold at a loss within 3 days of buying.
    const buysByStock = {};
    let panicCount = 0;
    for (const order of orders) {
      if (order.mode === "BUY") {
        buysByStock[order.name] = order;
      } else if (order.mode === "SELL" && panicCount < 3) {
        const lastBuy = buysByStock[order.name];
        if (lastBuy) {
          const daysHeld = (new Date(order.createdAt) - new Date(lastBuy.createdAt)) / (1000 * 60 * 60 * 24);
          const dropPct = ((order.price - lastBuy.price) / lastBuy.price) * 100;
          if (daysHeld <= 3 && dropPct <= -5) {
            flags.push({
              type: "panic_sell",
              severity: "info",
              message: `You sold ${order.name} just ${daysHeld.toFixed(1)} day(s) after buying it, ${Math.abs(dropPct).toFixed(1)}% below your buy price. Selling quickly after a dip often locks in a loss that could have recovered.`,
            });
            panicCount += 1;
          }
        }
      }
    }

    res.json({ flags });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not check for patterns right now." });
  }
});

module.exports = router;
