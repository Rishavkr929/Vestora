import React from "react";
import Hero from "./Hero";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";
import Universe from "./Universe";
import { WatchlistMock, OrderMock, PortfolioMock, LearnMock } from "./ProductMocks";

function ProductPage() {
  return (
    <>
      <Hero />

      <LeftSection
        visual={<WatchlistMock />}
        prodName="Your watchlist"
        prodDesc="Keep an eye on the stocks you're interested in and act the moment you're ready. Add stocks to your watchlist, check the day's movement, and jump straight into buying or selling."
        learnMore="/signup"
      />

      <RightSection
        rgTitle="Buy and sell instantly"
        prodDesc="No waiting, no settlement delays — orders go through immediately against your virtual wallet, so you can focus on learning how position sizing and timing actually feel."
        visual={<OrderMock />}
      />

      <LeftSection
        visual={<PortfolioMock />}
        prodName="Track your portfolio"
        prodDesc="See exactly how each holding is doing — quantity, average buy price, current value, and gain or loss — updated the moment prices move."
        learnMore="/signup"
      />

      <RightSection
        rgTitle="Learn by doing"
        prodDesc="There's no substitute for actually watching a position move. Vestora is built so the learning happens inside your own portfolio, not a separate course you have to finish first."
        visual={<LearnMock />}
      />

      <Universe />
    </>
  );
}

export default ProductPage;
