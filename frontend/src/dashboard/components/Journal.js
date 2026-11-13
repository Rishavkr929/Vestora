// import React, { useState, useEffect } from "react";
// import api from "../../utils/api";

// const REASON_LABELS = {
//   trending: "Saw it trending",
//   tip: "A tip or news",
//   research: "My own research",
//   trying_out: "Just trying it out",
// };

// const Journal = () => {
//   const [trades, setTrades] = useState([]);
//   const [insights, setInsights] = useState([]);
//   const [mistakes, setMistakes] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     Promise.all([api.get("/api/journal"), api.get("/api/journal/mistakes")])
//       .then(([journalRes, mistakesRes]) => {
//         setTrades(journalRes.data.trades);
//         setInsights(journalRes.data.insights);
//         setMistakes(mistakesRes.data.flags);
//       })
//       .finally(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return <p style={{ padding: "24px", color: "#6e6e73" }}>Loading your journal…</p>;
//   }

//   return (
//     <>
//       <h3 className="title">Trade Journal</h3>

//       {mistakes.length > 0 && (
//         <div style={{ padding: "0 24px 16px" }}>
//           {mistakes.map((m, i) => (
//             <div
//               key={i}
//               style={{
//                 background: "#FFF8E5",
//                 border: "1px solid #FFE4A3",
//                 borderRadius: "10px",
//                 padding: "12px 16px",
//                 marginBottom: "10px",
//                 fontSize: "13.5px",
//                 color: "#5C4A00",
//                 lineHeight: 1.4,
//               }}
//             >
//               {m.message}
//             </div>
//           ))}
//         </div>
//       )}

//       <div style={{ padding: "0 24px 16px" }}>
//         <h4 style={{ fontSize: "15px", margin: "0 0 10px" }}>Which reasons make you money?</h4>
//         {insights.length === 0 ? (
//           <p style={{ fontSize: "13px", color: "#6e6e73" }}>
//             Buy a few stocks and tag why — insights will show up here.
//           </p>
//         ) : (
//           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "12px" }}>
//             {insights.map((g) => (
//               <div key={g.reason} style={{ border: "1px solid #D2D2D7", borderRadius: "10px", padding: "14px" }}>
//                 <p style={{ margin: 0, fontSize: "13px", color: "#6E6E73" }}>{g.reasonLabel}</p>
//                 <p style={{ margin: "4px 0 0", fontSize: "12px", color: "#6E6E73" }}>{g.count} holding(s)</p>
//                 <p style={{ margin: "6px 0 0", fontSize: "18px", fontWeight: 600, color: g.totalPnl >= 0 ? "#1DB954" : "#FF3B30" }}>
//                   {g.totalPnl >= 0 ? "+" : ""}₹{g.totalPnl}
//                 </p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       <h4 style={{ fontSize: "15px", margin: "0 0 0 24px" }}>Trade history</h4>
//       <div className="order-table">
//         <table>
//           <tr>
//             <th>Date</th>
//             <th>Instrument</th>
//             <th>Mode</th>
//             <th>Qty.</th>
//             <th>Price</th>
//             <th>Reason</th>
//           </tr>
//           {trades.map((t) => (
//             <tr key={t.id}>
//               <td>{new Date(t.date).toLocaleDateString("en-IN")}</td>
//               <td>{t.name}</td>
//               <td className={t.mode === "BUY" ? "profit" : "loss"}>{t.mode}</td>
//               <td>{t.qty}</td>
//               <td>₹{t.price.toFixed(2)}</td>
//               <td style={{ color: "#6E6E73" }}>{t.reasonLabel || "—"}</td>
//             </tr>
//           ))}
//         </table>
//         {trades.length === 0 && (
//           <p style={{ padding: "16px", color: "#6e6e73", fontSize: "13px" }}>No trades yet.</p>
//         )}
//       </div>
//     </>
//   );
// };

// export default Journal;



import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../utils/api";

const REASON_LABELS = {
  trending: "Saw it trending",
  tip: "A tip or news",
  research: "My own research",
  trying_out: "Just trying it out",
};

