// import React from "react";

// function Hero() {
//   return (
//     <section className="container-fluid" id="supportHero">
//       <div className="p-5" id="supportWrapper">
//         <h5>Support</h5>
//         <a href="/support">Browse help topics</a>
//       </div>
//       <div className="row p-3 mx-5">
//         <div className="col-6 p-5">
//           <h1 className="fs-4 mb-4">
//             Search for an answer or browse help topics below
//           </h1>
//           <input placeholder="Eg: how do I place my first order" className="mb-3" />
//           <br />
//           <a href="#account-profile">Account & profile</a>&nbsp;&nbsp;
//           <a href="#trading">Buying & selling</a>&nbsp;&nbsp;
//           <a href="#investments">Portfolio</a>&nbsp;&nbsp;
//           <a href="#wallet">Your wallet</a>
//         </div>
//         <div className="col-6 p-5 ">
//           <h1 className="fs-4">Featured</h1>
//           <ol>
//             <li>
//               <a href="#trading">How to place your first order</a>
//             </li>
//             <br />
//             <li>
//               <a href="#wallet">How the practice wallet works</a>
//             </li>
//           </ol>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Hero;



import React from "react";

function Hero() {
  return (
    <section
      className="container-fluid px-5 px-md-4 px-lg-5 py-5"
      id="supportHero"
      style={{
        // backgroundColor: "#000",
        minHeight: "550px",
      }}
    >
      <div className="row px-5 px-md-3 px-lg-4 py-5 mt-3">
        <div className="col-12">

          {/* Support Label */}

          <h5
            className="fw-bold mb-4 px-5"
            style={{
              color: "#672b30",
              fontSize: "clamp(16px, 1.2vw, 23px)",
              letterSpacing: "1px",
            }}
          >
            SUPPORT
          </h5>

          {/* Main Heading */}

          <h1
            className="mb-4 px-5"
            style={{
              color: "#07563e",
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: "clamp(38px, 4vw, 68px)",
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            How can we help?
          </h1>

          {/* Description */}

          <p
            className="mb-0 px-5"
            style={{
              color: "#07563e",
              fontSize: "clamp(17px, 1.5vw, 25px)",
              lineHeight: 1.6,
              maxWidth: "1100px",
            }}
          >
            Answers to the questions new learners ask most. If yours
            is not here, write to us.
          </p>

        </div>
      </div>
    </section>
  );
}

export default Hero;
