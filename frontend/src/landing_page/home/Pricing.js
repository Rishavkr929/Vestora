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
      style: "light",
    },
    {
      title: "Trade journal",
      description:
        "Say why you bought: trending, a tip, research or just trying. See which reason earns or loses.",
      style: "light",
    },
    {
      title: "Watchlist of 50",
      description:
        "Star your favourites from the full stock list and open a chart in one click.",
      style: "light",
    },
    {
      title: "Trend view",
      description:
        "Moving averages and past changes, clearly labelled as history.",
      style: "light",
    },
    {
      title: "Glossary",
      description:
        "Plain-language meanings for stock-market terms, without leaving the app.",
      style: "light",
    },
  ];

  const cardStyle = {
    borderRadius: "26px",
    minHeight: "215px",
  };

  return (
    <section className="container-fluid py-5 px-3 px-md-4 px-lg-5">
      <div
        className="container-fluid px-5"
        style={{ maxWidth: "1600px", margin: "auto" }}
      >
        {/* Section Heading */}
        <div className="mb-5">
          <p
            className="fw-bold mb-3"
            style={{
              color: "#4d1717",
              fontSize: "15px",
              letterSpacing: "1px",
            }}
          >
            FEATURES
          </p>

          <h1
            className="mb-0"
            style={{
              fontFamily: "'Bodoni Moda', Georgia, serif",
              fontSize: "clamp(40px, 4vw, 60px)",
              fontWeight: 400,
              lineHeight: 1.2,
              letterSpacing: "-1.5px",
              color: "#174d38",
            }}
          >
            Built to teach, not to hurry you.
          </h1>
        </div>

        {/* First Row */}
        <div className="row g-3 g-lg-4 mb-3 mb-lg-4">

          {/* Mistake Detector */}
          <div className="col-12 col-lg-8">
            <div
              className="h-100 p-4 p-md-5"
              style={{
                ...cardStyle,
                backgroundColor: "#4d1717",
                color: "#f2f2f2",
              }}
            >
              <p
                className="fw-bold mb-3"
                style={{
                  color: "#cbcbcb",
                  fontSize: "15px",
                  letterSpacing: "1px",
                }}
              >
                MISTAKE DETECTOR
              </p>

              <h2
                className="mb-3"
                style={{
                  fontFamily: "'Bodoni Moda', Georgia, serif",
                  fontSize: "clamp(25px, 2.5vw, 40px)",
                  fontWeight: 400,
                  lineHeight: 1.3,
                }}
              >
                It tells you what you did wrong, kindly.
              </h2>

              <p
                className="mb-0"
                style={{
                  color: "#d8d0ce",
                  fontSize: "18px",
                  lineHeight: 1.6,
                  maxWidth: "700px",
                }}
              >
                Three common errors are flagged automatically: too much in
                one stock, holdings with no stop-loss, and panic-selling
                a few days after buying at a loss.
              </p>
            </div>
          </div>

          {/* Stop-loss */}
          <div className="col-12 col-lg-4">
            <div
              className="h-100 p-4 p-md-5"
              style={{
                ...cardStyle,
                backgroundColor: "#cbcbcb",
                color: "#174d38",
              }}
            >
              <h3 className="fw-semibold fs-4 mb-3">
                {features[0].title}
              </h3>

              <p className="mb-0 fs-5" style={{ lineHeight: 1.6 }}>
                {features[0].description}
              </p>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="row g-3 g-lg-4 mb-3 mb-lg-4">

          {/* Price Forecast */}
          <div className="col-12 col-lg-8">
            <div
              className="h-100 p-4 p-md-5"
              style={{
                ...cardStyle,
                backgroundColor: "#174d38",
                color: "#f2f2f2",
              }}
            >
              <div className="row align-items-center g-4 h-100">

                {/* Forecast Description */}
                <div className="col-12 col-md-6">
                  <p
                    className="fw-bold mb-3"
                    style={{
                      color: "#cbcbcb",
                      fontSize: "15px",
                      letterSpacing: "1px",
                    }}
                  >
                    PRICE FORECAST
                  </p>

                  <h2
                    className="mb-3"
                    style={{
                      fontFamily: "'Bodoni Moda', Georgia, serif",
                      fontSize: "clamp(27px, 2.5vw, 40px)",
                      fontWeight: 400,
                      lineHeight: 1.3,
                    }}
                  >
                    See a range, not a promise.
                  </h2>

                  <p
                    className="mb-0"
                    style={{
                      color: "#cbcbcb",
                      fontSize: "18px",
                      lineHeight: 1.6,
                    }}
                  >
                    An ARIMA model learns from two years of daily prices
                    and draws the next few weeks with a shaded range of
                    uncertainty. It can be wrong, and it says so.
                  </p>
                </div>

                {/* Forecast Chart */}
                <div className="col-12 col-md-6">
                  <div
                    className="p-3 p-md-3"
                    style={{
                      backgroundColor: "#f2f2f2",
                      color: "#174d38",
                      borderRadius: "20px",
                    }}
                  >
                    <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
                      <span className="fw-bold small">
                        SAMPLE FORECAST
                      </span>
                      <span className="fw-semibold small">
                        ARIMA · 2 years of data
                      </span>
                    </div>

                    <svg
                      viewBox="0 0 340 125"
                      width="100%"
                      role="img"
                      aria-label="Illustrative stock history and forecast chart"
                    >
                      <polygon
                        points="205,65 330,20 330,90"
                        fill="#cbcbcb"
                        opacity="0.8"
                      />

                      <polyline
                        points="0,105 28,95 55,100 82,80 110,87 138,69 165,76 192,60 220,65"
                        fill="none"
                        stroke="#174d38"
                        strokeWidth="2.8"
                      />

                      <line
                        x1="220"
                        y1="65"
                        x2="330"
                        y2="55"
                        stroke="#4d1717"
                        strokeWidth="2.8"
                        strokeDasharray="6 5"
                      />

                      <line
                        x1="220"
                        y1="15"
                        x2="220"
                        y2="108"
                        stroke="#cbcbcb"
                        strokeDasharray="3 4"
                      />

                      <line
                        x1="0"
                        y1="108"
                        x2="330"
                        y2="108"
                        stroke="#cbcbcb"
                        strokeWidth="1"
                      />
                    </svg>

                    <p
                      className="small mb-0 mt-2"
                      style={{ lineHeight: 1.4 }}
                    >
                      Solid line: history. Dashed line: forecast.
                      Shaded: range.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Trade Journal */}
          <div className="col-12 col-lg-4">
            <div
              className="h-100 p-4 p-md-5"
              style={{
                ...cardStyle,
                backgroundColor: "#cbcbcb",
                color: "#174d38",
              }}
            >
              <h3 className="fw-semibold fs-4 mb-3">
                {features[1].title}
              </h3>

              <p className="mb-0 fs-5" style={{ lineHeight: 1.6 }}>
                {features[1].description}
              </p>
            </div>
          </div>
        </div>

        {/* Third Row */}
        <div className="row g-3 g-lg-4">

          {features.slice(2).map((feature) => (
            <div className="col-12 col-md-6 col-lg-4" key={feature.title}>
              <div
                className="h-100 p-4 p-md-4"
                style={{
                  ...cardStyle,
                  backgroundColor: "#cbcbcb",
                  color: "#174d38",
                }}
              >
                <h3 className="fw-semibold fs-4 mb-3">
                  {feature.title}
                </h3>

                <p className="mb-0 fs-5" style={{ lineHeight: 1.6 }}>
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

