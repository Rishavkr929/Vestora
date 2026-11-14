// import React, { useState, useEffect, useContext } from "react";
// import { VerticalGraph } from "./VerticalGraph";
// import api from "../../utils/api";
// import GeneralContext from "./GeneralContext";
// import StopLossModal from "./StopLossModal";

// const Holdings = () => {
//   const [allHoldings, setAllHoldings] = useState([]);
//   const [stopLossHolding, setStopLossHolding] = useState(null);
//   const { openSellWindow, refreshTrigger, triggerRefresh } = useContext(GeneralContext);

//   useEffect(() => {
//     api.get("/allHoldings").then((res) => {
//       setAllHoldings(res.data);
//     });
//   }, [refreshTrigger]);

//   const labels = allHoldings.map((subArray) => subArray["name"]);

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Stock Price",
//         data: allHoldings.map((stock) => stock.price),
//         backgroundColor: "#0071e3",
//       },
//     ],
//   };

//   // Real totals computed from actual holdings instead of fixed demo numbers.
//   const totalInvestment = allHoldings.reduce((sum, s) => sum + s.avg * s.qty, 0);
//   const totalCurrentValue = allHoldings.reduce((sum, s) => sum + s.price * s.qty, 0);
//   const totalPnl = totalCurrentValue - totalInvestment;
//   const totalPnlPct = totalInvestment ? (totalPnl / totalInvestment) * 100 : 0;
//   const pnlClass = totalPnl >= 0 ? "profit" : "loss";

//   return (
//     <>
//       <h3 className="title">Holdings ({allHoldings.length})</h3>

//       {allHoldings.length === 0 ? (
//         <p style={{ padding: "24px", color: "#6e6e73" }}>
//           You don't own anything yet. Pick a stock in your watchlist and hit Buy to get started.
//         </p>
//       ) : (
//         <>
//           <div className="order-table">
//             <table>
//               <tr>
//                 <th>Instrument</th>
//                 <th>Qty.</th>
//                 <th>Avg. cost</th>
//                 <th>LTP</th>
//                 <th>Cur. val</th>
//                 <th>P&L</th>
//                 <th></th>
//               </tr>

//               {allHoldings.map((stock, index) => {
//                 const curValue = stock.price * stock.qty;
//                 const isProfit = curValue - stock.avg * stock.qty >= 0.0;
//                 const profClass = isProfit ? "profit" : "loss";

//                 return (
//                   <tr key={index}>
//                     <td>{stock.name}</td>
//                     <td>{stock.qty}</td>
//                     <td>{stock.avg.toFixed(2)}</td>
//                     <td>{stock.price.toFixed(2)}</td>
//                     <td>{curValue.toFixed(2)}</td>
//                     <td className={profClass}>
//                       {(curValue - stock.avg * stock.qty).toFixed(2)}
//                     </td>
//                     <td style={{ whiteSpace: "nowrap" }}>
//                       <button
//                         className="sell"
//                         style={{ padding: "4px 12px", borderRadius: "6px", marginRight: "6px" }}
//                         onClick={() => openSellWindow(stock)}
//                       >
//                         Sell
//                       </button>
//                       <button
//                         style={{
//                           padding: "4px 12px",
//                           borderRadius: "6px",
//                           background: "#f0f0f0",
//                           border: "1px solid #ccc",
//                         }}
//                         onClick={() => setStopLossHolding(stock)}
//                       >
//                         Stop-loss
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </table>
//           </div>

//           <div className="order-row">
//             <div className="order-col">
//               <h5>₹{totalInvestment.toFixed(2)}</h5>
//               <p>Total investment</p>
//             </div>
//             <div className="order-col">
//               <h5>₹{totalCurrentValue.toFixed(2)}</h5>
//               <p>Current value</p>
//             </div>
//             <div className="order-col">
//               <h5 className={pnlClass}>
//                 ₹{totalPnl.toFixed(2)} ({totalPnlPct.toFixed(2)}%)
//               </h5>
//               <p>P&L</p>
//             </div>
//           </div>
//           <VerticalGraph data={data} />
//         </>
//       )}

//       {stopLossHolding && (
//         <StopLossModal
//           holding={stopLossHolding}
//           onClose={() => setStopLossHolding(null)}
//           onSaved={() => {
//             setStopLossHolding(null);
//             triggerRefresh();
//           }}
//         />
//       )}
//     </>
//   );
// };

