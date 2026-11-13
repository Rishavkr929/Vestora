// import React, { useState, useEffect, useContext } from "react";
// import api from "../../utils/api";
// import GeneralContext from "./GeneralContext";

// const Positions = () => {
//   const [positions, setPositions] = useState([]);
//   const [holdings, setHoldings] = useState([]);
//   const { refreshTrigger, triggerRefresh } = useContext(GeneralContext);

//   const load = () => {
//     api.get("/allPositions").then((res) => setPositions(res.data));
//     api.get("/allHoldings").then((res) => setHoldings(res.data));
//   };

//   useEffect(() => {
//     load();
//     // The server checks (and can trigger) stop-losses every few seconds on
//     // its own, so poll gently to stay in sync even if you just leave this
//     // tab open.
//     const interval = setInterval(load, 5000);
//     return () => clearInterval(interval);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [refreshTrigger]);

//   const currentPriceOf = (name) => holdings.find((h) => h.name === name)?.price;

//   const handleCancel = async (id) => {
//     await api.delete(`/position/${id}`);
//     load();
//     triggerRefresh();
//   };

//   const active = positions.filter((p) => p.status === "active");
//   const history = positions.filter((p) => p.status !== "active");

//   return (
//     <>
//       <h3 className="title">Positions ({active.length})</h3>

//       {active.length === 0 ? (
//         <p style={{ padding: "24px", color: "#6e6e73" }}>
//           No stop-losses set. From Holdings, set a trigger price and Vestora
//           will sell that stock automatically if it drops that far — even if
//           you're not looking at the app.
//         </p>
//       ) : (
//         <div className="order-table">
//           <table>
//             <tr>
//               <th>Instrument</th>
//               <th>Qty.</th>
//               <th>Trigger price</th>
//               <th>Current price</th>
//               <th></th>
//             </tr>
//             {active.map((p) => {
//               const price = currentPriceOf(p.name);
//               const nearTrigger = price !== undefined && price <= p.triggerPrice;
//               return (
//                 <tr key={p._id}>
//                   <td>{p.name}</td>
//                   <td>{p.qty}</td>
//                   <td>{p.triggerPrice.toFixed(2)}</td>
//                   <td className={nearTrigger ? "loss" : ""}>
//                     {price !== undefined ? price.toFixed(2) : "—"}
//                   </td>
//                   <td>
//                     <button
//                       style={{
//                         padding: "4px 12px",
//                         borderRadius: "6px",
//                         background: "#f0f0f0",
//                         border: "1px solid #ccc",
//                       }}
//                       onClick={() => handleCancel(p._id)}
//                     >
//                       Cancel
//                     </button>
//                   </td>
//                 </tr>
//               );
//             })}
//           </table>
//         </div>
//       )}

//       {history.length > 0 && (
//         <>
//           <h3 className="title" style={{ marginTop: 24 }}>
//             History
//           </h3>
//           <div className="order-table">
//             <table>
//               <tr>
//                 <th>Instrument</th>
//                 <th>Qty.</th>
//                 <th>Trigger price</th>
//                 <th>Status</th>
//               </tr>
//               {history.map((p) => (
//                 <tr key={p._id}>
//                   <td>{p.name}</td>
//                   <td>{p.qty}</td>
//                   <td>{p.triggerPrice.toFixed(2)}</td>
//                   <td className={p.status === "triggered" ? "loss" : ""}>
//                     {p.status === "triggered" ? "Sold — stop-loss hit" : "Cancelled"}
//                   </td>
//                 </tr>
//               ))}
//             </table>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default Positions;



