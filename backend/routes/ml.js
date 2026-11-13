const express = require("express");
const axios = require("axios");
const router = express.Router();

// Set ML_URL in the hosting dashboard when the Python service is deployed
const ML_URL = process.env.ML_URL || "http://localhost:5001";

// Show Python's real error message instead of a generic "status code 500"
const errorMessage = (err) =>
  err.response?.data?.error || err.message || "Something went wrong";

// 1. Price forecast:  GET /api/ml/forecast/INFY.NS
router.get("/forecast/:ticker", async (req, res) => {
  try {
    const { data } = await axios.post(`${ML_URL}/forecast`, {
      ticker: req.params.ticker,
      days_ahead: 10,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: errorMessage(err) });
  }
});

// 2. Sentiment:  GET /api/ml/sentiment/Infosys
router.get("/sentiment/:ticker", async (req, res) => {
  try {
    if (!process.env.NEWS_API_KEY) {
      return res.status(400).json({
        error: "NEWS_API_KEY is missing. Add it to your backend .env file and restart.",
      });
    }
    const { data } = await axios.post(`${ML_URL}/sentiment`, {
      ticker: req.params.ticker,
      api_key: process.env.NEWS_API_KEY,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: errorMessage(err) });
  }
});

// 3. Portfolio risk:  POST /api/ml/portfolio-risk
router.post("/portfolio-risk", async (req, res) => {
  try {
    const { data } = await axios.post(`${ML_URL}/portfolio-risk`, {
      holdings: req.body.holdings,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: errorMessage(err) });
  }
});

// 4. Recommendations:  POST /api/ml/recommendations
router.post("/recommendations", async (req, res) => {
  try {
    const { data } = await axios.post(`${ML_URL}/recommendations`, {
      watchlist: req.body.watchlist,
      top_n: 5,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: errorMessage(err) });
  }
});

// 5. Order anomalies:  POST /api/ml/order-anomalies
router.post("/order-anomalies", async (req, res) => {
  try {
    const { data } = await axios.post(`${ML_URL}/order-anomalies`, {
      orders: req.body.orders,
    });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: errorMessage(err) });
  }
});

module.exports = router;
