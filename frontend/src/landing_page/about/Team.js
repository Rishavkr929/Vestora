// import React from "react";

// function Team() {
//   return (
//     <div class="container mb-5 ">
//       <h1 class="text-center py-3 fs-3">People</h1>
//       <div
//         class="row py-3 px-2 px-md-3 text-muted mb-5"
//         style={{ lineHeight: "1.8", fontSize: "1.1rem" }}
//       >
//         <div class="col-12 col-md-6 text-center p-2 p-md-3 mb-4 mb-md-5">
//           <img
//             src="media\image\rishav.png"
//             alt=""
//             className="rounded-circle img-fluid w-50"
//           />
//           <h4 className="my-3">Rishav Kumar</h4>
//           <h6>Software Developer</h6>
//         </div>
//         <div class="col-12 col-md-6 p-2 p-md-4">
//           <p>
//             Rishav Kumar is the creator of Vestora, built with a vision to make
//             investing simpler and more intuitive.
//           </p>
//           <p>
//             He is passionate about software development, problem-solving, and
//             building technology that solves real-world problems.
//           </p>
//           <p>
//             Connect on&nbsp;
//             <a
//               href="https://github.com/Rishavkr929"
//               className="text-decoration-none"
//             >
//               GitHub
//             </a>{" "}
//             /
//             <a
//               href="https://www.linkedin.com/in/rishav-kumar-r929/"
//               className="text-decoration-none"
//             >
//               {" "}
//               LinkedIn
//             </a>{" "}
//             /
//           </p>
//         </div>
//       </div>
//       <div className="row mt-5 mb-5 px-2 px-md-3 text-center text-muted">
//         <div className="col-12 col-sm-6 col-lg-4 p-3 mb-4 mb-lg-0 ">
//           <img
//             src="media/image/jagpreet.jpg"
//             className="rounded-circle img-fluid w-50"
//           />
//           <h4 className="mt-3 fs-5">Jagpreet Singh Gandhi</h4>
//           <h6>Software Developer</h6>
//         </div>
//         <div className="col-12 col-sm-6 col-lg-4 p-3 mb-4 mb-lg-0 ">
//           <img
//             src="media/image/ranveer.jpg"
//             className="rounded-circle img-fluid w-50"
//           />
//           <h4 className="mt-3 fs-5">Ranveer Singh Nanda</h4>
//           <h6>Software Developer</h6>
//         </div>
//         <div className="col-12 col-sm-6 col-lg-4 p-3 ">
//           <img
//             src="media/image/shabib.jpg"
//             className="rounded-circle img-fluid w-50"
//           />
//           <h4 className="mt-3 fs-5">Md. Shabib</h4>
//           <h6>Software Developer</h6>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Team;



import React from "react";

function Team() {
  const students = [
    "Rishav Kumar",
    "Ranveer Singh Nanda",
    "Jagpreet Singh Gandhi",
    "Mohammad Shabib",
  ];

  return (
    <section
      className="container-fluid px-5 px-md-5 "
      style={{ backgroundColor: "#164f3b", minHeight: "100vh" }}
    >
      <div className="container-fluid px-5 px-md-4 px-lg-5">

        {/* Heading */}

        <div className="row pt-4 pt-md-5 mb-4 mb-md-5">
          <div className="col-12">

            <h5
              className="fw-bold mb-3"
              style={{
                color: "#d1d1d1",
                fontSize: "18px",
                letterSpacing: "1px",
              }}
            >
              THE TEAM
            </h5>

            <h1
              className="mb-0"
              style={{
                color: "#f5f5f5",
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: "clamp(38px, 4vw, 68px)",
                fontWeight: 400,
              }}
            >
              Four students, one mentor.
            </h1>

          </div>
        </div>

        {/* Student Cards */}

        <div className="row g-4 mb-4">

          {students.map((student, index) => (
            <div className="col-12 col-sm-6 col-lg-3" key={index}>
              <div
                className="h-100 p-4 p-lg-4 rounded-4"
                style={{
                  backgroundColor: "#f1f1f1",
                  color: "#164f3b",
                  minHeight: "168px",
                }}
              >
                <h3
                  className="fw-semibold mb-1"
                  style={{ fontSize: "clamp(20px, 1.5vw, 27px)" }}
                >
                  {student}
                </h3>

                <p
                  className="mb-0"
                  style={{ fontSize: "19px" }}
                >
                  B.Tech CSE, 2023–27
                </p>
              </div>
            </div>
          ))}

        </div>

        {/* Mentor Card */}

        <div className="row">
          <div className="col-12 col-lg-5">

            <div
              className="rounded-4 p-4 h-100"
              style={{
                backgroundColor: "#521b1b",
                color: "#f5f5f5",
                minHeight: "166px",
              }}
            >
              <h5
                className="fw-bold mb-2"
                style={{
                  color: "#d1d1d1",
                  fontSize: "17px",
                  letterSpacing: "1px",
                }}
              >
                MENTOR
              </h5>

              <h3 className="fw-semibold mb-1">
                Ms. Ashu
              </h3>

              <p
                className="mb-0"
                style={{
                  color: "#d1d1d1",
                  fontSize: "19px",
                }}
              >
                Assistant Professor, Department of CSE, GTBIT
              </p>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default Team;
