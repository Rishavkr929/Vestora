import React from "react";

function Hero() {
  return (
    <section className="container-fluid" id="supportHero">
      <div className="p-5" id="supportWrapper">
        <h5>Support</h5>
        <a href="/support">Browse help topics</a>
      </div>
      <div className="row p-3 mx-5">
        <div className="col-6 p-5">
          <h1 className="fs-4 mb-4">
            Search for an answer or browse help topics below
          </h1>
          <input placeholder="Eg: how do I place my first order" className="mb-3" />
          <br />
          <a href="#account-profile">Account & profile</a>&nbsp;&nbsp;
          <a href="#trading">Buying & selling</a>&nbsp;&nbsp;
          <a href="#investments">Portfolio</a>&nbsp;&nbsp;
          <a href="#wallet">Your wallet</a>
        </div>
        <div className="col-6 p-5 ">
          <h1 className="fs-4">Featured</h1>
          <ol>
            <li>
              <a href="#trading">How to place your first order</a>
            </li>
            <br />
            <li>
              <a href="#wallet">How the practice wallet works</a>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}

export default Hero;
