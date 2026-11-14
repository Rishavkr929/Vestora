// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { toast } from "react-toastify";
// import api from "../../utils/api";

// const Menu = () => {
//   const [selectedMenu, setSelectedMenu] = useState(0);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [userEmail, setUserEmail] = useState("USER");
//   const [userInitials, setUserInitials] = useState("U");
//   const [walletBalance, setWalletBalance] = useState(null);

//   const navigate = useNavigate();

//   // ⭐ LOGOUT FUNCTION
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     toast.success("Logged out successfully");
//     setTimeout(() => {
//       navigate("/");
//     }, 1200);
//   };

//   // ⭐ TOKEN + AUTO LOGOUT CHECK
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/");
//       return;
//     }

//     try {
//       const decoded = jwtDecode(token);
//       setUserEmail(decoded.email || "User");
//       const initials = (decoded.email || "U").substring(0, 2).toUpperCase();
//       setUserInitials(initials);

//       if (decoded.exp) {
//         const expiryTime = decoded.exp * 1000 - Date.now();
//         if (expiryTime <= 0) {
//           handleLogout();
//         } else {
//           setTimeout(() => {
//             handleLogout();
//           }, expiryTime);
//         }
//       }
//     } catch (err) {
//       console.error("Token decode error");
//       handleLogout();
//       return;
//     }

//     api
//       .get("/api/auth/me")
//       .then((res) => setWalletBalance(res.data.walletBalance))
//       .catch(() => {});
//   }, []);  // eslint-disable-next-line react-hooks/exhaustive-deps

//   const handleMenuClick = (index) => {
//     setSelectedMenu(index);
//   };

//   const handleProfileClick = () => {
//     setIsProfileDropdownOpen(!isProfileDropdownOpen);
//   };

//   const menuClass = "menu";
//   const activeMenuClass = "menu selected";

//   return (
//     <div className="menu-container">
//       <img src="/media/image/logo2.png" alt="Vestora" style={{ width: "50px" }} />
//       {/* 1. Navigation Links Section */}
//       <div className="menus">
//         <ul>
//           <li>
//             <Link to="/dashboard" onClick={() => handleMenuClick(0)}>
//               <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
//                 Dashboard
//               </p>
//             </Link>
//           </li>
//           <li>
//             <Link to="/dashboard/orders" onClick={() => handleMenuClick(1)}>
//               <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
//                 Orders
//               </p>
//             </Link>
//           </li>
//           <li>
//             <Link to="/dashboard/holdings" onClick={() => handleMenuClick(2)}>
//               <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
//                 Holdings
//               </p>
//             </Link>
//           </li>
//           <li>
//             <Link to="/dashboard/positions" onClick={() => handleMenuClick(3)}>
//               <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
//                 Positions
//               </p>
//             </Link>
//           </li>
//           <li>
//             <Link to="/dashboard/funds" onClick={() => handleMenuClick(4)}>
//               <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
//                 Funds
//               </p>
//             </Link>
//           </li>
//           <li>
//             <Link to="/dashboard/stocks" onClick={() => handleMenuClick(6)}>
//               <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
//                 All Stocks
//               </p>
//             </Link>
//           </li>
//           <li>
//             <Link to="/dashboard/journal" onClick={() => handleMenuClick(7)}>
//               <p className={selectedMenu === 7 ? activeMenuClass : menuClass}>
//                 Journal
//               </p>
//             </Link>
//           </li>
//           <li>
//             <Link to="/dashboard/quiz" onClick={() => handleMenuClick(8)}>
//               <p className={selectedMenu === 8 ? activeMenuClass : menuClass}>
//                 Quiz
//               </p>
//             </Link>
//           </li>
//           <li>
//             <Link to="/dashboard/insights" onClick={() => handleMenuClick(9)}>
//               <p className={selectedMenu === 9 ? activeMenuClass : menuClass}>
//                 Insights
//               </p>
//             </Link>
//           </li>
//           <li>
//             <Link to="/dashboard/apps" onClick={() => handleMenuClick(5)}>
//               <p className={selectedMenu === 5 ? activeMenuClass : menuClass}>
//                 Apps
//               </p>
//             </Link>
//           </li>
//         </ul>
//         <hr />

