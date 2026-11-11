import React, { useState, useEffect, useContext } from "react";
import { VerticalGraph } from "./VerticalGraph";
import api from "../../utils/api";
import GeneralContext from "./GeneralContext";
import StopLossModal from "./StopLossModal";

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const [stopLossHolding, setStopLossHolding] = useState(null);
  const { openSellWindow, refreshTrigger, triggerRefresh } = useContext(GeneralContext);

  useEffect(() => {
    api.get("/allHoldings").then((res) => {
      setAllHoldings(res.data);
    });
  }, [refreshTrigger]);

  const labels = allHoldings.map((subArray) => subArray["name"]);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => stock.price),
        backgroundColor: "#0071e3",
      },
    ],
  };

  // Real totals computed from actual holdings instead of fixed demo numbers.
  const totalInvestment = allHoldings.reduce((sum, s) => sum + s.avg * s.qty, 0);
  const totalCurrentValue = allHoldings.reduce((sum, s) => sum + s.price * s.qty, 0);
  const totalPnl = totalCurrentValue - totalInvestment;
  const totalPnlPct = totalInvestment ? (totalPnl / totalInvestment) * 100 : 0;
  const pnlClass = totalPnl >= 0 ? "profit" : "loss";

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      {allHoldings.length === 0 ? (
        <p style={{ padding: "24px", color: "#6e6e73" }}>
          You don't own anything yet. Pick a stock in your watchlist and hit Buy to get started.
        </p>
      ) : (
        <>
          <div className="order-table">
            <table>
              <tr>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>Avg. cost</th>
                <th>LTP</th>
                <th>Cur. val</th>
                <th>P&L</th>
                <th></th>
              </tr>

              {allHoldings.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const isProfit = curValue - stock.avg * stock.qty >= 0.0;
                const profClass = isProfit ? "profit" : "loss";

                return (
                  <tr key={index}>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>
                    <td>{stock.price.toFixed(2)}</td>
                    <td>{curValue.toFixed(2)}</td>
                    <td className={profClass}>
                      {(curValue - stock.avg * stock.qty).toFixed(2)}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <button
                        className="sell"
                        style={{ padding: "4px 12px", borderRadius: "6px", marginRight: "6px" }}
                        onClick={() => openSellWindow(stock)}
                      >
                        Sell
                      </button>
                      <button
                        style={{
                          padding: "4px 12px",
                          borderRadius: "6px",
                          background: "#f0f0f0",
                          border: "1px solid #ccc",
                        }}
                        onClick={() => setStopLossHolding(stock)}
                      >
                        Stop-loss
                      </button>
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>

          <div className="order-row">
            <div className="order-col">
              <h5>₹{totalInvestment.toFixed(2)}</h5>
              <p>Total investment</p>
            </div>
            <div className="order-col">
              <h5>₹{totalCurrentValue.toFixed(2)}</h5>
              <p>Current value</p>
            </div>
            <div className="order-col">
              <h5 className={pnlClass}>
                ₹{totalPnl.toFixed(2)} ({totalPnlPct.toFixed(2)}%)
              </h5>
              <p>P&L</p>
            </div>
          </div>
          <VerticalGraph data={data} />
        </>
      )}

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
    </>
  );
};

export default Holdings;
