import React from "react";

function Pricing() {
  return (
    <div className="container mb-5">
      <div className="row p-3 p-md-5 align-items-center">
        <div className="col-12 col-lg-5 px-3 px-md-4 px-lg-5 mb-5 mb-lg-0">
          <h1 className="mb-4 fs-3">Free, because it's practice money</h1>

          <p className="text-muted">
            There's no brokerage, no account minimums, and nothing to pay —
            Vestora isn't a real brokerage, so there's nothing to charge you
            for.
          </p>

          <a href="/pricing" className="text-decoration-none">
            See how it works{" "}
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>

        <div className="d-none d-lg-block col-lg-1"></div>

        <div className="col-12 col-lg-6">
          <div className="row text-center g-3">
            <div className="col-12 col-sm-6">
              <div className="border p-4 h-100">
                <h1 className="mb-3">
                  <i class="fa fa-inr" aria-hidden="true"></i>0
                </h1>
                <p className="mb-0">
                  On every buy and sell
                  <br className="d-none d-sm-block"></br> order, always
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-6">
              <div className="border p-4 h-100">
                <h1 className="mb-3">1,00,000</h1>
                <p className="mb-0">Practice wallet to start with</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
