import { useState } from "react";
import api from "../../utils/api";
import { COMPANIES } from "./companies";
import { mlRequest, mlErrorText } from "./mlRequest";
import { C, h2, lead, pill, card, label, big, grid } from "./insightsTheme";

// Sector and Yahoo ticker for each holding come from the shared company list
const BY_NSE = Object.fromEntries(COMPANIES.map((c) => [c.nse, c]));

const sharpeLabel = (s) =>
  s < 0 ? "Below risk-free returns" : s < 1 ? "Low return for the risk taken" : s < 2 ? "Good" : "Very good";

const RiskPanel = () => {
  const [result, setResult] = useState(null);
  const [skipped, setSkipped] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const analyze = async () => {
    setLoading(true); setError(""); setResult(null);
    try {
      const holdingsRes = await api.get("/allHoldings");
      let holdings = holdingsRes.data;
      if (!Array.isArray(holdings)) holdings = holdings?.holdings || holdings?.data || null;
      if (!Array.isArray(holdings)) throw new Error("Holdings came back in an unexpected format.");
      if (holdings.length === 0) throw new Error("You have no holdings yet, so there is nothing to analyze.");

      const payload = [];
      const skippedNames = [];
      holdings.forEach((h) => {
        const name = String(h.name || h.symbol || h.stock || "").trim().toUpperCase().replace(".NS", "").replace(".BO", "");
        const qty = Number(h.qty ?? h.quantity ?? 0);
        const price = Number(h.price || h.ltp || h.avg || 0); // falls back to average cost
        const company = BY_NSE[name];
        if (!company) return skippedNames.push(`${name || "unknown"} (not in stock list)`);
        if (!qty || !price) return skippedNames.push(`${name} (no quantity or price)`);
        payload.push({ ticker: company.symbol, value: qty * price, sector: company.sector });
      });
      setSkipped(skippedNames);
      if (payload.length === 0) {
        throw new Error(`None of your holdings could be analyzed. Skipped: ${skippedNames.join(", ")}`);
      }

      const res = await mlRequest(
        { method: "post", url: "/api/ml/portfolio-risk", data: { holdings: payload }, timeout: 120000 },
        setStatus
      );
      setResult(res.data);
    } catch (err) {
      setError(mlErrorText(err));
    } finally {
      setLoading(false); setStatus("");
    }
  };

  const sectors = result ? Object.entries(result.sector_concentration_pct).sort((a, b) => b[1] - a[1]) : [];
  const th = { ...label, margin: 0, padding: "10px 8px" };

  return (
    <section style={{ marginBottom: 56 }}>
      <h2 style={h2}>Portfolio risk</h2>
      <p style={lead}>See how your money is spread across sectors, and how much each stock moves.</p>

      <button style={pill(loading)} disabled={loading} onClick={analyze}>
        {loading ? "Analyzing..." : "Analyze my holdings"}
      </button>
      {loading && <p style={{ color: C.muted }}>{status || "Fetching price history for each stock. This can take about 10 seconds."}</p>}
      {error && <p style={{ color: C.maroon }}>{error}</p>}

      {result && (
        <div style={{ marginTop: 20 }}>
          {result.diversification_warning && (
            <div style={{ border: `1px solid ${C.maroon}`, color: C.maroon, borderRadius: 16, padding: "12px 16px", marginBottom: 24, fontSize: 14 }}>
              More than half of your portfolio is in one sector. A fall in that sector would affect most of your money.
            </div>
          )}

          <h3 style={{ ...h2, fontSize: 20 }}>Where your money is</h3>
          {sectors.map(([sector, pct]) => (
            <div key={sector} style={{ marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 4 }}>
                <span>{sector}</span><span>{pct}%</span>
              </div>
              <div style={{ background: C.grey, height: 8, borderRadius: 4 }}>
                <div style={{ width: `${pct}%`, height: "100%", background: C.green, borderRadius: 4 }} />
              </div>
            </div>
          ))}

          <div style={{ ...grid, margin: "24px 0" }}>
            <div style={card()}>
              <p style={label}>Sharpe ratio</p>
              <p style={big}>{result.portfolio_sharpe_ratio}</p>
              <p style={{ margin: "6px 0 0", fontSize: 13 }}>{sharpeLabel(result.portfolio_sharpe_ratio)}</p>
            </div>
            <div style={card(C.maroon, "#fff")}>
              <p style={label}>What it means</p>
              <p style={{ margin: 0, fontSize: 14 }}>
                It compares your returns with a safe investment, after allowing for how much your prices swing. Higher is better.
              </p>
            </div>
          </div>

          <h3 style={{ ...h2, fontSize: 20 }}>Volatility by stock (yearly)</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.green}` }}>
                <th style={{ ...th, textAlign: "left" }}>Stock</th>
                <th style={{ ...th, textAlign: "right" }}>Volatility</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(result.per_stock_volatility).sort((a, b) => b[1] - a[1]).map(([t, v]) => (
                <tr key={t} style={{ borderBottom: "1px solid #d9d9d4" }}>
                  <td style={{ padding: "10px 8px" }}>{t.replace(".NS", "")}</td>
                  <td style={{ textAlign: "right", padding: "10px 8px" }}>{(v * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          {skipped.length > 0 && <p style={{ fontSize: 12, color: C.muted, marginTop: 10 }}>Skipped: {skipped.join(", ")}</p>}
        </div>
      )}
    </section>
  );
};

export default RiskPanel;
