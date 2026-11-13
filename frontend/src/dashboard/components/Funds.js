// import React, { useState, useEffect, useContext } from "react";
// import api from "../../utils/api";
// import GeneralContext from "./GeneralContext";

// const Funds = () => {
//   const [walletBalance, setWalletBalance] = useState(0);
//   const [investedAmount, setInvestedAmount] = useState(0);
//   const [currentValue, setCurrentValue] = useState(0);
//   const { refreshTrigger } = useContext(GeneralContext);

//   useEffect(() => {
//     api.get("/api/auth/me").then((res) => setWalletBalance(res.data.walletBalance));
//     api.get("/allHoldings").then((res) => {
//       const holdings = res.data;
//       setInvestedAmount(holdings.reduce((sum, s) => sum + s.avg * s.qty, 0));
//       setCurrentValue(holdings.reduce((sum, s) => sum + s.price * s.qty, 0));
//     });
//   }, [refreshTrigger]);

//   const netWorth = walletBalance + currentValue;

//   return (
//     <>
//       <div className="funds">
//         <p>This is practice money — there's nothing to actually deposit or withdraw.</p>
//       </div>

//       <div className="order-row">
//         <div className="order-col">
//           <span>
//             <p>Wallet</p>
//           </span>

//           <div className="table">
//             <div className="data">
//               <p>Available balance</p>
//               <p className="imp colored">₹{walletBalance.toFixed(2)}</p>
//             </div>
//             <div className="data">
//               <p>Invested amount</p>
//               <p className="imp">₹{investedAmount.toFixed(2)}</p>
//             </div>
//             <div className="data">
//               <p>Current value of holdings</p>
//               <p className="imp">₹{currentValue.toFixed(2)}</p>
//             </div>
//             <hr />
//             <div className="data">
//               <p>Total net worth</p>
//               <p>₹{netWorth.toFixed(2)}</p>
//             </div>
//             <div className="data">
//               <p>Starting balance</p>
//               <p>₹1,00,000.00</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Funds;



import React, { useState, useEffect, useContext } from "react";
import api from "../../utils/api";
import GeneralContext from "./GeneralContext";

const Funds = () => {
  const [walletBalance, setWalletBalance] = useState(0);
  const [investedAmount, setInvestedAmount] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);

  const { refreshTrigger } = useContext(GeneralContext);

  const green = "#174D3C";

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const userRes = await api.get("/api/auth/me");
        setWalletBalance(userRes.data.walletBalance || 0);

        const holdingsRes = await api.get("/allHoldings");
        const holdings = holdingsRes.data || [];

        setInvestedAmount(
          holdings.reduce((sum, s) => sum + s.avg * s.qty, 0)
        );

        setCurrentValue(
          holdings.reduce((sum, s) => sum + s.price * s.qty, 0)
        );
      } catch (err) {
        console.error("Error fetching funds:", err);
      }
    };

    fetchFunds();
  }, [refreshTrigger]);

  const netWorth = walletBalance + currentValue;

  const formatPrice = (price) => {
    return Number(price || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const dataStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    padding: "17px 0",
    borderBottom: `2px solid ${green}`,
    fontSize: "16px",
    fontWeight: "500",
    color: green,
  };

  const labelStyle = {
    margin: 0,
  };

  const valueStyle = {
    margin: 0,
    textAlign: "right",
    whiteSpace: "nowrap",
    fontVariantNumeric: "tabular-nums",
  };

  return (
    <div
      className="container-fluid p-0"
      style={{
        width: "100%",
        color: green,
        fontFamily: "inherit",
      }}
    >
      {/* PAGE HEADING */}
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
          Funds
        </h1>
      </div>

      {/* INFORMATION BANNER */}
      <div
        className="mb-4"
        style={{
          backgroundColor: "#D0D0D0",
          color: green,
          borderRadius: "25px",
          padding: "20px 34px",
          fontSize: "16px",
          fontWeight: "500",
        }}
      >
        This is practice money. There is nothing to deposit or withdraw.
      </div>

      {/* FUNDS DETAILS */}
      <div className="row">
        <div className="col-12 col-lg-8">
          <div style={{ width: "100%" }}>

            <div style={dataStyle}>
              <p style={labelStyle}>Available balance</p>
              <p style={valueStyle}>
                ₹{formatPrice(walletBalance)}
              </p>
            </div>

            <div style={dataStyle}>
              <p style={labelStyle}>Invested amount</p>
              <p style={valueStyle}>
                ₹{formatPrice(investedAmount)}
              </p>
            </div>

            <div style={dataStyle}>
              <p style={labelStyle}>Current value of holdings</p>
              <p style={valueStyle}>
                ₹{formatPrice(currentValue)}
              </p>
            </div>

            <div style={dataStyle}>
              <p style={labelStyle}>Total net worth</p>
              <p style={valueStyle}>
                ₹{formatPrice(netWorth)}
              </p>
            </div>

            <div style={dataStyle}>
              <p style={labelStyle}>Starting balance</p>
              <p style={valueStyle}>
                ₹1,00,000.00
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Funds;