// export default Holdings;


// import React, { useState, useEffect, useContext } from "react";
// import { VerticalGraph } from "./VerticalGraph";
// import api from "../../utils/api";
// import GeneralContext from "./GeneralContext";
// import StopLossModal from "./StopLossModal";

// const formatCurrency = (value) =>
//   `₹${Number(value || 0).toLocaleString("en-IN", {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   })}`;

// const Holdings = () => {
//   const [allHoldings, setAllHoldings] = useState([]);
//   const [stopLossHolding, setStopLossHolding] = useState(null);

//   const {
//     openSellWindow,
//     refreshTrigger,
//     triggerRefresh,
//   } = useContext(GeneralContext);

//   const colors = {
//     green: "#174F3D",
//     lightGreen: "#E8EFEA",
//     grey: "#CCCCCC",
//     background: "#F2F2EF",
//     red: "#511A1A",
//     white: "#FFFFFF",
//   };

//   useEffect(() => {
//     api
//       .get("/allHoldings")
//       .then((res) => setAllHoldings(res.data))
//       .catch((err) => console.error("Error fetching holdings:", err));
//   }, [refreshTrigger]);

//   const totalInvestment = allHoldings.reduce(
//     (sum, stock) => sum + stock.avg * stock.qty,
//     0
//   );

//   const totalCurrentValue = allHoldings.reduce(
//     (sum, stock) => sum + stock.price * stock.qty,
//     0
//   );

//   const totalPnl = totalCurrentValue - totalInvestment;

//   const totalPnlPct = totalInvestment
//     ? (totalPnl / totalInvestment) * 100
//     : 0;

//   const isProfit = totalPnl >= 0;

//   const chartData = {
//     labels: allHoldings.map((stock) => stock.name),
//     datasets: [
//       {
//         label: "Share of current value",
//         data: allHoldings.map(
//           (stock) => stock.price * stock.qty
//         ),
//         backgroundColor: colors.green,
//         borderRadius: 20,
//         barThickness: 18,
//       },
//     ],
//   };

//   return (
//     <div
//       className="container-fluid py-3 py-md-4"
//       style={{
//         backgroundColor: colors.background,
//         color: colors.green,
//         minHeight: "100vh",
//         fontFamily: "inherit",
//       }}
//     >
//       {/* Page heading */}
//       <div className="mb-4">
//         <h1
//           className="mb-2"
//           style={{
//             fontFamily: "Georgia, serif",
//             fontSize: "clamp(32px, 4vw, 46px)",
//             fontWeight: "400",
//             color: "#174D3C",
//             marginBottom: "8px",
//           }}
//         >
//           Holdings ({allHoldings.length})
//         </h1>

//         <p
//           className="mb-0"
//           style={{
//             color: colors.green,
//             fontSize: "1rem",
//           }}
//         >
//           Shares you own right now, priced live.
//         </p>
//       </div>

//       {allHoldings.length === 0 ? (
//         <div
//           className="p-4 rounded-4"
//           style={{
//             backgroundColor: colors.grey,
//             color: colors.green,
//           }}
//         >
//           <h5>No holdings yet</h5>
//           <p className="mb-0">
//             Buy stocks from your watchlist to see your holdings here.
//           </p>
//         </div>
//       ) : (
//         <>
//           {/* Holdings table */}
//           <div className="table-responsive mb-4">
//             <table
//               className="table align-middle mb-0"
//               style={{
//                 minWidth: "850px",
//                 color: colors.green,
//                 borderColor: "#B8C2BC",
//               }}
//             >
//               <thead>
//                 <tr
//                   style={{
//                     borderBottom: `1px solid ${colors.green}`,
//                   }}
//                 >
//                   {[
//                     "Instrument",
//                     "Qty.",
//                     "Avg. cost",
//                     "LTP",
//                     "Cur. val",
//                     "P&L",
//                     "Actions",
//                   ].map((heading) => (
//                     <th
//                       key={heading}
//                       className="py-3 px-3 text-nowrap"
//                       style={{
//                         color: colors.green,
//                         fontSize: "0.85rem",
//                         fontWeight: 700,
//                         textTransform: "uppercase",
//                       }}
//                     >
//                       {heading}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>

//               <tbody>
//                 {allHoldings.map((stock) => {
//                   const currentValue = stock.price * stock.qty;
//                   const investment = stock.avg * stock.qty;
//                   const pnl = currentValue - investment;
//                   const stockIsProfit = pnl >= 0;

