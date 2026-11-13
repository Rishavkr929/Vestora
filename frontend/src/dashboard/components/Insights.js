import React from "react";
import Forecast from "./Forecast";
import SentimentBadge from "./SentimentBadge";
import RiskPanel from "./RiskPanel";

const Insights = () => {
  return (
    <div>
      <h3 className="title">Insights</h3>

      <Forecast />
      <SentimentBadge />
      <RiskPanel />
    </div>
  );
};

export default Insights;
