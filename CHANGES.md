# What changed in this pass

## Real price data
- `backend/services/marketData.js` — live NSE stock quotes, history and
  trend analysis via yahoo-finance2 (free, no API key). ~50-stock universe.
- `backend/routes/stockRoutes.js` — GET /api/stocks, /api/stocks/:symbol/history, /api/stocks/:symbol/trend
- `/newOrder` now prices every trade from the server's own live quote —
  the client can no longer submit its own price.
- The stop-loss checker (`checkStopLossPositions`) now watches real prices
  instead of a simulated random walk.
- `/allHoldings` refreshes each holding's price from the live feed on every fetch.

## Watchlist redesign
- `backend/routes/watchlistRoutes.js` — add/remove favourites, capped at 50.
- `User.watchlist` field added.
- `AllStocks.js` — browse the full universe, star up to 50 favourites.
- `WatchList.js` — now driven by real favourites + live prices, not static demo data.
- Graph icon → `StockChartModal.js` (real price history chart).
- Three-dot icon → `TrendModal.js` — historical trend analysis (1W/1M/3M/1Y change,
  a moving-average trend label) with an explicit "this is not a prediction" disclaimer.
  Deliberately NOT a price prediction — see chat discussion for why.

## Trade journal + mistake detection
- `Order.reason` / `Holding.lastBuyReason` — captures why a stock was bought
  (trending / tip / research / trying it out) via a dropdown in the Buy window.
- `backend/routes/journalRoutes.js`:
  - GET /api/journal — trade history + P&L grouped by buy reason
  - GET /api/journal/mistakes — gentle flags: over-concentration (>40% of net
    worth in one stock), holdings with no stop-loss, and panic-selling
    (sold within 3 days of buying, 5%+ below buy price)
- `Journal.js` — dashboard page showing all of the above.

## User-study quiz
- `backend/routes/quizRoutes.js` + `QuizAttempt` model — saves every quiz
  attempt (score + date) per user.
- `Quiz.js` — 5-question investing-basics quiz; shows first vs latest score,
  so you can demonstrate improvement for your write-up.

## Also fixed along the way
- `Dashboard.js` — GeneralContextProvider previously only wrapped the
  watchlist sidebar, not the routed pages, so Holdings/Positions' Sell and
  Stop-loss buttons were silently calling no-op functions. Now fixed.
- Buy/Sell window's price field is read-only (was editable but ignored by
  the server anyway, which was misleading).

## Before you run it
1. `cd backend && npm install` — adds yahoo-finance2.
2. `cd frontend && npm install` — no new frontend packages needed, but
   re-install if you deleted node_modules.
3. Existing accounts will get a 'watchlist: []' field automatically the
   next time they're saved; no manual migration needed.
