// import React from "react";
// import { Link } from "react-router-dom";

// function Hero() {
//   return (
//     <div className="container border-bottom mb-5">
//       <div class="text-center mt-4 mt-md-5 py-4 py-md-3 px-3">
//         <h1 className="fs-3">How Vestora works</h1>

//         <h3 class="text my-3 fs-4">
//           One simple app for practicing the whole investing loop
//         </h3>

//         <p className="mt-3 mb-4 mb-md-5">
//           <Link to="/" className=" text-decoration-none">
//             Back to Vestora&nbsp;
//             <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Hero;



import React from "react";

function Hero() {
  return (
    <>
      <section className="vestora-how-hero">
        <div className="container-fluid">
          <div className="hero-content">

            <p className="hero-label mb-4">
              HOW IT WORKS
            </p>

            <h1 className="hero-heading">
              From first click to first lesson.
            </h1>

            <p className="hero-description mt-4">
              Five steps take you from an empty account to understanding
              your own investing habits.
            </p>

          </div>
        </div>
      </section>

      <style>{`
        .vestora-how-hero {
          min-height: 576px;
          padding: 155px 100px 70px;
          color: #174d38;
          overflow: hidden;
        }

        .hero-content {
          padding-left: 20px;
          padding-right: 20px;
        }

        .hero-label {
          color: #4d1717;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }

        .hero-heading {
          color: #174d38;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(40px, 4vw, 60px);
          font-weight: 400;
          line-height: 1.08;
          letter-spacing: -3px;
          margin: 0;
        }

        .hero-description {
          color: #174d38;
          font-size: clamp(16px, 1.4vw, 23px);
          font-weight: 400;
          line-height: 1.6;
          max-width: 1100px;
          margin-bottom: 0;
        }

        /* Tablet */
        @media (max-width: 991px) {
          .vestora-how-hero {
            min-height: 480px;
            padding-top: 130px;
          }

          .hero-heading {
            font-size: clamp(52px, 8vw, 85px);
            letter-spacing: -2px;
          }

          .hero-description {
            max-width: 850px;
          }
        }

        /* Mobile */
        @media (max-width: 576px) {
          .vestora-how-hero {
            min-height: 420px;
            padding: 100px 0 65px;
          }

          .hero-content {
            padding-left: 8px;
            padding-right: 8px;
          }

          .hero-label {
            font-size: 15px;
            letter-spacing: 1.2px;
            margin-bottom: 22px !important;
          }

          .hero-heading {
            font-size: clamp(43px, 11vw, 60px);
            line-height: 1.12;
            letter-spacing: -1.5px;
          }

          .hero-description {
            font-size: 17px;
            line-height: 1.6;
            margin-top: 22px !important;
          }
        }
      `}</style>
    </>
  );
}

export default Hero;
