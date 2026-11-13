// import React, { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import api from "../../utils/api";
// import StockChartModal from "./StockChartModal";
// import TrendModal from "./TrendModal";

// const MAX_WATCHLIST = 50;

// const AllStocks = () => {
//   const [stocks, setStocks] = useState([]);
//   const [favourites, setFavourites] = useState([]); // symbols
//   const [search, setSearch] = useState("");
//   const [chartStock, setChartStock] = useState(null);
//   const [trendStock, setTrendStock] = useState(null);

//   const load = () => {
//     api.get("/api/stocks").then((res) => setStocks(res.data));
//     api.get("/api/watchlist").then((res) => setFavourites(res.data));
//   };

//   useEffect(load, []);

//   const toggleFavourite = async (symbol) => {
//     try {
//       if (favourites.includes(symbol)) {
//         await api.delete(`/api/watchlist/${symbol}`);
//       } else {
//         await api.post(`/api/watchlist/${symbol}`);
//       }
//       const res = await api.get("/api/watchlist");
//       setFavourites(res.data);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Could not update your watchlist.");
//     }
//   };

//   const visible = stocks.filter(
//     (s) =>
//       !search ||
//       s.symbol.toLowerCase().includes(search.toLowerCase()) ||
//       s.name.toLowerCase().includes(search.toLowerCase()) ||
//       s.sector.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <>
//       <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px 8px" }}>
//         <h3 className="title" style={{ margin: 0 }}>All Stocks</h3>
//         <span style={{ fontSize: "13px", color: "#6E6E73" }}>
//           Watchlist: {favourites.length} / {MAX_WATCHLIST}
//         </span>
//       </div>

//       <div style={{ padding: "0 24px 16px" }}>
//         <input
//           type="text"
//           placeholder="Search by name, symbol or sector"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{
//             width: "100%",
//             padding: "10px 14px",
//             borderRadius: "10px",
//             border: "1px solid #D2D2D7",
//             fontSize: "14px",
//           }}
//         />
//       </div>

//       <div className="order-table">
//         <table>
//           <tr>
//             <th></th>
//             <th>Symbol</th>
//             <th>Name</th>
//             <th>Sector</th>
//             <th>Price</th>
//             <th>Change</th>
//             <th></th>
//           </tr>
//           {visible.map((s) => {
//             const isFav = favourites.includes(s.symbol);
//             const isDown = (s.changePercent || 0) < 0;
//             return (
//               <tr key={s.symbol}>
//                 <td>
//                   <button
//                     onClick={() => toggleFavourite(s.symbol)}
//                     title={isFav ? "Remove from watchlist" : "Add to watchlist"}
//                     style={{
//                       background: "none",
//                       border: "none",
//                       fontSize: "18px",
//                       cursor: "pointer",
//                       color: isFav ? "#FF9500" : "#D2D2D7",
//                     }}
//                   >
//                     {isFav ? "★" : "☆"}
//                   </button>
//                 </td>
//                 <td>{s.symbol}</td>
//                 <td>{s.name}</td>
//                 <td style={{ color: "#6E6E73" }}>{s.sector}</td>
//                 <td>{s.price != null ? `₹${s.price.toFixed(2)}` : "—"}</td>
//                 <td className={isDown ? "loss" : "profit"}>
//                   {s.changePercent != null ? `${s.changePercent.toFixed(2)}%` : "—"}
//                 </td>
//                 <td style={{ whiteSpace: "nowrap" }}>
//                   <button
//                     onClick={() => setChartStock(s)}
//                     style={{ padding: "4px 10px", borderRadius: "6px", marginRight: "6px", background: "#F5F5F7", border: "1px solid #D2D2D7" }}
//                   >
//                     Chart
//                   </button>
//                   <button
//                     onClick={() => setTrendStock(s)}
//                     style={{ padding: "4px 10px", borderRadius: "6px", background: "#F5F5F7", border: "1px solid #D2D2D7" }}
//                   >
//                     Trend
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </table>
//       </div>

//       {chartStock && <StockChartModal stock={chartStock} onClose={() => setChartStock(null)} />}
//       {trendStock && <TrendModal stock={trendStock} onClose={() => setTrendStock(null)} />}
//     </>
//   );
// };

// export default AllStocks;



import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../utils/api";
import StockChartModal from "./StockChartModal";
import TrendModal from "./TrendModal";

const MAX_WATCHLIST = 50;

const AllStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [search, setSearch] = useState("");
  const [chartStock, setChartStock] = useState(null);
  const [trendStock, setTrendStock] = useState(null);

  const load = async () => {
    try {
      const [stocksRes, watchlistRes] = await Promise.all([
        api.get("/api/stocks"),
        api.get("/api/watchlist"),
      ]);

      setStocks(stocksRes.data);
      setFavourites(watchlistRes.data);
    } catch (err) {
      toast.error("Unable to load stocks. Please try again.");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggleFavourite = async (symbol) => {
    try {
      if (favourites.includes(symbol)) {
        await api.delete(`/api/watchlist/${symbol}`);
      } else {
        if (favourites.length >= MAX_WATCHLIST) {
          toast.warning("Your watchlist can contain only 50 stocks.");
          return;
        }

        await api.post(`/api/watchlist/${symbol}`);
      }

      const res = await api.get("/api/watchlist");
      setFavourites(res.data);

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Could not update your watchlist."
      );
    }
  };

  const visible = stocks.filter((s) => {
    const query = search.toLowerCase();

    return (
      s.symbol?.toLowerCase().includes(query) ||
      s.name?.toLowerCase().includes(query) ||
      s.sector?.toLowerCase().includes(query)
    );
  });

  const formatPrice = (price) => {
    return price != null
      ? `₹${Number(price).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : "—";
  };

  const tableHeading = {
    color: "#174D38",
    fontWeight: "800",
    fontSize: "14px",
    textTransform: "uppercase",
    padding: "18px 12px",
    whiteSpace: "nowrap",
    borderBottom: "2px solid #174D38",
  };

  const tableCell = {
    color: "#174D38",
    fontSize: "16px",
    fontWeight: "600",
    padding: "17px 12px",
    whiteSpace: "nowrap",
    borderBottom: "1px solid #CBCBCB",
    verticalAlign: "middle",
  };

  const actionButton = {
    border: "1.5px solid #174D38",
    color: "#174D38",
    background: "transparent",
    borderRadius: "30px",
    padding: "7px 17px",
    fontSize: "14px",
    fontWeight: "600",
    transition: "all 0.2s ease",
    whiteSpace: "nowrap",
  };

  return (
    <>
      <div
        className="container-fluid py-4 px-3 px-md-4"
        style={{
          // backgroundColor: "#000000",
          minHeight: "100vh",
          color: "#174D38",
        }}
      >

        {/* Heading */}
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">

          <div>
            <h2
              className="mb-2"
              style={{
                color: "#174D38",
                fontFamily: "Georgia, serif",
                fontSize: "clamp(30px, 4vw, 46px)",
                fontWeight: "500",
              }}
            >
              All Stocks
            </h2>

            <p
              className="mb-3 mb-md-4"
              style={{
                color: "#174D38",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              About fifty NSE stocks. Star up to fifty to build your
              watchlist.
            </p>
          </div>

          <span
            className="mb-3 mb-md-4"
            style={{
              color: "#CBCBCB",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            Watchlist: {favourites.length} / {MAX_WATCHLIST}
          </span>

        </div>

        {/* Search Bar */}
        <div className="mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, symbol or sector"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              
              color: "#F2F2F2",
              border: "2px solid #174D38",
              borderRadius: "40px",
              padding: "15px 25px",
              fontSize: "16px",
              fontWeight: "500",
              outline: "none",
              boxShadow: "none",
            }}
          />
        </div>

        {/* Stocks Table */}
        <div
          className="table-responsive"
          style={{
            width: "100%",
            overflowX: "auto",
          }}
        >
          <table
            className="table align-middle mb-0"
            style={{
              minWidth: "850px",
              backgroundColor: "#000000",
              borderCollapse: "collapse",
            }}
          >

            <thead>
              <tr>
                <th style={{ ...tableHeading, width: "65px" }}></th>
                <th style={tableHeading}>Symbol</th>
                <th style={tableHeading}>Name</th>
                <th style={tableHeading}>Sector</th>
                <th style={tableHeading} className="text-end">
                  Price
                </th>
                <th style={tableHeading} className="text-center">
                  Change
                </th>
                <th style={tableHeading}></th>
              </tr>
            </thead>

            <tbody>
              {visible.map((s) => {
                const isFav = favourites.includes(s.symbol);
                const isDown = (s.changePercent || 0) < 0;

                return (
                  <tr key={s.symbol}>

                    {/* Favourite */}
                    <td style={tableCell}>
                      <button
                        onClick={() => toggleFavourite(s.symbol)}
                        title={
                          isFav
                            ? "Remove from watchlist"
                            : "Add to watchlist"
                        }
                        style={{
                          background: "transparent",
                          border: "none",
                          fontSize: "23px",
                          cursor: "pointer",
                          color: isFav ? "#174D38" : "#CBCBCB",
                          padding: "0 5px",
                        }}
                      >
                        {isFav ? "★" : "☆"}
                      </button>
                    </td>

                    {/* Symbol */}
                    <td style={tableCell}>
                      <strong>{s.symbol}</strong>
                    </td>

                    {/* Name */}
                    <td style={tableCell}>
                      {s.name}
                    </td>

                    {/* Sector */}
                    <td
                      style={{
                        ...tableCell,
                        color: "#174D38",
                      }}
                    >
                      {s.sector}
                    </td>

                    {/* Price */}
                    <td
                      style={tableCell}
                      className="text-end"
                    >
                      {formatPrice(s.price)}
                    </td>

                    {/* Change */}
                    <td
                      style={{
                        ...tableCell,
                        color: isDown ? "#4D1717" : "#174D38",
                      }}
                      className="text-center"
                    >
                      {s.changePercent != null ? (
                        <>
                          {isDown ? "▼" : "▲"}{" "}
                          {Math.abs(s.changePercent).toFixed(2)}%
                        </>
                      ) : (
                        "—"
                      )}
                    </td>

                    {/* Action Buttons */}
                    <td
                      style={{
                        ...tableCell,
                        padding: "12px 10px",
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">

                        <button
                          onClick={() => setChartStock(s)}
                          style={actionButton}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "#174D38";
                            e.currentTarget.style.color = "#F2F2F2";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                            e.currentTarget.style.color = "#174D38";
                          }}
                        >
                          Chart
                        </button>

                        <button
                          onClick={() => setTrendStock(s)}
                          style={actionButton}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "#174D38";
                            e.currentTarget.style.color = "#F2F2F2";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor =
                              "transparent";
                            e.currentTarget.style.color = "#174D38";
                          }}
                        >
                          Trend
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>

          {/* No Results */}
          {visible.length === 0 && (
            <div
              className="text-center py-5"
              style={{
                color: "#CBCBCB",
                fontSize: "16px",
              }}
            >
              No stocks found matching "{search}".
            </div>
          )}

        </div>
      </div>

      {/* Modals */}
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
    </>
  );
};

export default AllStocks;
