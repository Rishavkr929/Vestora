"""
Order Anomaly Detection
--------------------------
Flags unusual order patterns per user (e.g., abnormally large order sizes,
rapid repeated order attempts) using Isolation Forest.

Frame this in your report as a fraud-prevention / security feature,
tied to "Enhanced security mechanisms" in your Future Enhancements list.

Install:
    pip install scikit-learn pandas numpy
"""

import pandas as pd
import numpy as np
from sklearn.ensemble import IsolationForest


def build_order_features(orders: list) -> pd.DataFrame:
    """
    orders: list of dicts like
        [{"order_id": 1, "quantity": 10, "price": 150.0,
          "timestamp": "2026-09-27T10:00:00"}, ...]
    Engineers simple numeric features from raw order records.
    """
    df = pd.DataFrame(orders)
    df["timestamp"] = pd.to_datetime(df["timestamp"])
    df = df.sort_values("timestamp")

    df["order_value"] = df["quantity"] * df["price"]
    # Time gap (in seconds) since the user's previous order
    df["seconds_since_last_order"] = (
        df["timestamp"].diff().dt.total_seconds().fillna(9999)
    )

    return df


def detect_anomalies(orders: list, contamination: float = 0.05) -> list:
    """
    Full pipeline: takes a user's raw order history, returns each order
    tagged as normal or anomalous.

    contamination: expected proportion of anomalous orders (tune this;
    0.05 means ~5% of orders are expected to be flagged).
    """
    df = build_order_features(orders)

    features = df[["order_value", "quantity", "seconds_since_last_order"]]

    model = IsolationForest(contamination=contamination, random_state=42)
    df["anomaly_flag"] = model.fit_predict(features)
    # IsolationForest returns -1 for anomalies, 1 for normal
    df["is_anomalous"] = df["anomaly_flag"] == -1

    return df[[
        "order_id", "quantity", "price", "order_value",
        "seconds_since_last_order", "is_anomalous"
    ]].to_dict(orient="records")


if __name__ == "__main__":
    sample_orders = [
        {"order_id": 1, "quantity": 10, "price": 150.0, "timestamp": "2026-09-27T10:00:00"},
        {"order_id": 2, "quantity": 12, "price": 151.0, "timestamp": "2026-09-27T10:05:00"},
        {"order_id": 3, "quantity": 15, "price": 149.5, "timestamp": "2026-09-27T10:10:00"},
        {"order_id": 4, "quantity": 5000, "price": 150.0, "timestamp": "2026-09-27T10:10:05"},  # suspicious
    ]
    for result in detect_anomalies(sample_orders):
        print(result)
