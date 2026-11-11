import React from "react";

function Awards() {
  return (
    <div className="container mt-5 mb-5">
      <div className="row align-items-center mx-0 mx-md-3">
        <div className="col-12 col-md-6 p-3 p-md-5 text-center">
          <img src="media/image/growth.png" className="img-fluid" alt="" />
        </div>

        <div className="col-12 col-md-6 p-3 p-md-5 mt-3 mt-md-0">
          <h1 className="fs-3" style={{ color: "#174D38" }}>
            A market to practice on, not a market to risk your savings on
          </h1>
          <p className="mb-4 mb-md-5" style={{ color: "#333333" }}>
            Vestora gives you a virtual wallet and a real spread of stocks so
            you can learn what it actually feels like to invest — buying,
            selling, watching a position move — before any of it involves
            real money.
          </p>
          <div className="row" style={{ color: "#666666" }}>
            <div className="col-12 col-sm-6">
              <ul className="mb-3 mb-sm-0">
                <li>
                  <p className="mb-2">Stocks across sectors</p>
                </li>
                <li>
                  <p className="mb-2">Real-time-style price moves</p>
                </li>
                <li>
                  <p className="mb-2">Buy and sell instantly</p>
                </li>
              </ul>
            </div>
            <div className="col-12 col-sm-6">
              <ul>
                <li>
                  <p className="mb-2">Live P&L on every holding</p>
                </li>
                <li>
                  <p className="mb-2">Average buy price tracking</p>
                </li>
                <li>
                  <p className="mb-2">A wallet that resets when you want</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;
