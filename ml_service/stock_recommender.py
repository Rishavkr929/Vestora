"""
Personalized Stock Recommendations (Content-Based Filtering)
----------------------------------------------------------------
Recommends stocks similar to what a user already holds/watches, based
on features like sector, market cap, P/E ratio, and volatility.
Uses cosine similarity — simple, explainable, no training data needed.

Install:
    pip install yfinance pandas numpy scikit-learn
"""

import yfinance as yf
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.metrics.pairwise import cosine_similarity


# A small universe of candidate stocks to recommend from.
# In a real project, expand this list or pull it from an index (e.g., S&P 500).
CANDIDATE_TICKERS = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "META", "NVDA", "TSLA",
    "JPM", "V", "JNJ", "PFE", "XOM", "CVX", "KO", "PEP", "WMT"
]


def get_stock_features(ticker: str) -> dict:
    """Pull basic fundamental/technical features for a ticker."""
    info = yf.Ticker(ticker).info
    hist = yf.Ticker(ticker).history(period="6mo")["Close"]
    volatility = hist.pct_change().std() * np.sqrt(252) if len(hist) > 1 else 0

    return {
        "ticker": ticker,
        "sector": info.get("sector", "Unknown"),
        "market_cap": info.get("marketCap", 0) or 0,
        "pe_ratio": info.get("trailingPE", 0) or 0,
        "volatility": volatility,
    }


def build_feature_matrix(tickers: list) -> pd.DataFrame:
    """Build a numeric feature matrix (one-hot sector + scaled numeric features)."""
    rows = [get_stock_features(t) for t in tickers]
    df = pd.DataFrame(rows).set_index("ticker")

    df = pd.get_dummies(df, columns=["sector"])  # one-hot encode sector

    numeric_cols = ["market_cap", "pe_ratio", "volatility"]
    scaler = StandardScaler()
    df[numeric_cols] = scaler.fit_transform(df[numeric_cols].fillna(0))

    return df


def recommend_stocks(watchlist_tickers: list, top_n: int = 5) -> list:
    """
    Given tickers a user already watches/holds, recommend similar stocks
    from the candidate universe (excluding ones already watched).
    """
    all_tickers = list(set(CANDIDATE_TICKERS) | set(watchlist_tickers))
    feature_df = build_feature_matrix(all_tickers)

    # User's "profile" = average feature vector of their watchlist
    user_vector = feature_df.loc[watchlist_tickers].mean(axis=0).values.reshape(1, -1)

    candidates = feature_df.drop(index=watchlist_tickers, errors="ignore")
    similarities = cosine_similarity(user_vector, candidates.values)[0]

    ranked = sorted(
        zip(candidates.index, similarities), key=lambda x: x[1], reverse=True
    )
    return [{"ticker": t, "similarity_score": round(float(s), 3)} for t, s in ranked[:top_n]]


if __name__ == "__main__":
    user_watchlist = ["AAPL", "MSFT"]
    print(recommend_stocks(user_watchlist, top_n=5))
