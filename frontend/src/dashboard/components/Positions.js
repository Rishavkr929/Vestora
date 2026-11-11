import React, { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import GeneralContext from "./GeneralContext";

const Positions = () => {
  const [positions, setPositions] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const { refreshTrigger, triggerRefresh } = useContext(GeneralContext);

  const load = () => {
    api.get("/allPositions").then((res) => setPositions(res.data));
    api.get("/allHoldings").then((res) => setHoldings(res.data));
  };

  useEffect(() => {
    load();
    // The server checks (and can trigger) stop-losses every few seconds on
    // its own, so poll gently to stay in sync even if you just leave this
    // tab open.
    const interval = setInterval(load, 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]);

  const currentPriceOf = (name) => holdings.find((h) => h.name === name)?.price;

  const handleCancel = async (id) => {
    await api.delete(`/position/${id}`);
    load();
    triggerRefresh();
  };

  const active = positions.filter((p) => p.status === "active");
  const history = positions.filter((p) => p.status !== "active");

  return (
    <>
      <h3 className="title">Positions ({active.length})</h3>

      {active.length === 0 ? (
        <p style={{ padding: "24px", color: "#6e6e73" }}>
          No stop-losses set. From Holdings, set a trigger price and Vestora
          will sell that stock automatically if it drops that far — even if
          you're not looking at the app.
        </p>
      ) : (
        <div className="order-table">
          <table>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Trigger price</th>
              <th>Current price</th>
              <th></th>
            </tr>
            {active.map((p) => {
              const price = currentPriceOf(p.name);
              const nearTrigger = price !== undefined && price <= p.triggerPrice;
              return (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.qty}</td>
                  <td>{p.triggerPrice.toFixed(2)}</td>
                  <td className={nearTrigger ? "loss" : ""}>
                    {price !== undefined ? price.toFixed(2) : "—"}
                  </td>
                  <td>
                    <button
                      style={{
                        padding: "4px 12px",
                        borderRadius: "6px",
                        background: "#f0f0f0",
                        border: "1px solid #ccc",
                      }}
                      onClick={() => handleCancel(p._id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      )}

      {history.length > 0 && (
        <>
          <h3 className="title" style={{ marginTop: 24 }}>
            History
          </h3>
          <div className="order-table">
            <table>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Trigger price</th>
                <th>Status</th>
              </tr>
              {history.map((p) => (
                <tr key={p._id}>
                  <td>{p.name}</td>
                  <td>{p.qty}</td>
                  <td>{p.triggerPrice.toFixed(2)}</td>
                  <td className={p.status === "triggered" ? "loss" : ""}>
                    {p.status === "triggered" ? "Sold — stop-loss hit" : "Cancelled"}
                  </td>
                </tr>
              ))}
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Positions;
