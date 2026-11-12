// import React from "react";
// import { useNavigate } from "react-router-dom";

// // A simple, original mock of the Vestora dashboard — no real screenshots,
// // just an illustration of what a fresh account looks like.
// function DashboardMock() {
//   return (
//     <svg
//       viewBox="0 0 560 340"
//       xmlns="http://www.w3.org/2000/svg"
//       style={{ width: "100%", maxWidth: "560px", height: "auto" }}
//     >
//       <rect x="0" y="0" width="560" height="340" rx="18" fill="#ffffff" stroke="#d2d2d7" />
//       <rect x="24" y="24" width="512" height="52" rx="12" fill="#f5f5f7" />
//       <circle cx="52" cy="50" r="14" fill="#0071e3" />
//       <text x="76" y="45" fontFamily="Source Sans 3, sans-serif" fontSize="13" fill="#6e6e73">
//         Wallet balance
//       </text>
//       <text x="76" y="63" fontFamily="Lora, serif" fontSize="20" fontWeight="700" fill="#1d1d1f">
//         ₹1,00,000.00
//       </text>

//       <text x="24" y="108" fontFamily="Source Sans 3, sans-serif" fontSize="13" fill="#6e6e73">
//         Holdings
//       </text>
//       {[
//         { name: "TCS", pct: "+2.4%", up: true },
//         { name: "HDFCBANK", pct: "+0.8%", up: true },
//         { name: "INFY", pct: "-1.1%", up: false },
//       ].map((row, i) => (
//         <g key={row.name} transform={`translate(24, ${124 + i * 40})`}>
//           <rect width="512" height="32" rx="8" fill="#ffffff" stroke="#d2d2d7" />
//           <text x="16" y="21" fontFamily="Source Sans 3, sans-serif" fontSize="14" fill="#1d1d1f">
//             {row.name}
//           </text>
//           <text
//             x="496"
//             y="21"
//             textAnchor="end"
//             fontFamily="Source Sans 3, sans-serif"
//             fontSize="14"
//             fill={row.up ? "#1db954" : "#ff3b30"}
//           >
//             {row.pct}
//           </text>
//         </g>
//       ))}

//       <rect x="24" y="252" width="512" height="64" rx="12" fill="#f5f5f7" />
//       <polyline
//         points="40,296 100,284 160,300 220,272 280,288 340,260 400,276 460,250 520,262"
//         fill="none"
//         stroke="#0071e3"
//         strokeWidth="2.5"
//       />
//     </svg>
//   );
// }

// function Hero() {
//   const navigate = useNavigate();
//   return (
//     <div className="container px-3 px-md-4 mb-5">
//       <div className="row text-center justify-content-center">
//         <div className="col-12 d-flex justify-content-center">
//           <DashboardMock />
//         </div>
//         <div className="col-12">
//           <h1 className="mt-4 fs-3" style={{ color: "#174D38" }}>
//             Practice investing, without the risk
//           </h1>
//         </div>
//         <div className="col-12 col-md-10 col-lg-8">
//           <p className="px-2 px-md-0" style={{ color: "#333333" }}>
//             Every Vestora account starts with a virtual ₹1,00,000 wallet.
//             Buy and sell real-world stocks, track your gains and losses, and
//             build the habits of investing before real money is ever on the
//             line.
//           </p>
//         </div>
//         <div className="col-12 mt-2">
//           <button
//             className="btn px-4 py-2 fs-5 custom-signup-btn"
//             onClick={() => navigate("/signup")}
//           >
//             Sign up for free
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Hero;


import React from "react";
import { useNavigate } from "react-router-dom";

