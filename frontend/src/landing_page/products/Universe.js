// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Universe() {
//   const navigate = useNavigate();

//   return (
//     <div className="container mt-5">
//       <div className="row my-5 text-center px-2 px-md-3">
//         <div className="col-12">
//           <h1 className="fs-2 mt-4 mt-md-5 mb-3">More Projects</h1>

//           <p className="mb-4 mb-md-5">
//             Explore more projects I've built while learning and experimenting
//             with modern web technologies.
//           </p>
//         </div>

//         <div className="col-12 col-sm-6 col-lg-4 p-3">
//           <div className="h-100">
//             <img src="" alt="StayNest" className="img-fluid" />
//             <p className="small mt-3">
//               Full-Stack Travel Accommodation Platform
//             </p>
//           </div>
//         </div>

//         <div className="col-12 col-sm-6 col-lg-4 p-3">
//           <div className="h-100">
//             <img src="" alt="StayNest" className="img-fluid" />
//             <p className="small mt-3">
//               Full-Stack Travel Accommodation Platform
//             </p>
//           </div>
//         </div>

//         <div className="col-12 col-sm-6 col-lg-4 p-3">
//           <div className="h-100">
//             <img src="" alt="StayNest" className="img-fluid" />
//             <p className="small mt-3">
//               Full-Stack Travel Accommodation Platform
//             </p>
//           </div>
//         </div>

//         <div className="col-12 mt-4 mt-md-5 mb-5">
//           <button
//             className="btn px-4 py-2 fs-5 custom-signup-btn"
//             onClick={() => navigate("/signup")}
//           >
//             Sign up for free
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Universe;



import React from "react";
import { useNavigate } from "react-router-dom";

function Universe() {
  const navigate = useNavigate();

  return (
    <section
      className="container-fluid d-flex align-items-center justify-content-center text-center py-5 px-3"
      style={{
        // backgroundColor: "#000000",
        minHeight: "480px",
      }}
    >
      <div className="container py-4">

        {/* Heading */}
        <h1
          className="mb-5"
          style={{
            fontFamily: "'Bodoni Moda', Georgia, serif",
            fontSize: "clamp(40px, 4vw, 60px)",
            fontWeight: 400,
            lineHeight: 1.2,
            letterSpacing: "-2px",
            color: "#174d38",
          }}
        >
          Ready to try it?
        </h1>

        {/* Signup Button */}
        <button
          type="button"
          className="btn rounded-pill px-4 px-md-5 py-3 fw-semibold"
          onClick={() => navigate("/signup")}
          style={{
            backgroundColor: "#4d1717",
            color: "#f2f2f2",
            border: "none",
            fontSize: "clamp(16px, 1.5vw, 25px)",
            minWidth: "220px",
            transition: "background-color 0.3s ease",
          }}
        >
          Create free account
        </button>

      </div>
    </section>
  );
}

export default Universe;
