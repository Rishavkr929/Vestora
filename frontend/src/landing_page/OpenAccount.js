// import React from "react";
// import { useNavigate } from "react-router-dom";

// function OpenAccount() {
//   const navigate = useNavigate();

//   return (
//     <div className="container">
//       <div className="row text-center my-5 px-3 px-md-5">
//         <div className="col-12">
//           <h1 className="fs-2 mb-4" style={{ color: "#174D38" }}>
//             Open a Vestora account
//           </h1>
//           <p className="mb-4 mb-md-5" style={{ color: "#333333" }}>
//             A virtual ₹1,00,000 wallet, real-world stocks, and nothing to
//             pay — ever.
//           </p>

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

// export default OpenAccount;



import React from "react";
import { useNavigate } from "react-router-dom";

function OpenAccount() {
  const navigate = useNavigate();

  return (
    <section
      className="container-fluid d-flex align-items-center justify-content-center text-center"
      style={{
        // backgroundColor: "#000000",
        minHeight: "600px",
        padding: "100px 100px"
      }}
    >
      <div className="container">

        {/* Heading */}
        <h1
          className="mb-4"
          style={{
            fontFamily: "'Bodoni Moda', Georgia, serif",
            fontSize: "clamp(40px, 4vw, 60px)",
            fontWeight: "400",
            lineHeight: "1.2",
            color: "#174D38",
            letterSpacing: "-2px"
          }}
        >
          Make your first mistakes here.
        </h1>

        {/* Subtitle */}
        <p
          className="mb-5"
          style={{
            color: "#174D38",
            fontSize: "clamp(16px, 1.6vw, 30px)",
            lineHeight: "1.6"
          }}
        >
          It costs nothing, and it is how you learn.
        </p>

        {/* Signup Button */}
        <button
          className="btn rounded-pill px-5 py-4 fw-semibold"
          onClick={() => navigate("/signup")}
          style={{
            backgroundColor: "#501a18",
            color: "#f5f5f5",
            fontSize: "clamp(16px, 1.5vw, 28px)",
            border: "none",
            minWidth: "min(100%, 395px)"
          }}
        >
          Create free account
        </button>

      </div>
    </section>
  );
}

export default OpenAccount;