function DashboardMock() {
  return (
    <div
      className="w-100 p-4 p-md-4"
      style={{
        maxWidth: "570px",
        backgroundColor: "#f2f2f2",
        borderRadius: "30px",
        color: "#174D38"
      }}
    >
      {/* Wallet heading */}
      <div className="d-flex justify-content-between align-items-center mb-2">
        <span className="fw-semibold" style={{ fontSize: "16px" }}>
          Your practice wallet
        </span>

        <span
          className="rounded-pill px-3 py-1 fw-semibold"
          style={{
            backgroundColor: "#cccccc",
            fontSize: "13px"
          }}
        >
          SAMPLE VIEW
        </span>
      </div>

      {/* Wallet balance */}
      <h2
        className="mb-0"
        style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(42px, 4vw, 65px)",
          fontWeight: "normal",
          letterSpacing: "-2px"
        }}
      >
        ₹1,00,000
      </h2>

      <p className="mb-3" style={{ fontSize: "17px" }}>
        Starting balance, every new account
      </p>

      {/* Stock graph */}
      <div className="w-100 mt-4 mb-3">
        <svg
          viewBox="0 0 500 145"
          width="100%"
          height="auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline
            points="8,112 58,102 108,108 158,77 208,86 258,52 308,62 358,32 408,43 458,12 492,19"
            fill="none"
            stroke="#174D38"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <line
            x1="8"
            y1="130"
            x2="492"
            y2="130"
            stroke="#c9c9c9"
            strokeWidth="1"
          />
        </svg>
      </div>

      {/* Mistake detector */}
      <div
        className="p-3 p-md-4 mt-3"
        style={{
          backgroundColor: "#501a18",
          color: "#f5f5f5",
          borderRadius: "20px"
        }}
      >
        <div
          className="fw-bold mb-1"
          style={{
            fontSize: "14px",
            letterSpacing: "0.4px",
            color: "#d8c5c5"
          }}
        >
          MISTAKE DETECTOR
        </div>

        <p
          className="mb-0"
          style={{
            fontSize: "17px",
            lineHeight: "1.6"
          }}
        >
          Over 40% of your net worth is in one stock.
          Consider spreading it out.
        </p>
      </div>
    </div>
  );
}

function Hero() {
  const navigate = useNavigate();

  return (
    <>
      {/* HERO SECTION */}
      <section
        className="container-fluid d-flex align-items-center"
        style={{
          backgroundColor: "#174D38",
          color: "#f5f5f0",
          minHeight: "min(864px, 100vh)",
          padding: "75px 0"
        }}
      >
        <div
          className="container-fluid"
          style={{
            maxWidth: "1540px",
            width: "88%",
            margin: "auto"
          }}
        >
          <div className="row align-items-center gy-5">

            {/* LEFT CONTENT */}
            <div className="col-12 col-lg-6">

              {/* Badge */}
              <div className="mb-4">
                <span
                  className="d-inline-block rounded-pill px-3 py-2"
                  style={{
                    border: "1px solid #b8c9bf",
                    color: "#d0d9d3",
                    fontSize: "14px",
                    fontWeight: "600",
                    letterSpacing: "0.5px"
                  }}
                >
                  PRACTICE INVESTING · NO REAL MONEY
                </span>
              </div>

              {/* Heading */}
              <h1
                className="mb-4 hero-heading"
                style={{
                  fontFamily: "'Bodoni Moda', Georgia, serif",
                  fontSize: "clamp(40px, 5vw, 80px)",
                  lineHeight: "1.08",
                  fontWeight: "400",
                  letterSpacing: "-3px"
                }}
              >
                Learn the market
                <br />
                before it costs
                <br />
                you <em>anything.</em>
              </h1>

              {/* Description */}
              <p
                className="mb-4"
                style={{
                  color: "#c9d2cd",
                  fontSize: "20px",
                  lineHeight: "1.6",
                  maxWidth: "650px"
                }}
              >
                Vestora gives you ₹1,00,000 of virtual money and
                real NSE prices. Buy, sell, set stop-losses, and
                find out which of your habits help or hurt.
              </p>

              {/* Buttons */}
              <div className="d-flex flex-wrap align-items-center gap-4 mt-5">

                <button
                  className="btn rounded-pill px-4 py-3 fw-semibold"
                  style={{
                    backgroundColor: "#f2f2f2",
                    color: "#174D38",
                    fontSize: "19px",
                    minWidth: "270px",
                    border: "none"
                  }}
                  onClick={() => navigate("/signup")}
                >
                  Create free account
                </button>

                <a
                  href="/products"
                  className="text-light fw-semibold"
                  style={{
                    fontSize: "19px",
                    textUnderlineOffset: "4px"
                  }}
                >
                  See how it works
                </a>

              </div>
            </div>

            {/* RIGHT DASHBOARD */}
            <div className="col-12 col-lg-6 d-flex justify-content-lg-end justify-content-center">
              <DashboardMock />
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE STRIP */}
      <section
        className="container-fluid py-4"
        style={{ backgroundColor: "#cccccc" }}
      >
        <div className="container-fluid" style={{ maxWidth: "1600px" }}>
          <div className="row align-items-center text-center gy-3">

            {[
              "Virtual money only",
              "Real NSE prices",
              "Free to use",
              "Not investment advice"
            ].map((feature) => (
              <div className="col-6 col-lg-3" key={feature}>
                <p
                  className="mb-0 fw-semibold"
                  style={{
                    color: "#174D38",
                    fontSize: "21px"
                  }}
                >
                  {feature}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>
    </>
  );
}

export default Hero;
