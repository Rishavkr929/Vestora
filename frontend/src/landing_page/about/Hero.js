import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row py-5 my-4 px-2 px-md-5">
        <div className="col-12 text-center">
        <h1 className="fs-3 lh-base text-center">
          We believe great investing starts with simplicity.
          <br className="d-none d-md-block"/>
          We’re building technology that makes it possible.
        </h1>
        </div>
      </div>
      <div
        class="row mt-4 mt-md-5 py-4 py-md-5 border-top text-muted"
        style={{ lineHeight: "1.8", fontSize: "1.1rem" }}
      >
        <div class="col-12 col-md-6 px-3 px-md-5">
          <p className="mb-4">
            We started Vestora with a simple idea — investing should be easier
            to understand, simpler to access, and built around technology.
          </p>
          <p className="mb-4">
            Vestora is a modern investment platform designed to bring stocks and
            investing together in a clean, intuitive experience. Our goal is to
            remove unnecessary complexity and make it easier for users to
            explore the market, understand investments, and make informed
            decisions.
          </p>
          <p className="mb-0">
            Built with a technology-first approach, Vestora focuses on
            simplicity, transparency, and a seamless user experience. From
            discovering stocks to exploring market information, every part of
            the platform is designed with the investor in mind.
          </p>
        </div>
        <div class="col-12 col-md-6 px-3 px-md-5 mt-4 mt-md-0">
          <p className="mb-4">
            We believe technology can make investing more approachable for the
            next generation of investors. That's why we're continuously
            exploring better ways to present financial information, simplify the
            investing experience, and put useful tools in the hands of users.
          </p>
          <p className="mb-0">
            Vestora is more than just a project — it's our vision of what a
            modern investing experience could look like: simple, transparent,
            and powered by technology.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