//                   return (
//                     <tr
//                       key={stock._id || stock.name}
//                       style={{
//                         borderBottom: "2px solid #D0D0D0",
//                       }}
//                     >
//                       <td className="px-3 py-3 fw-semibold">
//                         {stock.name}
//                       </td>

//                       <td className="px-3 py-3 text-nowrap">
//                         {stock.qty}
//                       </td>

//                       <td className="px-3 py-3 text-nowrap">
//                         {Number(stock.avg).toFixed(2)}
//                       </td>

//                       <td className="px-3 py-3 text-nowrap">
//                         {Number(stock.price).toFixed(2)}
//                       </td>

//                       <td className="px-3 py-3 text-nowrap">
//                         {currentValue.toLocaleString("en-IN", {
//                           minimumFractionDigits: 2,
//                           maximumFractionDigits: 2,
//                         })}
//                       </td>

//                       <td
//                         className="px-3 py-3 fw-semibold text-nowrap"
//                         style={{
//                           color: stockIsProfit
//                             ? colors.green
//                             : colors.red,
//                         }}
//                       >
//                         {stockIsProfit ? "▲ " : "▼ "}
//                         {stockIsProfit ? "+" : ""}
//                         {formatCurrency(pnl)}
//                       </td>

//                       <td className="px-3 py-3">
//                         <div className="d-flex gap-2 flex-nowrap">
//                           <button
//                             type="button"
//                             className="btn btn-sm rounded-pill px-3"
//                             style={{
//                               backgroundColor: colors.red,
//                               color: colors.white,
//                               border: "none",
//                               fontWeight: 600,
//                             }}
//                             onClick={() => openSellWindow(stock)}
//                           >
//                             Sell
//                           </button>

//                           <button
//                             type="button"
//                             className="btn btn-sm rounded-pill px-3"
//                             style={{
//                               backgroundColor: "transparent",
//                               color: colors.green,
//                               border: `2px solid ${colors.green}`,
//                               fontWeight: 600,
//                             }}
//                             onClick={() => setStopLossHolding(stock)}
//                           >
//                             Stop-loss
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>

//           {/* Summary cards */}
//           <div className="row g-3 g-lg-4 mb-4">
//             <div className="col-12 col-md-4">
//               <div
//                 className="h-100 p-4 rounded-4"
//                 style={{
//                   backgroundColor: colors.grey,
//                   color: colors.green,
//                   minHeight: "155px",
//                 }}
//               >
//                 <p className="fw-bold text-uppercase mb-2">
//                   Total investment
//                 </p>

//                 <h2
//                   className="mb-0"
//                   style={{
//                     fontFamily: "Georgia, serif",
//                     fontSize: "clamp(1.7rem, 3vw, 2.5rem)",
//                   }}
//                 >
//                   {formatCurrency(totalInvestment)}
//                 </h2>
//               </div>
//             </div>

//             <div className="col-12 col-md-4">
//               <div
//                 className="h-100 p-4 rounded-4"
//                 style={{
//                   backgroundColor: colors.grey,
//                   color: colors.green,
//                   minHeight: "155px",
//                 }}
//               >
//                 <p className="fw-bold text-uppercase mb-2">
//                   Current value
//                 </p>

//                 <h2
//                   className="mb-0"
//                   style={{
//                     fontFamily: "Georgia, serif",
//                     fontSize: "clamp(1.7rem, 3vw, 2.5rem)",
//                   }}
//                 >
//                   {formatCurrency(totalCurrentValue)}
//                 </h2>
//               </div>
//             </div>

//             <div className="col-12 col-md-4">
//               <div
//                 className="h-100 p-4 rounded-4"
//                 style={{
//                   backgroundColor: colors.green,
//                   color: colors.white,
//                   minHeight: "155px",
//                 }}
//               >
//                 <p className="fw-bold text-uppercase mb-2">
//                   P&L
//                 </p>

//                 <h2
//                   className="mb-2"
//                   style={{
//                     fontFamily: "Georgia, serif",
//                     fontSize: "clamp(1.7rem, 3vw, 2.5rem)",
//                   }}
//                 >
//                   {isProfit ? "+" : ""}
//                   {formatCurrency(totalPnl)}
//                 </h2>

