import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navStyle = ({ isActive }) => ({
    color: "#174D38",
    fontWeight: isActive ? "700" : "500",
    textDecoration: "none",
  });

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav
      className="navbar sticky-top"
      style={{ backgroundColor: "#F2F2F2" }}
    >
      <div className="container py-2">

        {/* Logo */}
        <Link
          to="/"
          className="navbar-brand d-flex align-items-center me-0"
          onClick={closeMenu}
        >
          <img
            src="media/image/VESTORA2.png"
            alt="Vestora"
            style={{
              width: "160px",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="d-none d-lg-flex align-items-center gap-4 mx-auto">
          <NavLink to="/products" style={navStyle}>
            <span className="fs-5">How it works</span>
          </NavLink>

          <NavLink to="/pricing" style={navStyle}>
            <span className="fs-5">Pricing</span>
          </NavLink>

          <NavLink to="/about" style={navStyle}>
            <span className="fs-5">About</span>
          </NavLink>

          <NavLink to="/support" style={navStyle}>
            <span className="fs-5">Support</span>
          </NavLink>

          <NavLink to="/glossary" style={navStyle}>
            <span className="fs-5">Glossary</span>
          </NavLink>
        </div>

        {/* Desktop Signup */}
        <div className="d-none d-lg-block">
          <NavLink
            to="/signup"
            className="btn rounded-pill px-4 py-3 fw-semibold"
            style={{
              backgroundColor: "#4D1717",
              color: "#F2F2F2",
              minWidth: "145px",
              border: "none",
            }}
          >
            Sign up
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler border-0 shadow-none d-lg-none"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Mobile Menu */}
        <div
          className={`collapse ${menuOpen ? "show" : ""} d-lg-none w-100`}
        >
          <div className="d-flex flex-column align-items-stretch gap-2 pt-3 pb-2">

            <NavLink
              to="/products"
              className="py-2"
              style={navStyle}
              onClick={closeMenu}
            >
              How it works
            </NavLink>

            <NavLink
              to="/pricing"
              className="py-2"
              style={navStyle}
              onClick={closeMenu}
            >
              Pricing
            </NavLink>

            <NavLink
              to="/about"
              className="py-2"
              style={navStyle}
              onClick={closeMenu}
            >
              About
            </NavLink>

            <NavLink
              to="/support"
              className="py-2"
              style={navStyle}
              onClick={closeMenu}
            >
              Support
            </NavLink>

            <NavLink
              to="/signup"
              className="btn rounded-pill py-2 mt-2 fw-semibold"
              style={{
                backgroundColor: "#4D1717",
                color: "#F2F2F2",
                border: "none",
              }}
              onClick={closeMenu}
            >
              Sign up
            </NavLink>

          </div>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;

