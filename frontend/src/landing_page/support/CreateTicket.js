// import React from "react";

// function CreateTicket() {
//   return (
//     <div className="container">
//       <div className="row p-5 mb-5 mt-5">
//         <h1 className="fs-3" style={{ marginLeft: "25px" }}>
//           Search for answers or choose a topic below to get started
//         </h1>
//         <div className="col-4 p-5 mb-2 mt-2" id="account-profile">
//           <h4 className="fw-normal mb-4 fs-5">
//             <i class="fa fa-user" aria-hidden="true"></i> Account & Profile
//           </h4>
//           <a href="/signup" style={{ textDecoration: "none", lineHeight: "2.5" }}>
//             Creating an account
//           </a>
//           <br />
//           <a href="/signup" style={{ textDecoration: "none", lineHeight: "2.5" }}>
//             Login & password
//           </a>
//           <br />
//           <a href="/support" style={{ textDecoration: "none", lineHeight: "2.5" }}>
//             Deleting your account
//           </a>
//           <br />
//         </div>
//         <div className="col-4 p-5 mb-2 mt-2" id="trading">
//           <h4 className="fw-normal mb-4 fs-5">
//             <i class="fa fa-globe" aria-hidden="true"></i> Buying & Selling
//           </h4>
//           <a href="/products" style={{ textDecoration: "none", lineHeight: "2.5" }}>
//             Getting started
//           </a>
//           <br />
//           <a href="/products" style={{ textDecoration: "none", lineHeight: "2.5" }}>
//             Placing an order
//           </a>
//           <br />
//           <a href="/support" style={{ textDecoration: "none", lineHeight: "2.5" }}>
//             Order history
//           </a>
//           <br />
//           <a href="/support" style={{ textDecoration: "none", lineHeight: "2.5" }}>
//             Trading FAQs
//           </a>
//           <br />
//         </div>
//         <div className="col-4 p-5 mb-2 mt-2" id="investments">
//           <h4 className="fw-normal mb-4 fs-5">
//             <i class="fa fa-money" aria-hidden="true"></i> Portfolio
//           </h4>
//           <a href="/products" style={{ textDecoration: "none", lineHeight: "2.5" }}>
//             Understanding your holdings
//           </a>
//           <br />
//           <a href="/support" style={{ textDecoration: "none", lineHeight: "2.5" }}>
//             Average buy price & P&L
//           </a>
//           <br />
//           <a href="/support" style={{ textDecoration: "none", lineHeight: "2.5" }}>
//             Portfolio FAQs
//           </a>
//           <br />
//         </div>
//         <div className="col-4 p-5 mb-2 mt-2" id="wallet">
//           <h4 className="fw-normal mb-4 fs-5">
//             <i class="fa fa-credit-card-alt" aria-hidden="true"></i> Your Wallet
//           </h4>
//           <a href="/pricing" style={{ textDecoration: "none", lineHeight: "2.5" }}>
//             How the ₹1,00,000 wallet works
//           </a>
//           <br />
//           <a href="/pricing" style={{ textDecoration: "none", lineHeight: "2.5" }}>
//             Resetting your wallet
//           </a>
//           <br />
//           <a href="/support" style={{ textDecoration: "none", lineHeight: "2.5" }}>
//             Why is everything free?
//           </a>
//           <br />
//         </div>
//         <div className="col-4 p-5 mb-2 mt-2">
//           <h4 className="fw-normal mb-4 fs-5">
//             <i class="fa fa-circle-o-notch" aria-hidden="true"></i> Learning
//           </h4>
//           <a href="/products" style={{ textDecoration: "none", lineHeight: "2.5" }}>
//             Getting started
//           </a>
//           <br />
//           <a href="/products" style={{ textDecoration: "none", lineHeight: "2.5" }}>
//             Stock market basics
//           </a>
//           <br />
//         </div>
//         <div className="col-4 p-5 mb-2 mt-2">
//           <h4 className="fw-normal mb-4 fs-5">
//             <i class="fa fa-phone" aria-hidden="true"></i> Technical Support
//           </h4>
//           <a href="mailto:support@vestora.com" style={{ textDecoration: "none", lineHeight: "2.5" }}>
//             Website issues
//           </a>
//           <br />
//           <a href="mailto:support@vestora.com" style={{ textDecoration: "none", lineHeight: "2.5" }}>
//             Login problems
//           </a>
//           <br />
//           <a href="mailto:support@vestora.com" style={{ textDecoration: "none", lineHeight: "2.5" }}>
//             Report a problem
//           </a>
//           <br />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CreateTicket;



