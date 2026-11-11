import React from "react";

function CreateTicket() {
  return (
    <div className="container">
      <div className="row p-5 mb-5 mt-5">
        <h1 className="fs-3" style={{ marginLeft: "25px" }}>
          Search for answers or choose a topic below to get started
        </h1>
        <div className="col-4 p-5 mb-2 mt-2" id="account-profile">
          <h4 className="fw-normal mb-4 fs-5">
            <i class="fa fa-user" aria-hidden="true"></i> Account & Profile
          </h4>
          <a href="/signup" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Creating an account
          </a>
          <br />
          <a href="/signup" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Login & password
          </a>
          <br />
          <a href="/support" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Deleting your account
          </a>
          <br />
        </div>
        <div className="col-4 p-5 mb-2 mt-2" id="trading">
          <h4 className="fw-normal mb-4 fs-5">
            <i class="fa fa-globe" aria-hidden="true"></i> Buying & Selling
          </h4>
          <a href="/products" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Getting started
          </a>
          <br />
          <a href="/products" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Placing an order
          </a>
          <br />
          <a href="/support" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Order history
          </a>
          <br />
          <a href="/support" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Trading FAQs
          </a>
          <br />
        </div>
        <div className="col-4 p-5 mb-2 mt-2" id="investments">
          <h4 className="fw-normal mb-4 fs-5">
            <i class="fa fa-money" aria-hidden="true"></i> Portfolio
          </h4>
          <a href="/products" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Understanding your holdings
          </a>
          <br />
          <a href="/support" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Average buy price & P&L
          </a>
          <br />
          <a href="/support" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Portfolio FAQs
          </a>
          <br />
        </div>
        <div className="col-4 p-5 mb-2 mt-2" id="wallet">
          <h4 className="fw-normal mb-4 fs-5">
            <i class="fa fa-credit-card-alt" aria-hidden="true"></i> Your Wallet
          </h4>
          <a href="/pricing" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            How the ₹1,00,000 wallet works
          </a>
          <br />
          <a href="/pricing" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Resetting your wallet
          </a>
          <br />
          <a href="/support" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Why is everything free?
          </a>
          <br />
        </div>
        <div className="col-4 p-5 mb-2 mt-2">
          <h4 className="fw-normal mb-4 fs-5">
            <i class="fa fa-circle-o-notch" aria-hidden="true"></i> Learning
          </h4>
          <a href="/products" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Getting started
          </a>
          <br />
          <a href="/products" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Stock market basics
          </a>
          <br />
        </div>
        <div className="col-4 p-5 mb-2 mt-2">
          <h4 className="fw-normal mb-4 fs-5">
            <i class="fa fa-phone" aria-hidden="true"></i> Technical Support
          </h4>
          <a href="mailto:support@vestora.com" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Website issues
          </a>
          <br />
          <a href="mailto:support@vestora.com" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Login problems
          </a>
          <br />
          <a href="mailto:support@vestora.com" style={{ textDecoration: "none", lineHeight: "2.5" }}>
            Report a problem
          </a>
          <br />
        </div>
      </div>
    </div>
  );
}

export default CreateTicket;
