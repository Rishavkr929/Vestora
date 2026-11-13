// Shared company list for the Insights page.
// Built from STOCK_UNIVERSE in backend/services/marketData.js.
//
//   nse    = the symbol stored in holdings/orders (e.g. "INFY")
//   symbol = Yahoo Finance ticker, used by the price forecast
//   news   = plain company name, used to search news for sentiment
//   sector = used by the portfolio risk panel
//
// Tata Motors is left out on purpose: NSE renamed TATAMOTORS to TMPV
// in October 2025, so check the current Yahoo symbol before adding it.
// To add a company, copy one line and change the values.

export const COMPANIES = [
  { nse: "RELIANCE", symbol: "RELIANCE.NS", name: "Reliance Industries", sector: "Energy", news: "Reliance Industries" },
  { nse: "TCS", symbol: "TCS.NS", name: "Tata Consultancy Services", sector: "Technology", news: "TCS Tata Consultancy" },
  { nse: "HDFCBANK", symbol: "HDFCBANK.NS", name: "HDFC Bank", sector: "Banking", news: "HDFC Bank" },
  { nse: "INFY", symbol: "INFY.NS", name: "Infosys", sector: "Technology", news: "Infosys" },
  { nse: "ICICIBANK", symbol: "ICICIBANK.NS", name: "ICICI Bank", sector: "Banking", news: "ICICI Bank" },
  { nse: "HINDUNILVR", symbol: "HINDUNILVR.NS", name: "Hindustan Unilever", sector: "FMCG", news: "Hindustan Unilever" },
  { nse: "ITC", symbol: "ITC.NS", name: "ITC Limited", sector: "FMCG", news: "ITC Limited" },
  { nse: "SBIN", symbol: "SBIN.NS", name: "State Bank of India", sector: "Banking", news: "State Bank of India" },
  { nse: "BHARTIARTL", symbol: "BHARTIARTL.NS", name: "Bharti Airtel", sector: "Telecom", news: "Bharti Airtel" },
  { nse: "KOTAKBANK", symbol: "KOTAKBANK.NS", name: "Kotak Mahindra Bank", sector: "Banking", news: "Kotak Mahindra Bank" },
  { nse: "LT", symbol: "LT.NS", name: "Larsen & Toubro", sector: "Infrastructure", news: "Larsen Toubro" },
  { nse: "AXISBANK", symbol: "AXISBANK.NS", name: "Axis Bank", sector: "Banking", news: "Axis Bank" },
  { nse: "ASIANPAINT", symbol: "ASIANPAINT.NS", name: "Asian Paints", sector: "Consumer Goods", news: "Asian Paints" },
  { nse: "MARUTI", symbol: "MARUTI.NS", name: "Maruti Suzuki", sector: "Automobile", news: "Maruti Suzuki" },
  { nse: "SUNPHARMA", symbol: "SUNPHARMA.NS", name: "Sun Pharmaceutical", sector: "Pharma", news: "Sun Pharma" },
  { nse: "TITAN", symbol: "TITAN.NS", name: "Titan Company", sector: "Consumer Goods", news: "Titan Company" },
  { nse: "ULTRACEMCO", symbol: "ULTRACEMCO.NS", name: "UltraTech Cement", sector: "Cement", news: "UltraTech Cement" },
  { nse: "NESTLEIND", symbol: "NESTLEIND.NS", name: "Nestle India", sector: "FMCG", news: "Nestle India" },
  { nse: "WIPRO", symbol: "WIPRO.NS", name: "Wipro", sector: "Technology", news: "Wipro" },
  { nse: "HCLTECH", symbol: "HCLTECH.NS", name: "HCL Technologies", sector: "Technology", news: "HCL Technologies" },
  { nse: "BAJFINANCE", symbol: "BAJFINANCE.NS", name: "Bajaj Finance", sector: "Financial Services", news: "Bajaj Finance" },
  { nse: "BAJAJFINSV", symbol: "BAJAJFINSV.NS", name: "Bajaj Finserv", sector: "Financial Services", news: "Bajaj Finserv" },
  { nse: "M&M", symbol: "M&M.NS", name: "Mahindra & Mahindra", sector: "Automobile", news: "Mahindra and Mahindra" },
  { nse: "TATASTEEL", symbol: "TATASTEEL.NS", name: "Tata Steel", sector: "Metals", news: "Tata Steel" },
  { nse: "JSWSTEEL", symbol: "JSWSTEEL.NS", name: "JSW Steel", sector: "Metals", news: "JSW Steel" },
  { nse: "HINDALCO", symbol: "HINDALCO.NS", name: "Hindalco Industries", sector: "Metals", news: "Hindalco" },
  { nse: "POWERGRID", symbol: "POWERGRID.NS", name: "Power Grid Corporation", sector: "Power", news: "Power Grid Corporation" },
  { nse: "NTPC", symbol: "NTPC.NS", name: "NTPC Limited", sector: "Power", news: "NTPC" },
  { nse: "ONGC", symbol: "ONGC.NS", name: "Oil & Natural Gas Corp", sector: "Energy", news: "ONGC" },
  { nse: "COALINDIA", symbol: "COALINDIA.NS", name: "Coal India", sector: "Energy", news: "Coal India" },
  { nse: "ADANIPORTS", symbol: "ADANIPORTS.NS", name: "Adani Ports", sector: "Infrastructure", news: "Adani Ports" },
  { nse: "ADANIENT", symbol: "ADANIENT.NS", name: "Adani Enterprises", sector: "Conglomerate", news: "Adani Enterprises" },
  { nse: "DRREDDY", symbol: "DRREDDY.NS", name: "Dr. Reddy's Laboratories", sector: "Pharma", news: "Dr Reddys Laboratories" },
  { nse: "CIPLA", symbol: "CIPLA.NS", name: "Cipla", sector: "Pharma", news: "Cipla" },
  { nse: "DIVISLAB", symbol: "DIVISLAB.NS", name: "Divi's Laboratories", sector: "Pharma", news: "Divis Laboratories" },
  { nse: "GRASIM", symbol: "GRASIM.NS", name: "Grasim Industries", sector: "Diversified", news: "Grasim Industries" },
  { nse: "BRITANNIA", symbol: "BRITANNIA.NS", name: "Britannia Industries", sector: "FMCG", news: "Britannia Industries" },
  { nse: "EICHERMOT", symbol: "EICHERMOT.NS", name: "Eicher Motors", sector: "Automobile", news: "Eicher Motors" },
  { nse: "HEROMOTOCO", symbol: "HEROMOTOCO.NS", name: "Hero MotoCorp", sector: "Automobile", news: "Hero MotoCorp" },
  { nse: "BAJAJ-AUTO", symbol: "BAJAJ-AUTO.NS", name: "Bajaj Auto", sector: "Automobile", news: "Bajaj Auto" },
  { nse: "TECHM", symbol: "TECHM.NS", name: "Tech Mahindra", sector: "Technology", news: "Tech Mahindra" },
  { nse: "INDUSINDBK", symbol: "INDUSINDBK.NS", name: "IndusInd Bank", sector: "Banking", news: "IndusInd Bank" },
  { nse: "SHRIRAMFIN", symbol: "SHRIRAMFIN.NS", name: "Shriram Finance", sector: "Financial Services", news: "Shriram Finance" },
  { nse: "SBILIFE", symbol: "SBILIFE.NS", name: "SBI Life Insurance", sector: "Insurance", news: "SBI Life Insurance" },
  { nse: "HDFCLIFE", symbol: "HDFCLIFE.NS", name: "HDFC Life Insurance", sector: "Insurance", news: "HDFC Life Insurance" },
  { nse: "APOLLOHOSP", symbol: "APOLLOHOSP.NS", name: "Apollo Hospitals", sector: "Healthcare", news: "Apollo Hospitals" },
  { nse: "LTIM", symbol: "LTIM.NS", name: "LTIMindtree", sector: "Technology", news: "LTIMindtree" },
  { nse: "PIDILITIND", symbol: "PIDILITIND.NS", name: "Pidilite Industries", sector: "Chemicals", news: "Pidilite Industries" },
  { nse: "DLF", symbol: "DLF.NS", name: "DLF Limited", sector: "Real Estate", news: "DLF Limited" },

  // Not in marketData.js, but used in the original demo holdings
  { nse: "TATAPOWER", symbol: "TATAPOWER.NS", name: "Tata Power", sector: "Power", news: "Tata Power" },
  { nse: "KPITTECH", symbol: "KPITTECH.NS", name: "KPIT Technologies", sector: "Technology", news: "KPIT Technologies" },
];
