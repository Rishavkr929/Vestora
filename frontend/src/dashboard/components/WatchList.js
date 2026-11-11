import React, { useState, useContext, useEffect } from "react";
import GeneralContext from "./GeneralContext";
import { Tooltip, Grow } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
  Close,
} from "@mui/icons-material";

import api from "../../utils/api";
import { DoughnutChart } from "./DoughnoutChart";
import StockChartModal from "./StockChartModal";
import TrendModal from "./TrendModal";

const MAX_WATCHLIST = 50;

const WatchList = () => {
  const [favourites, setFavourites] = useState([]); // full stock objects, live prices
  const [search, setSearch] = useState("");
  const [chartStock, setChartStock] = useState(null);
  const [trendStock, setTrendStock] = useState(null);
  const { refreshTrigger } = useContext(GeneralContext);

  const load = () => {
    Promise.all([api.get("/api/watchlist"), api.get("/api/stocks")]).then(
      ([watchlistRes, stocksRes]) => {
        const symbols = new Set(watchlistRes.data);
        setFavourites(stocksRes.data.filter((s) => symbols.has(s.symbol)));
      }
    );
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshTrigger]);

  const handleRemove = async (symbol) => {
    await api.delete(`/api/watchlist/${symbol}`);
    load();
  };

  const visible = favourites.filter(
    (s) =>
      !search ||
      s.symbol.toLowerCase().includes(search.toLowerCase()) ||
      s.name.toLowerCase().includes(search.toLowerCase())
  );

  const data = {
    labels: favourites.map((s) => s.symbol),
    datasets: [
      {
        label: "Price",
        data: favourites.map((s) => s.price || 0),
        backgroundColor: ["#0071E3", "#5AC8FA", "#34C759", "#AF52DE", "#FF9500", "#6E6E73"],
        borderColor: ["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search your watchlist"
          className="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="counts"> {favourites.length} / {MAX_WATCHLIST}</span>
      </div>

      {favourites.length === 0 ? (
        <p style={{ padding: "16px", fontSize: "13px", color: "#6e6e73" }}>
          Your watchlist is empty.{" "}
          <a href="/dashboard/stocks" style={{ color: "#0071E3" }}>
            Browse all stocks
          </a>{" "}
          to add up to {MAX_WATCHLIST} favourites.
        </p>
      ) : (
        <ul className="list">
          {visible.map((stock) => (
            <WatchListItem
              stock={stock}
              key={stock.symbol}
              onRemove={handleRemove}
              onChart={setChartStock}
              onTrend={setTrendStock}
            />
          ))}
        </ul>
      )}

      {favourites.length > 0 && <DoughnutChart data={data} />}

      {chartStock && <StockChartModal stock={chartStock} onClose={() => setChartStock(null)} />}
      {trendStock && <TrendModal stock={trendStock} onClose={() => setTrendStock(null)} />}
    </div>
  );
};

const WatchListItem = ({ stock, onRemove, onChart, onTrend }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  const handleMouseEnter = () => setShowWatchlistActions(true);
  const handleMouseLeave = () => setShowWatchlistActions(false);

  const isDown = (stock.changePercent || 0) < 0;

  return (
    <li onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="item">
        <p className={isDown ? "down" : "up"}>{stock.symbol}</p>

        <div className="itemInfo">
          <span className="percent">
            {stock.changePercent != null ? `${stock.changePercent.toFixed(2)}%` : "—"}
          </span>
          {isDown ? <KeyboardArrowDown className="down" /> : <KeyboardArrowUp className="up" />}
          <span className="price">{stock.price != null ? stock.price.toFixed(2) : "—"}</span>
        </div>
      </div>

      {showWatchlistActions && (
        <WatchListActions stock={stock} onRemove={onRemove} onChart={onChart} onTrend={onTrend} />
      )}
    </li>
  );
};

const WatchListActions = ({ stock, onRemove, onChart, onTrend }) => {
  const generalContext = useContext(GeneralContext);

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow} onClick={() => generalContext.openBuyWindow(stock)}>
          <button className="buy">Buy</button>
        </Tooltip>
        <Tooltip title="Price chart" placement="top" arrow TransitionComponent={Grow} onClick={() => onChart(stock)}>
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="Trend analysis" placement="top" arrow TransitionComponent={Grow} onClick={() => onTrend(stock)}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="Remove from watchlist" placement="top" arrow TransitionComponent={Grow} onClick={() => onRemove(stock.symbol)}>
          <button className="action">
            <Close className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};

export default WatchList;
