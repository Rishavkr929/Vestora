const YahooFinance = require("yahoo-finance2").default;

const yahooFinance = new YahooFinance({
  queue: {
    concurrency: 1,
    interval: 1500,
  },
});

async function test() {
  try {
    console.log("Testing Yahoo Finance...");

    const result = await yahooFinance.quote("RELIANCE.NS");

    console.log("SUCCESS");
    console.log("Symbol:", result.symbol);
    console.log("Price:", result.regularMarketPrice);

  } catch (error) {
    console.error("Yahoo test failed:");
    console.error(error);
  }
}

test();