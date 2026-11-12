// import React from "react";

// function Stats() {
//   return (
//     <div className="container p-3">
//       <div className="row p-3 p-md-5">
//         <div className="col-12 col-md-6 p-3 p-md-5">
//           <h1 className="fs-3 mb-4 mb-md-5">Invest with confidence</h1>
//           <h2 className="fs-4">Simple and user-focused</h2>
//           <p className="text-muted mb-4">
//             A clean and intuitive platform designed to make exploring stocks and
//             investments simple
//           </p>
//           <h2 className="fs-4">No spam or gimmicks</h2>
//           <p className="text-muted mb-4">
//             A distraction-free experience without unnecessary notifications or
//             complicated features.
//           </p>
//           <h2 className="fs-4">Everything in one place</h2>
//           <p className="text-muted mb-4">
//             Track stocks, manage your watchlist, and monitor your portfolio from
//             a single platform.
//           </p>
//           <h2 className="fs-4">Learn and grow</h2>
//           <p className="text-muted mb-0">
//             Explore the basics of investing through a simple platform built for
//             learning and experimentation.
//           </p>
//         </div>
//         <div className="col-12 col-md-6 p-3 p-md-0 mt-4 mt-md-0">
//           <img src="media/image/ecosystem2.png" className="img-fluid w-100" />
//           <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center gap-3 mt-4 text-center">
//             <a href="/products" className="text-decoration-none" >
//               Explore our products{" "}
//               <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
//             </a>
//             <a href="/signup" className="text-decoration-none">
//               Try the live demo{" "}
//               <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Stats;



import React from "react";

function Stats() {
  const steps = [
    {
      number: "1",
      title: "Start with ₹1,00,000",
      description:
        "Create a free account. Your practice wallet is ready straight away."
    },
    {
      number: "2",
      title: "Trade real prices",
      description:
        "Pick from about fifty NSE stocks. Every order is priced by our server, so nothing can be faked."
    },
    {
      number: "3",
      title: "Learn from your habits",
      description:
        "See profit and loss by reason, get plain-language warnings, and look up any term."
    }
  ];

  return (
    <section
      className="container-fluid"
      style={{
        // backgroundColor: "#000000",
        padding: "100px 100px",
        color: "#174D38"
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
              fontSize: "17px",
              letterSpacing: "1px"
            }}
          >
            HOW IT WORKS
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
            Three steps. No risk.
          </h1>

        </div>

        {/* Top Divider */}
        <hr
          className="my-5"
          style={{
            border: "none",
            borderTop: "2px solid #174D38",
            opacity: 1
          }}
        />

        {/* Three Steps */}
        <div className="row gy-5">

          {steps.map((step) => (
            <div
              className="col-12 col-md-4"
              key={step.number}
            >

              {/* Step Number */}
              <h2
                className="mb-4"
                style={{
                  fontFamily: "'Bodoni Moda', Georgia, serif",
                  fontSize: "clamp(40px, 4vw, 60px)",
                  fontWeight: "400",
                  lineHeight: "1",
                  color: "#174D38"
                }}
              >
                {step.number}
              </h2>

              {/* Step Title */}
              <h3
                className="fw-bold mb-3"
                style={{
                  fontSize: "clamp(19px, 1.8vw, 27px)",
                  color: "#174D38"
                }}
              >
                {step.title}
              </h3>

              {/* Step Description */}
              <p
                className="mb-0"
                style={{
                  fontSize: "clamp(16px, 1.4vw, 23px)",
                  lineHeight: "1.7",
                  color: "#174D38",
                  maxWidth: "520px"
                }}
              >
                {step.description}
              </p>

            </div>
          ))}

        </div>

        {/* Bottom Divider */}
        <hr
          className="mt-5 mb-0"
          style={{
            border: "none",
            borderTop: "2px solid #eeeeee",
            opacity: 1
          }}
        />

      </div>
    </section>
  );
}

export default Stats;
