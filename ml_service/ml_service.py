"""
Vestora ML Microservice
--------------------------
A single Flask app exposing all ML features as REST endpoints.
Your Node/Express backend calls these endpoints (e.g., via axios)
whenever the frontend needs a prediction, sentiment score, etc.

Run:
    pip install flask flask-cors
    python ml_service.py
    # Service runs on http://localhost:5001

Endpoints:
    POST /forecast          {"ticker": "AAPL", "days_ahead": 10}
    POST /sentiment         {"ticker": "AAPL", "api_key": "<newsapi_key>"}
    POST /portfolio-risk    {"holdings": [{"ticker":"AAPL","value":5000,"sector":"Technology"}, ...]}
    POST /recommendations   {"watchlist": ["AAPL", "MSFT"], "top_n": 5}
    POST /order-anomalies   {"orders": [{"order_id":1,"quantity":10,"price":150.0,"timestamp":"..."}]}
"""

from flask import Flask, request, jsonify
from flask_cors import CORS

from arima_forecast import forecast_stock
from sentiment_analysis import get_stock_sentiment
from portfolio_risk import analyze_portfolio
from stock_recommender import recommend_stocks
from anomaly_detection import detect_anomalies

app = Flask(__name__)
CORS(app)  # allow requests from your Node/Express + React frontend


@app.route("/forecast", methods=["POST"])
def forecast_route():
    data = request.get_json()
    ticker = data.get("ticker")
    days_ahead = data.get("days_ahead", 10)
    if not ticker:
        return jsonify({"error": "ticker is required"}), 400
    try:
        result = forecast_stock(ticker, days_ahead)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/sentiment", methods=["POST"])
def sentiment_route():
    data = request.get_json()
    ticker = data.get("ticker")
    api_key = data.get("api_key")
    if not ticker or not api_key:
        return jsonify({"error": "ticker and api_key are required"}), 400
    try:
        result = get_stock_sentiment(ticker, api_key)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/portfolio-risk", methods=["POST"])
def portfolio_risk_route():
    data = request.get_json()
    holdings = data.get("holdings")
    if not holdings:
        return jsonify({"error": "holdings list is required"}), 400
    try:
        result = analyze_portfolio(holdings)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/recommendations", methods=["POST"])
def recommendations_route():
    data = request.get_json()
    watchlist = data.get("watchlist")
    top_n = data.get("top_n", 5)
    if not watchlist:
        return jsonify({"error": "watchlist list is required"}), 400
    try:
        result = recommend_stocks(watchlist, top_n)
        return jsonify({"recommendations": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/order-anomalies", methods=["POST"])
def order_anomalies_route():
    data = request.get_json()
    orders = data.get("orders")
    if not orders:
        return jsonify({"error": "orders list is required"}), 400
    try:
        result = detect_anomalies(orders)
        return jsonify({"orders": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5001, debug=True)
