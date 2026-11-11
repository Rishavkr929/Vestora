import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container border-bottom mb-5">
      <div class="text-center mt-4 mt-md-5 py-4 py-md-3 px-3">
        <h1 className="fs-3">How Vestora works</h1>

        <h3 class="text my-3 fs-4">
          One simple app for practicing the whole investing loop
        </h3>

        <p className="mt-3 mb-4 mb-md-5">
          <Link to="/" className=" text-decoration-none">
            Back to Vestora&nbsp;
            <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Hero;
