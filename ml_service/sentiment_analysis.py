"""
Stock News Sentiment Analysis
--------------------------------
Scores news headlines about a company as positive / negative / neutral.

Two methods, chosen automatically:
  1. FinBERT, a finance-trained language model. Used when the
     transformers and torch libraries are installed (your laptop).
  2. A lightweight keyword-rule scorer with no extra libraries. Used
     on small free servers where torch does not fit.

The result says which method was used, so nobody is misled.

Install for the full version:
    pip install transformers torch requests
Install for the lightweight version:
    pip install requests

Get a free NewsAPI key at https://newsapi.org
"""

import re

MODEL_NAME = "ProsusAI/finbert"
LABELS = ["positive", "negative", "neutral"]

METHOD_FINBERT = "FinBERT language model"
METHOD_RULES = "keyword rules (lightweight version, less accurate)"

# ---------------------------------------------------------------
# Method 1: FinBERT (loaded on first use, not at startup)
# ---------------------------------------------------------------
_finbert = None
_finbert_failed = False


def _load_finbert():
    """Return (tokenizer, model, torch), or None if FinBERT is unavailable."""
    global _finbert, _finbert_failed
    if _finbert is not None:
        return _finbert
    if _finbert_failed:
        return None
    try:
        import torch
        from transformers import AutoTokenizer, AutoModelForSequenceClassification

        tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)
        model.eval()
        _finbert = (tokenizer, model, torch)
        return _finbert
    except Exception:
        _finbert_failed = True
        return None


def _score_finbert(headline: str, loaded) -> dict:
    tokenizer, model, torch = loaded
    inputs = tokenizer(headline, return_tensors="pt", truncation=True, padding=True)
    with torch.no_grad():
        outputs = model(**inputs)
    probs = torch.nn.functional.softmax(outputs.logits, dim=-1)[0]
    idx = int(torch.argmax(probs))
    return {
        "headline": headline,
        "sentiment": LABELS[idx],
        "confidence": round(float(probs[idx]), 3),
    }


# ---------------------------------------------------------------
# Method 2: keyword rules (no extra libraries)
# ---------------------------------------------------------------
# Weight 1.0 = strong signal, 0.5 = weaker signal.
POSITIVE = {
    "surge": 1, "surges": 1, "surged": 1, "soar": 1, "soars": 1, "soared": 1,
    "rally": 1, "rallies": 1, "rallied": 1, "jump": 1, "jumps": 1, "jumped": 1,
    "gain": 1, "gains": 1, "gained": 1, "rise": 1, "rises": 1, "rose": 1,
    "climb": 1, "climbs": 1, "climbed": 1, "beat": 1, "beats": 1, "outperform": 1,
    "outperforms": 1, "upgrade": 1, "upgraded": 1, "upgrades": 1, "bullish": 1,
    "record": 0.5, "strong": 0.5, "stronger": 0.5, "boost": 1, "boosts": 1,
    "wins": 0.5, "win": 0.5, "won": 0.5, "approval": 0.5, "approved": 0.5,
    "dividend": 0.5, "optimistic": 1, "recovery": 0.5, "rebound": 1, "rebounds": 1,
    "higher": 0.5, "upbeat": 1, "breakthrough": 1, "tops": 1, "exceeds": 1,
    "exceeded": 1, "profit": 0.5, "profits": 0.5, "growth": 0.5, "expands": 0.5,
    "expansion": 0.5, "buy": 0.5, "positive": 0.5, "improves": 0.5, "improved": 0.5,
}
NEGATIVE = {
    "fall": 1, "falls": 1, "fell": 1, "drop": 1, "drops": 1, "dropped": 1,
    "plunge": 1, "plunges": 1, "plunged": 1, "slump": 1, "slumps": 1,
    "tumble": 1, "tumbles": 1, "tumbled": 1, "decline": 1, "declines": 1,
    "declined": 1, "sink": 1, "sinks": 1, "sank": 1, "crash": 1, "crashes": 1,
    "loss": 0.5, "losses": 0.5, "miss": 1, "misses": 1, "missed": 1,
    "downgrade": 1, "downgraded": 1, "downgrades": 1, "weak": 0.5, "weaker": 0.5,
    "bearish": 1, "selloff": 1, "layoffs": 1, "probe": 0.5, "fraud": 1,
    "lawsuit": 0.5, "penalty": 0.5, "fined": 0.5, "default": 1, "concern": 0.5,
    "concerns": 0.5, "warns": 0.5, "warning": 0.5, "lower": 0.5, "negative": 0.5,
    "slowdown": 1, "recall": 0.5, "ban": 0.5, "banned": 0.5, "bankruptcy": 1,
    "scandal": 1, "investigation": 0.5, "struggle": 0.5, "struggles": 0.5,
    "debt": 0.5, "risk": 0.5, "risks": 0.5, "cut": 0.5, "cuts": 0.5,
}
NEGATORS = {"not", "no", "never", "without", "cannot"}