//         <div className="profile-section">
//           <div className="profile" onClick={handleProfileClick}>
//             <div className="avatar">{userInitials}</div>
//             <p className="username">{userEmail}</p>
//             {walletBalance !== null && (
//               <p className="username" style={{ fontSize: "12px", opacity: 0.75 }}>
//                 ₹{walletBalance.toLocaleString("en-IN")}
//               </p>
//             )}
//           </div>

//           {isProfileDropdownOpen && (
//             <div className="profile-dropdown">
//               <div onClick={handleLogout} className="dropdown-item">
//                 Logout
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Menu;

// import React, { useState, useEffect } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import { toast } from "react-toastify";
// import api from "../../utils/api";

// const Menu = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
//   const [userInitials, setUserInitials] = useState("U");
//   const [walletBalance, setWalletBalance] = useState(null);

//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     toast.success("Logged out successfully");
//     setTimeout(() => navigate("/"), 1200);
//   };

//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       navigate("/");
//       return;
//     }

//     let logoutTimer;

//     try {
//       const decoded = jwtDecode(token);

//       const initials = (decoded.email || "U").substring(0, 2).toUpperCase();

//       setUserInitials(initials);

//       if (decoded.exp) {
//         const expiryTime = decoded.exp * 1000 - Date.now();

//         if (expiryTime <= 0) {
//           handleLogout();
//         } else {
//           logoutTimer = setTimeout(handleLogout, expiryTime);
//         }
//       }
//     } catch (error) {
//       console.error("Token decode error:", error);
//       handleLogout();
//       return;
//     }

//     api
//       .get("/api/auth/me")
//       .then((res) => setWalletBalance(res.data.walletBalance))
//       .catch((error) => console.error("Wallet fetch failed:", error));

//     return () => clearTimeout(logoutTimer);
//   }, [navigate]);

//   const navigationItems = [
//     { label: "Dashboard", path: "/dashboard" },
//     { label: "Orders", path: "/dashboard/orders" },
//     { label: "Holdings", path: "/dashboard/holdings" },
//     { label: "Positions", path: "/dashboard/positions" },
//     { label: "Funds", path: "/dashboard/funds" },
//     { label: "All Stocks", path: "/dashboard/stocks" },
//     { label: "Journal", path: "/dashboard/journal" },
//     { label: "Insights", path: "/dashboard/insights" },
//   ];

//   const isActive = (path) => {
//     if (path === "/dashboard") {
//       return location.pathname === "/dashboard";
//     }

//     return location.pathname.startsWith(path);
//   };

//   const closeMobileMenu = () => {
//     setIsMobileMenuOpen(false);
//     setIsProfileDropdownOpen(false);
//   };

//   return (
//     <nav
//       className="navbar navbar-expand-lg w-100"
//       style={{
//         backgroundColor: "#174D3C",
//         minHeight: "82px",
//         padding: "10px 2.2%",
//         fontFamily: "Arial, sans-serif",
//         position: "relative",
//         zIndex: 1000,
//       }}
//     >
//       <div className="container-fluid p-0">
//         {/* BRAND */}
//         <Link
//           to="/dashboard"
//           onClick={closeMobileMenu}
//           className="navbar-brand d-flex align-items-center m-0"
//           style={{ textDecoration: "none" }}
//         >
//           <img
//             src="media/image/VESTORA2.png"
//             alt="Vestora"
//             style={{
//               height: "48px",
//               width: "auto",
//               maxWidth: "180px",
//               objectFit: "contain",
//             }}
//           />
//         </Link>

//         {/* MOBILE TOGGLE */}
//         <button
//           className="navbar-toggler border-0 shadow-none"
//           type="button"
//           onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
//           aria-label="Toggle navigation"
//           aria-expanded={isMobileMenuOpen}
//           style={{ color: "#FFFFFF" }}
//         >
//           <span
//             style={{
//               fontSize: "29px",
//               color: "#FFFFFF",
//               lineHeight: 1,
//             }}
//           >
//             {isMobileMenuOpen ? "×" : "☰"}
//           </span>
//         </button>

