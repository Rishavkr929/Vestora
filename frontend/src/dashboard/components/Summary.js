// import React, { useState, useEffect, useContext } from "react";
// import { jwtDecode } from "jwt-decode";
// import api from "../../utils/api";
// import GeneralContext from "./GeneralContext";

// // Compact "3.74k" style formatting, matching the rest of the dashboard.
// function compact(n) {
//   const abs = Math.abs(n);
//   if (abs >= 100000) return (n / 100000).toFixed(2) + "L";
//   if (abs >= 1000) return (n / 1000).toFixed(2) + "k";
//   return n.toFixed(2);
// }

// const Summary = () => {
//   const [userName, setUserName] = useState("User");
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [holdings, setHoldings] = useState([]);
//   const { refreshTrigger } = useContext(GeneralContext);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         let nameToDisplay = decoded.name || decoded.email || "User";
//         if (nameToDisplay.includes("@")) nameToDisplay = nameToDisplay.split("@")[0];
//         setUserName(nameToDisplay.charAt(0).toUpperCase() + nameToDisplay.slice(1));
//       } catch (err) {
//         console.error("Error decoding token in Summary component:", err);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     api.get("/api/auth/me").then((res) => setWalletBalance(res.data.walletBalance));
//     api.get("/allHoldings").then((res) => setHoldings(res.data));
//   }, [refreshTrigger]);

//   const investment = holdings.reduce((sum, s) => sum + s.avg * s.qty, 0);
//   const currentValue = holdings.reduce((sum, s) => sum + s.price * s.qty, 0);
//   const pnl = currentValue - investment;
//   const pnlPct = investment ? (pnl / investment) * 100 : 0;
//   const pnlClass = pnl >= 0 ? "profit" : "loss";

//   return (
//     <>
//       <div className="username">
//         <h6>Hi, {userName}!</h6>
//         <hr className="divider" />
//       </div>

//       <div className="section">
//         <span>
//           <p>
//             <i className="fa fa-clock-o" aria-hidden="true"></i> Wallet
//           </p>
//         </span>

//         <div className="data">
//           <div className="first">
//             <h3>{compact(walletBalance)}</h3>
//             <p>Available balance</p>
//           </div>
//         </div>
//         <hr className="divider" />
//       </div>

//       <div className="section">
//         <span>
//           <p>
//             <i className="fa fa-credit-card" aria-hidden="true"></i> Holdings ({holdings.length})
//           </p>
//         </span>

//         <div className="data">
//           <div className="first">
//             <h3 className={pnlClass}>
//               {compact(pnl)} <small>({pnlPct.toFixed(2)}%)</small>{" "}
//             </h3>
//             <p>P&L</p>
//           </div>
//           <hr />

//           <div className="second">
//             <p>
//               Current Value <span>{compact(currentValue)}</span>{" "}
//             </p>
//             <p>
//               Investment <span>{compact(investment)}</span>{" "}
//             </p>
//           </div>
//         </div>
//         <hr className="divider" />
//       </div>
//     </>
//   );
// };

// export default Summary;



import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../../utils/api";
import GeneralContext from "./GeneralContext";

const formatCurrency = (value) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0);
};

