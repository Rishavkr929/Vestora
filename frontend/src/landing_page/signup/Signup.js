import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

// Toast Imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate(); // ⭐ React Router navigation

  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // ⭐ LOGIN API
        const res = await api.post("/api/auth/login", {
          email: formData.email,
          password: formData.password,
        });

        // ⭐ Save Token
        localStorage.setItem("token", res.data.token);

        // console.log("Saved Token:", localStorage.getItem("token"));

        toast.success("Login Successful 🚀");

        // ⭐ Navigate to Dashboard
        setTimeout(() => {
          navigate("/dashboard");
        }, 1200);
      } else {
        // ⭐ SIGNUP API
        await api.post("/api/auth/signup", formData);

        toast.success("Account Created Successfully 🎉");

        setIsLogin(true);

        setFormData({
          name: "",
          email: "",
          password: "",
        });
      }
    } catch (err) {
      console.log(err);

      if (err.response?.data?.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong ❌");
      }
    }
  };

  return (
    <>
      {/* ⭐ Toast Container */}
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="container-fluid min-vh-100">
        <div className="row min-vh-100">
          {/* LEFT SIDE */}
          {/* <div
            className="col-12 col-md-7 d-none d-md-flex flex-column justify-content-center align-items-center px-4 px-lg-5 py-5 border-end text-center"
            style={{ background: "#174D38" }}
          >
            <div className="w-100" style={{ maxWidth: "650px" }}>
              <h1 className="fw-bold mb-3 fs-3" style={{ color: "#F2F2F2" }}>
                Practice investing, risk-free
              </h1>

              <p className="fs-5" style={{ color: "#e5eae7ac" }}>
                Every Vestora account starts with a virtual ₹1,00,000 wallet.
                Buy and sell real-world stocks, track your gains and losses, and
                build the habits of investing before real money is ever on the
                line.
              </p>

              <div
                className="mt-4 mt-lg-5 mx-auto p-4"
                style={{
                  maxWidth: "420px",
                  borderRadius: "16px",
                  border: "1px solid #CBCBCB",
                  background: "#FFFFFF",
                  textAlign: "left",
                }}
              >
                <p className="text-muted mb-1" style={{ fontSize: "13px" }}>
                  Starting wallet balance
                </p>
                <h2 className="fw-bold mb-3" style={{ color: "#174D38" }}>
                  ₹1,00,000.00
                </h2>
                <p
                  className="text-muted mb-0"
                  style={{ fontSize: "13px", color: "#333333" }}
                >
                  No card, no real money — just a market to learn on.
                </p>
              </div>
            </div>
          </div> */}

          {/* LEFT SIDE - VESTORA HERO SECTION */}
          <div
            className="col-12 col-md-7 d-none d-md-flex  flex-column align-self-start align-self-md-stretch px-4 px-lg-5 py-4 py-md-5"
            style={{
              backgroundColor: "#174D38",
              color: "#F2F2F2",
            }}
          >
            {/* LOGO */}
            <div className="mb-4">
              <img
                src="media/image/VESTORA2.png"
                alt="Vestora"
                style={{
                  height: "clamp(42px, 5vw, 56px)",
                  width: "auto",
                  objectFit: "contain",
                }}
              />
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-grow-1 d-flex align-items-center py-5 py-md-0">
              <div className="w-100" style={{ maxWidth: "900px" }}>
                <h1
                  className="mb-4"
                  style={{
                    fontFamily: "Georgia, 'Times New Roman', serif",
                    fontSize: "clamp(40px, 4vw, 60px)",
                    fontWeight: "400",
                    lineHeight: "1.12",
                    letterSpacing: "-2px",
                    color: "#F2F2F2",
                  }}
                >
                  Your first ₹1,00,000 is on us.
                </h1>

                <p
                  className="mb-0"
                  style={{
                    fontSize: "clamp(16px, 1.4vw, 23px)",
                    lineHeight: "1.65",
                    color: "#CBCBCB",
                    maxWidth: "700px",
                  }}
                >
                  Practice with real NSE prices. Nothing you do here can cost
                  you real money.
                </p>
              </div>
            </div>

            {/* DISCLAIMER */}
            <div className="mt-3 mt-md-4">
              <p
                className="mb-0"
                style={{
                  fontSize: "clamp(0.9rem, 1.5vw, 1.25rem)",
                  lineHeight: "1.65",
                  color: "#CBCBCB",
                  maxWidth: "700px",
                }}
              >
                Vestora is an educational simulator, not a licensed broker, and
                does not give investment advice.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="col-12 col-md-5 d-flex align-items-center justify-content-center px-3 px-sm-4 py-5">
            <div className="w-100" style={{ maxWidth: "380px" }}>
              <h1 className="text-center mb-4 fs-3">
                {isLogin ? "Login to Continue" : "Create your Account"}
              </h1>

              {/* Toggle Buttons */}
              <div className="d-flex gap-2 mb-4">
                <button
                  type="button"
                  className={`btn flex-fill ${
                    isLogin ? "custom-signup-btn" : "custom-outline-btn"
                  }`}
                  onClick={() => setIsLogin(true)}
                >
                  Login
                </button>

                <button
                  type="button"
                  className={`btn flex-fill ${
                    !isLogin ? "custom-signup-btn" : "custom-outline-btn"
                  }`}
                  onClick={() => setIsLogin(false)}
                >
                  Signup
                </button>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit}>
                {/* Signup Only Field */}
                {!isLogin && (
                  <input
                    type="text"
                    className="form-control mb-3 py-2"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                )}

                {/* Email */}
                <input
                  type="email"
                  className="form-control mb-3 py-2"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                {/* Password */}
                <input
                  type="password"
                  className="form-control mb-4 py-2"
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="submit"
                  className="btn custom-signup-btn w-100 py-2"
                >
                  {isLogin ? "Login" : "Create Account"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
