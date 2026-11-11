import React from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const navStyle = ({ isActive }) => ({
    color: isActive ? "#174D38" : "#333333",
    fontWeight: isActive ? "700" : "300",
  });

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom sticky-top"
      style={{ backgroundColor: "#F2F2F2" }}
    >
      <div className="container p-2 navbar-container">
        {/* LOGO → HOME → NEVER BLUE */}
        <Link className="navbar-brand" to="/">
          <img
            src="media/image/vestora.png"
            style={{ width: "30%" }}
            alt="logo"
            className="vestora-logo"
          />
        </Link>

        <button
          className="navbar-toggler ms-auto"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-0 ms-lg-auto">
            <li className="nav-item">
              <NavLink to="/signup" className="nav-link" style={navStyle}>
                Signup
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/about" className="nav-link" style={navStyle}>
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/products" className="nav-link" style={navStyle}>
                Products
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/pricing" className="nav-link" style={navStyle}>
                Pricing
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink to="/support" className="nav-link" style={navStyle}>
                Support
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
