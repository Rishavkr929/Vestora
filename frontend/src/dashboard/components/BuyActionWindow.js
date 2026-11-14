// import React, { useContext, useState } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";

// import api from "../../utils/api";
// import GeneralContext from "./GeneralContext";
// import "./BuyActionWindow.css";

// const REASONS = [
//   { value: "trending", label: "Saw it trending" },
//   { value: "tip", label: "A tip or news" },
//   { value: "research", label: "My own research" },
//   { value: "trying_out", label: "Just trying it out" },
// ];

// const BuyActionWindow = ({ stock, mode }) => {
//   const isBuy = mode === "BUY";
//   const [stockQuantity, setStockQuantity] = useState(1);
//   const [reason, setReason] = useState("research");
//   const [submitting, setSubmitting] = useState(false);

//   const { closeActionWindow, triggerRefresh } = useContext(GeneralContext);

//   const stockPrice = stock?.price || 0;

//   const handleConfirmClick = async () => {
//     setSubmitting(true);
//     try {
//       const res = await api.post("/newOrder", {
//         name: stock?.symbol,
//         qty: stockQuantity,
//         mode,
//         ...(isBuy ? { reason } : {}),
//       });
//       toast.success(res.data.message || "Order placed");
//       triggerRefresh();
//       closeActionWindow();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Could not place that order");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleCancelClick = () => {
//     closeActionWindow();
//   };

//   const totalValue = (stockQuantity * stockPrice).toFixed(2);

//   return (
//     <div className="buy-container" id="buy-window" draggable="true">
//       <div
//         className="buy-header"
//         style={{
//           marginBottom: "20px",
//           borderBottom: "1px solid #eee",
//           paddingBottom: "10px",
//         }}
//       >
//         <h3 style={{ margin: 0, color: "#444", fontSize: "16px" }}>
//           {isBuy ? "Invest in " : "Sell "}
//           <span style={{ color: "#387ed1" }}>{stock?.name}</span>
//         </h3>
//         <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#9b9b9b" }}>
//           Live price: ₹{stockPrice.toFixed ? stockPrice.toFixed(2) : stockPrice} — orders always
//           fill at the live price, not a typed-in one.
//         </p>
//       </div>

//       <div className="buy-regular-order">
//         <div className="buy-inputs">
//           <fieldset>
//             <legend>Qty.</legend>
//             <input
//               type="number"
//               name="qty"
//               id="qty"
//               min="1"
//               onChange={(e) => setStockQuantity(Math.max(1, Number(e.target.value)))}
//               value={stockQuantity}
//             />
//           </fieldset>
//           <fieldset>
//             <legend>Price (live)</legend>
//             <input type="text" readOnly value={`₹${stockPrice.toFixed ? stockPrice.toFixed(2) : stockPrice}`} />
//           </fieldset>
//         </div>

//         {isBuy && (
//           <fieldset style={{ marginTop: "12px" }}>
//             <legend>Why are you buying this?</legend>
//             <select value={reason} onChange={(e) => setReason(e.target.value)} style={{ width: "100%", padding: "6px" }}>
//               {REASONS.map((r) => (
//                 <option key={r.value} value={r.value}>
//                   {r.label}
//                 </option>
//               ))}
//             </select>
//           </fieldset>
//         )}
//       </div>

//       <div className="buy-buttons">
//         <span style={{ fontSize: "12px", color: "#666" }}>
//           {isBuy ? "Amount required " : "You'll receive "}
//           <strong style={{ color: "#222" }}>₹{totalValue}</strong>
//         </span>
//         <div>
//           <Link
//             to=""
//             className={`buy-btn ${isBuy ? "btn-blue" : "btn-grey"}`}
//             onClick={submitting ? undefined : handleConfirmClick}
//           >
//             {submitting ? "Placing…" : isBuy ? "Invest" : "Sell"}
//           </Link>
//           <Link to="" className="buy-btn btn-grey" onClick={handleCancelClick}>
//             Cancel
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BuyActionWindow;



import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

import api from "../../utils/api";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const REASONS = [
  { value: "trending", label: "Saw it trending" },
  { value: "tip", label: "A tip or news" },
  { value: "research", label: "My own research" },
  { value: "trying_out", label: "Just trying it out" },
];

