// import React from "react";

// function Brokerage() {
//   return (
//     <div className="container">
//       <div className="row p-5 mt-5 text-center border-top">
//         <div className="col-12 col-lg-8 p-4 mx-auto text-start">
//           <h3 className="fs-5 text-center mb-4">A few honest questions</h3>
//           <ul
//             style={{ textAlign: "left", lineHeight: "2.5", fontSize: "0.9rem" }}
//             className=" mt-4"
//           >
//             <li>
//               <strong>Is this real money?</strong> No — every account starts
//               with a virtual ₹1,00,000 wallet. Nothing you do on Vestora
//               touches a real bank account or a real exchange.
//             </li>
//             <li>
//               <strong>Are the stock prices real?</strong> Prices are modeled
//               on real-world stocks and move the way real markets do, so what
//               you practice on feels genuine.
//             </li>
//             <li>
//               <strong>Is Vestora a registered broker?</strong> No. Vestora is
//               a learning tool, not a brokerage, and it isn't regulated as one.
//             </li>
//             <li>
//               <strong>Will I ever be charged anything?</strong> No — there's
//               no brokerage, no subscription, and no hidden fee anywhere on
//               the platform.
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Brokerage;



import React from "react";
import { useNavigate } from "react-router-dom";

function Brokerage() {
  const navigate = useNavigate();
  return (
    <>
      <style>{`
        .brokerage-section {
          
          color: #f5f5f5;
        }

        .practice-card {
          background-color: #164f3b;
          border-radius: 35px;
          padding: 100px;
          height: 100%;
        }

        .practice-label {
          color: #d1d1d1;
          font-size: 17px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .practice-price {
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 100px;
          line-height: 1.1;
        }

        .practice-subtitle {
          color: #d1d1d1;
          font-size: 22px;
        }

        .feature-item {
          color: #f5f5f5;
          font-size: 21px;
          padding: 18px 0;
          border-bottom: 1px solid #a6b9af;
        }

        .feature-item:last-child {
          border-bottom: none;
        }

        .practice-btn {
          background-color: #f5f5f5;
          color: #164f3b;
          border: none;
          border-radius: 50px;
          padding: 18px 40px;
          font-size: 21px;
          font-weight: 600;
          transition: 0.3s;
        }

        .practice-btn:hover {
          background-color: #dce8e1;
          color: #164f3b;
        }

        .faq-card {
          background-color: #cecece;
          color: #164f3b;
          border-radius: 35px;
          padding: 45px 48px;
          flex: 1;
        }

        .faq-card h3 {
          font-size: 29px;
          font-weight: 700;
          margin-bottom: 18px;
        }

        .faq-card p {
          font-size: 22px;
          line-height: 1.65;
          margin-bottom: 0;
        }

        .faq-card.red-card {
          background-color: #521b1b;
          color: #f5f5f5;
        }

        @media (max-width: 991px) {
          .practice-card {
            padding: 40px;
          }

          .practice-price {
            font-size: 80px;
          }

          .faq-card {
            padding: 35px;
          }

          .faq-card h3 {
            font-size: 25px;
          }

          .faq-card p {
            font-size: 19px;
          }

          .feature-item {
            font-size: 18px;
          }
        }

        @media (max-width: 576px) {
          .practice-card {
            padding: 30px 24px;
            border-radius: 25px;
          }

          .practice-label {
            font-size: 14px;
          }

          .practice-price {
            font-size: 70px;
          }

          .practice-subtitle {
            font-size: 18px;
          }

          .feature-item {
            font-size: 16px;
            padding: 15px 0;
          }

          .practice-btn {
            font-size: 17px;
            padding: 14px 28px;
          }

          .faq-card {
            padding: 28px 24px;
            border-radius: 25px;
          }

          .faq-card h3 {
            font-size: 22px;
          }

          .faq-card p {
            font-size: 17px;
            line-height: 1.6;
          }
        }
      `}</style>

      <section className="brokerage-section container-fluid px-3 px-md-4 px-lg-5 py-5">

        <div className="container-fluid px-0">

          <div className="row g-4 align-items-stretch">

            {/* Left Practice Account Card */}

            <div className="col-12 col-lg-6">

              <div className="practice-card d-flex flex-column">

                <h5 className="practice-label mb-4">
                  PRACTICE ACCOUNT
                </h5>

                <h1 className="practice-price mb-3">
                  ₹0
                </h1>

                <p className="practice-subtitle mb-4">
                  Free for every learner
                </p>

                <div className="mt-3">

                  <div className="feature-item">
                    ₹1,00,000 virtual wallet
                  </div>

                  <div className="feature-item">
                    Real NSE prices for about fifty stocks
                  </div>

                  <div className="feature-item">
                    Watchlist, charts, trend view and ARIMA forecast
                  </div>

                  <div className="feature-item">
                    Stop-loss Positions
                  </div>

                  <div className="feature-item">
                    Trade journal, mistake detector and glossary
                  </div>

                </div>

                <div className="mt-4 pt-2">
                  <button className="practice-btn" onClick={() => navigate("/signup")}>
                    Create free account
                  </button>
                </div>

              </div>

            </div>

            {/* Right FAQ Cards */}

            <div className="col-12 col-lg-6">

              <div className="d-flex flex-column gap-4 h-100">

                {/* FAQ 1 */}

                <div className="faq-card d-flex flex-column justify-content-center">

                  <h3>
                    What does "virtual" mean?
                  </h3>

                  <p>
                    Your ₹1,00,000 is practice money inside Vestora.
                    You cannot deposit or withdraw real money, so you
                    can make mistakes safely.
                  </p>

                </div>

                {/* FAQ 2 */}

                <div className="faq-card d-flex flex-column justify-content-center">

                  <h3>
                    Are the prices real?
                  </h3>

                  <p>
                    Prices come from a free public data source and may
                    be delayed or briefly unavailable. They are for
                    learning, not for trading decisions.
                  </p>

                </div>

                {/* FAQ 3 */}

                <div className="faq-card red-card d-flex flex-column justify-content-center">

                  <h3>
                    Is this investment advice?
                  </h3>

                  <p>
                    No. Vestora is an educational simulator and is
                    not a licensed broker.
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>
    </>
  );
}

export default Brokerage;
