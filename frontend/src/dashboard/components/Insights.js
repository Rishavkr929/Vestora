import React from "react";
import Forecast from "./Forecast";
import SentimentBadge from "./SentimentBadge";
import RiskPanel from "./RiskPanel";
import { C, serif, card, label } from "./insightsTheme";

const Insights = () => (
  <div style={{ background: C.bg, color: C.green, padding: "24px 28px", minHeight: "100vh" }}>
    <h1 style={{ fontFamily: serif, fontWeight: 400, fontSize: 44, margin: "0 0 16px" }}>Insights</h1>
    <div style={{ ...card(), padding: "14px 18px", fontSize: 14, marginBottom: 40 }}>
      These are estimates from statistical models and news headlines. They can be wrong, and they are not financial advice.
    </div>

    <Forecast />
    <SentimentBadge />
    <RiskPanel />

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
      <div style={card(C.maroon, "#fff")}>
        <p style={label}>Read this first</p>
        <p style={{ margin: 0, fontSize: 14 }}>
          The forecast learns only from past prices and cannot see news or results. Sentiment depends on which headlines
          are found, and risk figures describe the past. Use them to learn, not to decide a trade.
        </p>
      </div>
      <div style={card()}>
        <p style={label}>How it works</p>
        <p style={{ margin: "0 0 8px", fontSize: 14 }}>
          Vestora downloads one year of daily closes from Yahoo Finance and fits an ARIMA model. Headlines come from a
          news service, and risk uses one year of prices for each stock you hold.
        </p>
        <details style={{ fontSize: 14 }}>
          <summary style={{ cursor: "pointer", fontWeight: 600 }}>What is ARIMA?</summary>
          <p style={{ margin: "8px 0 0" }}>
            It predicts each day's price change from the previous few changes, then adds the changes up. It knows nothing
            about news, so the widening range is more useful than the line itself.
          </p>
        </details>
      </div>
    </div>
  </div>
);

export default Insights;
