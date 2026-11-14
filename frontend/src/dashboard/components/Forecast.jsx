import { useState } from "react";
import { COMPANIES } from "./companies";
import { mlRequest, mlErrorText } from "./mlRequest";
import { C, serif, h2, lead, select, pill, card, label, big, grid, money } from "./insightsTheme";

const W = 640, H = 260, L = 52, R = 16, T = 14, B = 30;

// Line chart: price history, dashed forecast, and the 95% range as a shaded cone
const Chart = ({ history, forecast, lower, upper }) => {
  const { prices, dates } = history;
  const n = prices.length, m = forecast.length, N = n + m;
  const all = [...prices, ...lower, ...upper];
  let lo = Math.min(...all), hi = Math.max(...all);
  const pad = (hi - lo) * 0.08 || 1;
  lo -= pad; hi += pad;
  const x = (i) => L + (i * (W - L - R)) / (N - 1);
  const y = (v) => T + ((hi - v) / (hi - lo)) * (H - T - B);
  const pts = (arr, start) => arr.map((v, i) => `${x(start + i)},${y(v)}`).join(" ");
  const last = prices[n - 1];
  const cone = [
    `${x(n - 1)},${y(last)}`,
    ...upper.map((v, i) => `${x(n + i)},${y(v)}`),
    ...lower.map((v, i) => `${x(n + i)},${y(v)}`).reverse(),
  ].join(" ");
  const ticks = [0, 1, 2, 3].map((k) => lo + ((hi - lo) * k) / 3);
  const months = [];
  dates.forEach((d, i) => {
    if (i === 0 || d.slice(0, 7) !== dates[i - 1].slice(0, 7)) {
      months.push([i, new Date(d).toLocaleString("en", { month: "short" })]);
    }
  });

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }} role="img" aria-label="Price history and forecast">
      {ticks.map((t) => (
        <g key={t}>
          <line x1={L} x2={W - R} y1={y(t)} y2={y(t)} stroke="#d9d9d4" />
          <text x={L - 8} y={y(t) + 4} fontSize="11" textAnchor="end" fill={C.muted}>
            {Math.round(t).toLocaleString("en-IN")}
          </text>
        </g>
      ))}
      <polygon points={cone} fill="#9aa39d" opacity="0.45" />
      <line x1={x(n - 1)} x2={x(n - 1)} y1={T} y2={H - B} stroke={C.muted} strokeDasharray="3 3" />
      <polyline points={pts(prices, 0)} fill="none" stroke={C.green} strokeWidth="2" />
      <polyline points={`${x(n - 1)},${y(last)} ${pts(forecast, n)}`} fill="none" stroke={C.maroon} strokeWidth="2" strokeDasharray="5 4" />
      {months.map(([i, name]) => (
        <text key={i} x={x(i)} y={H - 8} fontSize="11" fill={C.muted}>{name}</text>
      ))}
      <text x={x(n - 1 + m / 2)} y={H - 8} fontSize="11" textAnchor="middle" fill={C.muted}>Forecast</text>
    </svg>
  );
};

