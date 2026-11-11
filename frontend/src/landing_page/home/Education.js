import React from "react";

function Education() {
  return (
    <div className="container mt-5 mb-5 p-3">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 p-3 p-md-5 text-center">
          <img src="media/image/education.svg" className="img-fluid w-75 w-md-60" alt="" />
        </div>

        <div className="col-12 col-md-6 p-3 p-md-5">
          <h1 className="mb-4 fs-3">Learn by actually doing it</h1>

          <p className="text-muted">
            The best way to understand investing is to watch a position move
            and feel what that's like. Vestora skips the theory-only lessons
            and lets you learn from your own (virtual) portfolio instead.
          </p>

          <a href="/products" className="text-decoration-none">
            See how it works{" "}
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>

          <p className="mt-5 text-muted">
            Have a question about how a feature works, or found something
            confusing? Our support center walks through the basics of
            watchlists, orders, holdings, and your wallet.
          </p>

          <a href="/support" className="text-decoration-none">
            Visit support <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Education;