const Summary = () => {
  const [userName, setUserName] = useState("User");
  const [walletBalance, setWalletBalance] = useState(0);
  const [holdings, setHoldings] = useState([]);
  const [positions, setPositions] = useState([]);

  const { refreshTrigger } = useContext(GeneralContext);

  const green = "#174D3C";
  const lightGreen = "#E8E9E5";
  const red = "#501A1A";
  const grey = "#CCCCCC";

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        let name = decoded.name || decoded.email || "User";

        if (name.includes("@")) {
          name = name.split("@")[0];
        }

        setUserName(
          name.charAt(0).toUpperCase() + name.slice(1)
        );
      } catch (error) {
        console.error("Token decoding failed:", error);
      }
    }
  }, []);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [userRes, holdingsRes, positionsRes] =
          await Promise.all([
            api.get("/api/auth/me"),
            api.get("/allHoldings"),
            api.get("/allPositions"),
          ]);

        setWalletBalance(
          Number(userRes.data.walletBalance) || 0
        );

        setHoldings(holdingsRes.data || []);
        setPositions(positionsRes.data || []);
      } catch (error) {
        console.error("Dashboard loading failed:", error);
      }
    };

    loadDashboard();
  }, [refreshTrigger]);

  // Portfolio calculations
  const investment = holdings.reduce(
    (sum, stock) => sum + stock.avg * stock.qty,
    0
  );

  const currentValue = holdings.reduce(
    (sum, stock) => sum + stock.price * stock.qty,
    0
  );

  const pnl = currentValue - investment;

  const pnlPercentage = investment
    ? (pnl / investment) * 100
    : 0;

  const netWorth = walletBalance + currentValue;

  // Find the largest holding
  const largestHolding = holdings.reduce(
    (largest, stock) => {
      const value = stock.price * stock.qty;

      return value > largest.value
        ? { stock, value }
        : largest;
    },
    { stock: null, value: 0 }
  );

  const concentration = currentValue
    ? (largestHolding.value / currentValue) * 100
    : 0;

  const hasStopLoss = largestHolding.stock
    ? positions.some(
        (position) =>
          position.name === largestHolding.stock.name &&
          position.status === "active"
      )
    : false;

  const showWarning =
    largestHolding.stock &&
    concentration >= 25 &&
    !hasStopLoss;

  const cardStyle = {
    borderRadius: "26px",
    padding: "24px",
    minHeight: "138px",
    height: "100%",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "1px",
    marginBottom: "8px",
  };

  const valueStyle = {
    fontFamily: "Georgia, serif",
    fontSize: "clamp(25px, 3vw, 38px)",
    fontWeight: "400",
    margin: "0",
    overflowWrap: "anywhere",
  };

  return (
    <div
      style={{
        width: "100%",
        color: green,
        fontFamily: "inherit",
      }}
    >
      {/* GREETING */}
      <div style={{ marginBottom: "32px" }}>
        <h1
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(32px, 4vw, 46px)",
            fontWeight: "400",
            color: green,
            marginBottom: "8px",
          }}
        >
          Hi, {userName}.
        </h1>

        <p
          style={{
            fontSize: "16px",
            color: green,
            margin: 0,
          }}
        >
          Here is where your practice portfolio stands today.
        </p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="row g-3 mb-4">

        {/* WALLET */}
        <div className="col-12 col-md-4">
          <div
            style={{
              ...cardStyle,
              backgroundColor: grey,
              color: green,
            }}
          >
            <p style={labelStyle}>WALLET</p>

            <h2 style={valueStyle}>
              {formatCurrency(walletBalance)}
            </h2>

            <p style={{ fontSize: "14px", marginTop: "8px" }}>
              Available balance
            </p>
          </div>
        </div>

        {/* NET WORTH */}
        <div className="col-12 col-md-4">
          <div
            style={{
              ...cardStyle,
              backgroundColor: green,
              color: "#FFFFFF",
            }}
          >
            <p style={{ ...labelStyle, color: "#CCCCCC" }}>
              NET WORTH
            </p>

            <h2 style={valueStyle}>
              {formatCurrency(netWorth)}
            </h2>

            <p style={{ fontSize: "14px", marginTop: "8px" }}>
              Wallet + holdings
            </p>
          </div>
        </div>

        {/* HOLDINGS P&L */}
        <div className="col-12 col-md-4">
          <div
            style={{
              ...cardStyle,
              backgroundColor: grey,
              color: green,
            }}
          >
            <p style={labelStyle}>HOLDINGS P&L</p>

            <h2
              style={{
                ...valueStyle,
                color: pnl >= 0 ? green : red,
              }}
            >
              {pnl >= 0 ? "+" : ""}
              {formatCurrency(pnl)}
            </h2>

            <p style={{ fontSize: "14px", marginTop: "8px" }}>
              {pnl >= 0 ? "▲" : "▼"}{" "}
              {Math.abs(pnlPercentage).toFixed(2)}% on{" "}
              {formatCurrency(investment)}
            </p>
          </div>
        </div>
      </div>

      {/* HOLDINGS + MISTAKE DETECTOR */}
      <div className="row g-4">

        {/* HOLDINGS TABLE */}
        <div className="col-12 col-lg-8">

          <div
            className="d-flex justify-content-between align-items-center flex-wrap gap-2"
            style={{ marginBottom: "14px" }}
          >
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "28px",
                fontWeight: "400",
                margin: 0,
                color: green,
              }}
            >
              Your holdings ({holdings.length})
            </h2>

            <Link
              to="/dashboard/holdings"
              style={{
                color: green,
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "14px",
              }}
            >
              See all →
            </Link>
          </div>

          <div className="table-responsive">
            <table
              className="table align-middle"
              style={{
                minWidth: "580px",
                color: green,
                backgroundColor: "transparent",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: `1px solid ${green}`,
                    fontSize: "12px",
                    letterSpacing: "1px",
                  }}
                >
                  <th style={{ padding: "12px 16px" }}>
                    INSTRUMENT
                  </th>
                  <th className="text-center">QTY.</th>
                  <th className="text-center">AVG. COST</th>
                  <th className="text-center">LTP</th>
                  <th className="text-end">P&L</th>
                </tr>
              </thead>

              <tbody>
                {holdings.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="text-center"
                      style={{ padding: "30px" }}
                    >
                      No holdings yet. Start investing!
                    </td>
                  </tr>
                ) : (
                  holdings.slice(0, 5).map((stock) => {
                    const stockInvestment =
                      stock.avg * stock.qty;

                    const stockValue =
                      stock.price * stock.qty;

                    const stockPnl =
                      stockValue - stockInvestment;

                    return (
                      <tr
                        key={stock._id || stock.name}
                        style={{
                          borderBottom: "1px solid #D0D0D0",
                          fontSize: "14px",
                        }}
                      >
                        <td style={{ padding: "16px" }}>
                          {stock.name}
                        </td>

                        <td className="text-center">
                          {stock.qty}
                        </td>

                        <td className="text-center">
                          {formatCurrency(stock.avg)}
                        </td>

                        <td className="text-center">
                          {formatCurrency(stock.price)}
                        </td>

                        <td
                          className="text-end"
                          style={{
                            fontWeight: "600",
                            color:
                              stockPnl >= 0 ? green : red,
                          }}
                        >
                          {stockPnl >= 0 ? "▲ +" : "▼ "}
                          {formatCurrency(stockPnl)}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {holdings.length > 5 && (
            <Link
              to="/dashboard/holdings"
              style={{
                display: "inline-block",
                color: green,
                marginTop: "10px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              View all {holdings.length} holdings →
            </Link>
          )}
        </div>

        {/* MISTAKE DETECTOR */}
        <div className="col-12 col-lg-4">
          <div
            style={{
              backgroundColor: red,
              color: "#FFFFFF",
              borderRadius: "26px",
              padding: "28px 25px",
              minHeight: "190px",
            }}
          >
            <p
              style={{
                ...labelStyle,
                color: "#CCCCCC",
              }}
            >
              MISTAKE DETECTOR
            </p>

            {showWarning ? (
              <>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    marginBottom: "18px",
                  }}
                >
                  {largestHolding.stock.name} is{" "}
                  {concentration.toFixed(0)}% of your holdings
                  and has no active stop-loss. Consider setting
                  one.
                </p>

                <Link
                  to="/dashboard/holdings"
                  style={{
                    color: "#FFFFFF",
                    fontWeight: "600",
                    textDecoration: "underline",
                  }}
                >
                  Review your holdings →
                </Link>
              </>
            ) : (
              <>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.6",
                    marginBottom: "12px",
                  }}
                >
                  {holdings.length === 0
                    ? "Your portfolio is waiting for its first investment."
                    : "No major concentration warning detected in your portfolio."}
                </p>

                <span style={{ fontSize: "13px", color: "#E0CFCF" }}>
                  Keep reviewing your portfolio regularly.
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
