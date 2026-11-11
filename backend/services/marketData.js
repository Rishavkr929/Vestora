const YahooFinance = require("yahoo-finance2").default;
const fs = require("fs");
const path = require("path");

/*
 * ============================================================
 * Yahoo Finance client
 * ============================================================
 *
 * Global throttling:
 * - Only 1 Yahoo request at a time.
 * - At least 1500 ms between request starts.
 *
 * This queue applies across quote(), chart(), etc. calls made
 * through this yahooFinance instance.
 */
const yahooFinance = new YahooFinance({
  queue: {
    concurrency: 1,
    interval: 1500,
  },
});


/*
 * ============================================================
 * STOCK UNIVERSE
 * ============================================================
 */

const STOCK_UNIVERSE = [
  { symbol: "RELIANCE", yahoo: "RELIANCE.NS", name: "Reliance Industries", sector: "Energy" },
  { symbol: "TCS", yahoo: "TCS.NS", name: "Tata Consultancy Services", sector: "Technology" },
  { symbol: "HDFCBANK", yahoo: "HDFCBANK.NS", name: "HDFC Bank", sector: "Banking" },
  { symbol: "INFY", yahoo: "INFY.NS", name: "Infosys", sector: "Technology" },
  { symbol: "ICICIBANK", yahoo: "ICICIBANK.NS", name: "ICICI Bank", sector: "Banking" },
  { symbol: "HINDUNILVR", yahoo: "HINDUNILVR.NS", name: "Hindustan Unilever", sector: "FMCG" },
  { symbol: "ITC", yahoo: "ITC.NS", name: "ITC Limited", sector: "FMCG" },
  { symbol: "SBIN", yahoo: "SBIN.NS", name: "State Bank of India", sector: "Banking" },
  { symbol: "BHARTIARTL", yahoo: "BHARTIARTL.NS", name: "Bharti Airtel", sector: "Telecom" },
  { symbol: "KOTAKBANK", yahoo: "KOTAKBANK.NS", name: "Kotak Mahindra Bank", sector: "Banking" },
  { symbol: "LT", yahoo: "LT.NS", name: "Larsen & Toubro", sector: "Infrastructure" },
  { symbol: "AXISBANK", yahoo: "AXISBANK.NS", name: "Axis Bank", sector: "Banking" },
  { symbol: "ASIANPAINT", yahoo: "ASIANPAINT.NS", name: "Asian Paints", sector: "Consumer Goods" },
  { symbol: "MARUTI", yahoo: "MARUTI.NS", name: "Maruti Suzuki", sector: "Automobile" },
  { symbol: "SUNPHARMA", yahoo: "SUNPHARMA.NS", name: "Sun Pharmaceutical", sector: "Pharma" },
  { symbol: "TITAN", yahoo: "TITAN.NS", name: "Titan Company", sector: "Consumer Goods" },
  { symbol: "ULTRACEMCO", yahoo: "ULTRACEMCO.NS", name: "UltraTech Cement", sector: "Cement" },
  { symbol: "NESTLEIND", yahoo: "NESTLEIND.NS", name: "Nestle India", sector: "FMCG" },
  { symbol: "WIPRO", yahoo: "WIPRO.NS", name: "Wipro", sector: "Technology" },
  { symbol: "HCLTECH", yahoo: "HCLTECH.NS", name: "HCL Technologies", sector: "Technology" },
  { symbol: "BAJFINANCE", yahoo: "BAJFINANCE.NS", name: "Bajaj Finance", sector: "Financial Services" },
  { symbol: "BAJAJFINSV", yahoo: "BAJAJFINSV.NS", name: "Bajaj Finserv", sector: "Financial Services" },
  { symbol: "M&M", yahoo: "M&M.NS", name: "Mahindra & Mahindra", sector: "Automobile" },
  { symbol: "TATAMOTORS", yahoo: "TATAMOTORS.NS", name: "Tata Motors", sector: "Automobile" },
  { symbol: "TATASTEEL", yahoo: "TATASTEEL.NS", name: "Tata Steel", sector: "Metals" },
  { symbol: "JSWSTEEL", yahoo: "JSWSTEEL.NS", name: "JSW Steel", sector: "Metals" },
  { symbol: "HINDALCO", yahoo: "HINDALCO.NS", name: "Hindalco Industries", sector: "Metals" },
  { symbol: "POWERGRID", yahoo: "POWERGRID.NS", name: "Power Grid Corporation", sector: "Power" },
  { symbol: "NTPC", yahoo: "NTPC.NS", name: "NTPC Limited", sector: "Power" },
  { symbol: "ONGC", yahoo: "ONGC.NS", name: "Oil & Natural Gas Corp", sector: "Energy" },
  { symbol: "COALINDIA", yahoo: "COALINDIA.NS", name: "Coal India", sector: "Energy" },
  { symbol: "ADANIPORTS", yahoo: "ADANIPORTS.NS", name: "Adani Ports", sector: "Infrastructure" },
  { symbol: "ADANIENT", yahoo: "ADANIENT.NS", name: "Adani Enterprises", sector: "Conglomerate" },
  { symbol: "DRREDDY", yahoo: "DRREDDY.NS", name: "Dr. Reddy's Laboratories", sector: "Pharma" },
  { symbol: "CIPLA", yahoo: "CIPLA.NS", name: "Cipla", sector: "Pharma" },
  { symbol: "DIVISLAB", yahoo: "DIVISLAB.NS", name: "Divi's Laboratories", sector: "Pharma" },
  { symbol: "GRASIM", yahoo: "GRASIM.NS", name: "Grasim Industries", sector: "Diversified" },
  { symbol: "BRITANNIA", yahoo: "BRITANNIA.NS", name: "Britannia Industries", sector: "FMCG" },
  { symbol: "EICHERMOT", yahoo: "EICHERMOT.NS", name: "Eicher Motors", sector: "Automobile" },
  { symbol: "HEROMOTOCO", yahoo: "HEROMOTOCO.NS", name: "Hero MotoCorp", sector: "Automobile" },
  { symbol: "BAJAJ-AUTO", yahoo: "BAJAJ-AUTO.NS", name: "Bajaj Auto", sector: "Automobile" },
  { symbol: "TECHM", yahoo: "TECHM.NS", name: "Tech Mahindra", sector: "Technology" },
  { symbol: "INDUSINDBK", yahoo: "INDUSINDBK.NS", name: "IndusInd Bank", sector: "Banking" },
  { symbol: "SHRIRAMFIN", yahoo: "SHRIRAMFIN.NS", name: "Shriram Finance", sector: "Financial Services" },
  { symbol: "SBILIFE", yahoo: "SBILIFE.NS", name: "SBI Life Insurance", sector: "Insurance" },
  { symbol: "HDFCLIFE", yahoo: "HDFCLIFE.NS", name: "HDFC Life Insurance", sector: "Insurance" },
  { symbol: "APOLLOHOSP", yahoo: "APOLLOHOSP.NS", name: "Apollo Hospitals", sector: "Healthcare" },
  { symbol: "LTIM", yahoo: "LTIM.NS", name: "LTIMindtree", sector: "Technology" },
  { symbol: "PIDILITIND", yahoo: "PIDILITIND.NS", name: "Pidilite Industries", sector: "Chemicals" },
  { symbol: "DLF", yahoo: "DLF.NS", name: "DLF Limited", sector: "Real Estate" },
];

