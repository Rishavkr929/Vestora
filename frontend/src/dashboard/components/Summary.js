import React, { useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../../utils/api";
import GeneralContext from "./GeneralContext";

// Compact "3.74k" style formatting, matching the rest of the dashboard.
function compact(n) {
  const abs = Math.abs(n);
  if (abs >= 100000) return (n / 100000).toFixed(2) + "L";
  if (abs >= 1000) return (n / 1000).toFixed(2) + "k";
  return n.toFixed(2);
}

const Summary = () => {
  const [userName, setUserName] = useState("User");
  const [walletBalance, setWalletBalance] = useState(0);
  const [holdings, setHoldings] = useState([]);
  const { refreshTrigger } = useContext(GeneralContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        let nameToDisplay = decoded.name || decoded.email || "User";
        if (nameToDisplay.includes("@")) nameToDisplay = nameToDisplay.split("@")[0];
        setUserName(nameToDisplay.charAt(0).toUpperCase() + nameToDisplay.slice(1));
      } catch (err) {
        console.error("Error decoding token in Summary component:", err);
      }
    }
  }, []);

  useEffect(() => {
    api.get("/api/auth/me").then((res) => setWalletBalance(res.data.walletBalance));
    api.get("/allHoldings").then((res) => setHoldings(res.data));
  }, [refreshTrigger]);

  const investment = holdings.reduce((sum, s) => sum + s.avg * s.qty, 0);
  const currentValue = holdings.reduce((sum, s) => sum + s.price * s.qty, 0);
  const pnl = currentValue - investment;
  const pnlPct = investment ? (pnl / investment) * 100 : 0;
  const pnlClass = pnl >= 0 ? "profit" : "loss";

  return (
    <>
      <div className="username">
        <h6>Hi, {userName}!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>
            <i className="fa fa-clock-o" aria-hidden="true"></i> Wallet
          </p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{compact(walletBalance)}</h3>
            <p>Available balance</p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>
            <i className="fa fa-credit-card" aria-hidden="true"></i> Holdings ({holdings.length})
          </p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={pnlClass}>
              {compact(pnl)} <small>({pnlPct.toFixed(2)}%)</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>{compact(currentValue)}</span>{" "}
            </p>
            <p>
              Investment <span>{compact(investment)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
