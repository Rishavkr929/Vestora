import React from "react";

function LeftSection() {
  const steps = [
    {
      number: "1",
      title: "Create your account",
      description:
        "Sign up with your name, email and a password. Your practice wallet of ₹1,00,000 is added straight away.",
    },
    {
      number: "2",
      title: "Find stocks and build a watchlist",
      description:
        "Browse about fifty NSE stocks, star up to fifty favourites, open a price chart, and read a trend summary that is clearly labelled as history, not a prediction.",
    },
    {
      number: "3",
      title: "Look at the forecast",
      description:
        "Open Forecast on any stock. Vestora downloads two years of daily closing prices, fits an ARIMA model and draws the next few weeks as a dashed line inside a shaded range. It is an estimate that can be wrong, not advice.",
    },
    {
      number: "4",
      title: "Buy and sell, and say why",
      description:
        "Every order is priced by our server from a live quote, so nobody can set their own price. When you buy, you pick a reason: trending, a tip, your own research, or just trying out.",
    },
    {
      number: "5",
      title: "Protect holdings with a stop-loss",
      description:
        "Choose a price for a stock you hold. If it falls to that price, Vestora sells it for you and records it under Positions.",
    },
    {
      number: "6",
      title: "Learn from your habits",
      description:
        "The journal shows profit and loss by reason. The mistake detector warns about too much in one stock, holdings with no stop-loss, and panic-selling. The glossary explains any term you meet.",
    },
  ];

  return (
    <section
      className="container-fluid  px-3 px-md-4 px-lg-5"
      style={{ color: "#174d38" }}
    >
      <div className="container-fluid px-5">

        {steps.map((step, index) => (
          <div
            className={`row py-4 py-md-5 ${
              index !== steps.length - 1 ? "border-bottom" : ""
            }`}
            key={step.number}
            style={{
              borderColor: "#cbcbcb",
              borderBottomWidth: index !== steps.length - 1 ? "2px" : "0",
            }}
          >
            {/* Step Number */}
            <div className="col-2 col-md-1 d-flex align-items-start">
              <span
                className="fw-normal"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: "clamp(42px, 5vw, 76px)",
                  lineHeight: "1",
                  color: "#174d38",
                }}
              >
                {step.number}
              </span>
            </div>

            {/* Step Content */}
            <div className="col-10 col-md-11 ps-3 ps-md-4">
              <h2
                className="fw-bold mb-2"
                style={{
                  fontSize: "clamp(19px, 2vw, 27px)",
                  color: "#174d38",
                }}
              >
                {step.title}
              </h2>

              <p
                className="mb-0 fw-medium"
                style={{
                  fontSize: "clamp(15px, 1.5vw, 20px)",
                  lineHeight: "1.6",
                  maxWidth: "700px",
                  color: "#174d38",
                }}
              >
                {step.description}
              </p>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}

export default LeftSection;
