const express = require("express");
const { STOCK_UNIVERSE, getQuotes, getHistory, getTrend } = require("../services/marketData");

const router = express.Router();

// GET /api/stocks — the full stock universe with live prices. Public, like
// browsing the market on any brokerage's site.
router.get("/", async (req, res) => {
  try {
    const symbols = STOCK_UNIVERSE.map((s) => s.symbol);
    const quotes = await getQuotes(symbols);
    const quoteMap = Object.fromEntries(quotes.map((q) => [q.symbol, q]));

    const stocks = STOCK_UNIVERSE.map((s) => ({
      symbol: s.symbol,
      name: s.name,
      sector: s.sector,
      price: quoteMap[s.symbol]?.price ?? null,
      previousClose: quoteMap[s.symbol]?.previousClose ?? null,
      changePercent: quoteMap[s.symbol]?.changePercent ?? null,
    }));

    res.json(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not load market data right now." });
  }
});

// GET /api/stocks/:symbol/history?range=1w|1mo|3mo|1y — for the graph icon.
router.get("/:symbol/history", async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const range = req.query.range || "1mo";
    const history = await getHistory(symbol, range);
    res.json(history);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not load price history for this stock." });
  }
});

// GET /api/stocks/:symbol/trend — for the three-dot icon. Historical
// analysis only — see the disclaimer field in the response.
router.get("/:symbol/trend", async (req, res) => {
  try {
    const symbol = req.params.symbol.toUpperCase();
    const trend = await getTrend(symbol);
    if (!trend) {
      return res.status(404).json({ message: "Not enough price history for this stock yet." });
    }
    res.json(trend);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not analyse this stock right now." });
  }
});

module.exports = router;
