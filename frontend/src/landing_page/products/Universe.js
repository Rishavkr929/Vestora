import React from "react";
import { useNavigate } from "react-router-dom";

function Universe() {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row my-5 text-center px-2 px-md-3">
        <div className="col-12">
          <h1 className="fs-2 mt-4 mt-md-5 mb-3">More Projects</h1>

          <p className="mb-4 mb-md-5">
            Explore more projects I've built while learning and experimenting
            with modern web technologies.
          </p>
        </div>

        <div className="col-12 col-sm-6 col-lg-4 p-3">
          <div className="h-100">
            <img src="" alt="StayNest" className="img-fluid" />
            <p className="small mt-3">
              Full-Stack Travel Accommodation Platform
            </p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4 p-3">
          <div className="h-100">
            <img src="" alt="StayNest" className="img-fluid" />
            <p className="small mt-3">
              Full-Stack Travel Accommodation Platform
            </p>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-4 p-3">
          <div className="h-100">
            <img src="" alt="StayNest" className="img-fluid" />
            <p className="small mt-3">
              Full-Stack Travel Accommodation Platform
            </p>
          </div>
        </div>

        <div className="col-12 mt-4 mt-md-5 mb-5">
          <button
            className="btn px-4 py-2 fs-5 custom-signup-btn"
            onClick={() => navigate("/signup")}
          >
            Sign up for free
          </button>
        </div>
      </div>
    </div>
  );
}

export default Universe;
