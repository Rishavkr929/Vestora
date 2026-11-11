import React from "react";

function RightSection({ rgTitle, prodDesc, link1, imgURL, visual }) {
  return (
    <div className="container mt-5  px-3 px-md-4">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 p-3 p-md-4 mt-3 mt-md-0">
          <h1 className="fs-4 mb-3 ">{rgTitle}</h1>

          <p className="text-muted" style={{ lineHeight: "1.8" }}>
            {prodDesc}
          </p>

          {link1 && (
            <div className="mt-3">
              <a href={link1} className="text-decoration-none">
                Learn More&nbsp;
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>
            </div>
          )}
        </div>

        <div className="col-12 col-md-6 text-center p-3 p-md-4">
          {visual ? visual : <img src={imgURL} className="img-fluid" alt="" />}
        </div>
      </div>
    </div>
  );
}

export default RightSection;
