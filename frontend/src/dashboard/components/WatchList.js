// import React, { useState, useContext, useEffect } from "react";
// import GeneralContext from "./GeneralContext";
// import { Tooltip, Grow } from "@mui/material";
// import {
//   BarChartOutlined,
//   KeyboardArrowDown,
//   KeyboardArrowUp,
//   MoreHoriz,
//   Close,
// } from "@mui/icons-material";

// import api from "../../utils/api";
// import { DoughnutChart } from "./DoughnoutChart";
// import StockChartModal from "./StockChartModal";
// import TrendModal from "./TrendModal";

// const MAX_WATCHLIST = 50;

// const WatchList = () => {
//   const [favourites, setFavourites] = useState([]); // full stock objects, live prices
//   const [search, setSearch] = useState("");
//   const [chartStock, setChartStock] = useState(null);
//   const [trendStock, setTrendStock] = useState(null);
//   const { refreshTrigger } = useContext(GeneralContext);

//   const load = () => {
//     Promise.all([api.get("/api/watchlist"), api.get("/api/stocks")]).then(
//       ([watchlistRes, stocksRes]) => {
//         const symbols = new Set(watchlistRes.data);
//         setFavourites(stocksRes.data.filter((s) => symbols.has(s.symbol)));
//       }
//     );
//   };

//   useEffect(() => {
//     load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [refreshTrigger]);

//   const handleRemove = async (symbol) => {
//     await api.delete(`/api/watchlist/${symbol}`);
//     load();
//   };

//   const visible = favourites.filter(
//     (s) =>
//       !search ||
//       s.symbol.toLowerCase().includes(search.toLowerCase()) ||
//       s.name.toLowerCase().includes(search.toLowerCase())
//   );

//   const data = {
//     labels: favourites.map((s) => s.symbol),
//     datasets: [
//       {
//         label: "Price",
//         data: favourites.map((s) => s.price || 0),
//         backgroundColor: ["#0071E3", "#5AC8FA", "#34C759", "#AF52DE", "#FF9500", "#6E6E73"],
//         borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="watchlist-container">
//       <div className="search-container">
//         <input
//           type="text"
//           name="search"
//           id="search"
//           placeholder="Search your watchlist"
//           className="search"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         />
//         <span className="counts"> {favourites.length} / {MAX_WATCHLIST}</span>
//       </div>

//       {favourites.length === 0 ? (
//         <p style={{ padding: "16px", fontSize: "13px", color: "#6e6e73" }}>
//           Your watchlist is empty.{" "}
//           <a href="/dashboard/stocks" style={{ color: "#0071E3" }}>
//             Browse all stocks
//           </a>{" "}
//           to add up to {MAX_WATCHLIST} favourites.
//         </p>
//       ) : (
//         <ul className="list">
//           {visible.map((stock) => (
//             <WatchListItem
//               stock={stock}
//               key={stock.symbol}
//               onRemove={handleRemove}
//               onChart={setChartStock}
//               onTrend={setTrendStock}
//             />
//           ))}
//         </ul>
//       )}

//       {favourites.length > 0 && <DoughnutChart data={data} />}

//       {chartStock && <StockChartModal stock={chartStock} onClose={() => setChartStock(null)} />}
//       {trendStock && <TrendModal stock={trendStock} onClose={() => setTrendStock(null)} />}
//     </div>
//   );
// };

// const WatchListItem = ({ stock, onRemove, onChart, onTrend }) => {
//   const [showWatchlistActions, setShowWatchlistActions] = useState(false);

//   const handleMouseEnter = () => setShowWatchlistActions(true);
//   const handleMouseLeave = () => setShowWatchlistActions(false);

//   const isDown = (stock.changePercent || 0) < 0;

//   return (
//     <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
//       <div className="item">
//         <p className={isDown ? "down" : "up"}>{stock.symbol}</p>

//         <div className="itemInfo">
//           <span className="percent">
//             {stock.changePercent != null ? `${stock.changePercent.toFixed(2)}%` : "—"}
//           </span>
//           {isDown ? <KeyboardArrowDown className="down" /> : <KeyboardArrowUp className="up" />}
//           <span className="price">{stock.price != null ? stock.price.toFixed(2) : "—"}</span>
//         </div>
//       </div>

//       {showWatchlistActions && (
//         <WatchListActions stock={stock} onRemove={onRemove} onChart={onChart} onTrend={onTrend} />
//       )}
//     </li>
//   );
// };

