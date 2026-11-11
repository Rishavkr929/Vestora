import React from "react";
import { useNavigate } from "react-router-dom";

// A simple, original mock of the Vestora dashboard — no real screenshots,
// just an illustration of what a fresh account looks like.
function DashboardMock() {
  return (
    <svg
      viewBox="0 0 560 340"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", maxWidth: "560px", height: "auto" }}
    >
      <rect x="0" y="0" width="560" height="340" rx="18" fill="#ffffff" stroke="#d2d2d7" />
      <rect x="24" y="24" width="512" height="52" rx="12" fill="#f5f5f7" />
      <circle cx="52" cy="50" r="14" fill="#0071e3" />
      <text x="76" y="45" fontFamily="Source Sans 3, sans-serif" fontSize="13" fill="#6e6e73">
        Wallet balance
      </text>
      <text x="76" y="63" fontFamily="Lora, serif" fontSize="20" fontWeight="700" fill="#1d1d1f">
        ₹1,00,000.00
      </text>

      <text x="24" y="108" fontFamily="Source Sans 3, sans-serif" fontSize="13" fill="#6e6e73">
        Holdings
      </text>
      {[
        { name: "TCS", pct: "+2.4%", up: true },
        { name: "HDFCBANK", pct: "+0.8%", up: true },
        { name: "INFY", pct: "-1.1%", up: false },
      ].map((row, i) => (
        <g key={row.name} transform={`translate(24, ${124 + i * 40})`}>
          <rect width="512" height="32" rx="8" fill="#ffffff" stroke="#d2d2d7" />
          <text x="16" y="21" fontFamily="Source Sans 3, sans-serif" fontSize="14" fill="#1d1d1f">
            {row.name}
          </text>
          <text
            x="496"
            y="21"
            textAnchor="end"
            fontFamily="Source Sans 3, sans-serif"
            fontSize="14"
            fill={row.up ? "#1db954" : "#ff3b30"}
          >
            {row.pct}
          </text>
        </g>
      ))}

      <rect x="24" y="252" width="512" height="64" rx="12" fill="#f5f5f7" />
      <polyline
        points="40,296 100,284 160,300 220,272 280,288 340,260 400,276 460,250 520,262"
        fill="none"
        stroke="#0071e3"
        strokeWidth="2.5"
      />
    </svg>
  );
}

function Hero() {
  const navigate = useNavigate();
  return (
    <div className="container px-3 px-md-4 mb-5">
      <div className="row text-center justify-content-center">
        <div className="col-12 d-flex justify-content-center">
          <DashboardMock />
        </div>
        <div className="col-12">
          <h1 className="mt-4 fs-3" style={{ color: "#174D38" }}>
            Practice investing, without the risk
          </h1>
        </div>
        <div className="col-12 col-md-10 col-lg-8">
          <p className="px-2 px-md-0" style={{ color: "#333333" }}>
            Every Vestora account starts with a virtual ₹1,00,000 wallet.
            Buy and sell real-world stocks, track your gains and losses, and
            build the habits of investing before real money is ever on the
            line.
          </p>
        </div>
        <div className="col-12 mt-2">
          <button
            className="btn px-4 py-2 fs-5 custom-signup-btn"
            onClick={() => navigate("/signup")}
          >
            Sign up for free
          </button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
