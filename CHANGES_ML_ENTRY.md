## ML Insights (November 2026)

### Added

- **ml-service/** (new): Python Flask service with five analysis modules: ARIMA price forecasting, FinBERT news sentiment, portfolio risk analysis, content-based stock recommendations and Isolation Forest order anomaly detection.
- **backend/routes/ml.js**: Express routes under `/api/ml` that forward requests to the ML service and return readable error messages.
- **Insights page** in the dashboard, built from three new components: `Forecast.jsx`, `SentimentBadge.jsx` and `RiskPanel.jsx`.

### Changed

- `backend/index.js`: registered the ML routes with `app.use("/api/ml", mlRoutes)`.
- `frontend/src/dashboard/components/Dashboard.js`: added the `/insights` route.
- `frontend/src/dashboard/components/Menu.js`: added the Insights link to the top menu.

### Requirements

- Python 3.10 or 3.11 for `ml-service`.
- `axios` installed in `backend`.
- `NEWS_API_KEY` in `backend/.env` for news sentiment.

### Known limitations

- Recommendations and anomaly detection are backend endpoints only and have no UI yet.
- Forecasts are statistical estimates, not financial advice.
- Sectors for risk analysis come from a lookup table in `RiskPanel.jsx`.
