// import React from "react";

// function Awards() {
//   return (
//     <div className="container mt-5 mb-5">
//       <div className="row align-items-center mx-0 mx-md-3">
//         <div className="col-12 col-md-6 p-3 p-md-5 text-center">
//           <img src="media/image/growth.png" className="img-fluid" alt="" />
//         </div>

//         <div className="col-12 col-md-6 p-3 p-md-5 mt-3 mt-md-0">
//           <h1 className="fs-3" style={{ color: "#174D38" }}>
//             A market to practice on, not a market to risk your savings on
//           </h1>
//           <p className="mb-4 mb-md-5" style={{ color: "#333333" }}>
//             Vestora gives you a virtual wallet and a real spread of stocks so
//             you can learn what it actually feels like to invest — buying,
//             selling, watching a position move — before any of it involves
//             real money.
//           </p>
//           <div className="row" style={{ color: "#666666" }}>
//             <div className="col-12 col-sm-6">
//               <ul className="mb-3 mb-sm-0">
//                 <li>
//                   <p className="mb-2">Stocks across sectors</p>
//                 </li>
//                 <li>
//                   <p className="mb-2">Real-time-style price moves</p>
//                 </li>
//                 <li>
//                   <p className="mb-2">Buy and sell instantly</p>
//                 </li>
//               </ul>
//             </div>
//             <div className="col-12 col-sm-6">
//               <ul>
//                 <li>
//                   <p className="mb-2">Live P&L on every holding</p>
//                 </li>
//                 <li>
//                   <p className="mb-2">Average buy price tracking</p>
//                 </li>
//                 <li>
//                   <p className="mb-2">A wallet that resets when you want</p>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Awards;



import React from "react";

function Awards() {
  return (
    <section
      className="container-fluid d-flex align-items-center"
      style={{
        // backgroundColor: "#000000",
        padding: "130px 100px",
        color: "#174D38"
      }}
    >
      <div
        className="container-fluid"
        style={{
          maxWidth: "1650px",
          width: "92%",
          margin: "auto"
        }}
      >
        <div className="row align-items-start gy-4">

          {/* LEFT SECTION */}
          <div className="col-12 col-lg-6 pe-lg-5">

            <p
              className="fw-bold mb-4"
              style={{
                color: "#6b2828",
                fontSize: "17px",
                letterSpacing: "1px"
              }}
            >
              THE PROBLEM
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
              Most beginners learn by losing real money.
            </h1>

          </div>

          {/* RIGHT SECTION */}
          <div className="col-12 col-lg-6 ps-lg-5">

            <p
              className="mb-4"
              style={{
                color: "#174D38",
                fontSize: "clamp(15px, 1.5vw, 20px)",
                lineHeight: "1.65"
              }}
            >
              A tip on social media. A friend's win. A stock
              that is "trending". The first trades are usually
              made with real savings, with no stop-loss, too
              much in one stock, and no record of why.
            </p>

            <p
              className="mb-0"
              style={{
                color: "#174D38",
                fontSize: "clamp(15px, 1.5vw, 20px)",
                lineHeight: "1.65"
              }}
            >
              Brokers show you a price and a buy button.
              They never tell you that you bought on a tip,
              or that you sold in panic. Vestora does.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}

export default Awards;