const symbolToYahoo = new Map(
  STOCK_UNIVERSE.map((stock) => [stock.symbol, stock.yahoo])
);

const symbolInfo = new Map(
  STOCK_UNIVERSE.map((stock) => [stock.symbol, stock])
);


/*
 * ============================================================
 * CACHE CONFIGURATION
 * ============================================================
 */

// Quotes are kept fresh for 2 minutes.
const QUOTE_TTL_MS = 2 * 60 * 1000;

// Historical data does not need to be fetched every request.
// 15 minutes is enough for a stock-detail graph.
const HISTORY_TTL_MS = 15 * 60 * 1000;

// How many times to retry after a rate-limit/network error.
const MAX_RETRIES = 4;

// Initial retry delay.
const INITIAL_BACKOFF_MS = 5000;

// Maximum retry delay.
const MAX_BACKOFF_MS = 60 * 1000;


// Cache file on disk.
const CACHE_FILE = path.join(__dirname, "..", ".quote-cache.json");


/*
 * ============================================================
 * IN-MEMORY CACHE
 * ============================================================
 */

const quoteCache = new Map();

/*
 * historyCache key:
 *
 *   "RELIANCE:1mo"
 *   "TCS:1y"
 *
 * value:
 *
 * {
 *   data: [...],
 *   fetchedAt: timestamp
 * }
 */
