import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 border-bottom text-center">
        <h1 className="fs-3">Pricing</h1>
        <h4 className=" mt-3 fs-5">
          There isn't any — it's practice money
        </h4>
      </div>

      <div className="row text-center p-5 m-5">
        <div className="col-4 p-5">
          <img src="media/image/pricing0.svg" alt="" />
          <h1 className="fs-3">₹0 on every order</h1>
          <p className=" px-2 mt-4">
            Vestora isn't a licensed broker, so there's no brokerage to
            charge — buy and sell as often as you like.
          </p>
        </div>
        <div className="col-4 p-5">
          <img src="media/image/pricing0.svg" alt="" />
          <h1 className="fs-3">No account fees</h1>
          <p className=" px-2 mt-4">
            No annual maintenance charges, no minimum balance, and nothing
            deducted from your practice wallet.
          </p>
        </div>
        <div className="col-4 p-5">
          <img src="media/image/pricing0.svg" alt="" />
          <h1 className="fs-2">Reset anytime</h1>
          <p className=" px-2 mt-4">
            Made a mistake or want a clean slate? Your practice wallet can be
            reset back to ₹1,00,000 whenever you want.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
