// import React from "react";

// function Education() {
//   return (
//     <div className="container mt-5 mb-5 p-3">
//       <div className="row align-items-center">
//         <div className="col-12 col-md-6 p-3 p-md-5 text-center">
//           <img src="media/image/education.svg" className="img-fluid w-75 w-md-60" alt="" />
//         </div>

//         <div className="col-12 col-md-6 p-3 p-md-5">
//           <h1 className="mb-4 fs-3">Learn by actually doing it</h1>

//           <p className="text-muted">
//             The best way to understand investing is to watch a position move
//             and feel what that's like. Vestora skips the theory-only lessons
//             and lets you learn from your own (virtual) portfolio instead.
//           </p>

//           <a href="/products" className="text-decoration-none">
//             See how it works{" "}
//             <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
//           </a>

//           <p className="mt-5 text-muted">
//             Have a question about how a feature works, or found something
//             confusing? Our support center walks through the basics of
//             watchlists, orders, holdings, and your wallet.
//           </p>

//           <a href="/support" className="text-decoration-none">
//             Visit support <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Education;


import React from "react";

function Education() {
  return (
    <section
      className="container-fluid"
      style={{
        backgroundColor: "#174D38",
        paddingTop: "100px",
        paddingBottom: "100px",
        color: "#f5f2ef"
      }}
    >
      <div
        className="container-fluid"
        style={{
          maxWidth: "1650px",
          paddingLeft: "clamp(20px, 6vw, 80px)",
          paddingRight: "clamp(20px, 6vw, 80px)",
          margin: "auto"
        }}
      >
        <div className="row align-items-center">

          {/* Left Heading */}
          <div className="col-12 col-md-6 mb-4 mb-md-0 pe-md-4">

            <h1
              className="mb-0"
              style={{
                fontFamily: "'Bodoni Moda', Georgia, serif",
                fontSize: "clamp(40px, 4vw, 60px)",
                fontWeight: "400",
                lineHeight: "1.2",
                letterSpacing: "-1.5px",
                color: "#f5f2ef"
              }}
            >
              We do not predict prices.
              Nobody can, reliably.
            </h1>

          </div>

          {/* Right Description */}
          <div className="col-12 col-md-6 ps-md-4">

            <p
              className="mb-0"
              style={{
                fontSize: "clamp(16px, 1.4vw, 23px)",
                fontWeight: "400",
                lineHeight: "1.7",
                color: "#c9d2cd"
              }}
            >
              Vestora shows what a stock did, and leaves the
              decision to you. It is a practice tool built by
              students at GTBIT, not a broker and not advice.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Education;

