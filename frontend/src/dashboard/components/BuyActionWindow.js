import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
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

  const { closeActionWindow, triggerRefresh } = useContext(GeneralContext);

  const stockPrice = stock?.price || 0;

  const handleConfirmClick = async () => {
    setSubmitting(true);
    try {
      const res = await api.post("/newOrder", {
        name: stock?.symbol,
        qty: stockQuantity,
        mode,
        ...(isBuy ? { reason } : {}),
      });
      toast.success(res.data.message || "Order placed");
      triggerRefresh();
      closeActionWindow();
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not place that order");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancelClick = () => {
    closeActionWindow();
  };

  const totalValue = (stockQuantity * stockPrice).toFixed(2);

  return (
    <div className="buy-container" id="buy-window" draggable="true">
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
          <span style={{ color: "#387ed1" }}>{stock?.name}</span>
        </h3>
        <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#9b9b9b" }}>
          Live price: ₹{stockPrice.toFixed ? stockPrice.toFixed(2) : stockPrice} — orders always
          fill at the live price, not a typed-in one.
        </p>
      </div>

      <div className="buy-regular-order">
        <div className="buy-inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              name="qty"
              id="qty"
              min="1"
              onChange={(e) => setStockQuantity(Math.max(1, Number(e.target.value)))}
              value={stockQuantity}
            />
          </fieldset>
          <fieldset>
            <legend>Price (live)</legend>
            <input type="text" readOnly value={`₹${stockPrice.toFixed ? stockPrice.toFixed(2) : stockPrice}`} />
          </fieldset>
        </div>

        {isBuy && (
          <fieldset style={{ marginTop: "12px" }}>
            <legend>Why are you buying this?</legend>
            <select value={reason} onChange={(e) => setReason(e.target.value)} style={{ width: "100%", padding: "6px" }}>
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
          <strong style={{ color: "#222" }}>₹{totalValue}</strong>
        </span>
        <div>
          <Link
            className={`buy-btn ${isBuy ? "btn-blue" : "btn-grey"}`}
            onClick={submitting ? undefined : handleConfirmClick}
          >
            {submitting ? "Placing…" : isBuy ? "Invest" : "Sell"}
          </Link>
          <Link to="" className="buy-btn btn-grey" onClick={handleCancelClick}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
