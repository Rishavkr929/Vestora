// import React from "react";
// import { Route, Routes } from "react-router-dom";

// import Apps from "./Apps";
// import Funds from "./Funds";
// import Holdings from "./Holdings";

// import Orders from "./Orders";
// import Positions from "./Positions";
// import Summary from "./Summary";
// import WatchList from "./WatchList";
// import AllStocks from "./AllStocks";
// import Journal from "./Journal";
// import Quiz from "./Quiz";
// import Insights from "./Insights";
// import { GeneralContextProvider } from "./GeneralContext";

// const Dashboard = () => {
//   return (
//     <GeneralContextProvider>
//       <div className="dashboard-container">
//         <div
//           style={{
//             display: "flex",
//             width: "100%",
//             minHeight: "calc(100vh - 60px)",
//             backgroundColor: "#F2F2EF",
//             flexDirection: window.innerWidth <= 991 ? "column" : "row",
//           }}
//         >
//           <WatchList />

//           <main
//             style={{
//               flex: 1,
//               minWidth: 0,
//               padding: "30px",
//               overflowX: "auto",
//             }}
//           >
//             {/* Existing dashboard content */}
//           </main>
//         </div>
//         <div className="content">
//           <Routes>
//             <Route exact path="/" element={<Summary />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/holdings" element={<Holdings />} />
//             <Route path="/positions" element={<Positions />} />
//             <Route path="/funds" element={<Funds />} />
//             <Route path="/apps" element={<Apps />} />
//             <Route path="/stocks" element={<AllStocks />} />
//             <Route path="/journal" element={<Journal />} />
//             <Route path="/quiz" element={<Quiz />} />
//             <Route path="/insights" element={<Insights />} />
//           </Routes>
//         </div>
//       </div>
//     </GeneralContextProvider>
//   );
// };

// export default Dashboard;



import React, { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import AllStocks from "./AllStocks";
import Journal from "./Journal";
import Quiz from "./Quiz";
import Insights from "./Insights";

import { GeneralContextProvider } from "./GeneralContext";

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(
    window.innerWidth <= 991
  );

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <GeneralContextProvider>
      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: "100%",
          minHeight: "calc(100vh - 60px)",
          backgroundColor: "#F2F2EF",
          overflow: "hidden",
        }}
      >
        {/* LEFT SIDEBAR - WATCHLIST */}
        <WatchList />

        {/* MAIN DASHBOARD CONTENT */}
        <main
          style={{
            flex: 1,
            minWidth: 0,
            width: isMobile ? "100%" : "auto",
            padding: isMobile ? "20px 15px" : "30px 35px",
            boxSizing: "border-box",
            overflowX: "hidden",
            backgroundColor: "#F2F2EF",
          }}
        >
          <Routes>
            <Route path="/" element={<Summary />} />

            <Route path="/orders" element={<Orders />} />

            <Route path="/holdings" element={<Holdings />} />

            <Route path="/positions" element={<Positions />} />

            <Route path="/funds" element={<Funds />} />

            <Route path="/apps" element={<Apps />} />

            <Route path="/stocks" element={<AllStocks />} />

            <Route path="/journal" element={<Journal />} />

            <Route path="/quiz" element={<Quiz />} />

            <Route path="/insights" element={<Insights />} />
          </Routes>
        </main>
      </div>
    </GeneralContextProvider>
  );
};

export default Dashboard;
