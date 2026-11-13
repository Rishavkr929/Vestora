"""
Stock News Sentiment Analysis using FinBERT
---------------------------------------------
Scores news headlines about a stock as positive / negative / neutral
using a pretrained finance-specific BERT model (no training required).

Install:
    pip install transformers torch requests

Get a free NewsAPI key at https://newsapi.org to fetch real headlines,
or swap fetch_headlines() with an RSS-feed scraper of your choice.
"""

import requests
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

MODEL_NAME = "ProsusAI/finbert"

# Load model once (do this at service startup, not per-request)
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
LABELS = ["positive", "negative", "neutral"]


def fetch_headlines(ticker: str, api_key: str, page_size: int = 10) -> list:
    """Fetch recent news headlines mentioning the ticker via NewsAPI."""
    url = "https://newsapi.org/v2/everything"
    params = {
        "q": ticker,
        "sortBy": "publishedAt",
        "pageSize": page_size,
        "language": "en",
        "apiKey": api_key,
    }
    response = requests.get(url, params=params, timeout=10)
    response.raise_for_status()
    articles = response.json().get("articles", [])
    return [a["title"] for a in articles if a.get("title")]


def score_headline(headline: str) -> dict:
    """Run a single headline through FinBERT and return label + confidence."""
    inputs = tokenizer(headline, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
    probs = torch.nn.functional.softmax(outputs.logits, dim=-1)[0]
    label_idx = int(torch.argmax(probs))
    return {
        "headline": headline,
        "sentiment": LABELS[label_idx],
        "confidence": round(float(probs[label_idx]), 3),
    }


def get_stock_sentiment(ticker: str, api_key: str) -> dict:
    """
    Full pipeline: fetch headlines -> score each -> aggregate into
    an overall bullish/bearish/neutral badge for the ticker.
    """
    headlines = fetch_headlines(ticker, api_key)
    if not headlines:
        return {"ticker": ticker, "overall_sentiment": "neutral", "details": []}

    scored = [score_headline(h) for h in headlines]

    counts = {"positive": 0, "negative": 0, "neutral": 0}
    for item in scored:
        counts[item["sentiment"]] += 1

    overall = max(counts, key=counts.get)
    return {
        "ticker": ticker,
        "overall_sentiment": overall,
        "breakdown": counts,
        "details": scored,
    }


if __name__ == "__main__":
    # Quick manual test without calling the news API
    sample = "Apple beats earnings expectations, stock surges in after-hours trading"
    print(score_headline(sample))
