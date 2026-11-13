// import React from "react";

// function Hero() {
//   return (
//     <div className="container">
//       <div className="row py-5 my-4 px-2 px-md-5">
//         <div className="col-12 text-center">
//         <h1 className="fs-3 lh-base text-center">
//           We believe great investing starts with simplicity.
//           <br className="d-none d-md-block"/>
//           We’re building technology that makes it possible.
//         </h1>
//         </div>
//       </div>
//       <div
//         class="row mt-4 mt-md-5 py-4 py-md-5 border-top text-muted"
//         style={{ lineHeight: "1.8", fontSize: "1.1rem" }}
//       >
//         <div class="col-12 col-md-6 px-3 px-md-5">
//           <p className="mb-4">
//             We started Vestora with a simple idea — investing should be easier
//             to understand, simpler to access, and built around technology.
//           </p>
//           <p className="mb-4">
//             Vestora is a modern investment platform designed to bring stocks and
//             investing together in a clean, intuitive experience. Our goal is to
//             remove unnecessary complexity and make it easier for users to
//             explore the market, understand investments, and make informed
//             decisions.
//           </p>
//           <p className="mb-0">
//             Built with a technology-first approach, Vestora focuses on
//             simplicity, transparency, and a seamless user experience. From
//             discovering stocks to exploring market information, every part of
//             the platform is designed with the investor in mind.
//           </p>
//         </div>
//         <div class="col-12 col-md-6 px-3 px-md-5 mt-4 mt-md-0">
//           <p className="mb-4">
//             We believe technology can make investing more approachable for the
//             next generation of investors. That's why we're continuously
//             exploring better ways to present financial information, simplify the
//             investing experience, and put useful tools in the hands of users.
//           </p>
//           <p className="mb-0">
//             Vestora is more than just a project — it's our vision of what a
//             modern investing experience could look like: simple, transparent,
//             and powered by technology.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Hero;



import React from "react";

function Hero() {
  return (
    <>
      <style>{`
        .about-section {
          // background-color: #000;
          color: #07563e;
          padding-left: 100px;
          padding-right:100px;
        }

        .about-label {
          color: #672b30;
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .about-heading {
          color: #07563e;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(38px, 4vw, 68px);
          font-weight: 400;
          line-height: 1.1;
        }

        .about-description {
          color: #07563e;
          font-size: clamp(17px, 1.5vw, 25px);
          line-height: 1.6;
          max-width: 1250px;
        }

        .about-card {
          background-color: #cecece;
          color: #164f3b;
          border-radius: 35px;
          padding: 55px;
          height: 100%;
        }

        .about-card h3 {
          font-size: 32px;
          font-weight: 600;
          margin-bottom: 22px;
        }

        .about-card p {
          font-size: 27px;
          line-height: 1.7;
          margin-bottom: 0;
        }

        .about-card-green {
          background-color: #164f3b;
          color: #f5f5f5;
        }

        @media (max-width: 991px) {
          .about-card {
            padding: 35px;
          }

          .about-card h3 {
            font-size: 25px;
          }

          .about-card p {
            font-size: 20px;
          }
        }

        @media (max-width: 576px) {
          .about-label {
            font-size: 16px;
          }

          .about-heading {
            font-size: 42px;
          }

          .about-description {
            font-size: 14px;
            line-height: 1.6;
          }

          .about-card {
            padding: 30px 25px;
            border-radius: 25px;
          }

          .about-card h3 {
            font-size: 20px;
            margin-bottom: 15px;
          }

          .about-card p {
            font-size: 14px;
            line-height: 1.6;
          }
        }
      `}</style>

      <div className="about-section container-fluid px-5 px-md-4 px-lg-5">

        {/* SECTION 1: ABOUT INTRODUCTION */}

        <section className="row py-5 mt-4 px-5">

          <div className="col-12">

            <h5 className="about-label mb-4">
              ABOUT
            </h5>

            <h1 className="about-heading mb-4">
              A learning tool, built by students.
            </h1>

            <p className="about-description mb-0">
              Vestora is a B.Tech minor project at Guru Tegh Bahadur
              Institute of Technology. It began as a trading-app clone
              and was rebuilt around one idea: beginners need a safe
              place to make their first mistakes.
            </p>

          </div>

        </section>


        {/* SECTION 2: OUR VALUES */}

        <section className="row g-4 py-4 py-md-5 px-5">

          {/* CARD 1 */}

          <div className="col-12 col-md-6 col-lg-4">

            <div className="about-card">

              <h3>
                Practice, not speculation
              </h3>

              <p>
                Every trade uses virtual money, so learning never
                costs you anything real.
              </p>

            </div>

          </div>


          {/* CARD 2 */}

          <div className="col-12 col-md-6 col-lg-4">

            <div className="about-card">

              <h3>
                Honest about forecasting
              </h3>

              <p>
                Short-term prices are very hard to predict. Our
                ARIMA forecast shows a range, not a promise, and
                always says it can be wrong.
              </p>

            </div>

          </div>


          {/* CARD 3 */}

          <div className="col-12 col-md-12 col-lg-4">

            <div className="about-card about-card-green">

              <h3>
                Free and open tools
              </h3>

              <p>
                Built on the MERN stack with free, open-source
                software.
              </p>

            </div>

          </div>

        </section>

      </div>
    </>
  );
}

export default Hero;
