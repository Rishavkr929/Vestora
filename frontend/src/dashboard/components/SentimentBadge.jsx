import { useState } from "react";
import { COMPANIES } from "./companies";

const API_URL = "http://localhost:3002";

// Backend returns positive / negative / neutral. Show them as market terms.
const STYLES = {
  positive: { label: "Bullish", color: "#2e7d32", bg: "#e8f5e9" },
  negative: { label: "Bearish", color: "#c62828", bg: "#ffebee" },
  neutral: { label: "Neutral", color: "#555", bg: "#eeeeee" },
};

const SentimentBadge = () => {
  const [selected, setSelected] = useState("Infosys");
  const [custom, setCustom] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  // NewsAPI searches news text, so we send the company name, not a ticker
  const query = selected === "OTHER" ? custom.trim() : selected;

  const handleSelect = (e) => {
    setSelected(e.target.value);
    setData(null);
    setError("");
    setShowDetails(false);
  };

  const getSentiment = async () => {
    if (!query) {
      setError("Type a company name first.");
      return;
    }

    setLoading(true);
    setError("");
    setData(null);
    setShowDetails(false);

    try {
      const res = await fetch(
        `${API_URL}/api/ml/sentiment/${encodeURIComponent(query)}`
      );
      const result = await res.json();

      if (!res.ok) throw new Error(result.error || "Could not get sentiment");
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const style = data ? STYLES[data.overall_sentiment] || STYLES.neutral : null;

  return (
    <div style={{ padding: "16px", maxWidth: "640px" }}>
      <h3 style={{ marginBottom: "12px" }}>News sentiment</h3>

      <div style={{ display: "flex", gap: "8px", marginBottom: "12px" }}>
        <select
          value={selected}
          onChange={handleSelect}
          style={{ padding: "6px 10px", flex: 1 }}
        >
          {COMPANIES.map((c) => (
            <option key={c.symbol} value={c.news}>
              {c.name}
            </option>
          ))}
          <option value="OTHER">Other (type a company name)</option>
        </select>

        <button
          onClick={getSentiment}
          disabled={loading}
          style={{ padding: "6px 14px" }}
        >
          {loading ? "Reading news..." : "Check sentiment"}
        </button>
      </div>

      {selected === "OTHER" && (
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && getSentiment()}
          placeholder="Company name, e.g. Nestle India"
          style={{ padding: "6px 10px", width: "100%", marginBottom: "12px" }}
        />
      )}

      {loading && (
        <p style={{ color: "#666" }}>
          The first run downloads the language model, so it can take a few
          minutes.
        </p>
      )}

      {error && <p style={{ color: "#df514c" }}>{error}</p>}

      {data && (
        <div>
          <span
            style={{
              display: "inline-block",
              padding: "4px 12px",
              borderRadius: "12px",
              fontWeight: 600,
              color: style.color,
              background: style.bg,
            }}
          >
            {style.label}
          </span>

          {data.breakdown && (
            <span style={{ color: "#666", marginLeft: "10px", fontSize: "13px" }}>
              {data.breakdown.positive} positive, {data.breakdown.negative}{" "}
              negative, {data.breakdown.neutral} neutral
            </span>
          )}

          <button
            onClick={() => setShowDetails(!showDetails)}
            style={{ marginLeft: "10px" }}
          >
            {showDetails ? "Hide headlines" : "Show headlines"}
          </button>

          {showDetails && (
            <ul style={{ marginTop: "10px", paddingLeft: "18px" }}>
              {data.details.length === 0 && <li>No recent headlines found.</li>}
              {data.details.map((item, i) => (
                <li key={i} style={{ marginBottom: "6px" }}>
                  {item.headline}{" "}
                  <span
                    style={{
                      color: (STYLES[item.sentiment] || STYLES.neutral).color,
                      fontSize: "13px",
                    }}
                  >
                    ({item.sentiment}, {Math.round(item.confidence * 100)}%)
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SentimentBadge;
