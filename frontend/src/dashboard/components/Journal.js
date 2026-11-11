import React, { useState, useEffect } from "react";
import api from "../../utils/api";

const REASON_LABELS = {
  trending: "Saw it trending",
  tip: "A tip or news",
  research: "My own research",
  trying_out: "Just trying it out",
};

const Journal = () => {
  const [trades, setTrades] = useState([]);
  const [insights, setInsights] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/api/journal"), api.get("/api/journal/mistakes")])
      .then(([journalRes, mistakesRes]) => {
        setTrades(journalRes.data.trades);
        setInsights(journalRes.data.insights);
        setMistakes(mistakesRes.data.flags);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p style={{ padding: "24px", color: "#6e6e73" }}>Loading your journal…</p>;
  }

  return (
    <>
      <h3 className="title">Trade Journal</h3>

      {mistakes.length > 0 && (
        <div style={{ padding: "0 24px 16px" }}>
          {mistakes.map((m, i) => (
            <div
              key={i}
              style={{
                background: "#FFF8E5",
                border: "1px solid #FFE4A3",
                borderRadius: "10px",
                padding: "12px 16px",
                marginBottom: "10px",
                fontSize: "13.5px",
                color: "#5C4A00",
                lineHeight: 1.4,
              }}
            >
              {m.message}
            </div>
          ))}
        </div>
      )}

      <div style={{ padding: "0 24px 16px" }}>
        <h4 style={{ fontSize: "15px", margin: "0 0 10px" }}>Which reasons make you money?</h4>
        {insights.length === 0 ? (
          <p style={{ fontSize: "13px", color: "#6e6e73" }}>
            Buy a few stocks and tag why — insights will show up here.
          </p>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
            {insights.map((g) => (
              <div key={g.reason} style={{ border: "1px solid #D2D2D7", borderRadius: "10px", padding: "14px" }}>
                <p style={{ margin: 0, fontSize: "13px", color: "#6E6E73" }}>{g.reasonLabel}</p>
                <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#6E6E73" }}>{g.count} holding(s)</p>
                <p style={{ margin: "6px 0 0", fontSize: "18px", fontWeight: 600, color: g.totalPnl >= 0 ? "#1DB954" : "#FF3B30" }}>
                  {g.totalPnl >= 0 ? "+" : ""}₹{g.totalPnl}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <h4 style={{ fontSize: "15px", margin: "0 0 0 24px" }}>Trade history</h4>
      <div className="order-table">
        <table>
          <tr>
            <th>Date</th>
            <th>Instrument</th>
            <th>Mode</th>
            <th>Qty.</th>
            <th>Price</th>
            <th>Reason</th>
          </tr>
          {trades.map((t) => (
            <tr key={t.id}>
              <td>{new Date(t.date).toLocaleDateString("en-IN")}</td>
              <td>{t.name}</td>
              <td className={t.mode === "BUY" ? "profit" : "loss"}>{t.mode}</td>
              <td>{t.qty}</td>
              <td>₹{t.price.toFixed(2)}</td>
              <td style={{ color: "#6E6E73" }}>{t.reasonLabel || "—"}</td>
            </tr>
          ))}
        </table>
        {trades.length === 0 && (
          <p style={{ padding: "16px", color: "#6e6e73", fontSize: "13px" }}>No trades yet.</p>
        )}
      </div>
    </>
  );
};

export default Journal;