const historyCache = new Map();


/*
 * ============================================================
 * REQUEST DEDUPLICATION
 * ============================================================
 *
 * If two frontend requests ask for the same stock while the
 * first Yahoo request is still running, don't create another
 * Yahoo request.
 */

const quoteRefreshPromises = new Map();
const historyRefreshPromises = new Map();


/*
 * ============================================================
 * HELPERS
 * ============================================================
 */

function toYahoo(symbol) {
  const yahooSymbol = symbolToYahoo.get(symbol);

  if (!yahooSymbol) {
    throw new Error(`Unknown stock symbol: ${symbol}`);
  }

  return yahooSymbol;
}


function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


function isRateLimitError(err) {
  if (!err) return false;

  const message = String(
    err.message ||
    err.response?.statusText ||
    err.statusText ||
    ""
  ).toLowerCase();

  const status =
    err.status ||
    err.statusCode ||
    err.response?.status;

  return (
    status === 429 ||
    message.includes("too many requests") ||
    message.includes("429") ||
    message.includes("rate limit") ||
    message.includes("rate-limit")
  );
}


function isRetryableError(err) {
  if (!err) return false;

  if (isRateLimitError(err)) {
    return true;
  }

  const message = String(err.message || "").toLowerCase();

  return (
    message.includes("timeout") ||
    message.includes("timed out") ||
    message.includes("network") ||
    message.includes("socket") ||
    message.includes("econnreset") ||
    message.includes("econnrefused") ||
    message.includes("fetch failed") ||
    message.includes("503") ||
    message.includes("502") ||
    message.includes("504")
  );
}


/*
 * Exponential backoff:
 *
 * Retry 1 → ~5 sec
 * Retry 2 → ~10 sec
 * Retry 3 → ~20 sec
 * Retry 4 → ~40 sec
 *
 * Small random jitter prevents multiple simultaneous requests
 * from retrying at exactly the same moment.
 */
async function backoff(retryNumber) {
  const exponential = INITIAL_BACKOFF_MS * Math.pow(2, retryNumber);

  const capped = Math.min(
    exponential,
    MAX_BACKOFF_MS
  );

  const jitter = Math.floor(Math.random() * 1000);

  const waitTime = capped + jitter;

  console.log(
    `Yahoo request retry ${retryNumber + 1}/${MAX_RETRIES} ` +
    `after ${Math.round(waitTime / 1000)}s`
  );

  await delay(waitTime);
}


/*
 * ============================================================
 * DISK CACHE
 * ============================================================
 */

function loadCacheFromDisk() {
  try {
    if (!fs.existsSync(CACHE_FILE)) {
      return;
    }

    const raw = fs.readFileSync(CACHE_FILE, "utf8");

    if (!raw.trim()) {
      return;
    }

    const parsed = JSON.parse(raw);

    /*
     * New cache format:
     *
     * {
     *   quotes: {...},
     *   history: {...}
     * }
     *
     * We also support your previous quote-only cache format.
     */
    if (parsed.quotes || parsed.history) {
      if (parsed.quotes) {
        for (const [symbol, data] of Object.entries(parsed.quotes)) {
          quoteCache.set(symbol, data);
        }
      }

      if (parsed.history) {
        for (const [key, data] of Object.entries(parsed.history)) {
          historyCache.set(key, data);
        }
      }
    } else {
      // Backward compatibility with your old cache.
      for (const [symbol, data] of Object.entries(parsed)) {
        quoteCache.set(symbol, data);
      }
    }

    console.log(
      `Loaded ${quoteCache.size} cached quotes and ` +
      `${historyCache.size} cached histories from disk.`
    );

  } catch (err) {
    console.error(
      "Could not load stock cache:",
      err.message
    );
  }
}


