import React from "react";
import { useNavigate } from "react-router-dom";

function OpenAccount() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="row text-center my-5 px-3 px-md-5">
        <div className="col-12">
          <h1 className="fs-2 mb-4" style={{ color: "#174D38" }}>
            Open a Vestora account
          </h1>
          <p className="mb-4 mb-md-5" style={{ color: "#333333" }}>
            A virtual ₹1,00,000 wallet, real-world stocks, and nothing to
            pay — ever.
          </p>

          <button
            className="btn px-4 py-2 fs-5 custom-signup-btn"
            onClick={() => navigate("/signup")}
          >
            Sign up for free
          </button>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;
