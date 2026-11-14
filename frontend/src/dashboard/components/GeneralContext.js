import React, { useState } from "react";

import BuyActionWindow from "./BuyActionWindow";

const GeneralContext = React.createContext({
  openBuyWindow: (stock) => {},
  openSellWindow: (stock) => {},
  closeActionWindow: () => {},
  refreshTrigger: 0,
  triggerRefresh: () => {},
});

export const GeneralContextProvider = (props) => {
  const [isActionWindowOpen, setIsActionWindowOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState(null);
  const [actionMode, setActionMode] = useState("BUY");
  // Bumping this lets any component (Holdings, Summary, Funds, Menu...)
  // refetch after an order goes through, just by watching it in a useEffect.
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleOpenBuyWindow = (stock) => {
    setSelectedStock(stock);
    setActionMode("BUY");
    setIsActionWindowOpen(true);
  };

  const handleOpenSellWindow = (stock) => {
    setSelectedStock(stock);
    setActionMode("SELL");
    setIsActionWindowOpen(true);
  };

  const handleCloseActionWindow = () => {
    setIsActionWindowOpen(false);
    setSelectedStock(null);
  };

  const triggerRefresh = () => setRefreshTrigger((n) => n + 1);

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow: handleOpenBuyWindow,
        openSellWindow: handleOpenSellWindow,
        closeActionWindow: handleCloseActionWindow,
        refreshTrigger,
        triggerRefresh,
      }}
    >
      {props.children}
      {isActionWindowOpen && (
        <BuyActionWindow stock={selectedStock} mode={actionMode} />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;

// import React, { useState } from "react";

// import BuyActionWindow from "./BuyActionWindow";
// import { clearApiCache } from "../../utils/api";

// const GeneralContext = React.createContext({
//   openBuyWindow: (stock) => {},
//   openSellWindow: (stock) => {},
//   closeActionWindow: () => {},
//   refreshTrigger: 0,
//   triggerRefresh: () => {},
// });

// export const GeneralContextProvider = (props) => {
//   const [isActionWindowOpen, setIsActionWindowOpen] = useState(false);
//   const [selectedStock, setSelectedStock] = useState(null);
//   const [actionMode, setActionMode] = useState("BUY");
//   // Bumping this lets any component (Holdings, Summary, Funds, Menu...)
//   // refetch after an order goes through, just by watching it in a useEffect.
//   const [refreshTrigger, setRefreshTrigger] = useState(0);

//   const handleOpenBuyWindow = (stock) => {
//     setSelectedStock(stock);
//     setActionMode("BUY");
//     setIsActionWindowOpen(true);
//   };

//   const handleOpenSellWindow = (stock) => {
//     setSelectedStock(stock);
//     setActionMode("SELL");
//     setIsActionWindowOpen(true);
//   };

//   const handleCloseActionWindow = () => {
//     setIsActionWindowOpen(false);
//     setSelectedStock(null);
//   };

//   const triggerRefresh = () => {
//     // Your own data changed: forget it so it is fetched again. Market prices
//     // (/api/stocks) are shared by everyone and stay cached.
//     clearApiCache(["/allHoldings", "/allPositions", "/allOrders", "/api/auth/me"]);
//     setRefreshTrigger((n) => n + 1);
//   };

//   return (
//     <GeneralContext.Provider
//       value={{
//         openBuyWindow: handleOpenBuyWindow,
//         openSellWindow: handleOpenSellWindow,
//         closeActionWindow: handleCloseActionWindow,
//         refreshTrigger,
//         triggerRefresh,
//       }}
//     >
//       {props.children}
//       {isActionWindowOpen && (
//         <BuyActionWindow stock={selectedStock} mode={actionMode} />
//       )}
//     </GeneralContext.Provider>
//   );
// };

// export default GeneralContext;

