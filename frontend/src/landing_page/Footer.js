// import React from "react";

// function Footer() {
//   return (
//     <div className="container-fluid border-top mt-5" style={{background: "#174D38"}}>
//       <div className="row footer-main">
//         <div className="col-12 col-md-6 col-lg-3 footer-brand">
//           <img src="media/image/vestora.png" className="footer-logo" alt="Vestora" />
//           <p>
//             A free platform for practicing investing.
//             <br />
//             Not a real brokerage — no real money involved.
//           </p>
//         </div>
//         <div className="col-12 col-sm-6 col-lg-3 footer-link">
//           <p>Vestora</p>
//           <a href="/about">About</a>
//           <br />
//           <a href="/products">How it works</a>
//           <br />
//           <a href="https://github.com/Rishavkr929" target="_blank" rel="noreferrer">
//             Open source
//           </a>
//           <br />
//         </div>
//         <div className="col-12 col-sm-6 col-lg-3 footer-link">
//           <p>Support</p>
//           <a href="/support">Help center</a>
//           <br />
//           <a href="/support">Report a problem</a>
//           <br />
//           <a href="mailto:support@vestora.com">Contact us</a>
//           <br />
//         </div>
//         <div className="col-12 col-sm-6 col-lg-3 footer-link">
//           <p>Your account</p>
//           <a href="/signup">Create an account</a>
//           <br />
//           <a href="/dashboard/funds">Reset practice wallet</a>
//           <br />
//           <a href="/support">Delete my account</a>
//           <br />
//         </div>
//         <div className="col-12 footer-legal">
//           <p>
//             Vestora is a practice-investing simulator built for learning. It is
//             not a registered stock broker, investment adviser, or financial
//             institution, and it does not execute trades on any real exchange
//             or handle real money. All prices, holdings, and wallet balances
//             shown on Vestora are simulated for educational purposes only.
//           </p>
//           <p>
//             Nothing on this site is financial advice or a recommendation to
//             buy or sell any real security. If you're making real investment
//             decisions, please do your own research or speak with a licensed
//             financial adviser.
//           </p>
//         </div>
//         <div className="col-12 footer-bottom-links">
//           <a href="/support" style={{ textDecoration: "none", fontSize: "14px" }} className="m-3 text-muted">
//             Terms & conditions
//           </a>
//           <a href="/support" style={{ textDecoration: "none", fontSize: "14px" }} className="m-3 text-muted">
//             Privacy policy
//           </a>
//           <a href="/support" style={{ textDecoration: "none", fontSize: "14px" }} className="m-3 text-muted">
//             Disclaimer
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Footer;



import React from "react";

function Footer() {
  return (
    <footer
      className="container-fluid mt-5 py-5"
      style={{ backgroundColor: "#174D38", color: "#e5e5e5" }}
    >
      <div className="container">

        {/* Main Footer */}
        <div className="row justify-content-between px-md-4 pb-5">

          {/* Brand */}
          <div className="col-12 col-md-8 col-lg-6 mb-4 mb-md-0">
            <h2
              className="mb-3"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "40px",
                fontWeight: "normal",
                color: "#f1f1ed"
              }}
            >
              Vestora
            </h2>

            <p
              className="mb-0"
              style={{
                fontSize: "18px",
                lineHeight: "1.8",
                color: "#c9d2cd",
                maxWidth: "620px"
              }}
            >
              A practice simulator for first-time investors.
              Vestora uses virtual money, is not a licensed broker,
              and does not give investment advice.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-12 col-md-auto">
            <div className="d-flex flex-column gap-3">

              <a href="/products" className="text-decoration-none text-light fs-5">
                How it works
              </a>

              <a href="/pricing" className="text-decoration-none text-light fs-5">
                Pricing
              </a>

              <a href="/about" className="text-decoration-none text-light fs-5">
                About
              </a>

              <a href="/support" className="text-decoration-none text-light fs-5">
                Support
              </a>

              <a href="/signup" className="text-decoration-none text-light fs-5">
                Sign up
              </a>

            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="border-top pt-4 px-md-4">
          <p
            className="mb-0"
            style={{
              fontSize: "18px",
              lineHeight: "1.7",
              color: "#c9d2cd"
            }}
          >
            Built by students of Guru Tegh Bahadur Institute of
            Technology as a B.Tech minor project. Market data may
            be delayed or unavailable.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;


