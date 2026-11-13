import { useState } from "react";
import api from "../../utils/api";

const API_URL = "http://localhost:3002";

// Your holdings only store a name, so the sector is looked up here.
// Add a line for any new stock you put in your holdings.
// Anything missing from this list (e.g. SGBMAY29, a gold bond) is skipped.
const SECTOR_MAP = {
  BHARTIARTL: "Telecom",
  HDFCBANK: "Financials",
  SBIN: "Financials",
  HINDUNILVR: "FMCG",
  ITC: "FMCG",
  INFY: "IT",
  TCS: "IT",
  WIPRO: "IT",
  KPITTECH: "IT",
  "M&M": "Auto",
  RELIANCE: "Energy",
  TATAPOWER: "Utilities",
};

const sharpeLabel = (s) => {
  if (s < 0) return "Below risk-free returns";
  if (s < 1) return "Low return for the risk taken";
  if (s < 2) return "Good";
  return "Very good";
};

const RiskPanel = () => {
  const [result, setResult] = useState(null);
  const [skipped, setSkipped] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      // 1. Get the user's holdings (api sends the login token for us)
      const holdingsRes = await api.get("/allHoldings");
      let holdings = holdingsRes.data;

      // Accept either a plain array or an object that wraps the array
      if (!Array.isArray(holdings)) {
        holdings = holdings?.holdings || holdings?.data || null;
      }
      if (!Array.isArray(holdings)) {
        throw new Error("Holdings came back in an unexpected format.");
      }
      if (holdings.length === 0) {
        throw new Error("You have no holdings yet, so there is nothing to analyze.");
      }

      // 2. Convert them into the shape the ML service expects
      const payload = [];
      const skippedNames = [];

      holdings.forEach((h) => {
        const rawName = h.name || h.symbol || h.stock || "";
        const name = String(rawName).replace(".NS", "").replace(".BO", "");
        const qty = Number(h.qty ?? h.quantity ?? 0);
        const price = Number(h.price ?? h.ltp ?? h.avg ?? 0);
        const sector = SECTOR_MAP[name];

        if (!sector || !qty || !price) {
          skippedNames.push(name || "unknown");
          return;
        }
        payload.push({
          ticker: `${name}.NS`,
          value: qty * price,
          sector,
        });
      });

      setSkipped(skippedNames);

      if (payload.length === 0) {
        throw new Error("No holdings with a known sector to analyze.");
      }

      // 3. Ask the backend (which asks Python) to analyze them
      const res = await fetch(`${API_URL}/api/ml/portfolio-risk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ holdings: payload }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Could not analyze portfolio");
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const sectors = result
    ? Object.entries(result.sector_concentration_pct).sort((a, b) => b[1] - a[1])
    : [];

  return (
    <div style={{ padding: "16px", maxWidth: "640px" }}>
      <h3 style={{ marginBottom: "12px" }}>Portfolio risk</h3>

      <button onClick={analyze} disabled={loading} style={{ padding: "6px 14px" }}>
        {loading ? "Analyzing..." : "Analyze my holdings"}
      </button>

      {loading && (
        <p style={{ color: "#666" }}>
          Fetching price history for each stock. This can take about 10 seconds.
        </p>
      )}

      {error && <p style={{ color: "#df514c" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "16px" }}>
          {result.diversification_warning && (
            <p
              style={{
                background: "#fff4e5",
                border: "1px solid #f5c26b",
                padding: "10px",
                borderRadius: "4px",
              }}
            >
              More than half of your portfolio is in one sector. A fall in that
              sector would affect most of your money.
            </p>
          )}

          <h4>Where your money is</h4>
          {sectors.map(([sector, pct]) => (
            <div key={sector} style={{ marginBottom: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>{sector}</span>
                <span>{pct}%</span>
              </div>
              <div style={{ background: "#eee", height: "8px", borderRadius: "4px" }}>
                <div
                  style={{
                    width: `${pct}%`,
                    height: "100%",
                    background: "#387ed1",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>
          ))}

          <h4 style={{ marginTop: "20px" }}>Sharpe ratio</h4>
          <p>
            <strong>{result.portfolio_sharpe_ratio}</strong>
            <span style={{ color: "#666", marginLeft: "10px" }}>
              {sharpeLabel(result.portfolio_sharpe_ratio)}
            </span>
          </p>

          <h4 style={{ marginTop: "20px" }}>Volatility by stock (yearly)</h4>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {Object.entries(result.per_stock_volatility)
                .sort((a, b) => b[1] - a[1])
                .map(([ticker, vol]) => (
                  <tr key={ticker} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "6px 0" }}>{ticker.replace(".NS", "")}</td>
                    <td style={{ textAlign: "right" }}>{(vol * 100).toFixed(1)}%</td>
                  </tr>
                ))}
            </tbody>
          </table>

          {skipped.length > 0 && (
            <p style={{ color: "#888", fontSize: "13px", marginTop: "12px" }}>
              Skipped (no sector or price history): {skipped.join(", ")}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default RiskPanel;
