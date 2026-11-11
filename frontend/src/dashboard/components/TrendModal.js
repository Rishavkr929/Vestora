import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const TrendModal = ({ stock, onClose }) => {
  const [trend, setTrend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get(`/api/stocks/${stock.symbol}/trend`)
      .then((res) => setTrend(res.data))
      .catch((err) => setError(err.response?.data?.message || "Could not analyse this stock."))
      .finally(() => setLoading(false));
  }, [stock.symbol]);

  const changeRow = (label, value) => (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #EDEDED" }}>
      <span style={{ fontSize: "13px", color: "#6E6E73" }}>{label}</span>
      <span style={{ fontSize: "13px", fontWeight: 600, color: value == null ? "#6E6E73" : value >= 0 ? "#1DB954" : "#FF3B30" }}>
        {value == null ? "—" : `${value >= 0 ? "+" : ""}${value}%`}
      </span>
    </div>
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{ background: "#fff", borderRadius: "14px", width: "420px", maxWidth: "92vw", padding: "24px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "18px", color: "#1D1D1F" }}>{stock.symbol} — Trend</h3>
            <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#6E6E73" }}>{stock.name}</p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#6E6E73" }}>×</button>
        </div>

        {loading && <p style={{ color: "#6E6E73", fontSize: "13px" }}>Analysing…</p>}
        {error && <p style={{ color: "#FF3B30", fontSize: "13px" }}>{error}</p>}

        {trend && (
          <>
            <div
              style={{
                background: trend.trendLabel === "Uptrend" ? "#E8F9EE" : trend.trendLabel === "Downtrend" ? "#FFEDEC" : "#F5F5F7",
                borderRadius: "10px",
                padding: "12px 16px",
                margin: "12px 0 16px",
                textAlign: "center",
              }}
            >
              <span
                style={{
                  fontWeight: 700,
                  fontSize: "16px",
                  color: trend.trendLabel === "Uptrend" ? "#1DB954" : trend.trendLabel === "Downtrend" ? "#FF3B30" : "#6E6E73",
                }}
              >
                {trend.trendLabel}
              </span>
              <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#6E6E73" }}>
                Based on 20-day vs 50-day average price
              </p>
            </div>

            {changeRow("1 week", trend.change1w)}
            {changeRow("1 month", trend.change1m)}
            {changeRow("3 months", trend.change3m)}
            {changeRow("1 year", trend.change1y)}

            <p style={{ marginTop: "16px", fontSize: "11.5px", color: "#8E8E93", lineHeight: 1.4 }}>
              {trend.disclaimer}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default TrendModal;