import React from "react";

function CreateTicket() {
  const faqs = [
    {
      question: "Prices are not loading. Why?",
      answer:
        "Prices come from a free public data source that sometimes limits requests. Wait a few minutes and refresh. Until a price is available, buying is paused so no order is placed at a wrong price.",
    },
    {
      question: "How does a stop-loss work?",
      answer:
        "Open Holdings, choose Stop-loss on a stock and enter a price. If the stock falls to that price, Vestora sells it for you.",
    },
    {
      question: "Can I add more virtual money?",
      answer:
        "Every account starts with ₹1,00,000. There is no deposit or withdrawal because no real money is involved.",
    },
    {
      question: "How is the forecast made?",
      answer:
        "Vestora downloads two years of daily closing prices from Yahoo Finance and fits an ARIMA model. The result can change from day to day and cannot know about news. Use it to learn, not to decide.",
    },
    {
      question: "What do these stock terms mean?",
      answer:
        "Open the Glossary from the dashboard menu and look up any word.",
    },
  ];

  return (
    <section
      className="container-fluid px-5 px-md-4 px-lg-5 py-5"
      style={{  minHeight: "100vh" }}
    >
      <div className="container-fluid px-5">

        <div className="row g-4 align-items-start">

          {/* Left FAQ Section */}

          <div className="col-12 col-lg-7">

            <div className="d-flex flex-column gap-3">

              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-4 p-4 p-md-4"
                  style={{
                    backgroundColor: "#cecece",
                    color: "#164f3b",
                  }}
                >
                  <h4
                    className="fw-semibold mb-2"
                    style={{
                      fontSize: "clamp(19px, 1.6vw, 25px)",
                    }}
                  >
                    {faq.question}
                  </h4>

                  <p
                    className="mb-0"
                    style={{
                      fontSize: "clamp(16px, 1.3vw, 21px)",
                      lineHeight: 1.6,
                    }}
                  >
                    {faq.answer}
                  </p>

                </div>
              ))}

            </div>

          </div>


          {/* Right Contact Section */}

          <div className="col-12 col-lg-5">

            <div
              className="rounded-4 p-4 p-md-5"
              style={{
                backgroundColor: "#164f3b",
                color: "#f5f5f5",
              }}
            >

              <h6
                className="fw-bold mb-3"
                style={{
                  color: "#d1d1d1",
                  fontSize: "16px",
                  letterSpacing: "1px",
                }}
              >
                STILL STUCK?
              </h6>

              <h2
                className="mb-3"
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontSize: "clamp(28px, 2.5vw, 42px)",
                  fontWeight: 400,
                }}
              >
                Write to the team.
              </h2>

              <p
                className="mb-3"
                style={{
                  color: "#d1d1d1",
                  fontSize: "19px",
                }}
              >
                Email:{" "}
                <a
                  href="mailto:support@vestora.com"
                  className="text-decoration-none"
                  style={{ color: "#d1d1d1" }}
                >
                  [krishav929@gmail.com]
                </a>
              </p>

              <p
                className="mb-0"
                style={{
                  color: "#d1d1d1",
                  fontSize: "19px",
                  lineHeight: 1.6,
                }}
              >
                Include what you clicked and what you saw.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default CreateTicket;
