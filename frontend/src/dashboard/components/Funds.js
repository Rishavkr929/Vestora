import React, { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import GeneralContext from "./GeneralContext";

const Funds = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);
  const { refreshTrigger } = useContext(GeneralContext);

  useEffect(() => {
    api.get("/api/auth/me").then((res) => setWalletBalance(res.data.walletBalance));
    api.get("/allHoldings").then((res) => {
      const holdings = res.data;
      setInvestedAmount(holdings.reduce((sum, s) => sum + s.avg * s.qty, 0));
      setCurrentValue(holdings.reduce((sum, s) => sum + s.price * s.qty, 0));
    });
  }, [refreshTrigger]);

  const netWorth = walletBalance + currentValue;

  return (
    <>
      <div className="funds">
        <p>This is practice money — there's nothing to actually deposit or withdraw.</p>
      </div>

      <div className="order-row">
        <div className="order-col">
          <span>
            <p>Wallet</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available balance</p>
              <p className="imp colored">₹{walletBalance.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Invested amount</p>
              <p className="imp">₹{investedAmount.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Current value of holdings</p>
              <p className="imp">₹{currentValue.toFixed(2)}</p>
            </div>
            <hr />
            <div className="data">
              <p>Total net worth</p>
              <p>₹{netWorth.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Starting balance</p>
              <p>₹1,00,000.00</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