//                 <p className="mb-0">
//                   {isProfit ? "▲" : "▼"}{" "}
//                   {Math.abs(totalPnlPct).toFixed(2)}%
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Share of current value chart */}
//           <div
//             className="p-3 p-md-4 p-lg-5 rounded-4"
//             style={{
//               backgroundColor: colors.grey,
//               color: colors.green,
//             }}
//           >
//             <h3
//               className="mb-4"
//               style={{
//                 fontFamily: "Georgia, serif",
//                 fontSize: "clamp(1.5rem, 3vw, 2rem)",
//               }}
//             >
//               Share of current value
//             </h3>

//             <VerticalGraph data={chartData} />
//           </div>
//         </>
//       )}

//       {/* Stop-loss modal */}
//       {stopLossHolding && (
//         <StopLossModal
//           holding={stopLossHolding}
//           onClose={() => setStopLossHolding(null)}
//           onSaved={() => {
//             setStopLossHolding(null);
//             triggerRefresh();
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default Holdings;

import React, { useState, useEffect, useContext } from "react";
import { VerticalGraph } from "./VerticalGraph";
import api, { cachedGet } from "../../utils/api";
import GeneralContext from "./GeneralContext";
import StopLossModal from "./StopLossModal";

const formatCurrency = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [stopLossHolding, setStopLossHolding] = useState(null);

  const {
    openSellWindow,
    refreshTrigger,
    triggerRefresh,
  } = useContext(GeneralContext);

  const colors = {
    green: "#174F3D",
    lightGreen: "#E8EFEA",
    grey: "#CCCCCC",
    background: "#F2F2EF",
    red: "#511A1A",
    white: "#FFFFFF",
  };

  useEffect(() => {
    cachedGet("/allHoldings")
      .then((res) => setAllHoldings(res.data))
      .catch((err) => console.error("Error fetching holdings:", err));
  }, [refreshTrigger]);

  const totalInvestment = allHoldings.reduce(
    (sum, stock) => sum + stock.avg * stock.qty,
    0
  );

  const totalCurrentValue = allHoldings.reduce(
    (sum, stock) => sum + stock.price * stock.qty,
    0
  );

  const totalPnl = totalCurrentValue - totalInvestment;

  const totalPnlPct = totalInvestment
    ? (totalPnl / totalInvestment) * 100
    : 0;

  const isProfit = totalPnl >= 0;

  const chartData = {
    labels: allHoldings.map((stock) => stock.name),
    datasets: [
      {
        label: "Share of current value",
        data: allHoldings.map(
          (stock) => stock.price * stock.qty
        ),
        backgroundColor: colors.green,
        borderRadius: 20,
        barThickness: 18,
      },
    ],
  };

  return (
    <div
      className="container-fluid py-3 py-md-4"
      style={{
        backgroundColor: colors.background,
        color: colors.green,
        minHeight: "100vh",
        fontFamily: "inherit",
      }}
    >
      {/* Page heading */}
      <div className="mb-4">
        <h1
          className="mb-2"
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(32px, 4vw, 46px)",
            fontWeight: "400",
            color: "#174D3C",
            marginBottom: "8px",
          }}
        >
          Holdings ({allHoldings.length})
        </h1>

        <p
          className="mb-0"
          style={{
            color: colors.green,
            fontSize: "1rem",
          }}
        >
          Shares you own right now, priced live.
        </p>
      </div>

      {allHoldings.length === 0 ? (
        <div
          className="p-4 rounded-4"
          style={{
            backgroundColor: colors.grey,
            color: colors.green,
          }}
        >
          <h5>No holdings yet</h5>
          <p className="mb-0">
            Buy stocks from your watchlist to see your holdings here.
          </p>
        </div>
      ) : (
        <>
          {/* Holdings table */}
          <div className="table-responsive mb-4">
            <table
              className="table align-middle mb-0"
              style={{
                minWidth: "850px",
                color: colors.green,
                borderColor: "#B8C2BC",
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: `1px solid ${colors.green}`,
                  }}
                >
                  {[
                    "Instrument",
                    "Qty.",
                    "Avg. cost",
                    "LTP",
                    "Cur. val",
                    "P&L",
                    "Actions",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="py-3 px-3 text-nowrap"
                      style={{
                        color: colors.green,
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                      }}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {allHoldings.map((stock) => {
                  const currentValue = stock.price * stock.qty;
                  const investment = stock.avg * stock.qty;
                  const pnl = currentValue - investment;
                  const stockIsProfit = pnl >= 0;

                  return (
                    <tr
                      key={stock._id || stock.name}
                      style={{
                        borderBottom: "2px solid #D0D0D0",
                      }}
                    >
                      <td className="px-3 py-3 fw-semibold">
                        {stock.name}
                      </td>

                      <td className="px-3 py-3 text-nowrap">
                        {stock.qty}
                      </td>

                      <td className="px-3 py-3 text-nowrap">
                        {Number(stock.avg).toFixed(2)}
                      </td>

                      <td className="px-3 py-3 text-nowrap">
                        {Number(stock.price).toFixed(2)}
                      </td>

                      <td className="px-3 py-3 text-nowrap">
                        {currentValue.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </td>

                      <td
                        className="px-3 py-3 fw-semibold text-nowrap"
                        style={{
                          color: stockIsProfit
                            ? colors.green
                            : colors.red,
                        }}
                      >
                        {stockIsProfit ? "▲ " : "▼ "}
                        {stockIsProfit ? "+" : ""}
                        {formatCurrency(pnl)}
                      </td>

                      <td className="px-3 py-3">
                        <div className="d-flex gap-2 flex-nowrap">
                          <button
                            type="button"
                            className="btn btn-sm rounded-pill px-3"
                            style={{
                              backgroundColor: colors.red,
                              color: colors.white,
                              border: "none",
                              fontWeight: 600,
                            }}
                            onClick={() => openSellWindow(stock)}
                          >
                            Sell
                          </button>

                          <button
                            type="button"
                            className="btn btn-sm rounded-pill px-3"
                            style={{
                              backgroundColor: "transparent",
                              color: colors.green,
                              border: `2px solid ${colors.green}`,
                              fontWeight: 600,
                            }}
                            onClick={() => setStopLossHolding(stock)}
                          >
                            Stop-loss
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Summary cards */}
          <div className="row g-3 g-lg-4 mb-4">
            <div className="col-12 col-md-4">
              <div
                className="h-100 p-4 rounded-4"
                style={{
                  backgroundColor: colors.grey,
                  color: colors.green,
                  minHeight: "155px",
                }}
              >
                <p className="fw-bold text-uppercase mb-2">
                  Total investment
                </p>

                <h2
                  className="mb-0"
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(1.7rem, 3vw, 2.5rem)",
                  }}
                >
                  {formatCurrency(totalInvestment)}
                </h2>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div
                className="h-100 p-4 rounded-4"
                style={{
                  backgroundColor: colors.grey,
                  color: colors.green,
                  minHeight: "155px",
                }}
              >
                <p className="fw-bold text-uppercase mb-2">
                  Current value
                </p>

                <h2
                  className="mb-0"
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(1.7rem, 3vw, 2.5rem)",
                  }}
                >
                  {formatCurrency(totalCurrentValue)}
                </h2>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div
                className="h-100 p-4 rounded-4"
                style={{
                  backgroundColor: colors.green,
                  color: colors.white,
                  minHeight: "155px",
                }}
              >
                <p className="fw-bold text-uppercase mb-2">
                  P&L
                </p>

                <h2
                  className="mb-2"
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "clamp(1.7rem, 3vw, 2.5rem)",
                  }}
                >
                  {isProfit ? "+" : ""}
                  {formatCurrency(totalPnl)}
                </h2>

                <p className="mb-0">
                  {isProfit ? "▲" : "▼"}{" "}
                  {Math.abs(totalPnlPct).toFixed(2)}%
                </p>
              </div>
            </div>
          </div>

          {/* Share of current value chart */}
          <div
            className="p-3 p-md-4 p-lg-5 rounded-4"
            style={{
              backgroundColor: colors.grey,
              color: colors.green,
            }}
          >
            <h3
              className="mb-4"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(1.5rem, 3vw, 2rem)",
              }}
            >
              Share of current value
            </h3>

            <VerticalGraph data={chartData} />
          </div>
        </>
      )}

      {/* Stop-loss modal */}
      {stopLossHolding && (
        <StopLossModal
          holding={stopLossHolding}
          onClose={() => setStopLossHolding(null)}
          onSaved={() => {
            setStopLossHolding(null);
            triggerRefresh();
          }}
        />
      )}
    </div>
  );
};

export default Holdings;