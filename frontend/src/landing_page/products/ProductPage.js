import React from "react";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";
import {
  WatchlistMock,
  OrderMock,
  PortfolioMock,
  LearnMock,
} from "./ProductMocks";

function ProductPage() {
  return (
    <>
      <Hero />

      <LeftSection />

      <RightSection rgTitle="What happens when you press Buy." />

      <Universe />
    </>
  );
}

export default ProductPage;