// const WatchListActions = ({ stock, onRemove, onChart, onTrend }) => {
//   const generalContext = useContext(GeneralContext);

//   return (
//     <span className="actions">
//       <span>
//         <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow} onClick={() => generalContext.openBuyWindow(stock)}>
//           <button className="buy">Buy</button>
//         </Tooltip>
//         <Tooltip title="Price chart" placement="top" arrow TransitionComponent={Grow} onClick={() => onChart(stock)}>
//           <button className="action">
//             <BarChartOutlined className="icon" />
//           </button>
//         </Tooltip>
//         <Tooltip title="Trend analysis" placement="top" arrow TransitionComponent={Grow} onClick={() => onTrend(stock)}>
//           <button className="action">
//             <MoreHoriz className="icon" />
//           </button>
//         </Tooltip>
//         <Tooltip title="Remove from watchlist" placement="top" arrow TransitionComponent={Grow} onClick={() => onRemove(stock.symbol)}>
//           <button className="action">
//             <Close className="icon" />
//           </button>
//         </Tooltip>
//       </span>
//     </span>
//   );
// };

// export default WatchList;




// import React, { useState, useContext, useEffect } from "react";
// import { Link } from "react-router-dom";
// import GeneralContext from "./GeneralContext";
// import { Tooltip, Grow } from "@mui/material";
// import {
//   KeyboardArrowDown,
//   KeyboardArrowUp,
// } from "@mui/icons-material";

// import api from "../../utils/api";
// import { DoughnutChart } from "./DoughnoutChart";
// import StockChartModal from "./StockChartModal";
// import TrendModal from "./TrendModal";

// const MAX_WATCHLIST = 50;

// const WatchList = () => {
//   const [favourites, setFavourites] = useState([]);
//   const [search, setSearch] = useState("");
//   const [activeStock, setActiveStock] = useState(null);
//   const [chartStock, setChartStock] = useState(null);
//   const [trendStock, setTrendStock] = useState(null);
//   const [isMobile, setIsMobile] = useState(
//     typeof window !== "undefined" && window.innerWidth <= 991
//   );

//   const { refreshTrigger } = useContext(GeneralContext);

//   // Responsive screen detection
//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth <= 991);
//     };

//     window.addEventListener("resize", handleResize);

//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Load watchlist
//   const load = async () => {
//     try {
//       const [watchlistRes, stocksRes] = await Promise.all([
//         api.get("/api/watchlist"),
//         api.get("/api/stocks"),
//       ]);

//       const symbols = new Set(watchlistRes.data);

//       setFavourites(
//         stocksRes.data.filter((stock) => symbols.has(stock.symbol))
//       );
//     } catch (error) {
//       console.error("Failed to load watchlist:", error);
//     }
//   };

//   useEffect(() => {
//     load();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [refreshTrigger]);

//   // Remove stock
//   const handleRemove = async (symbol) => {
//     try {
//       await api.delete(`/api/watchlist/${symbol}`);
//       setActiveStock(null);
//       await load();
//     } catch (error) {
//       console.error("Failed to remove stock:", error);
//     }
//   };

//   // Search filter
//   const visible = favourites.filter(
//     (stock) =>
//       stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
//       (stock.name || "").toLowerCase().includes(search.toLowerCase())
//   );

//   // Doughnut chart data
//   const data = {
//     labels: favourites.map((stock) => stock.symbol),
//     datasets: [
//       {
//         label: "Price",
//         data: favourites.map((stock) => stock.price || 0),
//         backgroundColor: [
//           "#174D3C",
//           "#477D68",
//           "#83A895",
//           "#B6CDBE",
//           "#A1856C",
//           "#C3A978",
//         ],
//         borderColor: "#F2F2EF",
//         borderWidth: 2,
//       },
//     ],
//   };