function saveCacheToDisk() {
  try {
    const cacheData = {
      quotes: Object.fromEntries(quoteCache),
      history: Object.fromEntries(historyCache),
    };

    const tempFile = `${CACHE_FILE}.tmp`;

    fs.writeFileSync(
      tempFile,
      JSON.stringify(cacheData, null, 2),
      "utf8"
    );

    /*
     * Atomic replacement.
     *
     * This prevents a partially-written JSON cache if the
     * process stops during fs.writeFileSync().
     */
    fs.renameSync(tempFile, CACHE_FILE);

  } catch (err) {
    console.error(
      "Could not persist stock cache:",
      err.message
    );
  }
}


loadCacheFromDisk();


/*
 * ============================================================
 * YAHOO REQUEST WITH RETRY / BACKOFF
 * ============================================================
 */

async function yahooRequest(requestFn, label = "Yahoo request") {
  let lastError = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      return await requestFn();

    } catch (err) {
      lastError = err;

      const retryable = isRetryableError(err);

      console.error(
        `${label} failed ` +
        `(attempt ${attempt + 1}/${MAX_RETRIES + 1}):`,
        err.message
      );

      /*
       * Don't retry non-retryable errors.
       */
      if (!retryable) {
        throw err;
      }

      /*
       * No retry after final attempt.
       */
      if (attempt === MAX_RETRIES) {
        break;
      }

      await backoff(attempt);
    }
  }

  throw lastError;
}


/*
 * ============================================================
 * QUOTES
 * ============================================================
 */

async function fetchQuotesFromYahoo(symbols) {
  if (!symbols.length) {
    return [];
  }

  const yahooSymbols = symbols.map(toYahoo);

  const raw = await yahooRequest(
    () =>
      yahooFinance.quote(
        yahooSymbols,
        {},
        {
          validateResult: false,
        }
      ),
    `Quote [${symbols.join(", ")}]`
  );

  const list = Array.isArray(raw)
    ? raw
    : [raw];

  const fetchedAt = Date.now();

  const results = [];

  for (const quote of list) {
    if (!quote || !quote.symbol) {
      continue;
    }

    /*
     * Find our internal NSE symbol from Yahoo symbol.
     */
    const stock = STOCK_UNIVERSE.find(
      (item) => item.yahoo === quote.symbol
    );

    if (!stock) {
      continue;
    }

    /*
     * Don't cache invalid quotes.
     */
    if (quote.regularMarketPrice == null) {
      console.warn(
        `Yahoo returned no price for ${stock.symbol}`
      );
      continue;
    }

    const data = {
      price: quote.regularMarketPrice,
      previousClose: quote.regularMarketPreviousClose ?? null,
      changePercent: quote.regularMarketChangePercent ?? null,
      fetchedAt,
    };

    quoteCache.set(stock.symbol, data);

    results.push({
      symbol: stock.symbol,
      ...data,
    });
  }

  if (results.length > 0) {
    saveCacheToDisk();
  }

  return results;
}


/*
 * Refresh a group of symbols.
 *
 * This promise is shared by simultaneous callers so that
 * multiple Express requests don't create duplicate Yahoo
 * requests.
 */
async function refreshQuotes(symbols) {
  const unique = [...new Set(symbols)]
    .filter((symbol) => symbolToYahoo.has(symbol));

  if (!unique.length) {
    return [];
  }

  /*
   * Only create one refresh promise for the current set.
   *
   * Sorting makes:
   *
   * [TCS, INFY]
   *
   * and
   *
   * [INFY, TCS]
   *
   * share the same promise.
   */
  const key = [...unique].sort().join(",");

  if (quoteRefreshPromises.has(key)) {
    return quoteRefreshPromises.get(key);
  }

  const promise = fetchQuotesFromYahoo(unique)
    .catch((err) => {
      /*
       * We don't delete the existing cache when Yahoo fails.
       * The caller can therefore still receive stale data.
       */
      console.error(
        `Could not refresh quotes for [${unique.join(", ")}]:`,
        err.message
      );

      return [];
    })
    .finally(() => {
      quoteRefreshPromises.delete(key);
    });

  quoteRefreshPromises.set(key, promise);

  return promise;
}


