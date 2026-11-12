## ML Insights

Vestora includes an **Insights** page in the dashboard that adds machine-learning and statistical analysis on top of the trading screens. The analysis runs in a separate Python service so it can grow without touching the trading code.

### How it fits together

```
React (frontend)  →  Express (backend, port 3002)  →  Flask ML service (port 5001)
```

The frontend never calls Python directly. Every request goes through the Express backend under `/api/ml/...`.

### Features

| Feature | What it does | Method |
|---|---|---|
| Price forecast | Predicts the next 10 days of closing prices with a confidence range | ARIMA (`statsmodels`, `pmdarima`) |
| News sentiment | Shows a Bullish, Bearish or Neutral badge from recent headlines | FinBERT (pretrained, `transformers`) |
| Portfolio risk | Sector concentration, volatility per stock and Sharpe ratio for the user's holdings | Statistics (`pandas`, `numpy`) |
| Stock recommendations | Suggests stocks similar to a watchlist | Content-based filtering, cosine similarity (`scikit-learn`) |
| Order anomaly detection | Flags unusual orders by size and timing | Isolation Forest (`scikit-learn`) |

The first three are shown on the Insights page. Recommendations and anomaly detection are available as backend endpoints and do not have a UI yet.

### Project layout

```
backend/routes/ml.js                    Express routes that forward to the ML service
frontend/src/dashboard/components/
  Insights.js                           The Insights page
  Forecast.jsx                          Price forecast component
  SentimentBadge.jsx                    News sentiment component
  RiskPanel.jsx                         Portfolio risk component
ml-service/                             Python Flask service
  ml_service.py                         REST endpoints
  arima_forecast.py
  sentiment_analysis.py
  portfolio_risk.py
  stock_recommender.py
  anomaly_detection.py
  requirements.txt
```

### Running the ML service

Use Python 3.10 or 3.11.

```bash
cd ml-service
python -m venv venv
venv\Scripts\activate          # Windows
# source venv/bin/activate     # Mac/Linux
pip install -r requirements.txt
python ml_service.py
```

The service runs on `http://localhost:5001`. The first install takes several minutes because `torch` and `transformers` are large.

### Environment variables

Add this to `backend/.env` to enable news sentiment (free key from newsapi.org):

```
NEWS_API_KEY=your_key_here
```

Do not commit `.env` to the repository.

### Running the full app

Three terminals are needed:

1. `ml-service`: `python ml_service.py`
2. `backend`: `node index.js`
3. `frontend`: `npm start`

Then log in and open **Insights** from the top menu.

### Tickers

Price data comes from Yahoo Finance, so symbols must match Yahoo's format: `TCS.NS` for NSE stocks, `TCS.BO` for BSE stocks, and plain symbols such as `AAPL` for US stocks.

### Limitations

- Forecasts use past prices only and cannot account for news or sudden market events. They are for learning and demonstration, not financial advice.
- Price data comes from Yahoo Finance and may be delayed.
- Orders are stored as records only. The app does not connect to a real brokerage.
- The sector for each holding in `RiskPanel.jsx` is set in a lookup table (`SECTOR_MAP`) and must be updated when new stocks are added.