//   return (
//     <aside
//       style={{
//         width: isMobile ? "100%" : "450px",
//         minWidth: isMobile ? "0" : "450px",
//         maxWidth: isMobile ? "100%" : "450px",
//         flex: isMobile ? "0 0 100%" : "0 0 350px",
//         height: isMobile ? "auto" : "calc(100vh - 60px)",
//         minHeight: isMobile ? "auto" : "calc(100vh - 60px)",
//         maxHeight: isMobile ? "550px" : "none",
//         overflowY: "auto",
//         overflowX: "hidden",
//         boxSizing: "border-box",
//         backgroundColor: "#F2F2EF",
//         padding: isMobile ? "20px 16px" : "24px 20px",
//         color: "#174D3C",
//         borderRight: isMobile ? "none" : "1px solid #D8D8D5",
//         borderBottom: isMobile ? "1px solid #D8D8D5" : "none",
//         fontFamily: "Arial, sans-serif",
//       }}
//     >
//       {/* HEADER */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "20px",
//         }}
//       >
//         <h3
//           style={{
//             fontFamily: "Georgia, serif",
//             fontSize: "29px",
//             fontWeight: "400",
//             margin: 0,
//             color: "#174D3C",
//           }}
//         >
//           Watchlist
//         </h3>

//         <span
//           style={{
//             fontSize: "14px",
//             color: "#174D3C",
//           }}
//         >
//           {favourites.length} / {MAX_WATCHLIST}
//         </span>
//       </div>

//       {/* SEARCH */}
//       <div style={{ marginBottom: "16px" }}>
//         <input
//           type="text"
//           placeholder="Search your watchlist"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{
//             width: "100%",
//             height: "42px",
//             borderRadius: "30px",
//             border: "1px solid #477D68",
//             backgroundColor: "transparent",
//             color: "#174D3C",
//             fontSize: "14px",
//             padding: "10px 16px",
//             outline: "none",
//             boxSizing: "border-box",
//           }}
//         />
//       </div>

//       {/* STOCK LIST */}
//       {favourites.length === 0 ? (
//         <div
//           style={{
//             padding: "20px 4px",
//             color: "#477D68",
//             fontSize: "13px",
//           }}
//         >
//           Your watchlist is empty.
//           <br />
//           <Link
//             to="/dashboard/stocks"
//             style={{
//               color: "#174D3C",
//               fontWeight: "600",
//               textDecoration: "none",
//             }}
//           >
//             Browse all stocks →
//           </Link>
//         </div>
//       ) : visible.length === 0 ? (
//         <p
//           style={{
//             textAlign: "center",
//             padding: "20px 0",
//             color: "#477D68",
//             fontSize: "13px",
//           }}
//         >
//           No stocks found.
//         </p>
//       ) : (
//         <div>
//           {visible.map((stock) => (
//             <WatchListItem
//               key={stock.symbol}
//               stock={stock}
//               isActive={activeStock === stock.symbol}
//               onActivate={() =>
//                 setActiveStock(
//                   activeStock === stock.symbol ? null : stock.symbol
//                 )
//               }
//               onRemove={handleRemove}
//               onChart={setChartStock}
//               onTrend={setTrendStock}
//             />
//           ))}
//         </div>
//       )}

//       {/* BROWSE STOCKS */}
//       <div style={{ marginTop: "30px", marginBottom: "20px" }}>
//         <Link
//           to="/dashboard/stocks"
//           style={{
//             color: "#552020",
//             fontSize: "14px",
//             fontWeight: "600",
//             textDecoration: "none",
//           }}
//         >
//           Browse all stocks →
//         </Link>
//       </div>

//       {/* EXISTING DOUGHNUT CHART */}
//       {favourites.length > 0 && (
//         <div
//           style={{
//             marginTop: "20px",
//             padding: "16px 10px",
//             backgroundColor: "#FFFFFF",
//             borderRadius: "14px",
//             border: "1px solid #E2E5E0",
//           }}
//         >
//           <h6
//             style={{
//               color: "#174D3C",
//               fontWeight: "600",
//               marginBottom: "18px",
//               fontSize: "14px",
//             }}
//           >
//             Watchlist Overview
//           </h6>

//           <DoughnutChart data={data} />
//         </div>
//       )}

//       {/* MODALS */}
//       {chartStock && (
//         <StockChartModal
//           stock={chartStock}
//           onClose={() => setChartStock(null)}
//         />
//       )}

//       {trendStock && (
//         <TrendModal
//           stock={trendStock}
//           onClose={() => setTrendStock(null)}
//         />
//       )}
//     </aside>
//   );
// };

// // Individual stock row
// const WatchListItem = ({
//   stock,
//   isActive,
//   onActivate,
//   onRemove,
//   onChart,
//   onTrend,
// }) => {
//   const generalContext = useContext(GeneralContext);

//   const isDown = (stock.changePercent || 0) < 0;

