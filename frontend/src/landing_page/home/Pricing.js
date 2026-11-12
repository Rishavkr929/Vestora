// import React from "react";

// function Pricing() {
//   return (
//     <div className="container mb-5">
//       <div className="row p-3 p-md-5 align-items-center">
//         <div className="col-12 col-lg-5 px-3 px-md-4 px-lg-5 mb-5 mb-lg-0">
//           <h1 className="mb-4 fs-3">Free, because it's practice money</h1>

//           <p className="text-muted">
//             There's no brokerage, no account minimums, and nothing to pay —
//             Vestora isn't a real brokerage, so there's nothing to charge you
//             for.
//           </p>

//           <a href="/pricing" className="text-decoration-none">
//             See how it works{" "}
//             <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
//           </a>
//         </div>

//         <div className="d-none d-lg-block col-lg-1"></div>

//         <div className="col-12 col-lg-6">
//           <div className="row text-center g-3">
//             <div className="col-12 col-sm-6">
//               <div className="border p-4 h-100">
//                 <h1 className="mb-3">
//                   <i class="fa fa-inr" aria-hidden="true"></i>0
//                 </h1>
//                 <p className="mb-0">
//                   On every buy and sell
//                   <br className="d-none d-sm-block"></br> order, always
//                 </p>
//               </div>
//             </div>
//             <div className="col-12 col-sm-6">
//               <div className="border p-4 h-100">
//                 <h1 className="mb-3">1,00,000</h1>
//                 <p className="mb-0">Practice wallet to start with</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Pricing;



import React from "react";

function Pricing() {
  const features = [
    {
      title: "Stop-loss Positions",
      description:
        "Choose a price. If a stock falls to it, Vestora sells for you.",
      style: "light"
    },
    {
      title: "Trade journal",
      description:
        "Say why you bought: trending, a tip, research or just trying. See which reason earns or loses.",
      style: "light"
    },
    {
      title: "Watchlist of 50",
      description:
        "Star your favourites from the full stock list and open a chart in one click.",
      style: "light"
    },
    {
      title: "Trend view, not predictions",
      description:
        "Moving averages and past changes, clearly labelled as history.",
      style: "light"
    },
    {
      title: "Glossary",
      description:
        "Plain-language meanings for stock-market terms, without leaving the app.",
      style: "green"
    }
  ];

  return (
    <section
      className="container-fluid py-5"
      style={{
        // backgroundColor: "#000000",
        color: "#174D38", 
        paddingLeft: "100px",
    paddingRight: "100px",
      }}
    >
      <div
        className="container-fluid"
        style={{
          width: "92%",
          maxWidth: "1650px",
          margin: "auto"
        }}
      >

        {/* Section Heading */}
        <div className="mb-5">

          <p
            className="fw-bold mb-3"
            style={{
              color: "#6b2828",
              fontSize: "16px",
              letterSpacing: "1px"
            }}
          >
            FEATURES
          </p>

          <h1
            className="mb-0"
            style={{
              fontFamily: "'Bodoni Moda', Georgia, serif",
              fontSize: "clamp(40px, 4vw, 60px)",
              fontWeight: "400",
              lineHeight: "1.2",
              letterSpacing: "-2px",
              color: "#174D38"
            }}
          >
            Built to teach, not to hurry you.
          </h1>

        </div>

        {/* Feature Cards */}
        <div className="row g-4">

          {/* Highlighted Mistake Detector */}
          <div className="col-12 col-lg-8">
            <div
              className="h-100 p-4 p-md-5"
              style={{
                backgroundColor: "#501a18",
                borderRadius: "28px",
                minHeight: "280px",
                color: "#f5f5f5"
              }}
            >
              <p
                className="fw-bold mb-3"
                style={{
                  color: "#d8c5c5",
                  fontSize: "15px",
                  letterSpacing: "1px"
                }}
              >
                MISTAKE DETECTOR
              </p>

              <h2
                className="mb-3"
                style={{
                  fontFamily: "'Bodoni Moda', Georgia, serif",
                  fontSize: "clamp(25px, 2.5vw, 40px)",
                  fontWeight: "400",
                  lineHeight: "1.3"
                }}
              >
                It tells you what you did wrong, kindly.
              </h2>

              <p
                className="mb-0"
                style={{
                  color: "#d8d0ce",
                  fontSize: "19px",
                  lineHeight: "1.6"
                }}
              >
                Three common errors are flagged automatically:
                too much in one stock, holdings with no stop-loss,
                and panic-selling a few days after buying at a loss.
              </p>
            </div>
          </div>

          {/* Remaining Feature Cards */}
          {features.map((feature) => (
            <div
              className="col-12 col-md-6 col-lg-4"
              key={feature.title}
            >
              <div
                className="h-100 p-4 p-md-5"
                style={{
                  backgroundColor:
                    feature.style === "green"
                      ? "#174D38"
                      : "#cccccc",

                  color:
                    feature.style === "green"
                      ? "#f5f5f5"
                      : "#174D38",

                  borderRadius: "28px",
                  minHeight: "215px"
                }}
              >
                <h3
                  className="fw-semibold mb-3"
                  style={{
                    fontSize: "25px",
                    lineHeight: "1.3"
                  }}
                >
                  {feature.title}
                </h3>

                <p
                  className="mb-0"
                  style={{
                    fontSize: "19px",
                    lineHeight: "1.6",
                    color:
                      feature.style === "green"
                        ? "#c9d2cd"
                        : "#174D38"
                  }}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Pricing;
