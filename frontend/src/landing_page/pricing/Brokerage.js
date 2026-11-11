import React from "react";

function Brokerage() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 text-center border-top">
        <div className="col-12 col-lg-8 p-4 mx-auto text-start">
          <h3 className="fs-5 text-center mb-4">A few honest questions</h3>
          <ul
            style={{ textAlign: "left", lineHeight: "2.5", fontSize: "0.9rem" }}
            className=" mt-4"
          >
            <li>
              <strong>Is this real money?</strong> No — every account starts
              with a virtual ₹1,00,000 wallet. Nothing you do on Vestora
              touches a real bank account or a real exchange.
            </li>
            <li>
              <strong>Are the stock prices real?</strong> Prices are modeled
              on real-world stocks and move the way real markets do, so what
              you practice on feels genuine.
            </li>
            <li>
              <strong>Is Vestora a registered broker?</strong> No. Vestora is
              a learning tool, not a brokerage, and it isn't regulated as one.
            </li>
            <li>
              <strong>Will I ever be charged anything?</strong> No — there's
              no brokerage, no subscription, and no hidden fee anywhere on
              the platform.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
