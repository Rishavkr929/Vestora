import React from "react";

const cardStyle = { width: "100%", maxWidth: "420px", height: "auto" };

// A simple, original illustration of the watchlist — no real screenshots.
export function WatchlistMock() {
  const rows = [
    { name: "TCS", price: "4,120.75", up: true },
    { name: "HDFCBANK", price: "1,687.20", up: true },
    { name: "ITC", price: "462.35", up: false },
    { name: "INFY", price: "1,834.10", up: true },
  ];
  return (
    <svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" style={cardStyle}>
      <rect x="0" y="0" width="420" height="260" rx="16" fill="#ffffff" stroke="#d2d2d7" />
      <text x="20" y="30" fontFamily="Source Sans 3, sans-serif" fontSize="13" fill="#6e6e73">
        Watchlist
      </text>
      {rows.map((r, i) => (
        <g key={r.name} transform={`translate(20, ${44 + i * 48})`}>
          <rect width="380" height="38" rx="8" fill="#f5f5f7" />
          <text x="14" y="24" fontFamily="Source Sans 3, sans-serif" fontSize="14" fontWeight="600" fill="#1d1d1f">
            {r.name}
          </text>
          <text x="240" y="24" fontFamily="Source Sans 3, sans-serif" fontSize="14" fill="#1d1d1f">
            ₹{r.price}
          </text>
          <rect x="320" y="8" width="46" height="22" rx="11" fill={r.up ? "#1db954" : "#ff3b30"} />
          <text x="343" y="23" textAnchor="middle" fontFamily="Source Sans 3, sans-serif" fontSize="11" fill="#fff">
            {r.up ? "Buy" : "Sell"}
          </text>
        </g>
      ))}
    </svg>
  );
}

// A simple illustration of placing an order.
export function OrderMock() {
  return (
    <svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" style={cardStyle}>
      <rect x="0" y="0" width="360" height="220" rx="16" fill="#ffffff" stroke="#d2d2d7" />
      <text x="20" y="32" fontFamily="Lora, serif" fontSize="16" fontWeight="700" fill="#1d1d1f">
        Invest in RELIANCE
      </text>
      <rect x="20" y="52" width="150" height="40" rx="8" fill="#f5f5f7" />
      <text x="32" y="68" fontFamily="Source Sans 3, sans-serif" fontSize="11" fill="#6e6e73">Qty.</text>
      <text x="32" y="84" fontFamily="Source Sans 3, sans-serif" fontSize="14" fill="#1d1d1f">5</text>
      <rect x="190" y="52" width="150" height="40" rx="8" fill="#f5f5f7" />
      <text x="202" y="68" fontFamily="Source Sans 3, sans-serif" fontSize="11" fill="#6e6e73">Price</text>
      <text x="202" y="84" fontFamily="Source Sans 3, sans-serif" fontSize="14" fill="#1d1d1f">₹2,945.50</text>
      <rect x="20" y="150" width="320" height="44" rx="10" fill="#0071e3" />
      <text x="180" y="177" textAnchor="middle" fontFamily="Source Sans 3, sans-serif" fontSize="15" fill="#fff">
        Invest — ₹14,727.50
      </text>
    </svg>
  );
}

// A simple illustration of the portfolio/holdings view.
export function PortfolioMock() {
  return (
    <svg viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg" style={cardStyle}>
      <rect x="0" y="0" width="420" height="260" rx="16" fill="#ffffff" stroke="#d2d2d7" />
      <text x="20" y="30" fontFamily="Source Sans 3, sans-serif" fontSize="13" fill="#6e6e73">
        Your holdings
      </text>
      <text x="20" y="58" fontFamily="Lora, serif" fontSize="22" fontWeight="700" fill="#1db954">
        +₹1,553.40
      </text>
      <text x="20" y="76" fontFamily="Source Sans 3, sans-serif" fontSize="12" fill="#6e6e73">
        Total gain (+5.20%)
      </text>
      <rect x="20" y="96" width="380" height="10" rx="5" fill="#f5f5f7" />
      <rect x="20" y="96" width="240" height="10" rx="5" fill="#0071e3" />
      <rect x="260" y="96" width="90" height="10" rx="5" fill="#5ac8fa" />
      <rect x="350" y="96" width="50" height="10" rx="5" fill="#34c759" />
      {["TCS", "HDFCBANK", "ITC"].map((n, i) => (
        <g key={n} transform={`translate(20, ${126 + i * 38})`}>
          <text x="0" y="14" fontFamily="Source Sans 3, sans-serif" fontSize="13" fill="#1d1d1f">
            {n}
          </text>
          <rect x="0" y="20" width="380" height="6" rx="3" fill="#f5f5f7" />
          <rect x="0" y="20" width={140 - i * 30} height="6" rx="3" fill="#0071e3" />
        </g>
      ))}
    </svg>
  );
}

// A simple illustration of a learning card.
export function LearnMock() {
  return (
    <svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" style={cardStyle}>
      <rect x="0" y="0" width="360" height="220" rx="16" fill="#f5f5f7" />
      <rect x="24" y="24" width="200" height="14" rx="7" fill="#d2d2d7" />
      <rect x="24" y="50" width="150" height="14" rx="7" fill="#d2d2d7" />
      <circle cx="290" cy="60" r="40" fill="#0071e3" opacity="0.15" />
      <text x="270" y="68" fontFamily="Lora, serif" fontSize="26" fontWeight="700" fill="#0071e3">
        ₹
      </text>
      <rect x="24" y="100" width="312" height="1" fill="#d2d2d7" />
      <rect x="24" y="120" width="312" height="14" rx="7" fill="#ffffff" />
      <rect x="24" y="144" width="260" height="14" rx="7" fill="#ffffff" />
      <rect x="24" y="168" width="280" height="14" rx="7" fill="#ffffff" />
    </svg>
  );
}