//   const formattedPrice =
//     stock.price != null
//       ? stock.price.toLocaleString("en-IN", {
//           minimumFractionDigits: 2,
//           maximumFractionDigits: 2,
//         })
//       : "—";

//   return (
//     <div
//       onMouseEnter={() => {
//         if (window.matchMedia("(hover: hover)").matches) {
//           onActivate();
//         }
//       }}
//       onMouseLeave={() => {
//         if (window.matchMedia("(hover: hover)").matches) {
//           onActivate();
//         }
//       }}
//       style={{
//         backgroundColor: isActive ? "#D0D0CE" : "transparent",
//         borderRadius: "16px",
//         padding: "13px 16px",
//         marginBottom: "3px",
//         transition: "background-color 0.2s ease",
//         cursor: "pointer",
//       }}
//     >
//       {/* STOCK INFORMATION */}
//       <div
//         onClick={onActivate}
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           gap: "10px",
//         }}
//       >
//         <div style={{ minWidth: 0 }}>
//           <div
//             style={{
//               color: "#174D3C",
//               fontSize: "15px",
//               fontWeight: "700",
//               lineHeight: "20px",
//             }}
//           >
//             {stock.symbol}
//           </div>

//           <div
//             style={{
//               color: "#477D68",
//               fontSize: "12px",
//               marginTop: "2px",
//               overflow: "hidden",
//               textOverflow: "ellipsis",
//               whiteSpace: "nowrap",
//             }}
//           >
//             {stock.name}
//           </div>
//         </div>

//         <div style={{ textAlign: "right", flexShrink: 0 }}>
//           <div
//             style={{
//               color: "#174D3C",
//               fontSize: "15px",
//               fontWeight: "700",
//             }}
//           >
//             {formattedPrice}
//           </div>

//           <div
//             style={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "flex-end",
//               color: isDown ? "#592020" : "#175B43",
//               fontSize: "12px",
//               fontWeight: "600",
//             }}
//           >
//             {isDown ? (
//               <KeyboardArrowDown style={{ fontSize: "17px" }} />
//             ) : (
//               <KeyboardArrowUp style={{ fontSize: "17px" }} />
//             )}

//             {stock.changePercent != null
//               ? `${Math.abs(stock.changePercent).toFixed(2)}%`
//               : "—"}
//           </div>
//         </div>
//       </div>

//       {/* ACTION BUTTONS */}
//       {isActive && (
//         <div
//           style={{
//             display: "flex",
//             flexWrap: "wrap",
//             alignItems: "center",
//             gap: "6px",
//             marginTop: "10px",
//           }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <Tooltip title="Buy stock" arrow TransitionComponent={Grow}>
//             <button
//               onClick={() => generalContext.openBuyWindow(stock)}
//               style={buyButtonStyle}
//             >
//               Buy
//             </button>
//           </Tooltip>

//           <Tooltip title="Price chart" arrow TransitionComponent={Grow}>
//             <button
//               onClick={() => onChart(stock)}
//               style={actionButtonStyle}
//             >
//               Chart
//             </button>
//           </Tooltip>

//           <Tooltip title="Trend analysis" arrow TransitionComponent={Grow}>
//             <button
//               onClick={() => onTrend(stock)}
//               style={actionButtonStyle}
//             >
//               Trend
//             </button>
//           </Tooltip>

//           <Tooltip title="Remove from watchlist" arrow TransitionComponent={Grow}>
//             <button
//               onClick={() => onRemove(stock.symbol)}
//               style={actionButtonStyle}
//             >
//               Remove
//             </button>
//           </Tooltip>
//         </div>
//       )}
//     </div>
//   );
// };

// const buyButtonStyle = {
//   backgroundColor: "#175B43",
//   color: "#FFFFFF",
//   border: "1px solid #175B43",
//   borderRadius: "20px",
//   padding: "5px 14px",
//   fontSize: "12px",
//   fontWeight: "600",
//   cursor: "pointer",
// };

// const actionButtonStyle = {
//   backgroundColor: "transparent",
//   color: "#174D3C",
//   border: "1px solid #477D68",
//   borderRadius: "20px",
//   padding: "5px 12px",
//   fontSize: "12px",
//   fontWeight: "500",
//   cursor: "pointer",
// };

// export default WatchList;

import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";

import api, { cachedGet } from "../../utils/api";
import { DoughnutChart } from "./DoughnoutChart";
import StockChartModal from "./StockChartModal";
import TrendModal from "./TrendModal";

