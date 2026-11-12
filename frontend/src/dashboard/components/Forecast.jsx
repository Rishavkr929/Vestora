import { useState } from "react";

const API_URL = "http://localhost:3002";

const Forecast = () => {
  const [ticker, setTicker] = useState("INFY.NS");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getForecast = async () => {
    if (!ticker.trim()) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      const res = await fetch(
        `${API_URL}/api/ml/forecast/${encodeURIComponent(ticker.trim())}`
      );
      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Could not get forecast");
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "16px", maxWidth: "640px" }}>
      <h3 style={{ marginBottom: "12px" }}>Price forecast</h3>

      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <input
          value={ticker}
          onChange={(e) => setTicker(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && getForecast()}
          placeholder="e.g. TCS.NS"
          style={{ padding: "6px 10px", flex: 1 }}
        />
        <button
          onClick={getForecast}
          disabled={loading}
          style={{ padding: "6px 14px" }}
        >
          {loading ? "Predicting..." : "Get forecast"}
        </button>
      </div>

      {loading && (
        <p style={{ color: "#666" }}>
          This can take 10 to 30 seconds the first time.
        </p>
      )}

      {error && <p style={{ color: "#df514c" }}>{error}</p>}

      {data && (
        <div>
          <p>
            Last price: <strong>₹{data.last_actual_price.toFixed(2)}</strong>
            <span style={{ color: "#666", marginLeft: "12px" }}>
              Model: ARIMA({data.order_used.join(", ")})
            </span>
          </p>

          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ textAlign: "left", borderBottom: "1px solid #ddd" }}>
                <th style={{ padding: "6px 0" }}>Day</th>
                <th>Predicted</th>
                <th>Low</th>
                <th>High</th>
              </tr>
            </thead>
            <tbody>
              {data.forecast.map((price, i) => (
                <tr key={i} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "6px 0" }}>Day {i + 1}</td>
                  <td>{price}</td>
                  <td style={{ color: "#666" }}>{data.lower_bound[i]}</td>
                  <td style={{ color: "#666" }}>{data.upper_bound[i]}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <p style={{ color: "#888", fontSize: "13px", marginTop: "10px" }}>
            Forecasts come from a statistical model and are not financial
            advice. Low and high show the 95% confidence range.
          </p>
        </div>
      )}
    </div>
  );
};

export default Forecast;
