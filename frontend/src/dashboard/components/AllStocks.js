import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../utils/api";
import StockChartModal from "./StockChartModal";
import TrendModal from "./TrendModal";

const MAX_WATCHLIST = 50;

const AllStocks = () => {
  const [stocks, setStocks] = useState([]);
  const [favourites, setFavourites] = useState([]); // symbols
  const [search, setSearch] = useState("");
  const [chartStock, setChartStock] = useState(null);
  const [trendStock, setTrendStock] = useState(null);

  const load = () => {
    api.get("/api/stocks").then((res) => setStocks(res.data));
    api.get("/api/watchlist").then((res) => setFavourites(res.data));
  };

  useEffect(load, []);

  const toggleFavourite = async (symbol) => {
    try {
      if (favourites.includes(symbol)) {
        await api.delete(`/api/watchlist/${symbol}`);
      } else {
        await api.post(`/api/watchlist/${symbol}`);
      }
      const res = await api.get("/api/watchlist");
      setFavourites(res.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not update your watchlist.");
    }
  };

  const visible = stocks.filter(
    (s) =>
      !search ||
      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.sector.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px 8px" }}>
        <h3 className="title" style={{ margin: 0 }}>All Stocks</h3>
        <span style={{ fontSize: "13px", color: "#6E6E73" }}>
          Watchlist: {favourites.length} / {MAX_WATCHLIST}
        </span>
      </div>

      <div style={{ padding: "0 24px 16px" }}>
        <input
          type="text"
          placeholder="Search by name, symbol or sector"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: "10px",
            border: "1px solid #D2D2D7",
            fontSize: "14px",
          }}
        />
      </div>

      <div className="order-table">
        <table>
          <tr>
            <th></th>
            <th>Symbol</th>
            <th>Name</th>
            <th>Sector</th>
            <th>Price</th>
            <th>Change</th>
            <th></th>
          </tr>
          {visible.map((s) => {
            const isFav = favourites.includes(s.symbol);
            const isDown = (s.changePercent || 0) < 0;
            return (
              <tr key={s.symbol}>
                <td>
                  <button
                    onClick={() => toggleFavourite(s.symbol)}
                    title={isFav ? "Remove from watchlist" : "Add to watchlist"}
                    style={{
                      background: "none",
                      border: "none",
                      fontSize: "18px",
                      cursor: "pointer",
                      color: isFav ? "#FF9500" : "#D2D2D7",
                    }}
                  >
                    {isFav ? "★" : "☆"}
                  </button>
                </td>
                <td>{s.symbol}</td>
                <td>{s.name}</td>
                <td style={{ color: "#6E6E73" }}>{s.sector}</td>
                <td>{s.price != null ? `₹${s.price.toFixed(2)}` : "—"}</td>
                <td className={isDown ? "loss" : "profit"}>
                  {s.changePercent != null ? `${s.changePercent.toFixed(2)}%` : "—"}
                </td>
                <td style={{ whiteSpace: "nowrap" }}>
                  <button
                    onClick={() => setChartStock(s)}
                    style={{ padding: "4px 10px", borderRadius: "6px", marginRight: "6px", background: "#F5F5F7", border: "1px solid #D2D2D7" }}
                  >
                    Chart
                  </button>
                  <button
                    onClick={() => setTrendStock(s)}
                    style={{ padding: "4px 10px", borderRadius: "6px", background: "#F5F5F7", border: "1px solid #D2D2D7" }}
                  >
                    Trend
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>

      {chartStock && <StockChartModal stock={chartStock} onClose={() => setChartStock(null)} />}
      {trendStock && <TrendModal stock={trendStock} onClose={() => setTrendStock(null)} />}
    </>
  );
};

export default AllStocks;
