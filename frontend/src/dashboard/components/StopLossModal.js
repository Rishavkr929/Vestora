import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../utils/api";
import "./BuyActionWindow.css";

const StopLossModal = ({ holding, onClose, onSaved }) => {
  const [qty, setQty] = useState(holding.qty);
  const [triggerPrice, setTriggerPrice] = useState(
    holding.price ? +(holding.price * 0.95).toFixed(2) : 0
  );
  const [submitting, setSubmitting] = useState(false);

  const handleConfirm = async () => {
    setSubmitting(true);
    try {
      const res = await api.post("/newPosition", {
        name: holding.name,
        qty,
        triggerPrice,
      });
      toast.success("Stop-loss set — this sells automatically if the price drops that far.");
      onSaved(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not set that stop-loss.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="buy-container" id="buy-window" draggable="true">
      <div
        className="buy-header"
        style={{ marginBottom: "20px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}
      >
        <h3 style={{ margin: 0, color: "#444", fontSize: "16px" }}>
          Stop-loss on <span style={{ color: "#387ed1" }}>{holding.name}</span>
        </h3>
        <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#9b9b9b" }}>
          Sells automatically if the price drops to or below your trigger.
        </p>
      </div>

      <div className="buy-regular-order">
        <div className="buy-inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              min="1"
              max={holding.qty}
              value={qty}
              onChange={(e) =>
                setQty(Math.max(1, Math.min(holding.qty, Number(e.target.value))))
              }
            />
          </fieldset>
          <fieldset>
            <legend>Trigger price</legend>
            <input
              type="number"
              step="0.05"
              value={triggerPrice}
              onChange={(e) => setTriggerPrice(Number(e.target.value))}
            />
          </fieldset>
        </div>
      </div>

      <div className="buy-buttons">
        <span style={{ fontSize: "12px", color: "#666" }}>
          Current price <strong style={{ color: "#222" }}>₹{holding.price?.toFixed(2)}</strong>
        </span>
        <div>
          <Link className="buy-btn btn-blue" onClick={submitting ? undefined : handleConfirm}>
            {submitting ? "Setting…" : "Set stop-loss"}
          </Link>
          <Link to="" className="buy-btn btn-grey" onClick={onClose}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StopLossModal;
