// import React from "react";

// function RightSection({ rgTitle, prodDesc, link1, imgURL, visual }) {
//   return (
//     <div className="container mt-5  px-3 px-md-4">
//       <div className="row align-items-center">
//         <div className="col-12 col-md-6 p-3 p-md-4 mt-3 mt-md-0">
//           <h1 className="fs-4 mb-3 ">{rgTitle}</h1>

//           <p className="text-muted" style={{ lineHeight: "1.8" }}>
//             {prodDesc}
//           </p>

//           {link1 && (
//             <div className="mt-3">
//               <a href={link1} className="text-decoration-none">
//                 Learn More&nbsp;
//                 <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
//               </a>
//             </div>
//           )}
//         </div>

//         <div className="col-12 col-md-6 text-center p-3 p-md-4">
//           {visual ? visual : <img src={imgURL} className="img-fluid" alt="" />}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RightSection;



import React from "react";

function RightSection({ rgTitle, steps }) {
  const defaultSteps = [
    "The server checks that you are logged in.",
    "It fetches the live price itself.",
    "It checks your wallet can cover the cost.",
    "It saves the order and updates your holding.",
    "Your dashboard refreshes.",
  ];

  const displaySteps = steps || defaultSteps;

  return (
    <section
      className="container-fluid py-5 px-5 px-md-4 px-lg-5"
      style={{
        backgroundColor: "#174d38",
        color: "#f2f2f2",
      }}
    >
      <div
        className="container-fluid px-5"
        style={{
          maxWidth: "1600px",
          margin: "auto",
        }}
      >
        <div className="row align-items-start g-4 g-lg-5">

          {/* Left Section - Heading */}
          <div className="col-12 col-md-6">
            <p
              className="fw-bold mb-3"
              style={{
                color: "#cbcbcb",
                fontSize: "19px",
                letterSpacing: "1px",
              }}
            >
              UNDER THE HOOD
            </p>

            <h1
              className="mb-0"
              style={{
                fontFamily: "'Bodoni Moda', Georgia, serif",
                fontSize: "clamp(38px, 4vw, 68px)",
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: "-1.5px",
                color: "#f2f2f2",
                maxWidth: "650px",
              }}
            >
              {rgTitle || "What happens when you press Buy."}
            </h1>
          </div>

          {/* Right Section - Steps */}
          <div className="col-12 col-md-6">
            <ol
              className="mb-0 ps-4"
              style={{
                color: "#cbcbcb",
                fontSize: "clamp(17px, 1.5vw, 25px)",
                lineHeight: 1.6,
              }}
            >
              {displaySteps.map((step, index) => (
                <li
                  key={index}
                  className="ps-1 mb-3 mb-md-3"
                >
                  {step}
                </li>
              ))}
            </ol>
          </div>

        </div>
      </div>
    </section>
  );
}

export default RightSection;
