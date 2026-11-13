"""
ARIMA Stock Price Forecasting (lightweight version)
-----------------------------------------------------
Predicts future closing prices for a ticker using ARIMA.

This version is built to fit on a small free server:
  - it uses 1 year of prices instead of 2
  - it tries 3 small ARIMA settings and keeps the best one (lowest AIC),
    instead of the large automatic search that pmdarima runs
  - it does not need pmdarima at all
  - results are cached for an hour, so repeat clicks are instant

Install:
    pip install yfinance pandas numpy statsmodels
"""

import time
import warnings

import pandas as pd
import yfinance as yf
from statsmodels.tsa.arima.model import ARIMA

warnings.filterwarnings("ignore")

# Small, fast candidates: (p, d, q). The best one by AIC is used.
CANDIDATE_ORDERS = [(1, 1, 0), (1, 1, 1), (2, 1, 2)]

CACHE_SECONDS = 60 * 60
_CACHE = {}


def fetch_stock_data(ticker: str, period: str = "1y") -> pd.Series:
    """Download historical closing prices for a ticker."""
    data = yf.download(ticker, period=period, progress=False)
    if data.empty:
        raise ValueError(f"No data found for ticker '{ticker}'")
    series = data["Close"].squeeze().dropna().astype(float)
    # Drop the dates: ARIMA only needs the ordered prices, and market
    # holidays leave gaps that statsmodels cannot handle in a date index.
    return series.reset_index(drop=True)


def fit_best_model(series: pd.Series):
    """Fit each candidate order and return (order, fitted_model) with the lowest AIC."""
    best = None
    for order in CANDIDATE_ORDERS:
        try:
            fitted = ARIMA(series, order=order).fit()
        except Exception:
            continue
        if best is None or fitted.aic < best[1].aic:
            best = (order, fitted)
    if best is None:
        raise ValueError("Could not fit a forecasting model for this stock.")
    return best


def forecast_stock(ticker: str, days_ahead: int = 10) -> dict:
    """
    Full pipeline: fetch data -> fit ARIMA -> forecast.
    Returns a dict that can be sent back as JSON.
    """
    key = (ticker.upper(), days_ahead)
    cached = _CACHE.get(key)
    if cached and time.time() - cached[0] < CACHE_SECONDS:
        return cached[1]

    series = fetch_stock_data(ticker)
    order, model_fit = fit_best_model(series)

    forecast_result = model_fit.get_forecast(steps=days_ahead)
    forecast_values = forecast_result.predicted_mean
    conf_int = forecast_result.conf_int()

    result = {
        "ticker": ticker,
        "order_used": list(order),
        "last_actual_price": float(series.iloc[-1]),
        "forecast": [round(float(v), 2) for v in forecast_values],
        "lower_bound": [round(float(v), 2) for v in conf_int.iloc[:, 0]],
        "upper_bound": [round(float(v), 2) for v in conf_int.iloc[:, 1]],
    }

    _CACHE[key] = (time.time(), result)
    return result


if __name__ == "__main__":
    print(forecast_stock("INFY.NS", days_ahead=7))