//         {/* NAVIGATION CONTENT */}
//         <div
//           className={`${
//             isMobileMenuOpen ? "d-flex" : "d-none"
//           } d-lg-flex flex-column flex-lg-row align-items-lg-center flex-grow-1`}
//           style={{
//             justifyContent: "space-between",
//             width: "100%",
//           }}
//         >
//           {/* NAV LINKS */}
//           <ul
//             className="navbar-nav flex-column flex-lg-row align-items-lg-center mx-lg-auto my-3 my-lg-0"
//             style={{ gap: "8px" }}
//           >
//             {navigationItems.map((item) => (
//               <li className="nav-item" key={item.label}>
//                 <Link
//                   to={item.path}
//                   onClick={closeMobileMenu}
//                   className="nav-link text-center"
//                   style={{
//                     color: isActive(item.path) ? "#174D3C" : "#D5DED9",
//                     backgroundColor: isActive(item.path)
//                       ? "#F4F4F0"
//                       : "transparent",
//                     borderRadius: "30px",
//                     padding: "10px 19px",
//                     fontSize: "16px",
//                     fontWeight: isActive(item.path) ? "600" : "500",
//                     whiteSpace: "nowrap",
//                     transition: "all 0.2s ease",
//                   }}
//                 >
//                   {item.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           {/* RIGHT SECTION */}
//           <div className="d-flex flex-column flex-lg-row align-items-center gap-3 pb-3 pb-lg-0">
//             {/* WALLET */}
//             <div
//               className="d-flex align-items-center justify-content-center"
//               style={{
//                 border: "1px solid #A8C0B5",
//                 borderRadius: "30px",
//                 padding: "9px 20px",
//                 color: "#E0E8E3",
//                 fontSize: "16px",
//                 fontWeight: "600",
//                 whiteSpace: "nowrap",
//               }}
//             >
//               Wallet&nbsp;
//               {walletBalance !== null
//                 ? `₹${Number(walletBalance).toLocaleString("en-IN", {
//                     minimumFractionDigits: 2,
//                     maximumFractionDigits: 2,
//                   })}`
//                 : "Loading..."}
//             </div>

//             {/* PROFILE */}
//             <div className="position-relative">
//               <button
//                 onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
//                 className="border-0 d-flex align-items-center justify-content-center"
//                 aria-label="Profile menu"
//                 aria-expanded={isProfileDropdownOpen}
//                 style={{
//                   width: "48px",
//                   height: "48px",
//                   borderRadius: "50%",
//                   backgroundColor: "#D8D9D6",
//                   color: "#174D3C",
//                   fontWeight: "700",
//                   fontSize: "16px",
//                   cursor: "pointer",
//                 }}
//               >
//                 {userInitials}
//               </button>

//               {isProfileDropdownOpen && (
//                 <div
//                   className="position-absolute end-0 mt-2 shadow"
//                   style={{
//                     minWidth: "150px",
//                     backgroundColor: "#FFFFFF",
//                     borderRadius: "10px",
//                     overflow: "hidden",
//                   }}
//                 >
//                   <button
//                     onClick={handleLogout}
//                     className="btn w-100 text-start px-3 py-2"
//                     style={{
//                       color: "#174D3C",
//                       fontWeight: "500",
//                     }}
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Menu;


import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import api, { cachedGet, clearApiCache } from "../../utils/api";

