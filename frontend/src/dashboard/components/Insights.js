import React from "react";
import Forecast from "./Forecast";
import SentimentBadge from "./SentimentBadge";
import RiskPanel from "./RiskPanel";

const Insights = () => {
  return (
    <div>
      <h3 className="title">Insights</h3>

      <Forecast />

      <div style={{ padding: "0 16px" }}>
        <h3 style={{ marginBottom: "4px" }}>News sentiment</h3>
        <SentimentBadge ticker="Infosys" />
      </div>

      <RiskPanel />
    </div>
  );
};

export default Insights;
