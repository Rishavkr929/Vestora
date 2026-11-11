import React from "react";

function Team() {
  return (
    <div class="container mb-5 ">
      <h1 class="text-center py-3 fs-3">People</h1>
      <div
        class="row py-3 px-2 px-md-3 text-muted mb-5"
        style={{ lineHeight: "1.8", fontSize: "1.1rem" }}
      >
        <div class="col-12 col-md-6 text-center p-2 p-md-3 mb-4 mb-md-5">
          <img
            src="media\image\rishav.png"
            alt=""
            className="rounded-circle img-fluid w-50"
          />
          <h4 className="my-3">Rishav Kumar</h4>
          <h6>Software Developer</h6>
        </div>
        <div class="col-12 col-md-6 p-2 p-md-4">
          <p>
            Rishav Kumar is the creator of Vestora, built with a vision to make
            investing simpler and more intuitive.
          </p>
          <p>
            He is passionate about software development, problem-solving, and
            building technology that solves real-world problems.
          </p>
          <p>
            Connect on&nbsp;
            <a
              href="https://github.com/Rishavkr929"
              className="text-decoration-none"
            >
              GitHub
            </a>{" "}
            /
            <a
              href="https://www.linkedin.com/in/rishav-kumar-r929/"
              className="text-decoration-none"
            >
              {" "}
              LinkedIn
            </a>{" "}
            /
          </p>
        </div>
      </div>
      <div className="row mt-5 mb-5 px-2 px-md-3 text-center text-muted">
        <div className="col-12 col-sm-6 col-lg-4 p-3 mb-4 mb-lg-0 ">
          <img
            src="media/image/jagpreet.jpg"
            className="rounded-circle img-fluid w-50"
          />
          <h4 className="mt-3 fs-5">Jagpreet Singh Gandhi</h4>
          <h6>Software Developer</h6>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 p-3 mb-4 mb-lg-0 ">
          <img
            src="media/image/ranveer.jpg"
            className="rounded-circle img-fluid w-50"
          />
          <h4 className="mt-3 fs-5">Ranveer Singh Nanda</h4>
          <h6>Software Developer</h6>
        </div>
        <div className="col-12 col-sm-6 col-lg-4 p-3 ">
          <img
            src="media/image/shabib.jpg"
            className="rounded-circle img-fluid w-50"
          />
          <h4 className="mt-3 fs-5">Md. Shabib</h4>
          <h6>Software Developer</h6>
        </div>
      </div>
    </div>
  );
}

export default Team;