const Journal = () => {
  const [trades, setTrades] = useState([]);
  const [insights, setInsights] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadJournal = async () => {
      try {
        const [journalRes, mistakesRes] = await Promise.all([
          api.get("/api/journal"),
          api.get("/api/journal/mistakes"),
        ]);

        setTrades(journalRes.data.trades || []);
        setInsights(journalRes.data.insights || []);
        setMistakes(mistakesRes.data.flags || []);
      } catch (err) {
        toast.error("Unable to load your trade journal.");
      } finally {
        setLoading(false);
      }
    };

    loadJournal();
  }, []);

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const headingStyle = {
    color: "#174D38",
    fontFamily: "Georgia, serif",
    fontWeight: "500",
  };

  const thStyle = {
    color: "#174D38",
    fontSize: "14px",
    fontWeight: "800",
    textTransform: "uppercase",
    padding: "15px 20px",
    whiteSpace: "nowrap",
    borderBottom: "2px solid #174D38",
  };

  const tdStyle = {
    color: "#174D38",
    fontSize: "16px",
    fontWeight: "600",
    padding: "17px 20px",
    whiteSpace: "nowrap",
    borderBottom: "1px solid #CBCBCB",
    verticalAlign: "middle",
  };

  if (loading) {
    return (
      <div
        className="container-fluid p-4"
        style={{
          minHeight: "100vh",
          color: "#174D38",
        }}
      >
        Loading your journal...
      </div>
    );
  }

  return (
    <div
      className="container-fluid px-3 px-md-4 py-4"
      style={{
        minHeight: "100vh",
      }}
    >

      {/* Page Heading */}
      <div className="mb-4">
        <h1
          style={{
            ...headingStyle,
            fontSize: "clamp(32px, 4vw, 48px)",
            marginBottom: "10px",
          }}
        >
          Trade journal
        </h1>

        <p
          className="mb-0"
          style={{
            color: "#174D38",
            fontSize: "17px",
            fontWeight: "600",
          }}
        >
          Why you bought, and what it has earned you.
        </p>
      </div>

      {/* Mistake Detector */}
      {mistakes.length > 0 && (
        <div className="mb-5">
          {mistakes.map((m, i) => (
            <div
              key={i}
              className="mb-3"
              style={{
                backgroundColor: "#4D1717",
                borderRadius: "30px",
                padding: "25px 30px",
                color: "#F2F2F2",
              }}
            >
              <h6
                className="mb-2"
                style={{
                  color: "#CBCBCB",
                  fontSize: "15px",
                  fontWeight: "800",
                  letterSpacing: "1px",
                }}
              >
                MISTAKE DETECTOR
              </h6>

              <p
                className="mb-0"
                style={{
                  fontSize: "17px",
                  lineHeight: "1.6",
                  color: "#F2F2F2",
                }}
              >
                {m.message}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Insights Section */}
      <section className="mb-5">

        <h2
          className="mb-4"
          style={{
            ...headingStyle,
            fontSize: "clamp(25px, 3vw, 34px)",
          }}
        >
          Which reasons make you money?
        </h2>

        {insights.length === 0 ? (
          <div
            className="p-4 rounded-4"
            style={{
              backgroundColor: "#CBCBCB",
              color: "#174D38",
            }}
          >
            Buy a few stocks and tag why — insights will show up here.
          </div>
        ) : (

          <div className="row g-3">

            {insights.map((g) => {
              const isProfit = g.totalPnl >= 0;

              return (
                <div
                  className="col-12 col-sm-6 col-lg-4"
                  key={g.reason}
                >
                  <div
                    className="h-100"
                    style={{
                      backgroundColor: "#CBCBCB",
                      borderRadius: "28px",
                      padding: "25px 27px",
                      minHeight: "165px",
                    }}
                  >

                    {/* Reason */}
                    <h5
                      className="mb-1"
                      style={{
                        color: "#174D38",
                        fontSize: "17px",
                        fontWeight: "700",
                      }}
                    >
                      {g.reasonLabel ||
                        REASON_LABELS[g.reason] ||
                        g.reason}
                    </h5>

                    {/* Holding Count */}
                    <p
                      className="mb-3"
                      style={{
                        color: "#174D38",
                        fontSize: "14px",
                      }}
                    >
                      {g.count} holding{g.count !== 1 ? "s" : ""}
                    </p>

                    {/* PNL */}
                    <h2
                      className="mb-0"
                      style={{
                        color: isProfit ? "#174D38" : "#4D1717",
                        fontFamily: "Georgia, serif",
                        fontSize: "clamp(26px, 3vw, 36px)",
                        fontWeight: "400",
                      }}
                    >
                      {isProfit ? "+" : "-"}₹
                      {formatPrice(Math.abs(g.totalPnl))}
                    </h2>

                  </div>
                </div>
              );
            })}

          </div>
        )}
      </section>

      {/* Trade History */}
      <section>

        <h2
          className="mb-3"
          style={{
            ...headingStyle,
            fontSize: "clamp(25px, 3vw, 34px)",
          }}
        >
          Trade history
        </h2>

        <div
          className="table-responsive"
          style={{
            width: "100%",
            overflowX: "auto",
          }}
        >
          <table
            className="table align-middle mb-0"
            style={{
              minWidth: "750px",
              backgroundColor: "#000000",
              borderCollapse: "collapse",
            }}
          >

            <thead>
              <tr>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Instrument</th>
                <th style={thStyle}>Mode</th>
                <th style={thStyle} className="text-end">
                  Qty.
                </th>
                <th style={thStyle} className="text-end">
                  Price
                </th>
                <th style={thStyle}>Reason</th>
              </tr>
            </thead>

            <tbody>
              {trades.map((t) => (
                <tr key={t.id}>

                  {/* Date */}
                  <td style={tdStyle}>
                    {new Date(t.date).toLocaleDateString("en-IN")}
                  </td>

                  {/* Instrument */}
                  <td style={tdStyle}>
                    {t.name}
                  </td>

                  {/* Mode */}
                  <td
                    style={{
                      ...tdStyle,
                      color:
                        t.mode === "BUY"
                          ? "#174D38"
                          : "#4D1717",
                    }}
                  >
                    {t.mode}
                  </td>

                  {/* Quantity */}
                  <td
                    style={tdStyle}
                    className="text-end"
                  >
                    {t.qty}
                  </td>

                  {/* Price */}
                  <td
                    style={tdStyle}
                    className="text-end"
                  >
                    ₹{formatPrice(t.price)}
                  </td>

                  {/* Reason */}
                  <td style={tdStyle}>
                    {t.reasonLabel ||
                      REASON_LABELS[t.reason] ||
                      "—"}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

          {/* Empty State */}
          {trades.length === 0 && (
            <div
              className="text-center py-5"
              style={{
                color: "#CBCBCB",
                fontSize: "16px",
              }}
            >
              No trades yet. Your trade history will appear here.
            </div>
          )}

        </div>
      </section>

    </div>
  );
};

export default Journal;
