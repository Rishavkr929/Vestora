# Vestora ML Add-on

Five ML features for the Vestora stock trading platform, served as a
Python/Flask microservice that your Node/Express backend calls over HTTP.

## Files

| File | What it does |
|---|---|
| `arima_forecast.py` | Predicts future stock prices using ARIMA (auto-tuned via `pmdarima`) |
| `sentiment_analysis.py` | Scores news headlines as positive/negative/neutral using FinBERT |
| `portfolio_risk.py` | Computes sector concentration, volatility, and Sharpe ratio for a user's holdings |
| `stock_recommender.py` | Recommends similar stocks using cosine similarity on stock features |
| `anomaly_detection.py` | Flags unusual order patterns using Isolation Forest |
| `ml_service.py` | Flask app exposing all five as REST endpoints |

## Setup

```bash
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt
python ml_service.py
```

The service runs on `http://localhost:5001`.

## Calling it from your Node/Express backend

```javascript
const axios = require("axios");

app.get("/api/forecast/:ticker", async (req, res) => {
  try {
    const response = await axios.post("http://localhost:5001/forecast", {
      ticker: req.params.ticker,
      days_ahead: 10,
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

Repeat this pattern for `/sentiment`, `/portfolio-risk`, `/recommendations`,
and `/order-anomalies` — same shape, different endpoint and payload (see
the docstring at the top of `ml_service.py` for each endpoint's expected
JSON body).

## Notes for your report / viva

- **ARIMA forecasting**: mention its linear-model limitation (struggles
  with sudden news-driven price shocks) as justification for the
  "future enhancement" of moving to LSTM later.
- **Sentiment analysis**: FinBERT is *pretrained* — you're not training
  a model from scratch, just doing inference. Say this explicitly if
  asked, it's honest and still counts as a real ML integration.
- **Portfolio risk**: this one is pure statistics/quant finance, not
  ML in the "trained model" sense — good to mention as a lower-risk,
  highly explainable feature if examiners push on methodology.
- **Recommendations**: content-based filtering, not collaborative —
  because you likely won't have enough real users for collaborative
  filtering to make sense in a college project.
- **Anomaly detection**: unsupervised (Isolation Forest needs no
  labeled fraud data), which is realistic since you won't have
  real fraud examples to train on.

## Caching recommendation

Don't call `yfinance` or FinBERT on every page load — cache results in
MongoDB (e.g., a `forecasts` collection keyed by ticker + date) and
refresh once or twice a day. This keeps your dashboard fast and avoids
hitting free-tier API rate limits.
