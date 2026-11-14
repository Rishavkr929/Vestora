import { useState } from "react";
import { COMPANIES } from "./companies";
import { mlRequest, mlErrorText } from "./mlRequest";
import { C, h2, lead, select, pill } from "./insightsTheme";

const STYLES = {
  positive: { label: "Bullish", bg: C.green, fg: "#fff" },
  negative: { label: "Bearish", bg: C.maroon, fg: "#fff" },
  neutral: { label: "Neutral", bg: C.grey, fg: C.green },
};

const SentimentBadge = () => {
  const [selected, setSelected] = useState("Infosys");
  const [custom, setCustom] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(true);

  const query = selected === "OTHER" ? custom.trim() : selected;

  const getSentiment = async () => {
    if (!query) return setError("Type a company name first.");
    setLoading(true); setError(""); setData(null);
    try {
      const res = await mlRequest(
        { method: "get", url: `/api/ml/sentiment/${encodeURIComponent(query)}`, timeout: 300000 },
        setStatus
      );
      setData(res.data); setShow(true);
    } catch (err) {
      setError(mlErrorText(err));
    } finally {
      setLoading(false); setStatus("");
    }
  };

  const st = data ? STYLES[data.overall_sentiment] || STYLES.neutral : null;
  const b = data && data.breakdown;

  return (
    <section style={{ marginBottom: 56 }}>
      <h2 style={h2}>News sentiment</h2>
      <p style={lead}>Recent headlines are scored as positive, negative or neutral, then combined into one badge.</p>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <select value={selected} style={select} onChange={(e) => { setSelected(e.target.value); setData(null); setError(""); }}>
          {COMPANIES.map((c) => <option key={c.symbol} value={c.news}>{c.name}</option>)}
          <option value="OTHER">Other (type a company name)</option>
        </select>
        <button style={pill(loading)} disabled={loading} onClick={getSentiment}>
          {loading ? "Reading news..." : "Check sentiment"}
        </button>
      </div>

      {selected === "OTHER" && (
        <input value={custom} onChange={(e) => setCustom(e.target.value)} onKeyDown={(e) => e.key === "Enter" && getSentiment()}
          placeholder="Company name, e.g. Nestle India" style={{ ...select, width: "100%", marginBottom: 16, boxSizing: "border-box" }} />
      )}
      {loading && <p style={{ color: C.muted }}>{status || "Reading recent news headlines. The first run can take a little while."}</p>}
      {error && <p style={{ color: C.maroon }}>{error}</p>}

      {data && (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ padding: "4px 18px", borderRadius: 999, fontWeight: 600, background: st.bg, color: st.fg }}>{st.label}</span>
            {b && <span style={{ fontSize: 13 }}>{b.positive} positive, {b.negative} negative, {b.neutral} neutral</span>}
            <button onClick={() => setShow(!show)}
              style={{ border: `1px solid ${C.green}`, background: "transparent", color: C.green, borderRadius: 999, padding: "3px 14px", fontSize: 13 }}>
              {show ? "Hide headlines" : "Show headlines"}
            </button>
          </div>
          {data.method && <p style={{ fontSize: 12, color: C.muted, margin: "8px 0" }}>Method: {data.method}</p>}

          {show && (
            <div style={{ marginTop: 8 }}>
              {data.details.length === 0 && <p>No recent headlines found.</p>}
              {data.details.map((item, i) => {
                const s = STYLES[item.sentiment] || STYLES.neutral;
                return (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "12px 0", borderBottom: "1px solid #d9d9d4", fontSize: 14 }}>
                    <span>{item.headline}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", color: item.sentiment === "neutral" ? C.muted : s.bg }}>
                      {s.label}{item.confidence != null ? ` ${Math.round(item.confidence * 100)}%` : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default SentimentBadge;
