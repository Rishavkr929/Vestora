import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import api from "../../utils/api";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Filler);

const RANGES = [
  { key: "1w", label: "1W" },
  { key: "1mo", label: "1M" },
  { key: "3mo", label: "3M" },
  { key: "1y", label: "1Y" },
];

const StockChartModal = ({ stock, onClose }) => {
  const [range, setRange] = useState("1mo");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    api
      .get(`/api/stocks/${stock.symbol}/history`, { params: { range } })
      .then((res) => setHistory(res.data))
      .catch(() => setError("Could not load price history for this stock."))
      .finally(() => setLoading(false));
  }, [stock.symbol, range]);

  const data = {
    labels: history.map((h) =>
      new Date(h.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
    ),
    datasets: [
      {
        label: stock.symbol,
        data: history.map((h) => h.price),
        borderColor: "#0071E3",
        backgroundColor: "rgba(0, 113, 227, 0.08)",
        fill: true,
        tension: 0.25,
        pointRadius: 0,
      },
    ],
  };

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
        style={{
          background: "#fff",
          borderRadius: "14px",
          width: "560px",
          maxWidth: "92vw",
          padding: "24px",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <h3 style={{ margin: 0, fontSize: "18px", color: "#1D1D1F" }}>{stock.symbol}</h3>
            <p style={{ margin: "2px 0 0", fontSize: "13px", color: "#6E6E73" }}>{stock.name}</p>
          </div>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#6E6E73" }}
          >
            ×
          </button>
        </div>

        <div style={{ display: "flex", gap: "8px", marginBottom: "14px" }}>
          {RANGES.map((r) => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              style={{
                padding: "4px 14px",
                borderRadius: "980px",
                border: "1px solid #D2D2D7",
                background: range === r.key ? "#0071E3" : "#F5F5F7",
                color: range === r.key ? "#fff" : "#1D1D1F",
                fontSize: "13px",
                cursor: "pointer",
              }}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div style={{ height: "260px" }}>
          {loading && <p style={{ color: "#6E6E73", fontSize: "13px" }}>Loading chart…</p>}
          {error && <p style={{ color: "#FF3B30", fontSize: "13px" }}>{error}</p>}
          {!loading && !error && <Line data={data} options={{ maintainAspectRatio: false, plugins: { legend: { display: false } } }} />}
        </div>
      </div>
    </div>
  );
};

export default StockChartModal;
