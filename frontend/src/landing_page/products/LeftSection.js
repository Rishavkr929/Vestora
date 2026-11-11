import React from "react";

function LeftSection({
  imageURL,
  visual,
  prodName,
  prodDesc,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
}) {
  return (
    <div className="container mt-5 px-3 px-md-4">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 text-center p-3 p-md-4">
          {visual ? visual : <img src={imageURL} className="img-fluid" alt="" />}
        </div>

        <div className="col-12 col-md-6 p-3 p-md-4 mt-3 mt-md-0">
          <h1 className="fs-4 mb-3 ">{prodName}</h1>

          <p className="text" style={{ lineHeight: "1.8" }}>
            {prodDesc}
          </p>

          <div className="d-flex flex-wrap gap-3 mt-3">
            {tryDemo && (
              <a href={tryDemo} className="text-decoration-none">
                Try it&nbsp;{" "}
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>
            )}

            {learnMore && (
              <a href={learnMore} className="text-decoration-none">
                Learn More{" "}
                <i class="fa fa-long-arrow-right" aria-hidden="true"></i>
              </a>
            )}
          </div>

          {(googlePlay || appStore) && (
            <div className="d-flex flex-wrap align-items-center gap-3 mt-4">
              {googlePlay && (
                <a href={googlePlay}>
                  <img src="media/image/googlePlayBadge.svg" className="img-fluid" alt="" />
                </a>
              )}
              {appStore && (
                <a href={appStore} className="mx-4">
                  <img src="media/image/appstoreBadge.svg" className="img-fluid" alt="" />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeftSection;
