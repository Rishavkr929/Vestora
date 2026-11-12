"""
Portfolio Risk & Diversification Analysis
--------------------------------------------
Given a user's holdings (ticker, quantity, sector), compute:
  - Sector concentration (diversification score)
  - Volatility per holding
  - Portfolio-level Sharpe ratio

No model training required — pure quantitative finance math with
pandas/numpy. Good candidate to run directly in your Node backend's
Python microservice, or even reimplement in plain JS since it's just math.

Install:
    pip install yfinance pandas numpy
"""

import yfinance as yf
import pandas as pd
import numpy as np


def fetch_returns(ticker: str, period: str = "1y") -> pd.Series:
    """Daily percentage returns for a ticker over the given period."""
    data = yf.download(ticker, period=period, progress=False)["Close"].squeeze()
    return data.pct_change().dropna()


def compute_volatility(returns: pd.Series) -> float:
    """Annualized volatility (standard deviation of daily returns)."""
    return float(returns.std() * np.sqrt(252))


def compute_sharpe_ratio(returns: pd.Series, risk_free_rate: float = 0.06) -> float:
    """
    Annualized Sharpe ratio.
    risk_free_rate default ~6% is a reasonable approximation for
    Indian government bond yields; adjust as needed.
    """
    daily_rf = risk_free_rate / 252
    excess_returns = returns - daily_rf
    if excess_returns.std() == 0:
        return 0.0
    return float((excess_returns.mean() / excess_returns.std()) * np.sqrt(252))


def sector_concentration(holdings: list) -> dict:
    """
    holdings: list of dicts like
        [{"ticker": "AAPL", "value": 5000, "sector": "Technology"}, ...]
    Returns each sector's % share of total portfolio value.
    """
    df = pd.DataFrame(holdings)
    total_value = df["value"].sum()
    sector_totals = df.groupby("sector")["value"].sum()
    concentration = (sector_totals / total_value * 100).round(2).to_dict()
    return concentration


def analyze_portfolio(holdings: list) -> dict:
    """
    Full pipeline for a user's holdings.
    holdings: list of dicts: [{"ticker": "AAPL", "value": 5000, "sector": "Technology"}, ...]
    """
    concentration = sector_concentration(holdings)

    # Flag risk if any single sector is over 50% of the portfolio
    max_sector = max(concentration, key=concentration.get)
    diversification_warning = concentration[max_sector] > 50

    per_stock_risk = {}
    all_returns = []
    for h in holdings:
        returns = fetch_returns(h["ticker"])
        vol = compute_volatility(returns)
        per_stock_risk[h["ticker"]] = round(vol, 4)
        all_returns.append(returns)

    # Combine returns (equal-weighted approximation) for portfolio Sharpe ratio
    combined_returns = pd.concat(all_returns, axis=1).mean(axis=1)
    sharpe = compute_sharpe_ratio(combined_returns)

    return {
        "sector_concentration_pct": concentration,
        "diversification_warning": diversification_warning,
        "per_stock_volatility": per_stock_risk,
        "portfolio_sharpe_ratio": round(sharpe, 3),
    }


if __name__ == "__main__":
    sample_holdings = [
        {"ticker": "AAPL", "value": 6000, "sector": "Technology"},
        {"ticker": "MSFT", "value": 4000, "sector": "Technology"},
        {"ticker": "JNJ", "value": 2000, "sector": "Healthcare"},
    ]
    print(analyze_portfolio(sample_holdings))