const BuyActionWindow = ({ stock, mode }) => {
  const isBuy = mode === "BUY";

  const [stockQuantity, setStockQuantity] = useState(1);
  const [reason, setReason] = useState("research");
  const [submitting, setSubmitting] = useState(false);

  const { closeActionWindow, triggerRefresh } =
    useContext(GeneralContext);

  // Watchlist stocks may use "symbol".
  // Holdings use "name".
 const stockName = stock?.symbol || stock?.name;

 const stockDisplayName =
  stock?.symbol && stock?.name
    ? stock.name
    : stockName;

  const stockPrice = Number(stock?.price) || 0;
  const availableQty = Number(stock?.qty) || 0;

  const totalValue = (stockQuantity * stockPrice).toFixed(2);

  const handleConfirmClick = async () => {
    const qty = Number(stockQuantity);

    if (!stockName) {
      toast.error("Please select a valid stock.");
      return;
    }

    if (!Number.isInteger(qty) || qty <= 0) {
      toast.error("Please enter a valid quantity.");
      return;
    }

    if (!isBuy && qty > availableQty) {
      toast.error(
        `You only have ${availableQty} shares available to sell.`
      );
      return;
    }

    setSubmitting(true);

    try {
      const res = await api.post("/newOrder", {
        name: stockName,
        qty,
        mode,
        ...(isBuy ? { reason } : {}),
      });

      toast.success(res.data.message || "Order placed successfully.");

      triggerRefresh();
      closeActionWindow();
    } catch (err) {
      console.error(
        "Order failed:",
        err.response?.data || err.message
      );

      toast.error(
        err.response?.data?.message || "Could not place that order."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="buy-container" id="buy-window">

      <div
        className="buy-header"
        style={{
          marginBottom: "20px",
          borderBottom: "1px solid #eee",
          paddingBottom: "10px",
        }}
      >
        <h3 style={{ margin: 0, color: "#444", fontSize: "16px" }}>
          {isBuy ? "Invest in " : "Sell "}
          <span style={{ color: "#387ed1" }}>
  {stockDisplayName}
</span>
        </h3>

        <p
          style={{
            margin: "5px 0 0",
            fontSize: "12px",
            color: "#9b9b9b",
          }}
        >
          Live price: ₹{stockPrice.toFixed(2)}
          {" "}— orders fill at the live price.
        </p>

        {!isBuy && (
          <p style={{ fontSize: "12px", color: "#666" }}>
            Available quantity: {availableQty}
          </p>
        )}
      </div>

      <div className="buy-regular-order">
        <div className="buy-inputs">

          <fieldset>
            <legend>Qty.</legend>

            <input
              type="number"
              name="qty"
              min="1"
              max={!isBuy ? availableQty : undefined}
              step="1"
              value={stockQuantity}
              disabled={submitting}
              onChange={(e) => {
                setStockQuantity(
                  e.target.value === ""
                    ? ""
                    : Number(e.target.value)
                );
              }}
            />
          </fieldset>

          <fieldset>
            <legend>Price (live)</legend>

            <input
              type="text"
              readOnly
              value={`₹${stockPrice.toFixed(2)}`}
            />
          </fieldset>

        </div>

        {isBuy && (
          <fieldset style={{ marginTop: "12px" }}>
            <legend>Why are you buying this?</legend>

            <select
              value={reason}
              disabled={submitting}
              onChange={(e) => setReason(e.target.value)}
              style={{ width: "100%", padding: "6px" }}
            >
              {REASONS.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </fieldset>
        )}
      </div>

      <div className="buy-buttons">

        <span style={{ fontSize: "12px", color: "#666" }}>
          {isBuy ? "Amount required " : "You'll receive "}
          <strong style={{ color: "#222" }}>
            ₹{totalValue}
          </strong>
        </span>

        <div>
          <button
            type="button"
            className={`buy-btn ${isBuy ? "btn-blue" : "btn-grey"}`}
            disabled={submitting}
            onClick={handleConfirmClick}
          >
            {submitting
              ? "Processing..."
              : isBuy
              ? "Invest"
              : "Sell"}
          </button>

          <button
            type="button"
            className="buy-btn btn-grey"
            disabled={submitting}
            onClick={closeActionWindow}
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};

export default BuyActionWindow;
