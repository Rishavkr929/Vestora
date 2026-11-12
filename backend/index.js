require("dotenv").config();

// const dns = require("dns");
// dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authMiddleware = require("./middleware/authMiddleware");

const PORT = process.env.PORT || 3002;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));
app.use(bodyParser.json());

const { HoldingsModel } = require("./model/HoldingsModel");

const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const UserModel = require("./model/UserModel");

const authRoutes = require("./routes/authRoutes");
const stockRoutes = require("./routes/stockRoutes");
const watchlistRoutes = require("./routes/watchlistRoutes");
const journalRoutes = require("./routes/journalRoutes");
const quizRoutes = require("./routes/quizRoutes");
const { getQuote, getQuotes } = require("./services/marketData");
const mlRoutes = require("./routes/ml");

app.use("/api/ml", mlRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/journal", journalRoutes);
app.use("/api/quiz", quizRoutes);

// app.get("/addHoldings", async (req, res) => {
//   let tempHoldings = [
//     {
//       name: "BHARTIARTL",
//       qty: 2,
//       avg: 538.05,
//       price: 541.15,
//       net: "+0.58%",
//       day: "+2.99%",
//     },
//     {
//       name: "HDFCBANK",
//       qty: 2,
//       avg: 1383.4,
//       price: 1522.35,
//       net: "+10.04%",
//       day: "+0.11%",
//     },
//     {
//       name: "HINDUNILVR",
//       qty: 1,
//       avg: 2335.85,
//       price: 2417.4,
//       net: "+3.49%",
//       day: "+0.21%",
//     },
//     {
//       name: "INFY",
//       qty: 1,
//       avg: 1350.5,
//       price: 1555.45,
//       net: "+15.18%",
//       day: "-1.60%",
//       isLoss: true,
//     },
//     {
//       name: "ITC",
//       qty: 5,
//       avg: 202.0,
//       price: 207.9,
//       net: "+2.92%",
//       day: "+0.80%",
//     },
//     {
//       name: "KPITTECH",
//       qty: 5,
//       avg: 250.3,
//       price: 266.45,
//       net: "+6.45%",
//       day: "+3.54%",
//     },
//     {
//       name: "M&M",
//       qty: 2,
//       avg: 809.9,
//       price: 779.8,
//       net: "-3.72%",
//       day: "-0.01%",
//       isLoss: true,
//     },
//     {
//       name: "RELIANCE",
//       qty: 1,
//       avg: 2193.7,
//       price: 2112.4,
//       net: "-3.71%",
//       day: "+1.44%",
//     },
//     {
//       name: "SBIN",
//       qty: 4,
//       avg: 324.35,
//       price: 430.2,
//       net: "+32.63%",
//       day: "-0.34%",
//       isLoss: true,
//     },
//     {
//       name: "SGBMAY29",
//       qty: 2,
//       avg: 4727.0,
//       price: 4719.0,
//       net: "-0.17%",
//       day: "+0.15%",
//     },
//     {
//       name: "TATAPOWER",
//       qty: 5,
//       avg: 104.2,
//       price: 124.15,
//       net: "+19.15%",
//       day: "-0.24%",
//       isLoss: true,
//     },
//     {
//       name: "TCS",
//       qty: 1,
//       avg: 3041.7,
//       price: 3194.8,
//       net: "+5.03%",
//       day: "-0.25%",
//       isLoss: true,
//     },
//     {
//       name: "WIPRO",
//       qty: 4,
//       avg: 489.3,
//       price: 577.75,
//       net: "+18.08%",
//       day: "+0.32%",
//     },
//   ];

//   tempHoldings.forEach((item) => {
//     let newHolding = new HoldingsModel({
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.day,
//       day: item.day,
//     });

//     newHolding.save();
//   });
//   res.send("Done!");
// });

// app.get("/addPositions", async (req, res) => {
//   let tempPositions = [
//     {
//       product: "CNC",
//       name: "EVEREADY",
//       qty: 2,
//       avg: 316.27,
//       price: 312.35,
//       net: "+0.58%",
//       day: "-1.24%",
//       isLoss: true,
//     },
//     {
//       product: "CNC",
//       name: "JUBLFOOD",
//       qty: 1,
//       avg: 3124.75,
//       price: 3082.65,
//       net: "+10.04%",
//       day: "-1.35%",
//       isLoss: true,
//     },
//   ];

//   tempPositions.forEach((item) => {
//     let newPosition = new PositionsModel({
//       product: item.product,
//       name: item.name,
//       qty: item.qty,
//       avg: item.avg,
//       price: item.price,
//       net: item.net,
//       day: item.day,
//       isLoss: item.isLoss,
//     });

//     newPosition.save();
//   });
//   res.send("Done!");
// });

app.get("/health", (req, res) => res.send("ok"));

app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

app.get("/allHoldings", authMiddleware, async (req, res) => {
  let allHoldings = await HoldingsModel.find({ userId: req.user.id });

  if (allHoldings.length > 0) {
    const quotes = await getQuotes(allHoldings.map((h) => h.name));
    const quoteMap = Object.fromEntries(quotes.map((q) => [q.symbol, q.price]));

    for (const holding of allHoldings) {
      if (
        quoteMap[holding.name] != null &&
        quoteMap[holding.name] !== holding.price
      ) {
        holding.price = quoteMap[holding.name];
        await holding.save();
      }
    }
  }

  res.json(allHoldings);
});

app.get("/allPositions", authMiddleware, async (req, res) => {
  let allPositions = await PositionsModel.find({ userId: req.user.id });
  res.json(allPositions);
});

// POST /newPosition — set a stop-loss on a stock you currently hold. If the
// price ever drops to or below triggerPrice, checkStopLossPositions() below
// sells it automatically, whether or not anyone has the app open.
app.post("/newPosition", authMiddleware, async (req, res) => {
  try {
    const qty = Number(req.body.qty);
    const triggerPrice = Number(req.body.triggerPrice);
    const { name } = req.body;

    if (!name || !qty || qty <= 0 || !triggerPrice || triggerPrice <= 0) {
      return res.status(400).json({
        message:
          "Choose a stock, a quantity and a trigger price greater than zero.",
      });
    }

    const holding = await HoldingsModel.findOne({ userId: req.user.id, name });
    if (!holding || holding.qty < qty) {
      return res.status(400).json({
        message:
          "You don't hold enough shares of this stock to set a stop-loss.",
      });
    }

    if (triggerPrice >= holding.price) {
      return res.status(400).json({
        message: "Trigger price should be below the stock's current price.",
      });
    }

    const position = await new PositionsModel({
      userId: req.user.id,
      name,
      qty,
      triggerPrice,
    }).save();

    res.status(201).json(position);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not set that stop-loss." });
  }
});

// DELETE /position/:id — cancel a stop-loss before it triggers.
app.delete("/position/:id", authMiddleware, async (req, res) => {
  try {
    const position = await PositionsModel.findOne({
      _id: req.params.id,
      userId: req.user.id,
      status: "active",
    });
    if (!position) {
      return res.status(404).json({ message: "Active stop-loss not found." });
    }
    position.status = "cancelled";
    await position.save();
    res.json({ message: "Stop-loss cancelled." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Could not cancel that stop-loss." });
  }
});

app.post("/newOrder", authMiddleware, async (req, res) => {
  try {
    const { name, mode } = req.body;
    const qty = Number(req.body.qty);
    const VALID_REASONS = ["trending", "tip", "research", "trying_out"];
    const reason = VALID_REASONS.includes(req.body.reason)
      ? req.body.reason
      : null;

    if (!name || !qty || qty <= 0) {
      return res.status(400).json({
        message: "Choose a stock and a quantity greater than zero.",
      });
    }

    // Price comes from Vestora's own live quote, never from the client —
    // a financial transaction should never let the caller name its own
    // price.
    const quote = await getQuote(name.toUpperCase());
    if (!quote || quote.price == null) {
      return res
        .status(400)
        .json({ message: "Could not get a live price for this stock." });
    }
    const price = quote.price;

    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const existingHolding = await HoldingsModel.findOne({
      userId: req.user.id,
      name,
    });

    if (mode === "BUY") {
      const cost = qty * price;
      if (user.walletBalance < cost) {
        return res.status(400).json({
          message: "Not enough wallet balance for this investment.",
        });
      }

      user.walletBalance = +(user.walletBalance - cost).toFixed(2);
      await user.save();

      if (existingHolding) {
        // Blend the new lot into the existing average buy price.
        const totalQty = existingHolding.qty + qty;
        const totalCost = existingHolding.avg * existingHolding.qty + cost;
        existingHolding.qty = totalQty;
        existingHolding.avg = +(totalCost / totalQty).toFixed(2);
        existingHolding.price = price;
        if (reason) existingHolding.lastBuyReason = reason;
        await existingHolding.save();
      } else {
        await new HoldingsModel({
          userId: req.user.id,
          name,
          qty,
          avg: price,
          price,
          net: "0.00%",
          day: "0.00%",
          lastBuyReason: reason,
        }).save();
      }
    } else if (mode === "SELL") {
      if (!existingHolding || existingHolding.qty < qty) {
        return res.status(400).json({
          message: "You don't hold enough shares of this stock to sell.",
        });
      }

      user.walletBalance = +(user.walletBalance + qty * price).toFixed(2);
      await user.save();

      if (existingHolding.qty === qty) {
        await HoldingsModel.deleteOne({ _id: existingHolding._id });
      } else {
        existingHolding.qty -= qty;
        existingHolding.price = price;
        await existingHolding.save();
      }
    } else {
      return res
        .status(400)
        .json({ message: "Order mode must be BUY or SELL." });
    }

    let newOrder = new OrdersModel({
      name,
      qty,
      price,
      mode,
      reason: mode === "BUY" ? reason : null,
      userId: req.user.id,
    });

    await newOrder.save();

    res.json({
      message: `${mode === "BUY" ? "Invested in" : "Sold"} ${qty} share(s) of ${name}.`,
      walletBalance: user.walletBalance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error saving order",
    });
  }
});

app.get("/allOrders", authMiddleware, async (req, res) => {
  try {
    const allOrders = await OrdersModel.find({
      userId: req.user.id,
    });

    res.json(allOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error fetching orders",
    });
  }
});

// --- Stop-loss auto-sell -----------------------------------------------
// Every few seconds, fetch real live prices for any stock that currently
// has an active stop-loss, update matching holdings, and sell automatically
// if the trigger has been reached.
async function checkStopLossPositions() {
  const activePositions = await PositionsModel.find({ status: "active" });
  if (activePositions.length === 0) return;

  const names = [...new Set(activePositions.map((p) => p.name))];
  const quotes = await getQuotes(names);
  const quoteMap = Object.fromEntries(quotes.map((q) => [q.symbol, q.price]));

  for (const name of names) {
    if (quoteMap[name] == null) continue;
    const holdingsForStock = await HoldingsModel.find({ name });
    for (const holding of holdingsForStock) {
      if (holding.price !== quoteMap[name]) {
        holding.price = quoteMap[name];
        await holding.save();
      }
    }
  }

  for (const position of activePositions) {
    const holding = await HoldingsModel.findOne({
      userId: position.userId,
      name: position.name,
    });
    if (!holding || holding.price > position.triggerPrice) continue;

    const user = await UserModel.findById(position.userId);
    const sellQty = Math.min(position.qty, holding.qty);
    if (!user || sellQty <= 0) continue;

    user.walletBalance = +(
      user.walletBalance +
      sellQty * holding.price
    ).toFixed(2);
    await user.save();

    if (holding.qty === sellQty) {
      await HoldingsModel.deleteOne({ _id: holding._id });
    } else {
      holding.qty -= sellQty;
      await holding.save();
    }

    await new OrdersModel({
      name: position.name,
      qty: sellQty,
      price: holding.price,
      mode: "SELL",
      userId: position.userId,
    }).save();

    position.status = "triggered";
    position.triggeredAt = new Date();
    await position.save();
  }
}

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("DB Connected");

    app.listen(PORT, () => {
      console.log("Server running on " + PORT);
    });

    setInterval(() => {
      checkStopLossPositions().catch((err) =>
        console.error("Stop-loss check failed:", err),
      );
    }, 5000);
  })
  .catch((err) => {
    console.error("MongoDB connection failed ❌");
    console.error(err.message);
  });
