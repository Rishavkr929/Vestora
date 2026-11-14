"""
ARIMA Stock Price Forecasting (lowest-memory version)
--------------------------------------------------------
Forecasts future closing prices with an ARIMA(p, 1, 0) model:
  - the "I" step: take daily price changes (differencing, d = 1)
  - the "AR" step: predict each change from the previous p changes,
    with the coefficients found by least squares (numpy only)
  - p is chosen from 1 to 5 by the lowest AIC score

It needs only numpy and yfinance. It does not use statsmodels or
pmdarima, which keeps memory low enough for a small free server.
Results are cached for an hour, so repeat clicks are instant.

Install:
    pip install yfinance numpy
"""

import time

import numpy as np
import yfinance as yf

MAX_P = 5
CACHE_SECONDS = 60 * 60
_CACHE = {}


def fetch_stock_data(ticker: str, period: str = "1y"):
    """Download daily closes. Returns (dates as text, prices as an array), oldest first."""
    data = yf.download(ticker, period=period, progress=False)
    if data.empty:
        raise ValueError(f"No data found for ticker '{ticker}'")
    series = data["Close"].squeeze().dropna().astype(float)
    prices = series.to_numpy()
    dates = [d.strftime("%Y-%m-%d") for d in series.index]
    if len(prices) < 60:
        raise ValueError(f"Not enough price history for '{ticker}'")
    return dates, prices


def _lag_matrix(diffs: np.ndarray, p: int, start: int) -> np.ndarray:
    """Columns are the previous 1..p changes for each row from `start` on."""
    n = len(diffs)
    return np.column_stack([diffs[start - k : n - k] for k in range(1, p + 1)])


def fit_ar(diffs: np.ndarray):
    """Fit AR(p) for p = 1..MAX_P by least squares; return the best by AIC."""
    y = diffs[MAX_P:]
    m = len(y)
    best = None
    for p in range(1, MAX_P + 1):
        X = _lag_matrix(diffs, p, MAX_P)
        phi, _, _, _ = np.linalg.lstsq(X, y, rcond=None)
        resid = y - X @ phi
        rss = float(resid @ resid)
        aic = m * np.log(rss / m) + 2 * p
        if best is None or aic < best["aic"]:
            best = {"p": p, "phi": phi, "aic": aic, "sigma2": rss / (m - p)}
    return best


def forecast_stock(ticker: str, days_ahead: int = 10) -> dict:
    """
    Full pipeline: fetch data -> difference -> fit AR -> forecast.
    Returns a dict that can be sent back as JSON.
    """
    key = (ticker.upper(), days_ahead)
    cached = _CACHE.get(key)
    if cached and time.time() - cached[0] < CACHE_SECONDS:
        return cached[1]

    dates, prices = fetch_stock_data(ticker)
    diffs = np.diff(prices)
    model = fit_ar(diffs)
    p, phi, sigma2 = model["p"], model["phi"], model["sigma2"]

    # Forecast the next daily changes one step at a time, then add them up
    history = list(diffs[-p:])
    step_changes = []
    for _ in range(days_ahead):
        nxt = sum(phi[k] * history[-1 - k] for k in range(p))
        step_changes.append(nxt)
        history.append(nxt)
    forecast = prices[-1] + np.cumsum(step_changes)

    # 95% range: the uncertainty of the summed changes grows each day
    psi = [1.0]
    for j in range(1, days_ahead):
        psi.append(sum(phi[i - 1] * psi[j - i] for i in range(1, min(j, p) + 1)))
    level_weights = np.cumsum(psi)
    variance = sigma2 * np.cumsum(level_weights ** 2)
    margin = 1.96 * np.sqrt(variance)

    result = {
        "ticker": ticker,
        "order_used": [p, 1, 0],
        "last_actual_price": float(prices[-1]),
        "forecast": [round(float(v), 2) for v in forecast],
        "lower_bound": [round(float(v), 2) for v in forecast - margin],
        "upper_bound": [round(float(v), 2) for v in forecast + margin],
        # last 90 trading days, used to draw the chart
        "history": {
            "dates": dates[-90:],
            "prices": [round(float(v), 2) for v in prices[-90:]],
        },
    }

    _CACHE[key] = (time.time(), result)
    return result


if __name__ == "__main__":
    print(forecast_stock("INFY.NS", days_ahead=7))