const MAX_WATCHLIST = 50;

const WatchList = () => {
  const [favourites, setFavourites] = useState([]);
  const [search, setSearch] = useState("");
  const [activeStock, setActiveStock] = useState(null);
  const [chartStock, setChartStock] = useState(null);
  const [trendStock, setTrendStock] = useState(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth <= 991
  );

  const { refreshTrigger } = useContext(GeneralContext);

  // Responsive screen detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 991);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Load watchlist
  const load = async () => {
    try {
      const [watchlistRes, stocksRes] = await Promise.all([
        api.get("/api/watchlist"),
        cachedGet("/api/stocks", 60000),
      ]);

      const symbols = new Set(watchlistRes.data);

      setFavourites(
        stocksRes.data.filter((stock) => symbols.has(stock.symbol))
      );
    } catch (error) {
      console.error("Failed to load watchlist:", error);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]);

  // Remove stock
  const handleRemove = async (symbol) => {
    try {
      await api.delete(`/api/watchlist/${symbol}`);
      setActiveStock(null);
      await load();
    } catch (error) {
      console.error("Failed to remove stock:", error);
    }
  };

  // Search filter
  const visible = favourites.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
      (stock.name || "").toLowerCase().includes(search.toLowerCase())
  );

  // Doughnut chart data
  const data = {
    labels: favourites.map((stock) => stock.symbol),
    datasets: [
      {
        label: "Price",
        data: favourites.map((stock) => stock.price || 0),
        backgroundColor: [
          "#174D3C",
          "#477D68",
          "#83A895",
          "#B6CDBE",
          "#A1856C",
          "#C3A978",
        ],
        borderColor: "#F2F2EF",
        borderWidth: 2,
      },
    ],
  };

  return (
    <aside
      style={{
        width: isMobile ? "100%" : "450px",
        minWidth: isMobile ? "0" : "450px",
        maxWidth: isMobile ? "100%" : "450px",
        flex: isMobile ? "0 0 100%" : "0 0 350px",
        height: isMobile ? "auto" : "calc(100vh - 60px)",
        minHeight: isMobile ? "auto" : "calc(100vh - 60px)",
        maxHeight: isMobile ? "550px" : "none",
        overflowY: "auto",
        overflowX: "hidden",
        boxSizing: "border-box",
        backgroundColor: "#F2F2EF",
        padding: isMobile ? "20px 16px" : "24px 20px",
        color: "#174D3C",
        borderRight: isMobile ? "none" : "1px solid #D8D8D5",
        borderBottom: isMobile ? "1px solid #D8D8D5" : "none",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h3
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "29px",
            fontWeight: "400",
            margin: 0,
            color: "#174D3C",
          }}
        >
          Watchlist
        </h3>

        <span
          style={{
            fontSize: "14px",
            color: "#174D3C",
          }}
        >
          {favourites.length} / {MAX_WATCHLIST}
        </span>
      </div>

      {/* SEARCH */}
      <div style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Search your watchlist"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            height: "42px",
            borderRadius: "30px",
            border: "1px solid #477D68",
            backgroundColor: "transparent",
            color: "#174D3C",
            fontSize: "14px",
            padding: "10px 16px",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
      </div>

      {/* STOCK LIST */}
      {favourites.length === 0 ? (
        <div
          style={{
            padding: "20px 4px",
            color: "#477D68",
            fontSize: "13px",
          }}
        >
          Your watchlist is empty.
          <br />
          <Link
            to="/dashboard/stocks"
            style={{
              color: "#174D3C",
              fontWeight: "600",
              textDecoration: "none",
            }}
          >
            Browse all stocks →
          </Link>
        </div>
      ) : visible.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            padding: "20px 0",
            color: "#477D68",
            fontSize: "13px",
          }}
        >
          No stocks found.
        </p>
      ) : (
        <div>
          {visible.map((stock) => (
            <WatchListItem
              key={stock.symbol}
              stock={stock}
              isActive={activeStock === stock.symbol}
              onActivate={() =>
                setActiveStock(
                  activeStock === stock.symbol ? null : stock.symbol
                )
              }
              onRemove={handleRemove}
              onChart={setChartStock}
              onTrend={setTrendStock}
            />
          ))}
        </div>
      )}

      {/* BROWSE STOCKS */}
      <div style={{ marginTop: "30px", marginBottom: "20px" }}>
        <Link
          to="/dashboard/stocks"
          style={{
            color: "#552020",
            fontSize: "14px",
            fontWeight: "600",
            textDecoration: "none",
          }}
        >
          Browse all stocks →
        </Link>
      </div>

      {/* EXISTING DOUGHNUT CHART */}
      {favourites.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            padding: "16px 10px",
            backgroundColor: "#FFFFFF",
            borderRadius: "14px",
            border: "1px solid #E2E5E0",
          }}
        >
          <h6
            style={{
              color: "#174D3C",
              fontWeight: "600",
              marginBottom: "18px",
              fontSize: "14px",
            }}
          >
            Watchlist Overview
          </h6>

          <DoughnutChart data={data} />
        </div>
      )}

      {/* MODALS */}
      {chartStock && (
        <StockChartModal
          stock={chartStock}
          onClose={() => setChartStock(null)}
        />
      )}

      {trendStock && (
        <TrendModal
          stock={trendStock}
          onClose={() => setTrendStock(null)}
        />
      )}
    </aside>
  );
};

