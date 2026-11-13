// import React from "react";

// function Hero() {
//   return (
//     <div className="container">
//       <div className="row p-5 mt-5 border-bottom text-center">
//         <h1 className="fs-3">Pricing</h1>
//         <h4 className=" mt-3 fs-5">
//           There isn't any — it's practice money
//         </h4>
//       </div>

//       <div className="row text-center p-5 m-5">
//         <div className="col-4 p-5">
//           <img src="media/image/pricing0.svg" alt="" />
//           <h1 className="fs-3">₹0 on every order</h1>
//           <p className=" px-2 mt-4">
//             Vestora isn't a licensed broker, so there's no brokerage to
//             charge — buy and sell as often as you like.
//           </p>
//         </div>
//         <div className="col-4 p-5">
//           <img src="media/image/pricing0.svg" alt="" />
//           <h1 className="fs-3">No account fees</h1>
//           <p className=" px-2 mt-4">
//             No annual maintenance charges, no minimum balance, and nothing
//             deducted from your practice wallet.
//           </p>
//         </div>
//         <div className="col-4 p-5">
//           <img src="media/image/pricing0.svg" alt="" />
//           <h1 className="fs-2">Reset anytime</h1>
//           <p className=" px-2 mt-4">
//             Made a mistake or want a clean slate? Your practice wallet can be
//             reset back to ₹1,00,000 whenever you want.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Hero;



import React from "react";

function Hero() {
  return (
    <>
      <style>{`
        .pricing-hero {
          min-height: 650px;
          padding: 0 100px
        }

        .pricing-label {
          color: #672b30;
          font-size: 23px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .pricing-heading {
          color: #07563e;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(38px, 4vw, 68px);
          font-weight: 400;
          line-height: 1.05;
        }

        .pricing-description {
          color: #07563e;
          font-size: clamp(17px, 1.5vw, 25px);
          line-height: 1.5;
          max-width: 1050px;
        }

        @media (max-width: 768px) {
          .pricing-hero {
            min-height: 550px;
          }

          .pricing-heading {
            font-size: 55px;
          }

          .pricing-description {
            font-size: 21px;
          }
        }

        @media (max-width: 576px) {
          .pricing-hero {
            min-height: 500px;
          }

          .pricing-label {
            font-size: 16px;
          }

          .pricing-heading {
            font-size: 40px;
            line-height: 1.12;
          }

          .pricing-description {
            font-size: 17px;
          }
        }

        @media (max-width: 375px) {
          .pricing-heading {
            font-size: 34px;
          }
        }
      `}</style>

      <section className="pricing-hero container-fluid d-flex align-items-center  px-5 px-md-5 px-lg-5 py-5">
        <div className="container-fluid px-4 px-md-5 px-lg-5">

          <div className="row">
            <div className="col-12">

              <h5 className="pricing-label mb-4">
                PRICING
              </h5>

              <h1 className="pricing-heading mb-4 mb-md-5">
                Free, because nothing real is at stake.
              </h1>

              <p className="pricing-description mb-0">
                There are no brokerage charges, no account fees and no hidden
                costs. Every trade on Vestora uses virtual money.
              </p>

            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default Hero;