/*
 * Main quote function.
 *
 * Behavior:
 *
 * 1. Return fresh cached prices immediately.
 * 2. Identify stale/missing symbols.
 * 3. Refresh stale symbols from Yahoo.
 * 4. If Yahoo fails, return stale cached prices.
 */
async function getQuotes(symbols) {
  const uniqueSymbols = [
    ...new Set(
      symbols.filter((symbol) =>
        symbolToYahoo.has(symbol)
      )
    ),
  ];

  if (!uniqueSymbols.length) {
    return [];
  }

  const now = Date.now();

  const staleSymbols = uniqueSymbols.filter((symbol) => {
    const cached = quoteCache.get(symbol);

    return (
      !cached ||
      !cached.fetchedAt ||
      now - cached.fetchedAt > QUOTE_TTL_MS
    );
  });

  /*
   * Refresh only stale symbols.
   */
  if (staleSymbols.length > 0) {
    await refreshQuotes(staleSymbols);
  }

  /*
   * Always return whatever is currently in cache.
   *
   * This is important:
   *
   * Yahoo 429
   *       ↓
   * refresh fails
   *       ↓
   * old cached price is still returned
   *
   * So your Vestora frontend doesn't suddenly become empty.
   */
  return uniqueSymbols
    .filter((symbol) => quoteCache.has(symbol))
    .map((symbol) => ({
      symbol,
      ...quoteCache.get(symbol),
    }));
}


async function getQuote(symbol) {
  const [quote] = await getQuotes([symbol]);

  return quote || null;
}


/*
 * ============================================================
 * HISTORICAL DATA
 * ============================================================
 */

const RANGE_TO_DAYS = {
  "1w": 7,
  "1mo": 30,
  "3mo": 90,
  "1y": 365,
};


function getHistoryCacheKey(symbol, range) {
  return `${symbol}:${range}`;
}


async function fetchHistoryFromYahoo(symbol, range) {
  const days =
    RANGE_TO_DAYS[range] ||
    RANGE_TO_DAYS["1mo"];

  const period1 = new Date(
    Date.now() -
      days * 24 * 60 * 60 * 1000
  );

  const result = await yahooRequest(
    () =>
      yahooFinance.chart(
        toYahoo(symbol),
        {
          period1,
          interval:
            days > 200
              ? "1wk"
              : "1d",
        },
        {
          validateResult: false,
        }
      ),
    `History [${symbol}, ${range}]`
  );

  const history = (result.quotes || [])
    .filter((quote) => quote.close != null)
    .map((quote) => ({
      date: quote.date,
      price: +quote.close.toFixed(2),
    }));

  return history;
}


async function refreshHistory(symbol, range) {
  const key = getHistoryCacheKey(
    symbol,
    range
  );

  /*
   * Prevent duplicate historical requests.
   */
  if (historyRefreshPromises.has(key)) {
    return historyRefreshPromises.get(key);
  }

  const promise = (async () => {
    try {
      const history =
        await fetchHistoryFromYahoo(
          symbol,
          range
        );

      /*
       * Only cache non-empty history.
       */
      if (history.length > 0) {
        historyCache.set(key, {
          data: history,
          fetchedAt: Date.now(),
        });

        saveCacheToDisk();
      }

      return history;

    } catch (err) {
      console.error(
        `Could not refresh history for ${symbol} (${range}):`,
        err.message
      );

      /*
       * If Yahoo fails, use stale history if available.
       */
      const cached = historyCache.get(key);

      return cached?.data || [];
    } finally {
      historyRefreshPromises.delete(key);
    }
  })();

  historyRefreshPromises.set(key, promise);

  return promise;
}


