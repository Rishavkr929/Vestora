import React from "react";

function Stats() {
  return (
    <div className="container p-3">
      <div className="row p-3 p-md-5">
        <div className="col-12 col-md-6 p-3 p-md-5">
          <h1 className="fs-3 mb-4 mb-md-5">Invest with confidence</h1>
          <h2 className="fs-4">Simple and user-focused</h2>
          <p className="text-muted mb-4">
            A clean and intuitive platform designed to make exploring stocks and
            investments simple
          </p>
          <h2 className="fs-4">No spam or gimmicks</h2>
          <p className="text-muted mb-4">
            A distraction-free experience without unnecessary notifications or
            complicated features.
          </p>
          <h2 className="fs-4">Everything in one place</h2>
          <p className="text-muted mb-4">
            Track stocks, manage your watchlist, and monitor your portfolio from
            a single platform.
          </p>
          <h2 className="fs-4">Learn and grow</h2>
          <p className="text-muted mb-0">
            Explore the basics of investing through a simple platform built for
            learning and experimentation.
          </p>
        </div>
        <div className="col-12 col-md-6 p-3 p-md-0 mt-4 mt-md-0">
          <img src="media/image/ecosystem2.png" className="img-fluid w-100" />
          <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mt-4 text-center">
            <a href="/products" className="text-decoration-none" >
              Explore our products{" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
            <a href="/signup" className="text-decoration-none">
              Try the live demo{" "}
              <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;
