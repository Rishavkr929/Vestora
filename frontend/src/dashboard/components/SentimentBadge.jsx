import { useState } from "react";

const API_URL = "http://localhost:3002";

// Backend returns positive / negative / neutral. Show them as market terms.
const STYLES = {
  positive: { label: "Bullish", color: "#2e7d32", bg: "#e8f5e9" },
  negative: { label: "Bearish", color: "#c62828", bg: "#ffebee" },
  neutral: { label: "Neutral", color: "#555", bg: "#eeeeee" },
};

/**
 * Usage:
 *   <SentimentBadge ticker="Infosys" />
 *
 * Tip: NewsAPI searches news text, so a company name ("Infosys") works
 * better than a Yahoo symbol ("INFY.NS"). Any ".NS" suffix is removed.
 */
const SentimentBadge = ({ ticker = "Infosys" }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const query = ticker.replace(".NS", "").replace(".BO", "");

  const getSentiment = async () => {
    setLoading(true);
    setError("");

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
    <div style={{ padding: "8px 0" }}>
      {!data && (
        <button onClick={getSentiment} disabled={loading}>
          {loading ? "Reading news..." : `News sentiment for ${query}`}
        </button>
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
