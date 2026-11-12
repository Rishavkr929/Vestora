"""
ARIMA Stock Price Forecasting
------------------------------
Predicts future closing prices for a given stock ticker using ARIMA.
Intended to be called as a function from a Flask/FastAPI microservice.

Install:
    pip install yfinance pandas numpy statsmodels pmdarima matplotlib
"""

import yfinance as yf
import pandas as pd
import numpy as np
import pmdarima as pm
from statsmodels.tsa.arima.model import ARIMA


def fetch_stock_data(ticker: str, period: str = "2y") -> pd.Series:
    """Download historical closing prices for a ticker."""
    data = yf.download(ticker, period=period, progress=False)
    if data.empty:
        raise ValueError(f"No data found for ticker '{ticker}'")
    series = data["Close"].squeeze().dropna()
    return series.reset_index(drop=True)


def find_best_order(series: pd.Series):
    """Use auto_arima to find the best (p, d, q) order automatically."""
    auto_model = pm.auto_arima(
        series,
        seasonal=False,
        trace=False,
        suppress_warnings=True,
        error_action="ignore",
    )
    return auto_model.order


def forecast_stock(ticker: str, days_ahead: int = 10) -> dict:
    """
    Full pipeline: fetch data -> find best ARIMA order -> fit -> forecast.
    Returns a dict suitable for JSON serialization (e.g., in a Flask route).
    """
    series = fetch_stock_data(ticker)

    order = find_best_order(series)
    model = ARIMA(series, order=order)
    model_fit = model.fit()

    forecast_result = model_fit.get_forecast(steps=days_ahead)
    forecast_values = forecast_result.predicted_mean
    conf_int = forecast_result.conf_int()

    return {
        "ticker": ticker,
        "order_used": order,
        "last_actual_price": float(series.iloc[-1]),
        "forecast": [round(float(v), 2) for v in forecast_values],
        "lower_bound": [round(float(v), 2) for v in conf_int.iloc[:, 0]],
        "upper_bound": [round(float(v), 2) for v in conf_int.iloc[:, 1]],
    }


if __name__ == "__main__":
    # Quick manual test
    result = forecast_stock("AAPL", days_ahead=7)
    print(result)