async function getHistory(symbol, range = "1mo") {
  if (!symbolToYahoo.has(symbol)) {
    throw new Error(
      `Unknown stock symbol: ${symbol}`
    );
  }

  const normalizedRange =
    RANGE_TO_DAYS[range]
      ? range
      : "1mo";

  const key = getHistoryCacheKey(
    symbol,
    normalizedRange
  );

  const cached = historyCache.get(key);

  /*
   * Return fresh cached history.
   */
  if (
    cached &&
    cached.fetchedAt &&
    Date.now() - cached.fetchedAt <
      HISTORY_TTL_MS
  ) {
    return cached.data;
  }

  /*
   * Refresh if stale/missing.
   *
   * refreshHistory() itself handles:
   * - request deduplication
   * - retry
   * - backoff
   * - stale fallback
   */
  return refreshHistory(
    symbol,
    normalizedRange
  );
}


/*
 * ============================================================
 * TREND ANALYSIS
 * ============================================================
 *
 * Explicitly descriptive, not predictive.
 */

async function getTrend(symbol) {
  /*
   * getHistory() now uses the history cache.
   *
   * Therefore repeatedly calling getTrend() doesn't cause a
   * fresh Yahoo 1-year request every time.
   */
  const history = await getHistory(
    symbol,
    "1y"
  );

  if (history.length < 2) {
    return null;
  }

  const latest =
    history[history.length - 1].price;


  /*
   * Calculate percentage change over approximately:
   *
   * 1 week  = 5 trading sessions
   * 1 month = 21 trading sessions
   * 3 months = 63 trading sessions
   * 1 year = entire available history
   */
  const changeOverDays = (days) => {
    const idx = Math.max(
      0,
      history.length - 1 - days
    );

    const past = history[idx];

    if (!past || !past.price) {
      return null;
    }

    return +(
      ((latest - past.price) /
        past.price) *
      100
    ).toFixed(2);
  };


  /*
   * Simple Moving Average.
   */
  const sma = (window) => {
    const slice = history.slice(-window);

    if (!slice.length) {
      return null;
    }

    return (
      slice.reduce(
        (sum, point) =>
          sum + point.price,
        0
      ) / slice.length
    );
  };


  const sma20 = sma(
    Math.min(20, history.length)
  );

  const sma50 = sma(
    Math.min(50, history.length)
  );


  /*
   * Descriptive trend label.
   *
   * This is deliberately based only on historical prices.
   */
  let trendLabel = "Sideways";

  if (
    sma20 != null &&
    sma50 != null
  ) {
    if (sma20 > sma50 * 1.01) {
      trendLabel = "Uptrend";
    } else if (
      sma20 <
      sma50 * 0.99
    ) {
      trendLabel = "Downtrend";
    }
  }


  return {
    symbol,
    latestPrice: latest,

    change1w:
      changeOverDays(5),

    change1m:
      changeOverDays(21),

    change3m:
      changeOverDays(63),

    change1y:
      changeOverDays(
        history.length - 1
      ),

    sma20:
      sma20 != null
        ? +sma20.toFixed(2)
        : null,

    sma50:
      sma50 != null
        ? +sma50.toFixed(2)
        : null,

    trendLabel,

    disclaimer:
      "This is historical trend analysis based on past prices only. It is not a prediction — no one, including Vestora, can reliably predict future stock prices.",
  };
}


/*
 * ============================================================
 * OPTIONAL CACHE MANAGEMENT
 * ============================================================
 *
 * These functions are exported so you can manually clear the
 * cache from development/admin code if needed.
 */

function clearQuoteCache() {
  quoteCache.clear();
  saveCacheToDisk();
}


function clearHistoryCache() {
  historyCache.clear();
  saveCacheToDisk();
}


function clearAllCache() {
  quoteCache.clear();
  historyCache.clear();
  saveCacheToDisk();
}


/*
 * ============================================================
 * EXPORTS
 * ============================================================
 */

module.exports = {
  STOCK_UNIVERSE,
  symbolInfo,

  getQuotes,
  getQuote,

  getHistory,
  getTrend,

  // Optional cache controls
  clearQuoteCache,
  clearHistoryCache,
  clearAllCache,
};