// Individual stock row
const WatchListItem = ({
  stock,
  isActive,
  onActivate,
  onRemove,
  onChart,
  onTrend,
}) => {
  const generalContext = useContext(GeneralContext);

  const isDown = (stock.changePercent || 0) < 0;

  const formattedPrice =
    stock.price != null
      ? stock.price.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "—";

  return (
    <div
      onMouseEnter={() => {
        if (window.matchMedia("(hover: hover)").matches) {
          onActivate();
        }
      }}
      onMouseLeave={() => {
        if (window.matchMedia("(hover: hover)").matches) {
          onActivate();
        }
      }}
      style={{
        backgroundColor: isActive ? "#D0D0CE" : "transparent",
        borderRadius: "16px",
        padding: "13px 16px",
        marginBottom: "3px",
        transition: "background-color 0.2s ease",
        cursor: "pointer",
      }}
    >
      {/* STOCK INFORMATION */}
      <div
        onClick={onActivate}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              color: "#174D3C",
              fontSize: "15px",
              fontWeight: "700",
              lineHeight: "20px",
            }}
          >
            {stock.symbol}
          </div>

          <div
            style={{
              color: "#477D68",
              fontSize: "12px",
              marginTop: "2px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {stock.name}
          </div>
        </div>

        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <div
            style={{
              color: "#174D3C",
              fontSize: "15px",
              fontWeight: "700",
            }}
          >
            {formattedPrice}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              color: isDown ? "#592020" : "#175B43",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            {isDown ? (
              <KeyboardArrowDown style={{ fontSize: "17px" }} />
            ) : (
              <KeyboardArrowUp style={{ fontSize: "17px" }} />
            )}

            {stock.changePercent != null
              ? `${Math.abs(stock.changePercent).toFixed(2)}%`
              : "—"}
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      {isActive && (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "6px",
            marginTop: "10px",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <Tooltip title="Buy stock" arrow TransitionComponent={Grow}>
            <button
              onClick={() => generalContext.openBuyWindow(stock)}
              style={buyButtonStyle}
            >
              Buy
            </button>
          </Tooltip>

          <Tooltip title="Price chart" arrow TransitionComponent={Grow}>
            <button
              onClick={() => onChart(stock)}
              style={actionButtonStyle}
            >
              Chart
            </button>
          </Tooltip>

          <Tooltip title="Trend analysis" arrow TransitionComponent={Grow}>
            <button
              onClick={() => onTrend(stock)}
              style={actionButtonStyle}
            >
              Trend
            </button>
          </Tooltip>

          <Tooltip title="Remove from watchlist" arrow TransitionComponent={Grow}>
            <button
              onClick={() => onRemove(stock.symbol)}
              style={actionButtonStyle}
            >
              Remove
            </button>
          </Tooltip>
        </div>
      )}
    </div>
  );
};

const buyButtonStyle = {
  backgroundColor: "#175B43",
  color: "#FFFFFF",
  border: "1px solid #175B43",
  borderRadius: "20px",
  padding: "5px 14px",
  fontSize: "12px",
  fontWeight: "600",
  cursor: "pointer",
};

const actionButtonStyle = {
  backgroundColor: "transparent",
  color: "#174D3C",
  border: "1px solid #477D68",
  borderRadius: "20px",
  padding: "5px 12px",
  fontSize: "12px",
  fontWeight: "500",
  cursor: "pointer",
};

export default WatchList;
