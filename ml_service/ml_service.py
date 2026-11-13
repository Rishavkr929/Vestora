"""
Vestora ML Microservice
--------------------------
A single Flask app exposing all ML features as REST endpoints.
Your Node/Express backend calls these endpoints whenever the frontend
needs a prediction, sentiment score, etc.

Heavy libraries are imported inside each route, not at the top, so the
service starts small and only loads what a request needs. This matters
on free hosting plans with little memory.

Run locally:
    pip install -r requirements.txt
    python ml_service.py            # http://localhost:5001

Run when deployed (Render, Railway, ...):
    pip install -r requirements-deploy.txt
    gunicorn ml_service:app --timeout 180 --workers 1

Endpoints:
    GET  /                  health check (also used to wake the service up)
    POST /forecast          {"ticker": "INFY.NS", "days_ahead": 10}
    POST /sentiment         {"ticker": "Infosys", "api_key": "<newsapi_key>"}
    POST /portfolio-risk    {"holdings": [{"ticker":"INFY.NS","value":5000,"sector":"Technology"}, ...]}
    POST /recommendations   {"watchlist": ["INFY.NS", "TCS.NS"], "top_n": 5}
    POST /order-anomalies   {"orders": [{"order_id":1,"quantity":10,"price":150.0,"timestamp":"..."}]}
"""

import os

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow requests from your Node/Express backend and React frontend


@app.route("/", methods=["GET"])
def health():
    return jsonify({"status": "ok", "service": "vestora-ml"})


@app.route("/forecast", methods=["POST"])
def forecast_route():
    data = request.get_json() or {}
    ticker = data.get("ticker")
    days_ahead = data.get("days_ahead", 10)
    if not ticker:
        return jsonify({"error": "ticker is required"}), 400
    try:
        from arima_forecast import forecast_stock
        return jsonify(forecast_stock(ticker, days_ahead))
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/sentiment", methods=["POST"])
def sentiment_route():
    data = request.get_json() or {}
    ticker = data.get("ticker")
    api_key = data.get("api_key")
    if not ticker or not api_key:
        return jsonify({"error": "ticker and api_key are required"}), 400

    try:
        from sentiment_analysis import get_stock_sentiment
    except ImportError:
        return jsonify({
            "error": "Sentiment analysis is not installed on this server."
        }), 503

    try:
        return jsonify(get_stock_sentiment(ticker, api_key))
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/portfolio-risk", methods=["POST"])
def portfolio_risk_route():
    data = request.get_json() or {}
    holdings = data.get("holdings")
    if not holdings:
        return jsonify({"error": "holdings list is required"}), 400
    try:
        from portfolio_risk import analyze_portfolio
        return jsonify(analyze_portfolio(holdings))
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/recommendations", methods=["POST"])
def recommendations_route():
    data = request.get_json() or {}
    watchlist = data.get("watchlist")
    top_n = data.get("top_n", 5)
    if not watchlist:
        return jsonify({"error": "watchlist list is required"}), 400
    try:
        from stock_recommender import recommend_stocks
        return jsonify({"recommendations": recommend_stocks(watchlist, top_n)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/order-anomalies", methods=["POST"])
def order_anomalies_route():
    data = request.get_json() or {}
    orders = data.get("orders")
    if not orders:
        return jsonify({"error": "orders list is required"}), 400
    try:
        from anomaly_detection import detect_anomalies
        return jsonify({"orders": detect_anomalies(orders)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    # debug=False avoids the reloader (and loading the libraries twice)
    app.run(port=int(os.environ.get("PORT", 5001)), debug=False)