import React, { useState, useEffect, useContext, useCallback } from "react";
import api from "../../utils/api";
import GeneralContext from "./GeneralContext";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  const { refreshTrigger, triggerRefresh } = useContext(GeneralContext);

  const colors = {
    green: "#174F3D",
    red: "#511A1A",
    grey: "#CCCCCC",
    white: "#FFFFFF",
  };

  const load = useCallback(async () => {
    try {
      const [positionsRes, holdingsRes] = await Promise.all([
        api.get("/allPositions"),
        api.get("/allHoldings"),
      ]);

      setPositions(positionsRes.data);
      setHoldings(holdingsRes.data);
    } catch (error) {
      console.error("Error fetching positions:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();

    const interval = setInterval(load, 5000);

    return () => clearInterval(interval);
  }, [load, refreshTrigger]);

  const currentPriceOf = (name) => {
    return holdings.find((h) => h.name === name)?.price;
  };

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleCancel = async (id) => {
    try {
      setCancellingId(id);

      await api.delete(`/position/${id}`);

      await load();
      triggerRefresh();
    } catch (error) {
      console.error("Error cancelling stop-loss:", error);
      alert(
        error.response?.data?.message ||
        "Unable to cancel stop-loss. Please try again."
      );
    } finally {
      setCancellingId(null);
    }
  };

  const active = positions.filter((p) => p.status === "active");
  const history = positions.filter((p) => p.status !== "active");

  const headingStyle = {
    color: colors.green,
    fontFamily: "Georgia, serif",
    fontSize: "clamp(2rem, 4vw, 3.2rem)",
    fontWeight: 400,
  };

  const tableStyle = {
    minWidth: "700px",
    color: colors.green,
    marginBottom: 0,
  };

  const thStyle = {
    color: colors.green,
    fontSize: "0.85rem",
    fontWeight: 700,
    textTransform: "uppercase",
    padding: "16px 20px",
    borderBottom: `2px solid ${colors.green}`,
    whiteSpace: "nowrap",
  };

  const tdStyle = {
    color: colors.green,
    padding: "16px 20px",
    borderBottom: "2px solid #D0D0D0",
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  };

  return (
    <div
      className="container-fluid py-3 py-md-4"
      style={{
        color: colors.green,
        minHeight: "100vh",
      }}
    >
      {/* Heading */}
      <div className="mb-4 mb-md-5">
        <h1 className="mb-3" style={headingStyle}>
          Positions ({active.length})
        </h1>

        <p
          className="mb-0"
          style={{
            color: colors.green,
            fontSize: "1rem",
            lineHeight: 1.7,
            maxWidth: "850px",
          }}
        >
          A stop-loss sells a stock for you if its price falls to the
          trigger. It runs even when you are not looking.
        </p>
      </div>

      {/* Active Positions */}
      {loading ? (
        <p style={{ color: colors.green }}>Loading positions...</p>
      ) : active.length === 0 ? (
        <div
          className="p-4 rounded-4 mb-5"
          style={{
            backgroundColor: colors.grey,
            color: colors.green,
          }}
        >
          <h5>No active stop-losses</h5>
          <p className="mb-0">
            Set a stop-loss from your Holdings page to protect your
            investments.
          </p>
        </div>
      ) : (
        <div className="table-responsive mb-5">
          <table className="table align-middle" style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Instrument</th>
                <th style={thStyle}>Qty.</th>
                <th style={thStyle}>Trigger price</th>
                <th style={thStyle}>Current price</th>
                <th style={thStyle}></th>
              </tr>
            </thead>

            <tbody>
              {active.map((position) => {
                const price = currentPriceOf(position.name);
                const nearTrigger =
                  price !== undefined && price <= position.triggerPrice;

                return (
                  <tr key={position._id}>
                    <td style={tdStyle} className="fw-semibold">
                      {position.name}
                    </td>

                    <td style={tdStyle}>{position.qty}</td>

                    <td style={tdStyle}>
                      {formatPrice(position.triggerPrice)}
                    </td>

                    <td
                      style={{
                        ...tdStyle,
                        color: nearTrigger ? colors.red : colors.green,
                        fontWeight: nearTrigger ? 700 : 500,
                      }}
                    >
                      {price !== undefined ? formatPrice(price) : "—"}
                      {nearTrigger && (
                        <span className="ms-2" title="Trigger reached">
                          ⚠
                        </span>
                      )}
                    </td>

                    <td style={tdStyle}>
                      <button
                        type="button"
                        className="btn btn-sm rounded-pill px-3"
                        disabled={cancellingId === position._id}
                        onClick={() => handleCancel(position._id)}
                        style={{
                          color: colors.green,
                          backgroundColor: "transparent",
                          border: `2px solid ${colors.green}`,
                          fontWeight: 600,
                          minWidth: "90px",
                          opacity:
                            cancellingId === position._id ? 0.6 : 1,
                        }}
                      >
                        {cancellingId === position._id
                          ? "Cancelling..."
                          : "Cancel"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* History */}
      {history.length > 0 && (
        <div className="mt-4 mt-md-5">
          <h2
            className="mb-4"
            style={{
              color: colors.green,
              fontFamily: "Georgia, serif",
              fontSize: "clamp(1.7rem, 3vw, 2.3rem)",
            }}
          >
            History
          </h2>

          <div className="table-responsive">
            <table className="table align-middle" style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Instrument</th>
                  <th style={thStyle}>Qty.</th>
                  <th style={thStyle}>Trigger price</th>
                  <th style={thStyle}>Status</th>
                </tr>
              </thead>

              <tbody>
                {history.map((position) => {
                  const isTriggered = position.status === "triggered";

                  return (
                    <tr key={position._id}>
                      <td style={tdStyle} className="fw-semibold">
                        {position.name}
                      </td>

                      <td style={tdStyle}>{position.qty}</td>

                      <td style={tdStyle}>
                        {formatPrice(position.triggerPrice)}
                      </td>

                      <td
                        style={{
                          ...tdStyle,
                          fontWeight: 600,
                          color: isTriggered ? colors.red : colors.green,
                        }}
                      >
                        {isTriggered ? "Triggered — Sold" : "Cancelled"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Positions;