const Menu = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [userInitials, setUserInitials] = useState("U");
  const [walletBalance, setWalletBalance] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearApiCache();
    toast.success("Logged out successfully");
    setTimeout(() => navigate("/"), 1200);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    let logoutTimer;

    try {
      const decoded = jwtDecode(token);

      const initials = (decoded.email || "U").substring(0, 2).toUpperCase();

      setUserInitials(initials);

      if (decoded.exp) {
        const expiryTime = decoded.exp * 1000 - Date.now();

        if (expiryTime <= 0) {
          handleLogout();
        } else {
          logoutTimer = setTimeout(handleLogout, expiryTime);
        }
      }
    } catch (error) {
      console.error("Token decode error:", error);
      handleLogout();
      return;
    }

    cachedGet("/api/auth/me")
      .then((res) => setWalletBalance(res.data.walletBalance))
      .catch((error) => console.error("Wallet fetch failed:", error));

    return () => clearTimeout(logoutTimer);
  }, [navigate]);

  const navigationItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Orders", path: "/dashboard/orders" },
    { label: "Holdings", path: "/dashboard/holdings" },
    { label: "Positions", path: "/dashboard/positions" },
    { label: "Funds", path: "/dashboard/funds" },
    { label: "All Stocks", path: "/dashboard/stocks" },
    { label: "Journal", path: "/dashboard/journal" },
    { label: "Insights", path: "/dashboard/insights" },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") {
      return location.pathname === "/dashboard";
    }

    return location.pathname.startsWith(path);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  };

  return (
    <nav
      className="navbar navbar-expand-lg w-100"
      style={{
        backgroundColor: "#174D3C",
        minHeight: "82px",
        padding: "10px 2.2%",
        fontFamily: "Arial, sans-serif",
        position: "relative",
        zIndex: 1000,
      }}
    >
      <div className="container-fluid p-0">
        {/* BRAND */}
        <Link
          to="/dashboard"
          onClick={closeMobileMenu}
          className="navbar-brand d-flex align-items-center m-0"
          style={{ textDecoration: "none" }}
        >
          <img
            src="media/image/VESTORA2.png"
            alt="Vestora"
            style={{
              height: "48px",
              width: "auto",
              maxWidth: "180px",
              objectFit: "contain",
            }}
          />
        </Link>

        {/* MOBILE TOGGLE */}
        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={isMobileMenuOpen}
          style={{ color: "#FFFFFF" }}
        >
          <span
            style={{
              fontSize: "29px",
              color: "#FFFFFF",
              lineHeight: 1,
            }}
          >
            {isMobileMenuOpen ? "×" : "☰"}
          </span>
        </button>

        {/* NAVIGATION CONTENT */}
        <div
          className={`${
            isMobileMenuOpen ? "d-flex" : "d-none"
          } d-lg-flex flex-column flex-lg-row align-items-lg-center flex-grow-1`}
          style={{
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* NAV LINKS */}
          <ul
            className="navbar-nav flex-column flex-lg-row align-items-lg-center mx-lg-auto my-3 my-lg-0"
            style={{ gap: "8px" }}
          >
            {navigationItems.map((item) => (
              <li className="nav-item" key={item.label}>
                <Link
                  to={item.path}
                  onClick={closeMobileMenu}
                  className="nav-link text-center"
                  style={{
                    color: isActive(item.path) ? "#174D3C" : "#D5DED9",
                    backgroundColor: isActive(item.path)
                      ? "#F4F4F0"
                      : "transparent",
                    borderRadius: "30px",
                    padding: "10px 19px",
                    fontSize: "16px",
                    fontWeight: isActive(item.path) ? "600" : "500",
                    whiteSpace: "nowrap",
                    transition: "all 0.2s ease",
                  }}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* RIGHT SECTION */}
          <div className="d-flex flex-column flex-lg-row align-items-center gap-3 pb-3 pb-lg-0">
            {/* WALLET */}
            <div
              className="d-flex align-items-center justify-content-center"
              style={{
                border: "1px solid #A8C0B5",
                borderRadius: "30px",
                padding: "9px 20px",
                color: "#E0E8E3",
                fontSize: "16px",
                fontWeight: "600",
                whiteSpace: "nowrap",
              }}
            >
              Wallet&nbsp;
              {walletBalance !== null
                ? `₹${Number(walletBalance).toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                : "Loading..."}
            </div>

            {/* PROFILE */}
            <div className="position-relative">
              <button
                onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                className="border-0 d-flex align-items-center justify-content-center"
                aria-label="Profile menu"
                aria-expanded={isProfileDropdownOpen}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  backgroundColor: "#D8D9D6",
                  color: "#174D3C",
                  fontWeight: "700",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                {userInitials}
              </button>

              {isProfileDropdownOpen && (
                <div
                  className="position-absolute end-0 mt-2 shadow"
                  style={{
                    minWidth: "150px",
                    backgroundColor: "#FFFFFF",
                    borderRadius: "10px",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={handleLogout}
                    className="btn w-100 text-start px-3 py-2"
                    style={{
                      color: "#174D3C",
                      fontWeight: "500",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;