def _is_negator(token: str) -> bool:
    return token in NEGATORS or token.endswith("n't")


def _score_rules(headline: str) -> dict:
    tokens = re.findall(r"[a-z']+", headline.lower())
    score = 0.0
    for i, tok in enumerate(tokens):
        weight = POSITIVE.get(tok, 0) - NEGATIVE.get(tok, 0)
        if weight == 0:
            continue
        # "does not beat estimates" -> flip the meaning of "beat"
        if any(_is_negator(t) for t in tokens[max(0, i - 2):i]):
            weight = -weight
        score += weight

    if score > 0:
        sentiment = "positive"
    elif score < 0:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    # A rule-based score is not a probability, so no confidence is reported
    return {"headline": headline, "sentiment": sentiment, "confidence": None}


# ---------------------------------------------------------------
# News + overall result
# ---------------------------------------------------------------
def fetch_headlines(ticker: str, api_key: str, page_size: int = 10) -> list:
    """Fetch recent news headlines mentioning the company via NewsAPI."""
    import requests

    response = requests.get(
        "https://newsapi.org/v2/everything",
        params={
            "q": ticker,
            "sortBy": "publishedAt",
            "pageSize": page_size,
            "language": "en",
            "apiKey": api_key,
        },
        timeout=15,
    )
    if not response.ok:
        # Do not use raise_for_status(): its message contains the full
        # URL, which includes the API key.
        try:
            detail = response.json().get("message")
        except ValueError:
            detail = None
        raise ValueError(f"NewsAPI error: {detail or response.status_code}")

    articles = response.json().get("articles", [])
    return [a["title"] for a in articles if a.get("title")]


def get_stock_sentiment(ticker: str, api_key: str) -> dict:
    """Fetch headlines -> score each -> combine into one bullish/bearish badge."""
    headlines = fetch_headlines(ticker, api_key)
    if not headlines:
        return {
            "ticker": ticker,
            "overall_sentiment": "neutral",
            "breakdown": {"positive": 0, "negative": 0, "neutral": 0},
            "method": "none (no recent headlines found)",
            "details": [],
        }

    finbert = _load_finbert()
    if finbert is not None:
        scored = [_score_finbert(h, finbert) for h in headlines]
        method = METHOD_FINBERT
    else:
        scored = [_score_rules(h) for h in headlines]
        method = METHOD_RULES

    counts = {"positive": 0, "negative": 0, "neutral": 0}
    for item in scored:
        counts[item["sentiment"]] += 1

    # If two labels tie for the most headlines, call it neutral
    top = max(counts.values())
    winners = [label for label, n in counts.items() if n == top]
    overall = winners[0] if len(winners) == 1 else "neutral"

    return {
        "ticker": ticker,
        "overall_sentiment": overall,
        "breakdown": counts,
        "method": method,
        "details": scored,
    }


if __name__ == "__main__":
    sample = "Apple beats earnings expectations, stock surges in after-hours trading"
    finbert = _load_finbert()
    print(_score_finbert(sample, finbert) if finbert else _score_rules(sample))
