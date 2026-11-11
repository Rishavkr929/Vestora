import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Landing Pages
import HomePage from "./landing_page/home/HomePage";
import Signup from "./landing_page/signup/Signup";
import AboutPage from "./landing_page/about/AboutPage";
import ProductPage from "./landing_page/products/ProductPage";
import PricingPage from "./landing_page/pricing/PricingPage";
import SupportPage from "./landing_page/support/SupportPage";

// Dashboard
import DashboardHome from "./dashboard/components/Home";

// Layouts
import Navbar from "./landing_page/Navbar";
import Footer from "./landing_page/Footer";
import NotFound from "./landing_page/NotFound";

// ⭐ Landing Layout Wrapper
const LandingLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="flex-grow-1">
        {children}
      </main>

      <Footer />
    </div>
  );
};


// ⭐ Dashboard Layout Wrapper
const DashboardLayout = ({ children }) => {
  return <>{children}</>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {/* Landing Pages */}
      <Route
        path="/"
        element={
          <LandingLayout>
            <HomePage />
          </LandingLayout>
        }
      />

      <Route
        path="/signup"
        element={
          <LandingLayout>
            <Signup />
          </LandingLayout>
        }
      />

      <Route
        path="/about"
        element={
          <LandingLayout>
            <AboutPage />
          </LandingLayout>
        }
      />

      <Route
        path="/products"
        element={
          <LandingLayout>
            <ProductPage />
          </LandingLayout>
        }
      />

      <Route
        path="/pricing"
        element={
          <LandingLayout>
            <PricingPage />
          </LandingLayout>
        }
      />

      <Route
        path="/support"
        element={
          <LandingLayout>
            <SupportPage />
          </LandingLayout>
        }
      />

      {/* ⭐ Dashboard (NO Landing Layout) */}
      <Route path="/dashboard/*" element={<DashboardHome />} />

      {/* Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>

    <ToastContainer position="top-right" autoClose={2000} />
  </BrowserRouter>,
);