const Forecast = () => {
  const [selected, setSelected] = useState("INFY.NS");
  const [custom, setCustom] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const ticker = selected === "OTHER" ? custom.trim().toUpperCase() : selected;
  const company = COMPANIES.find((c) => c.symbol === selected);
  const cur = /\.(NS|BO)$/.test(ticker) ? "₹" : "$";

  const getForecast = async () => {
    if (!ticker) return setError("Type a ticker first, for example TCS.NS");
    setLoading(true); setError(""); setData(null);
    try {
      const res = await mlRequest(
        { method: "get", url: `/api/ml/forecast/${encodeURIComponent(ticker)}`, timeout: 120000 },
        setStatus
      );
      setData(res.data);
    } catch (err) {
      setError(mlErrorText(err));
    } finally {
      setLoading(false); setStatus("");
    }
  };

  const d = data ? data.forecast.length - 1 : 0;
  const change = data ? ((data.forecast[d] - data.last_actual_price) / data.last_actual_price) * 100 : 0;

  return (
    <section style={{ marginBottom: 56 }}>
      <h2 style={h2}>Price forecast</h2>
      <p style={lead}>One year of daily prices goes into an ARIMA model, which estimates the next 10 trading days.</p>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <select value={selected} style={select} onChange={(e) => { setSelected(e.target.value); setData(null); setError(""); }}>
          {COMPANIES.map((c) => <option key={c.symbol} value={c.symbol}>{c.name} ({c.symbol})</option>)}
          <option value="OTHER">Other (type a ticker)</option>
        </select>
        <button style={pill(loading)} disabled={loading} onClick={getForecast}>
          {loading ? "Predicting..." : "Get forecast"}
        </button>
      </div>

      {selected === "OTHER" && (
        <input value={custom} onChange={(e) => setCustom(e.target.value)} onKeyDown={(e) => e.key === "Enter" && getForecast()}
          placeholder="Yahoo Finance ticker, e.g. NESTLEIND.NS" style={{ ...select, width: "100%", marginBottom: 16, boxSizing: "border-box" }} />
      )}
      {loading && <p style={{ color: C.muted }}>{status || "This can take 10 to 30 seconds the first time."}</p>}
      {error && <p style={{ color: C.maroon }}>{error}</p>}

      {data && (
        <>
          <div style={{ background: "#fff", border: "1px solid #dcdcd6", borderRadius: 16, padding: 16, marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
              <span style={{ fontFamily: serif, fontSize: 18 }}>
                {company ? company.name : ticker} last price {money(data.last_actual_price, cur)}
              </span>
              <span style={{ fontSize: 13, color: C.muted }}>Model: ARIMA({data.order_used.join(", ")})</span>
            </div>
            {data.history ? (
              <Chart history={data.history} forecast={data.forecast} lower={data.lower_bound} upper={data.upper_bound} />
            ) : (
              <p style={{ color: C.muted, fontSize: 13 }}>The chart appears once the ML server is updated.</p>
            )}
            <div style={{ display: "flex", gap: 16, fontSize: 12, color: C.muted, marginTop: 6 }}>
              <span><b style={{ color: C.green }}>—</b> History</span>
              <span><b style={{ color: C.maroon }}>- -</b> Forecast</span>
              <span><b style={{ color: "#9aa39d" }}>■</b> 95% range</span>
            </div>
          </div>

          <div style={{ ...grid, marginBottom: 20 }}>
            <div style={card()}>
              <p style={label}>Last close</p>
              <p style={big}>{money(data.last_actual_price, cur)}</p>
              <p style={{ margin: "6px 0 0", fontSize: 13 }}>Latest price</p>
            </div>
            <div style={card(C.green, "#fff")}>
              <p style={label}>Forecast, day {d + 1}</p>
              <p style={big}>{money(data.forecast[d], cur)}</p>
              <p style={{ margin: "6px 0 0", fontSize: 13 }}>{change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(2)}% (estimate)</p>
            </div>
            <div style={card()}>
              <p style={label}>95% range</p>
              <p style={big}>{cur}{Math.round(data.lower_bound[d]).toLocaleString("en-IN")} – {cur}{Math.round(data.upper_bound[d]).toLocaleString("en-IN")}</p>
              <p style={{ margin: "6px 0 0", fontSize: 13 }}>On day {d + 1}</p>
            </div>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 420 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.green}`, textAlign: "right" }}>
                  {["Trading day", "Predicted", "Low", "High"].map((h, i) => (
                    <th key={h} style={{ ...label, padding: "10px 8px", margin: 0, textAlign: i ? "right" : "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.forecast.map((p, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #d9d9d4", textAlign: "right" }}>
                    <td style={{ padding: "10px 8px", textAlign: "left" }}>Day {i + 1}</td>
                    <td style={{ fontWeight: 600 }}>{money(p, cur)}</td>
                    <td style={{ color: C.muted }}>{data.lower_bound[i].toLocaleString("en-IN")}</td>
                    <td style={{ color: C.muted }}>{data.upper_bound[i].toLocaleString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12, color: C.muted, marginTop: 10 }}>
            If the prediction is almost flat, the model sees no clear trend. Look at how the range widens instead.
          </p>
        </>
      )}
    </section>
  );
};

export default Forecast;
