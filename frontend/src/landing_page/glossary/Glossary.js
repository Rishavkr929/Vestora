import React, { useMemo, useState } from "react";

const glossaryTerms = [
  {
    "name": "52-Week High / Low",
    "definition": "The highest and lowest prices a stock traded at in the last year.",
    "example": "A stock at ₹140 with a 52-week range of ₹90-₹150 is near its yearly high.",
    "level": "beginner",
    "section": "Platform Terms",
    "group": "Investing basics"
  },
  {
    "name": "Absolute Return vs. Annualized Return",
    "definition": "Absolute return is the total gain over the whole period. Annualized return converts it to a per-year rate.",
    "example": "A 50% gain over 5 years is the absolute return; the yearly equivalent is roughly 8.4%.",
    "level": "intermediate",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Advance-Decline Ratio",
    "definition": "The number of stocks that rose compared to the number that fell, showing overall market strength.",
    "example": "1,500 advancing vs 500 declining stocks suggests a strong day.",
    "level": "intermediate",
    "section": "Indices & Benchmarks",
    "group": "Investing basics"
  },
  {
    "name": "After-Hours / Pre-Market Trading",
    "definition": "Trading that happens before the market opens or after it closes, usually with fewer participants.",
    "example": "A company releases results after closing time, and its price moves in after-hours trading.",
    "level": "intermediate",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Algorithmic Trading",
    "definition": "Using computer programs that follow set rules to place trades automatically.",
    "example": "A program buys whenever a moving average crossover occurs, with no manual input.",
    "level": "advanced",
    "section": "Trading Styles & Strategies",
    "group": "Investing basics"
  },
  {
    "name": "Alpha",
    "definition": "The extra return an investment earns compared with its benchmark after adjusting for risk.",
    "example": "A fund returning 14% when its benchmark returned 10% has a positive alpha.",
    "level": "advanced",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Annual Report",
    "definition": "A yearly document with a company's financials, strategy and management discussion.",
    "example": "Investors read it to understand the business before investing.",
    "level": "beginner",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "API",
    "definition": "A way for software to request and exchange data with another service, such as fetching live prices.",
    "example": "Our website uses a data API to show the latest share prices.",
    "level": "intermediate",
    "section": "Platform Terms",
    "group": "Investing basics"
  },
  {
    "name": "Asset Allocation",
    "definition": "How you divide your money among asset types such as stocks, bonds, gold and cash.",
    "example": "60% stocks, 30% bonds, 10% gold.",
    "level": "beginner",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Assets / Liabilities",
    "definition": "Assets are things a company owns that have value. Liabilities are what it owes to others.",
    "example": "A factory is an asset; a bank loan is a liability.",
    "level": "beginner",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Averaging Down / Rupee-Cost (Dollar-Cost) Averaging",
    "definition": "Averaging down means buying more as price falls to lower your average cost. Rupee-cost averaging means investing a fixed amount regularly regardless of price.",
    "example": "Investing ₹5,000 every month buys more units when prices are low and fewer when high.",
    "level": "beginner",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Balance Sheet",
    "definition": "A snapshot of what a company owns (assets) and owes (liabilities) at a point in time.",
    "example": "It shows cash, property, loans and the owners' share.",
    "level": "beginner",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Benchmark",
    "definition": "A standard, usually an index, used to compare how well an investment is performing.",
    "example": "If your fund returned 10% and its benchmark returned 12%, it underperformed.",
    "level": "beginner",
    "section": "Indices & Benchmarks",
    "group": "Investing basics"
  },
  {
    "name": "Beta",
    "definition": "How much a stock moves compared to the overall market. Above 1 means more volatile than the market.",
    "example": "A beta of 1.5 means the stock tends to rise or fall about 1.5% for each 1% market move.",
    "level": "advanced",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Bid Price / Ask Price",
    "definition": "The bid is the highest price a buyer is willing to pay. The ask is the lowest price a seller is willing to accept.",
    "example": "Bid ₹99.90 and ask ₹100.10 means buyers offer 99.90 while sellers want 100.10.",
    "level": "beginner",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Bid-Ask Spread",
    "definition": "The gap between the bid and the ask price. A smaller spread usually means a more liquid stock.",
    "example": "Bid ₹99.90 and ask ₹100.10 gives a spread of ₹0.20.",
    "level": "beginner",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Black Swan Event",
    "definition": "A rare, unexpected event with a huge impact on markets.",
    "example": "A sudden global crisis that causes markets everywhere to fall sharply.",
    "level": "intermediate",
    "section": "Economy & Market Drivers",
    "group": "Investing basics"
  },
  {
    "name": "Blue-chip Stock",
    "definition": "Shares of a large, well-established and financially stable company with a long track record.",
    "example": "Big, trusted companies that have paid dividends for decades are often called blue chips.",
    "level": "beginner",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "Bollinger Bands",
    "definition": "Bands drawn above and below a moving average that widen and narrow with volatility.",
    "example": "Price touching the upper band may mean it is stretched.",
    "level": "advanced",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Bond",
    "definition": "A loan you give to a government or company that pays you regular interest and returns your money at maturity.",
    "example": "You buy a ₹10,000 bond paying 7% a year for 5 years, so you get ₹700 each year and ₹10,000 back at the end.",
    "level": "beginner",
    "section": "Instruments",
    "group": "Funds"
  },
  {
    "name": "Bonus Shares",
    "definition": "Free extra shares given to existing shareholders from the company's reserves.",
    "example": "A 1:1 bonus gives you one free share for each share you hold, and the price adjusts down.",
    "level": "beginner",
    "section": "Corporate Actions & Income",
    "group": "Investing basics"
  },
  {
    "name": "Book Value",
    "definition": "What a company would be worth on paper if it sold its assets and paid off all debts.",
    "example": "Assets ₹500 crore minus liabilities ₹300 crore gives a book value of ₹200 crore.",
    "level": "beginner",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Breakout / Breakdown",
    "definition": "A breakout is when price moves above resistance; a breakdown is when it falls below support.",
    "example": "The price closes at ₹112 after being stuck below ₹110 for weeks, which is a breakout.",
    "level": "intermediate",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Broad-market Index",
    "definition": "An index covering a wide range of companies across many sectors, representing the overall market.",
    "example": "An index of the top 500 companies reflects the broad market.",
    "level": "beginner",
    "section": "Indices & Benchmarks",
    "group": "Investing basics"
  },
  {
    "name": "Broker / Stockbroker",
    "definition": "A licensed firm or person that places buy and sell orders on the exchange for you.",
    "example": "You use a broker's app to buy shares, and the broker sends your order to the exchange.",
    "level": "beginner",
    "section": "Accounts & Participants",
    "group": "Investing basics"
  },
  {
    "name": "Brokerage",
    "definition": "The fee a broker charges for executing your trades.",
    "example": "A flat ₹20 per order means you pay ₹20 each time you buy or sell.",
    "level": "beginner",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Brokerage Account",
    "definition": "A general term (common in the US) for an account at a broker that lets you buy and sell securities.",
    "example": "You open a brokerage account, deposit funds and start investing.",
    "level": "beginner",
    "section": "Accounts & Participants",
    "group": "Investing basics"
  },
  {
    "name": "Budget",
    "definition": "The government's yearly plan of income and spending, which can affect sectors and markets.",
    "example": "Markets may rally if the budget announces more infrastructure spending.",
    "level": "beginner",
    "section": "Economy & Market Drivers",
    "group": "Investing basics"
  },
  {
    "name": "Bull Market / Bear Market",
    "definition": "A bull market is a period of generally rising prices and optimism. A bear market is a period of falling prices (commonly a drop of 20% or more) and pessimism.",
    "example": "If an index climbs steadily for two years, that is a bull market. If it falls 25% from its peak, that is a bear market.",
    "level": "beginner",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "Buy / Sell",
    "definition": "Buying means acquiring shares. Selling means giving up shares you own in exchange for money.",
    "example": "You buy 10 shares at ₹100, then sell them later at ₹120 for a profit of ₹200.",
    "level": "beginner",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Buy and Hold",
    "definition": "A strategy of buying investments and keeping them for many years regardless of short-term ups and downs.",
    "example": "Buying an index fund and holding it for 15 years.",
    "level": "beginner",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Buyback",
    "definition": "When a company purchases its own shares from the market or shareholders, reducing the number of shares outstanding.",
    "example": "A company offers to buy back shares at ₹120 when the market price is ₹100.",
    "level": "intermediate",
    "section": "Corporate Actions & Income",
    "group": "Investing basics"
  },
  {
    "name": "CAGR",
    "definition": "Compound Annual Growth Rate: the steady yearly growth rate that would take an investment from its start value to its end value.",
    "example": "₹1,00,000 growing to ₹1,61,051 in 5 years is a CAGR of about 10%.",
    "level": "intermediate",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Call Option / Put Option",
    "definition": "A call gives the right to buy. A put gives the right to sell. Calls profit when prices rise, puts when prices fall.",
    "example": "You buy a put on a share at ₹100. If it drops to ₹80, you can still sell at ₹100.",
    "level": "intermediate",
    "section": "Derivatives",
    "group": "Investing basics"
  },
  {
    "name": "Candlestick Chart",
    "definition": "A chart where each \"candle\" shows the open, high, low and close for a period. The colour shows whether the price rose or fell.",
    "example": "A green candle usually means the price closed higher than it opened.",
    "level": "beginner",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Candlestick Patterns (Doji, Hammer, Engulfing)",
    "definition": "Specific candle shapes that traders read as clues about reversals or continuation.",
    "example": "A doji, with open and close nearly equal, shows indecision between buyers and sellers.",
    "level": "intermediate",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Capital Gains (Short-term and Long-term)",
    "definition": "Profit from selling an investment for more than you paid. Short-term and long-term are separated by holding period and taxed differently.",
    "example": "You buy at ₹100 and sell at ₹130 for a capital gain of ₹30 per share.",
    "level": "beginner",
    "section": "Corporate Actions & Income",
    "group": "Investing basics"
  },
  {
    "name": "Capital Gains Tax (STCG / LTCG)",
    "definition": "Tax on profit from selling investments. Short-term (STCG) and long-term (LTCG) gains are taxed at different rates depending on holding period.",
    "example": "Selling after a very short hold usually falls under STCG; check current rules for exact rates.",
    "level": "beginner",
    "section": "Regulation, Taxes & Costs",
    "group": "Investing basics"
  },
  {
    "name": "Capital Preservation",
    "definition": "Focusing mainly on not losing your money rather than chasing high returns.",
    "example": "Someone near retirement shifts more money to safer bonds.",
    "level": "beginner",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Cash Flow Statement",
    "definition": "A report showing how cash actually moved in and out of the company.",
    "example": "A company can show profit but still run short of cash if customers pay late.",
    "level": "intermediate",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Central Bank",
    "definition": "The national bank that controls money supply and interest rates.",
    "example": "The RBI in India and the Federal Reserve in the US.",
    "level": "beginner",
    "section": "Economy & Market Drivers",
    "group": "Investing basics"
  },
  {
    "name": "Chart Patterns (Head and Shoulders, Double Top/Bottom, Triangle, Flag)",
    "definition": "Recognisable shapes in price charts that traders believe hint at what may happen next.",
    "example": "A double top, where price fails twice at the same high, may signal a possible fall.",
    "level": "advanced",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Circuit Breaker / Upper Circuit / Lower Circuit",
    "definition": "Limits set by exchanges on how much a price can rise or fall in a day. Hitting the limit pauses or stops trading in that direction.",
    "example": "A stock with a 10% limit that rises 10% hits its upper circuit and cannot go higher that day.",
    "level": "intermediate",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Commodity",
    "definition": "A basic raw material or farm product that is traded, such as gold, oil or wheat.",
    "example": "Investors buy gold as a store of value during uncertain times.",
    "level": "beginner",
    "section": "Instruments",
    "group": "Funds"
  },
  {
    "name": "Compliance / Disclosure",
    "definition": "Following market rules and publicly sharing important company information.",
    "example": "Listed companies must announce results and major events to the exchange.",
    "level": "intermediate",
    "section": "Regulation, Taxes & Costs",
    "group": "Investing basics"
  },
  {
    "name": "Confirmation Bias",
    "definition": "Favouring information that supports what you already believe and ignoring what contradicts it.",
    "example": "Only reading positive news about a stock you own.",
    "level": "intermediate",
    "section": "Behavioral Finance",
    "group": "Investing basics"
  },
  {
    "name": "Contract Note",
    "definition": "A legal document from your broker listing the details and charges of every trade you made that day.",
    "example": "It shows the shares bought, price, quantity, brokerage and taxes for the day.",
    "level": "beginner",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Contrarian Investing",
    "definition": "Going against the crowd by buying what is out of favour and selling what is very popular.",
    "example": "Buying a good company whose price has dropped because of temporary bad news.",
    "level": "intermediate",
    "section": "Trading Styles & Strategies",
    "group": "Investing basics"
  },
  {
    "name": "Convertible Securities",
    "definition": "Bonds or preference shares that can be converted into a set number of equity shares later.",
    "example": "A convertible bond that can be exchanged for 10 shares after 3 years.",
    "level": "advanced",
    "section": "Instruments",
    "group": "Funds"
  },
  {
    "name": "Correlation",
    "definition": "How closely two investments move together. Low correlation helps diversification.",
    "example": "Gold often rises when stocks fall, so it can balance a stock-heavy portfolio.",
    "level": "advanced",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Cryptocurrency",
    "definition": "A digital currency secured by cryptography and not controlled by a central bank. It is generally very volatile.",
    "example": "Bitcoin's price can change by several percent within a single day.",
    "level": "intermediate",
    "section": "Instruments",
    "group": "Funds"
  },
  {
    "name": "Currency Exchange Rate",
    "definition": "The price of one currency in terms of another.",
    "example": "A weaker rupee makes imports costlier but can help exporters.",
    "level": "beginner",
    "section": "Economy & Market Drivers",
    "group": "Investing basics"
  },
  {
    "name": "Current Ratio / Quick Ratio",
    "definition": "Measures of whether a company can pay its short-term bills. The quick ratio excludes inventory.",
    "example": "A current ratio of 2 means it has twice as many short-term assets as short-term liabilities.",
    "level": "intermediate",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Custodian",
    "definition": "An institution that safely holds securities on behalf of investors.",
    "example": "A large fund keeps its securities with a custodian bank.",
    "level": "intermediate",
    "section": "Accounts & Participants",
    "group": "Investing basics"
  },
  {
    "name": "Cyclical vs. Defensive Stocks",
    "definition": "Cyclical stocks do well when the economy is strong (cars, travel). Defensive stocks stay steadier in downturns (food, healthcare).",
    "example": "People cut holidays in a recession, but still buy groceries and medicine.",
    "level": "intermediate",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Dashboard",
    "definition": "The main screen summarising your key information such as portfolio value, market status and watchlist.",
    "example": "After logging in, you see today's gains and your top holdings on the dashboard.",
    "level": "beginner",
    "section": "Platform Terms",
    "group": "Investing basics"
  },
  {
    "name": "Day Trading / Intraday",
    "definition": "Buying and selling within the same day, closing all positions before the market ends.",
    "example": "Buy at 10 AM, sell at 2 PM, and hold nothing overnight.",
    "level": "beginner",
    "section": "Trading Styles & Strategies",
    "group": "Investing basics"
  },
  {
    "name": "Debenture",
    "definition": "A type of company debt that is backed by the company's general credit rather than specific assets.",
    "example": "A company raises funds by issuing debentures that pay fixed interest.",
    "level": "intermediate",
    "section": "Instruments",
    "group": "Funds"
  },
  {
    "name": "Debt-to-Equity Ratio",
    "definition": "Compares what a company owes with what its owners have put in. Higher means more borrowing and more risk.",
    "example": "Debt ₹50 crore and equity ₹100 crore gives a ratio of 0.5.",
    "level": "intermediate",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Demat Account",
    "definition": "An account that holds your shares in electronic form, like a bank account for securities.",
    "example": "After you buy 10 shares, they appear in your demat account instead of as paper certificates.",
    "level": "beginner",
    "section": "Accounts & Participants",
    "group": "Investing basics"
  },
  {
    "name": "Demat Annual Maintenance Charges (AMC)",
    "definition": "A yearly fee some brokers charge to keep your demat account active.",
    "example": "An AMC of ₹300 a year is deducted from your account.",
    "level": "beginner",
    "section": "Regulation, Taxes & Costs",
    "group": "Investing basics"
  },
  {
    "name": "Demerger / Spin-off",
    "definition": "Splitting a company so one of its businesses becomes a separate company.",
    "example": "A conglomerate separates its finance arm, and shareholders receive shares of the new company.",
    "level": "intermediate",
    "section": "Corporate Actions & Income",
    "group": "Investing basics"
  },
  {
    "name": "Depository",
    "definition": "An organisation that stores securities electronically and records who owns them.",
    "example": "NSDL and CDSL are depositories in India, and your demat account is held with one of them through a participant.",
    "level": "intermediate",
    "section": "Accounts & Participants",
    "group": "Investing basics"
  },
  {
    "name": "Derivative",
    "definition": "A contract whose value depends on another asset, such as a share, index or commodity.",
    "example": "A contract based on the future price of an index is a derivative of that index.",
    "level": "intermediate",
    "section": "Derivatives",
    "group": "Investing basics"
  },
  {
    "name": "DII (Domestic Institutional Investor)",
    "definition": "Large institutions based in the home country, such as domestic mutual funds and insurers, that invest in the market.",
    "example": "DIIs buying heavily can offset selling by foreign investors.",
    "level": "intermediate",
    "section": "Accounts & Participants",
    "group": "Investing basics"
  },
  {
    "name": "Dilution",
    "definition": "A decrease in your ownership percentage when a company issues new shares.",
    "example": "Owning 1% of 100 shares becomes about 0.5% if the company doubles its share count.",
    "level": "intermediate",
    "section": "Corporate Actions & Income",
    "group": "Investing basics"
  },
  {
    "name": "Discount Broker vs. Full-service Broker",
    "definition": "Discount brokers charge low fees and offer mainly trading tools. Full-service brokers charge more but also provide research, advice and personal support.",
    "example": "A DIY investor may pick a discount broker, while someone wanting advice may choose a full-service one.",
    "level": "beginner",
    "section": "Accounts & Participants",
    "group": "Investing basics"
  },
  {
    "name": "Diversification",
    "definition": "Spreading your money across different investments so one bad performer doesn't hurt too much.",
    "example": "Instead of putting everything into one company, you split it across banking, IT, pharma and bonds.",
    "level": "beginner",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Dividend",
    "definition": "A portion of company profit paid out to shareholders.",
    "example": "A ₹5 dividend on 100 shares puts ₹500 in your bank account.",
    "level": "beginner",
    "section": "Corporate Actions & Income",
    "group": "Investing basics"
  },
  {
    "name": "Dividend Investing",
    "definition": "Focusing on companies that pay regular, reliable dividends to earn steady income.",
    "example": "Building a portfolio that pays you dividends every quarter.",
    "level": "beginner",
    "section": "Trading Styles & Strategies",
    "group": "Investing basics"
  },
  {
    "name": "Dividend Payout Ratio",
    "definition": "The percentage of profit a company pays out as dividends.",
    "example": "Paying ₹4 dividend from ₹10 EPS is a 40% payout ratio.",
    "level": "intermediate",
    "section": "Corporate Actions & Income",
    "group": "Investing basics"
  },
  {
    "name": "Dividend Stock",
    "definition": "A share of a company that regularly shares part of its profits with shareholders.",
    "example": "A company that pays ₹5 per share every year is a dividend stock.",
    "level": "beginner",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "Dividend Tax",
    "definition": "Tax on dividend income you receive, which depends on current tax rules in your country.",
    "example": "Dividends may be added to your income and taxed at your slab rate.",
    "level": "beginner",
    "section": "Regulation, Taxes & Costs",
    "group": "Investing basics"
  },
  {
    "name": "Dividend Yield",
    "definition": "Yearly dividend as a percentage of the share price.",
    "example": "₹5 dividend on a ₹100 share is a 5% yield.",
    "level": "beginner",
    "section": "Corporate Actions & Income",
    "group": "Investing basics"
  },
  {
    "name": "Drawdown",
    "definition": "The fall from a peak value to a later low point.",
    "example": "Portfolio goes from ₹1,00,000 to ₹80,000, a 20% drawdown.",
    "level": "intermediate",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Earnings Call",
    "definition": "A conference call where management explains results and answers analysts' questions.",
    "example": "The CEO explains why profits fell and what is planned next.",
    "level": "intermediate",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "EBITDA",
    "definition": "Earnings before interest, taxes, depreciation and amortisation. A rough measure of operating performance.",
    "example": "It lets you compare the core business of two companies with different debt levels.",
    "level": "advanced",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Emergency Fund",
    "definition": "Easily accessible savings kept aside for unexpected expenses, separate from your investments.",
    "example": "Keeping 6 months of expenses in a savings account before investing in stocks.",
    "level": "beginner",
    "section": "Portfolio & Risk Management",
    "group": "Funds"
  },
  {
    "name": "Emotional Investing",
    "definition": "Making investment decisions based on feelings rather than facts and a plan.",
    "example": "Selling everything in a market dip because of anxiety, then missing the recovery.",
    "level": "beginner",
    "section": "Behavioral Finance",
    "group": "Investing basics"
  },
  {
    "name": "EPS (Earnings Per Share)",
    "definition": "The company's profit divided by the number of shares. It shows profit earned per share.",
    "example": "₹100 crore profit ÷ 10 crore shares = ₹10 EPS.",
    "level": "beginner",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Equity Shares / Preference Shares",
    "definition": "Equity shares give ownership and voting rights with variable returns. Preference shares usually pay a fixed dividend and get paid before equity holders but typically have limited voting rights.",
    "example": "If a company closes down, preference shareholders are paid before equity shareholders.",
    "level": "beginner",
    "section": "Instruments",
    "group": "Funds"
  },
  {
    "name": "ETF (Exchange-Traded Fund)",
    "definition": "A fund that holds a basket of assets and trades on the exchange like a single share.",
    "example": "Buying one unit of an index ETF gives you exposure to all companies in that index.",
    "level": "beginner",
    "section": "Instruments",
    "group": "Funds"
  },
  {
    "name": "Ex-Dividend Date",
    "definition": "The first day a share trades without the right to the upcoming dividend. You must buy before this date to receive it.",
    "example": "If the ex-date is 20th, buying on 20th or later means you miss that dividend.",
    "level": "intermediate",
    "section": "Corporate Actions & Income",
    "group": "Investing basics"
  },
  {
    "name": "Execution",
    "definition": "The moment your order is actually completed in the market.",
    "example": "Your limit order was placed at 10:00 and executed at 10:12 when the price reached your level.",
    "level": "beginner",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Expense Ratio",
    "definition": "The yearly fee a fund charges, shown as a percentage of your investment.",
    "example": "A 1% expense ratio costs ₹1,000 a year on a ₹1,00,000 investment.",
    "level": "beginner",
    "section": "Instruments",
    "group": "Funds"
  },
  {
    "name": "Expiry Date",
    "definition": "The date on which a derivative contract ends and becomes worthless or is settled.",
    "example": "A contract expiring on the last Thursday of the month ends that day.",
    "level": "intermediate",
    "section": "Derivatives",
    "group": "Investing basics"
  },
  {
    "name": "Face Value / Par Value",
    "definition": "The original nominal value of a share written in company records. It is not the market price.",
    "example": "A share with a face value of ₹10 may trade at ₹500 in the market.",
    "level": "beginner",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "Fear and Greed",
    "definition": "The two emotions that often drive markets: fear causes panic selling, greed causes overbuying.",
    "example": "People rushing to buy at record highs is greed; dumping everything in a crash is fear.",
    "level": "beginner",
    "section": "Economy & Market Drivers",
    "group": "Investing basics"
  },
  {
    "name": "Fibonacci Retracement",
    "definition": "Horizontal lines at set percentages (like 38.2%, 50%, 61.8%) used to guess where a pullback may stop.",
    "example": "After rising from ₹100 to ₹200, traders watch around ₹138 or ₹150 for a bounce.",
    "level": "advanced",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "FII / FPI (Foreign Institutional / Portfolio Investor)",
    "definition": "Foreign entities that invest in a country's securities. Their buying and selling can move the market.",
    "example": "News saying \"FIIs were net sellers today\" means foreign investors sold more than they bought.",
    "level": "intermediate",
    "section": "Accounts & Participants",
    "group": "Investing basics"
  },
  {
    "name": "Fill or Kill (FOK) / Immediate or Cancel (IOC)",
    "definition": "FOK must be filled completely and immediately or it is cancelled. IOC fills whatever it can immediately and cancels the rest.",
    "example": "An IOC order for 100 shares where only 60 are available fills 60 and cancels 40.",
    "level": "advanced",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Fiscal Policy / Monetary Policy",
    "definition": "Fiscal policy is the government's spending and taxation. Monetary policy is the central bank's control of money supply and interest rates.",
    "example": "A tax cut is fiscal; a rate cut is monetary.",
    "level": "intermediate",
    "section": "Economy & Market Drivers",
    "group": "Investing basics"
  },
  {
    "name": "FOMO (Fear of Missing Out)",
    "definition": "The urge to buy something just because everyone else seems to be profiting from it.",
    "example": "Buying a stock after it has already doubled because friends are talking about it.",
    "level": "beginner",
    "section": "Behavioral Finance",
    "group": "Investing basics"
  },
  {
    "name": "FPO (Follow-on Public Offering)",
    "definition": "When an already-listed company issues additional shares to the public to raise more money.",
    "example": "A listed company needs funds to expand, so it issues new shares through an FPO.",
    "level": "intermediate",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "Free Cash Flow",
    "definition": "Cash a company generates after paying for the investments needed to run and grow its business.",
    "example": "Strong free cash flow means the company can pay dividends or reduce debt.",
    "level": "advanced",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Fundamental Analysis",
    "definition": "Judging a company's true worth by studying its finances, business, management and industry.",
    "example": "You read a company's profit growth and debt levels before deciding to buy.",
    "level": "beginner",
    "section": "Fundamental Analysis",
    "group": "Funds"
  },
  {
    "name": "Futures",
    "definition": "A contract to buy or sell an asset at a fixed price on a future date. Both sides are obligated to complete it.",
    "example": "You buy a futures contract at ₹100. If the price rises to ₹110 at expiry, you gain ₹10 per unit.",
    "level": "intermediate",
    "section": "Derivatives",
    "group": "Investing basics"
  },
  {
    "name": "Gainers / Losers",
    "definition": "Lists of stocks with the biggest price rises (gainers) and biggest falls (losers) for the day.",
    "example": "A stock up 8% appears at the top of the gainers list.",
    "level": "beginner",
    "section": "Platform Terms",
    "group": "Investing basics"
  },
  {
    "name": "Gap Up / Gap Down",
    "definition": "When a stock opens noticeably higher or lower than the previous close, leaving a gap on the chart.",
    "example": "Previous close ₹100, opening at ₹108 after good news is a gap up.",
    "level": "beginner",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "GDP",
    "definition": "Gross Domestic Product: the total value of goods and services a country produces, showing the size of its economy.",
    "example": "A GDP growth of 7% means the economy is expanding.",
    "level": "beginner",
    "section": "Economy & Market Drivers",
    "group": "Investing basics"
  },
  {
    "name": "Golden Cross / Death Cross",
    "definition": "A golden cross is when a short-term average crosses above a long-term one (bullish). A death cross is the opposite (bearish).",
    "example": "The 50-day average rising above the 200-day average forms a golden cross.",
    "level": "intermediate",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Good Till Cancelled (GTC) / Day Order",
    "definition": "A day order expires at the end of the trading day. A GTC order stays active until it is filled or you cancel it (some brokers set a maximum duration).",
    "example": "A limit buy at ₹95 placed as GTC stays open for days until the price reaches ₹95.",
    "level": "intermediate",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Government Securities",
    "definition": "Debt instruments issued by the government, considered among the safest investments.",
    "example": "A 10-year government bond paying fixed interest.",
    "level": "intermediate",
    "section": "Instruments",
    "group": "Funds"
  },
  {
    "name": "Gross Profit / Operating Profit",
    "definition": "Gross profit is revenue minus the direct cost of making the product. Operating profit also subtracts day-to-day running costs.",
    "example": "Sales ₹100, product cost ₹60 gives gross profit ₹40; after ₹15 of running costs, operating profit is ₹25.",
    "level": "intermediate",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Growth Investing",
    "definition": "Investing in companies expected to grow sales and profits faster than the market.",
    "example": "Choosing a fast-expanding company even if it is priced higher.",
    "level": "beginner",
    "section": "Trading Styles & Strategies",
    "group": "Investing basics"
  },
  {
    "name": "Growth Stock / Value Stock",
    "definition": "Growth stocks belong to companies expected to grow faster than average. Value stocks look cheap compared to what the company is worth.",
    "example": "A fast-growing tech firm that reinvests all profits is a growth stock. A mature firm trading below its real worth is a value stock.",
    "level": "beginner",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "Guidance",
    "definition": "The company's own forecast of its future performance.",
    "example": "A company says it expects 12-15% revenue growth next year.",
    "level": "intermediate",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Heatmap",
    "definition": "A colour-coded visual of the market where colours and sizes show gains, losses and company size.",
    "example": "Green boxes show rising stocks and red boxes show falling ones.",
    "level": "beginner",
    "section": "Platform Terms",
    "group": "Investing basics"
  },
  {
    "name": "Hedging",
    "definition": "Taking an opposite position to reduce the risk of losses, like buying insurance.",
    "example": "You hold shares and buy a put option so a price fall is partly covered.",
    "level": "intermediate",
    "section": "Derivatives",
    "group": "Investing basics"
  },
  {
    "name": "Herd Mentality",
    "definition": "Following what the crowd does instead of making your own decision.",
    "example": "Selling in panic simply because everyone else is selling.",
    "level": "beginner",
    "section": "Behavioral Finance",
    "group": "Investing basics"
  },
  {
    "name": "Hidden Charges",
    "definition": "Fees that are easy to miss, such as platform fees, call-and-trade fees or penalties.",
    "example": "Read your broker's full charge list so a small trade isn't eaten up by fees.",
    "level": "beginner",
    "section": "Regulation, Taxes & Costs",
    "group": "Investing basics"
  },
  {
    "name": "Holding Period",
    "definition": "How long you hold an investment from purchase to sale, which can affect tax.",
    "example": "Buy in January and sell in October gives a holding period of 9 months.",
    "level": "beginner",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Implied Volatility",
    "definition": "The market's expectation of how much a price may move in the future, reflected in option prices.",
    "example": "Option prices often rise before big events like results because implied volatility goes up.",
    "level": "advanced",
    "section": "Derivatives",
    "group": "Investing basics"
  },
  {
    "name": "In-the-Money / At-the-Money / Out-of-the-Money",
    "definition": "Describes an option's position against the market price. ITM would give a profit if used now, ATM is at the current price, OTM would not be profitable to use now.",
    "example": "With the share at ₹110, a call with a ₹100 strike is in-the-money.",
    "level": "advanced",
    "section": "Derivatives",
    "group": "Investing basics"
  },
  {
    "name": "Income Statement / Profit & Loss Statement",
    "definition": "A report showing a company's revenue, expenses and profit over a period.",
    "example": "It tells you whether the company made a profit or a loss in the quarter.",
    "level": "beginner",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Index",
    "definition": "A number that tracks the performance of a group of selected stocks and shows how the market or a sector is doing.",
    "example": "If an index of 50 large companies goes up 1%, it means those companies together rose about 1%.",
    "level": "beginner",
    "section": "Indices & Benchmarks",
    "group": "Investing basics"
  },
  {
    "name": "Index Fund",
    "definition": "A fund that simply copies a market index instead of trying to beat it, usually with low fees.",
    "example": "An index fund tracking the top 50 companies holds those same 50 in the same proportions.",
    "level": "beginner",
    "section": "Instruments",
    "group": "Funds"
  },
  {
    "name": "Index Rebalancing",
    "definition": "Periodic updating of an index's list of companies and their weights.",
    "example": "A shrinking company may be removed and a growing one added at the next review.",
    "level": "intermediate",
    "section": "Indices & Benchmarks",
    "group": "Investing basics"
  },
  {
    "name": "Inflation",
    "definition": "The general rise in prices over time, which reduces what your money can buy.",
    "example": "With 6% inflation, something that cost ₹100 last year costs ₹106 now.",
    "level": "beginner",
    "section": "Economy & Market Drivers",
    "group": "Investing basics"
  },
  {
    "name": "Insider Trading",
    "definition": "Illegally trading shares using important non-public information about a company.",
    "example": "An employee who learns of a big deal before it is announced and buys shares early is committing insider trading.",
    "level": "beginner",
    "section": "Accounts & Participants",
    "group": "Investing basics"
  },
  {
    "name": "Institutional Investor",
    "definition": "A large organisation that invests on a big scale, such as mutual funds, insurance companies and pension funds.",
    "example": "A pension fund buying shares worth hundreds of crores.",
    "level": "intermediate",
    "section": "Accounts & Participants",
    "group": "Investing basics"
  },
  {
    "name": "Interest Coverage Ratio",
    "definition": "How many times a company's operating profit can cover its interest payments.",
    "example": "Profit ₹30 crore and interest ₹10 crore gives coverage of 3 times.",
    "level": "intermediate",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Interest Rate / Repo Rate",
    "definition": "The cost of borrowing money. The repo rate is the rate at which the central bank lends to commercial banks.",
    "example": "When the central bank raises rates, loans become costlier, which can pull stock prices down.",
    "level": "beginner",
    "section": "Economy & Market Drivers",
    "group": "Investing basics"
  },
  {
    "name": "Intrinsic Value",
    "definition": "The estimated true worth of a stock based on the business, which may differ from its market price.",
    "example": "If you estimate a share is worth ₹150 but it trades at ₹100, it may be undervalued.",
    "level": "intermediate",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Investor vs. Trader",
    "definition": "An investor buys to hold for years and grow wealth. A trader buys and sells over short periods to profit from price moves.",
    "example": "Buying a company's shares and holding for 10 years is investing. Buying in the morning and selling by afternoon is trading.",
    "level": "beginner",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "IPO (Initial Public Offering)",
    "definition": "The first time a private company offers its shares to the public to raise money.",
    "example": "A startup sells 10 million new shares at ₹200 each in an IPO and then gets listed on the exchange.",
    "level": "beginner",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "KYC (Know Your Customer)",
    "definition": "A mandatory identity verification process to open financial accounts, which helps prevent fraud.",
    "example": "You submit ID proof, address proof and a photo when opening your account.",
    "level": "beginner",
    "section": "Accounts & Participants",
    "group": "Investing basics"
  },
  {
    "name": "Leverage / Margin Trading",
    "definition": "Using borrowed money to take a bigger position. It magnifies both gains and losses.",
    "example": "With 5x leverage, a 10% price fall can wipe out 50% of your own capital.",
    "level": "intermediate",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Limit Order",
    "definition": "An order to buy or sell only at a price you set, or better.",
    "example": "A limit buy at ₹98 will only execute if the price falls to ₹98 or lower.",
    "level": "beginner",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Line Chart / Bar Chart",
    "definition": "A line chart connects closing prices with a line. A bar chart shows open, high, low and close as vertical bars.",
    "example": "A line chart is good for seeing the overall trend at a glance.",
    "level": "beginner",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Liquidity / Illiquid",
    "definition": "How easily you can buy or sell something without moving its price. Illiquid means hard to sell quickly.",
    "example": "A popular large-cap share can be sold in seconds. A rarely traded small stock may take days to find a buyer.",
    "level": "beginner",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "Listing / Delisting",
    "definition": "Listing means a company's shares become available for trading on an exchange. Delisting means they are removed from the exchange.",
    "example": "After its IPO, a company gets listed. If it is acquired and goes private, it may be delisted.",
    "level": "beginner",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "Lock-in Period",
    "definition": "A period during which you are not allowed to sell certain investments or shares.",
    "example": "Some tax-saving funds have a 3-year lock-in before you can withdraw.",
    "level": "intermediate",
    "section": "Corporate Actions & Income",
    "group": "Investing basics"
  },
  {
    "name": "Long Position / Short Position",
    "definition": "A long position profits when the price rises (you bought). A short position profits when the price falls (you sold first).",
    "example": "Buying shares is going long; short selling is going short.",
    "level": "beginner",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Long-term Investing",
    "definition": "Holding investments for many years to benefit from business growth and compounding.",
    "example": "Investing monthly for 20 years for retirement.",
    "level": "beginner",
    "section": "Trading Styles & Strategies",
    "group": "Investing basics"
  },
  {
    "name": "Loss Aversion",
    "definition": "Feeling the pain of a loss more strongly than the joy of an equal gain, which can lead to poor decisions.",
    "example": "Holding a losing stock for years to avoid admitting the loss.",
    "level": "intermediate",
    "section": "Behavioral Finance",
    "group": "Investing basics"
  },
  {
    "name": "Lot Size / Tick Size",
    "definition": "Lot size is the fixed quantity in which some instruments (like futures and options) must be traded. Tick size is the smallest allowed price movement.",
    "example": "If the lot size is 50 and the tick size is ₹0.05, you trade in multiples of 50 and the price moves in steps of 5 paise.",
    "level": "beginner",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "MACD",
    "definition": "A momentum indicator based on the gap between two moving averages, used to spot trend changes.",
    "example": "When the MACD line crosses above its signal line, some traders see it as a buy signal.",
    "level": "advanced",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Margin (Initial and Maintenance)",
    "definition": "Money you must deposit to open and keep a leveraged or derivative position. Initial margin is needed to open it, maintenance margin is the minimum to keep it open.",
    "example": "To hold a futures position worth ₹1,00,000 you may need to deposit ₹15,000 as margin.",
    "level": "intermediate",
    "section": "Derivatives",
    "group": "Investing basics"
  },
  {
    "name": "Margin Account",
    "definition": "An account that lets you borrow money from the broker to buy more than you could with your own cash.",
    "example": "With ₹50,000 of your own money, a margin facility may let you take positions worth more than that.",
    "level": "intermediate",
    "section": "Accounts & Participants",
    "group": "Investing basics"
  },
  {
    "name": "Margin Call",
    "definition": "A demand from your broker to add money or sell positions because your account value has fallen too low.",
    "example": "After losses, your broker asks you to deposit more funds or it will close your positions.",
    "level": "intermediate",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Margin of Safety",
    "definition": "Buying at a price well below your estimate of value to protect against errors.",
    "example": "You think a share is worth ₹100 and only buy at ₹70.",
    "level": "intermediate",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Mark-to-Market (MTM)",
    "definition": "Daily adjustment of your position's value to current market prices, with gains or losses settled in your account.",
    "example": "If your futures position loses ₹2,000 today, that amount is deducted from your margin account today.",
    "level": "advanced",
    "section": "Derivatives",
    "group": "Investing basics"
  },
  {
    "name": "Market Breadth",
    "definition": "A measure of how many stocks are participating in a market move.",
    "example": "If an index rises but only a few stocks rise, the breadth is weak.",
    "level": "intermediate",
    "section": "Indices & Benchmarks",
    "group": "Investing basics"
  },
  {
    "name": "Market Capitalization (Large-cap, Mid-cap, Small-cap)",
    "definition": "The total market value of a company: share price × number of shares. Companies are grouped as large, mid or small cap by size.",
    "example": "Price ₹100 × 10 crore shares = ₹1,000 crore market cap.",
    "level": "beginner",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "Market Depth",
    "definition": "A display of the best buy and sell orders at different price levels, showing supply and demand.",
    "example": "Large buy orders stacked below the current price suggest strong demand.",
    "level": "intermediate",
    "section": "Platform Terms",
    "group": "Investing basics"
  },
  {
    "name": "Market Maker",
    "definition": "A firm that continuously quotes both buy and sell prices, helping keep a market liquid.",
    "example": "A market maker always offers to buy at ₹99.90 and sell at ₹100.10 so you can trade any time.",
    "level": "intermediate",
    "section": "Accounts & Participants",
    "group": "Investing basics"
  },
  {
    "name": "Market Manipulation (Pump and Dump)",
    "definition": "Illegally pushing a price up with false hype, then selling to unsuspecting buyers.",
    "example": "Social media tips urging you to buy an obscure stock immediately can be a pump-and-dump warning sign.",
    "level": "intermediate",
    "section": "Regulation, Taxes & Costs",
    "group": "Investing basics"
  },
  {
    "name": "Market Order",
    "definition": "An order to buy or sell immediately at the best available current price.",
    "example": "You place a market buy order for 5 shares and they are bought at whatever the best sellers are asking right now.",
    "level": "beginner",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Market Sentiment",
    "definition": "The overall mood of investors, optimistic or fearful, which influences buying and selling.",
    "example": "Good economic news lifts sentiment, and many people start buying at once.",
    "level": "beginner",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "Merger / Acquisition",
    "definition": "A merger combines two companies into one. An acquisition is when one company buys another.",
    "example": "A large company buys a smaller rival to gain customers.",
    "level": "intermediate",
    "section": "Corporate Actions & Income",
    "group": "Investing basics"
  },
  {
    "name": "Moat",
    "definition": "A lasting competitive advantage that protects a company from rivals.",
    "example": "A strong brand or low-cost production can act as a moat.",
    "level": "intermediate",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Momentum",
    "definition": "The speed and strength of a price move.",
    "example": "A stock rising on high volume day after day has strong momentum.",
    "level": "intermediate",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Momentum Investing",
    "definition": "Buying assets that have recently been rising, expecting the trend to continue.",
    "example": "Buying the best-performing stocks of the last 6 months.",
    "level": "intermediate",
    "section": "Trading Styles & Strategies",
    "group": "Investing basics"
  },
  {
    "name": "Moving Average (SMA, EMA)",
    "definition": "The average price over a set number of days, which smooths out noise. EMA gives more weight to recent prices.",
    "example": "A 50-day moving average is the average of the last 50 closing prices.",
    "level": "intermediate",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Mutual Fund",
    "definition": "A pool of money from many investors, managed by professionals who invest it in shares, bonds or other assets.",
    "example": "You put ₹1,000 into a fund that spreads it across 50 companies.",
    "level": "beginner",
    "section": "Instruments",
    "group": "Funds"
  },
  {
    "name": "NAV (Net Asset Value)",
    "definition": "The per-unit price of a mutual fund, calculated from the total value of its holdings divided by the number of units.",
    "example": "If the NAV is ₹50, ₹5,000 buys you 100 units.",
    "level": "beginner",
    "section": "Instruments",
    "group": "Funds"
  },
  {
    "name": "Net Profit / Net Income",
    "definition": "What is left after subtracting all expenses, interest and taxes from revenue.",
    "example": "Revenue ₹100, total costs and taxes ₹85, net profit ₹15.",
    "level": "beginner",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Net Worth Tracker",
    "definition": "A tool that adds up everything you own minus everything you owe to show your total financial position.",
    "example": "Investments ₹5 lakh + savings ₹2 lakh - loan ₹1 lakh = net worth ₹6 lakh.",
    "level": "beginner",
    "section": "Platform Terms",
    "group": "Investing basics"
  },
  {
    "name": "Nominee",
    "definition": "The person you choose to receive your investments if something happens to you.",
    "example": "You name your spouse as nominee so the shares can be transferred smoothly.",
    "level": "beginner",
    "section": "Accounts & Participants",
    "group": "Investing basics"
  },
  {
    "name": "Open Interest",
    "definition": "The total number of derivative contracts that are still open and not yet closed or settled.",
    "example": "Rising open interest alongside rising prices can suggest fresh money entering the trend.",
    "level": "advanced",
    "section": "Derivatives",
    "group": "Investing basics"
  },
  {
    "name": "Open, High, Low, Close (OHLC)",
    "definition": "The four key prices of a trading period: where it opened, its highest and lowest points, and where it closed.",
    "example": "Open 100, High 105, Low 98, Close 103.",
    "level": "beginner",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Option Greeks (Delta, Gamma, Theta, Vega)",
    "definition": "Measures of how an option's price reacts to changes. Delta: price of the asset. Gamma: how fast delta changes. Theta: passing of time. Vega: volatility.",
    "example": "A delta of 0.5 means the option price moves about ₹0.50 for every ₹1 move in the share.",
    "level": "advanced",
    "section": "Derivatives",
    "group": "Investing basics"
  },
  {
    "name": "Options",
    "definition": "A contract that gives you the right, but not the obligation, to buy or sell an asset at a set price before a date.",
    "example": "You pay a small fee for the right to buy a share at ₹100 later, even if the market price rises.",
    "level": "intermediate",
    "section": "Derivatives",
    "group": "Investing basics"
  },
  {
    "name": "Order Book",
    "definition": "A live list of all pending buy and sell orders for a stock, sorted by price.",
    "example": "You can see 500 shares wanted at ₹99.90 and 300 shares offered at ₹100.10.",
    "level": "intermediate",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Over-the-Counter (OTC)",
    "definition": "Trading done directly between two parties instead of on a central exchange.",
    "example": "Two institutions agree on a trade privately rather than through the exchange order book.",
    "level": "intermediate",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "Overbought / Oversold",
    "definition": "Overbought means a price may have risen too far too fast. Oversold means it may have fallen too far too fast.",
    "example": "After a sharp 30% fall in a week, a stock may be called oversold.",
    "level": "beginner",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Overtrading",
    "definition": "Trading far too often, which increases costs and mistakes.",
    "example": "Making 30 small trades a day and losing most of the gains to brokerage and taxes.",
    "level": "beginner",
    "section": "Behavioral Finance",
    "group": "Investing basics"
  },
  {
    "name": "P/B Ratio (Price-to-Book)",
    "definition": "Share price compared to the company's book value per share.",
    "example": "Price ₹150 and book value ₹50 per share gives a P/B of 3.",
    "level": "intermediate",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "P/E Ratio (Price-to-Earnings)",
    "definition": "Share price divided by EPS. It shows how much investors pay for each ₹1 of profit.",
    "example": "Price ₹200 and EPS ₹10 gives a P/E of 20.",
    "level": "beginner",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Paper Trading",
    "definition": "Practising trading with virtual money, with no real risk, to learn how markets work.",
    "example": "You get ₹10,00,000 of virtual cash to build a pretend portfolio and see how it performs.",
    "level": "beginner",
    "section": "Trading Styles & Strategies",
    "group": "Investing basics"
  },
  {
    "name": "PEG Ratio",
    "definition": "P/E ratio divided by the expected earnings growth rate. It adjusts valuation for growth.",
    "example": "P/E of 20 with 20% growth gives a PEG of 1.",
    "level": "advanced",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Penny Stock",
    "definition": "A very low-priced share, usually of a small company, that is often risky and hard to trade.",
    "example": "A share priced at ₹3 with very few daily buyers can swing 20% in a day, so it is high risk.",
    "level": "beginner",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "Pivot Points",
    "definition": "Levels calculated from the previous day's high, low and close that traders use as possible support and resistance.",
    "example": "Day traders watch pivot levels to plan entries and exits.",
    "level": "advanced",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Ponzi Scheme / Scam Awareness",
    "definition": "A Ponzi scheme pays early investors with money from new investors, not real profits, and eventually collapses. Scam awareness means spotting such frauds.",
    "example": "Be careful of anyone promising guaranteed high returns with no risk.",
    "level": "beginner",
    "section": "Regulation, Taxes & Costs",
    "group": "Investing basics"
  },
  {
    "name": "Portfolio",
    "definition": "The collection of all your investments.",
    "example": "Your portfolio may include 5 stocks, 2 mutual funds and some bonds.",
    "level": "beginner",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Portfolio Tracker",
    "definition": "A tool that shows what you own, its current value and your overall profit or loss.",
    "example": "It shows your portfolio is up 8% since you started.",
    "level": "beginner",
    "section": "Platform Terms",
    "group": "Investing basics"
  },
  {
    "name": "Position Sizing",
    "definition": "Deciding how much money to put into a single trade or investment.",
    "example": "Never risking more than 1-2% of your capital on a single trade is a common rule of thumb.",
    "level": "intermediate",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Positional Trading",
    "definition": "Holding trades for weeks to months to follow a bigger trend.",
    "example": "Buying a stock in an uptrend and holding for three months.",
    "level": "beginner",
    "section": "Trading Styles & Strategies",
    "group": "Investing basics"
  },
  {
    "name": "Premium",
    "definition": "The price you pay to buy an option contract.",
    "example": "A premium of ₹10 per share with a lot of 50 costs ₹500 in total.",
    "level": "intermediate",
    "section": "Derivatives",
    "group": "Investing basics"
  },
  {
    "name": "Previous Close",
    "definition": "The closing price of the previous trading day, used to calculate today's gain or loss.",
    "example": "Previous close ₹100 and current price ₹103 shows a +3% change.",
    "level": "beginner",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Price Alert",
    "definition": "A notification sent when a stock reaches a price you chose.",
    "example": "Set an alert for ₹95 so you're notified if the price falls there.",
    "level": "beginner",
    "section": "Platform Terms",
    "group": "Investing basics"
  },
  {
    "name": "Primary Market / Secondary Market",
    "definition": "In the primary market, companies sell new shares directly to investors. In the secondary market, investors trade existing shares among themselves.",
    "example": "Applying for shares in an IPO is the primary market. Buying those shares later on the exchange is the secondary market.",
    "level": "intermediate",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "Profit Margin",
    "definition": "Profit as a percentage of revenue, showing how much of each rupee of sales is kept as profit.",
    "example": "Net profit ₹15 on revenue ₹100 is a 15% margin.",
    "level": "intermediate",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Promoter / Promoter Holding",
    "definition": "Promoters are the founders or controlling owners of a company. Promoter holding is the percentage of shares they own.",
    "example": "A promoter holding of 60% means the founders own 60% of the shares.",
    "level": "intermediate",
    "section": "Accounts & Participants",
    "group": "Investing basics"
  },
  {
    "name": "Public Company / Private Company",
    "definition": "A public company's shares can be bought by anyone on an exchange. A private company's shares are held by a small group and are not openly traded.",
    "example": "You can buy shares of a listed company from your app, but not of your neighbourhood bakery.",
    "level": "beginner",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "Quarterly Results",
    "definition": "Financial results a listed company publishes every three months.",
    "example": "A share may jump or fall right after a company announces better or worse quarterly results than expected.",
    "level": "beginner",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Rally / Correction / Crash",
    "definition": "A rally is a sustained rise in prices. A correction is a fall of about 10% from a recent peak. A crash is a sudden, steep decline.",
    "example": "An index falling 12% from its high is in a correction.",
    "level": "beginner",
    "section": "Economy & Market Drivers",
    "group": "Investing basics"
  },
  {
    "name": "Real-time vs. Delayed Data",
    "definition": "Real-time data shows prices as they happen. Delayed data shows prices a few minutes late.",
    "example": "A price marked \"15 min delayed\" is not the current live price.",
    "level": "beginner",
    "section": "Platform Terms",
    "group": "Investing basics"
  },
  {
    "name": "Rebalancing",
    "definition": "Adjusting your portfolio back to your target allocation after prices move it off balance.",
    "example": "Stocks grew from 60% to 70% of your portfolio, so you sell some to return to 60%.",
    "level": "intermediate",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Recession",
    "definition": "A period when the economy shrinks, with falling incomes, jobs and spending.",
    "example": "Two consecutive quarters of falling GDP is commonly seen as a recession.",
    "level": "beginner",
    "section": "Economy & Market Drivers",
    "group": "Investing basics"
  },
  {
    "name": "Record Date",
    "definition": "The date the company checks its records to see who is eligible for a dividend or other benefit.",
    "example": "You must be on the shareholder list on the record date to get the dividend.",
    "level": "intermediate",
    "section": "Corporate Actions & Income",
    "group": "Investing basics"
  },
  {
    "name": "Regulator",
    "definition": "A government-backed body that makes and enforces rules to keep markets fair and protect investors.",
    "example": "SEBI in India and the SEC in the US.",
    "level": "beginner",
    "section": "Accounts & Participants",
    "group": "Investing basics"
  },
  {
    "name": "REIT / InvIT",
    "definition": "Trusts that own income-generating real estate (REIT) or infrastructure (InvIT) and let you invest in them through units, earning a share of the income.",
    "example": "You buy units of a REIT that owns office buildings and receive a portion of the rent.",
    "level": "intermediate",
    "section": "Instruments",
    "group": "Funds"
  },
  {
    "name": "Retail Investor",
    "definition": "An individual who invests their own money, usually in smaller amounts.",
    "example": "A salaried person investing ₹5,000 a month is a retail investor.",
    "level": "beginner",
    "section": "Accounts & Participants",
    "group": "Investing basics"
  },
  {
    "name": "Return / ROI",
    "definition": "The profit or loss on an investment, usually as a percentage of what you put in.",
    "example": "Invest ₹10,000 and it becomes ₹11,000, so the return is 10%.",
    "level": "beginner",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Revenge Trading",
    "definition": "Making rushed, bigger trades to win back a loss, driven by emotion instead of a plan.",
    "example": "After losing ₹5,000, doubling your trade size right away to recover it, and losing more.",
    "level": "beginner",
    "section": "Behavioral Finance",
    "group": "Investing basics"
  },
  {
    "name": "Revenue / Turnover",
    "definition": "The total money a company earns from sales before deducting any costs.",
    "example": "A shop sells goods worth ₹10 lakh in a month, so its revenue is ₹10 lakh.",
    "level": "beginner",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Rights Issue",
    "definition": "An offer to existing shareholders to buy new shares, usually at a discount, before they are offered to others.",
    "example": "You may be offered 1 new share at ₹80 for every 5 you own when the market price is ₹100.",
    "level": "intermediate",
    "section": "Corporate Actions & Income",
    "group": "Investing basics"
  },
  {
    "name": "Risk Tolerance",
    "definition": "How much loss or price swing you can handle, financially and emotionally.",
    "example": "If a 20% fall would make you panic and sell, your risk tolerance is low.",
    "level": "beginner",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Risk-Reward Ratio",
    "definition": "Compares how much you could lose to how much you could gain on a trade.",
    "example": "Risking ₹10 to potentially gain ₹30 is a 1:3 ratio.",
    "level": "intermediate",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "ROA (Return on Assets)",
    "definition": "Profit as a percentage of the company's total assets.",
    "example": "₹10 crore profit from ₹200 crore assets is a 5% ROA.",
    "level": "intermediate",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "ROCE (Return on Capital Employed)",
    "definition": "Operating profit as a percentage of all capital used (equity plus debt), showing how well the whole business uses its money.",
    "example": "A higher ROCE means the company earns more from every rupee invested in it.",
    "level": "advanced",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "ROE (Return on Equity)",
    "definition": "Profit earned as a percentage of shareholders' money. It shows how efficiently the company uses it.",
    "example": "₹15 crore profit on ₹100 crore equity is a 15% ROE.",
    "level": "intermediate",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "RSI (Relative Strength Index)",
    "definition": "A 0-100 indicator of price momentum. Above 70 is often seen as overbought, below 30 as oversold.",
    "example": "An RSI of 80 suggests a stock may have risen too fast.",
    "level": "intermediate",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Scalping",
    "definition": "Making many very quick trades to earn tiny profits each time.",
    "example": "Entering and exiting within minutes to capture a ₹0.50 move many times a day.",
    "level": "intermediate",
    "section": "Trading Styles & Strategies",
    "group": "Investing basics"
  },
  {
    "name": "Screener",
    "definition": "A tool that filters stocks using criteria you choose.",
    "example": "Show only companies with P/E below 20 and no debt.",
    "level": "intermediate",
    "section": "Platform Terms",
    "group": "Investing basics"
  },
  {
    "name": "Sector / Industry",
    "definition": "A group of companies doing similar business, such as banking, IT or pharma.",
    "example": "Different car makers all belong to the automobile sector.",
    "level": "beginner",
    "section": "Fundamental Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Sectoral Index",
    "definition": "An index that tracks companies from one industry only.",
    "example": "A banking index tracks only bank stocks.",
    "level": "beginner",
    "section": "Indices & Benchmarks",
    "group": "Investing basics"
  },
  {
    "name": "Securities Regulator (SEBI, SEC)",
    "definition": "The authority that oversees the securities market and protects investors. SEBI regulates in India, the SEC in the US.",
    "example": "Companies must follow its disclosure rules before offering shares in an IPO.",
    "level": "beginner",
    "section": "Regulation, Taxes & Costs",
    "group": "Investing basics"
  },
  {
    "name": "Settlement (T+1, T+2)",
    "definition": "The process of transferring shares and money after a trade. T+1 means it completes one business day after the trade date.",
    "example": "If you buy on Monday under T+1, the shares reach your demat account on Tuesday.",
    "level": "beginner",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Sharpe Ratio",
    "definition": "A measure of return earned for each unit of risk taken. Higher is better.",
    "example": "Of two funds with equal returns, the one with the higher Sharpe ratio took less risk.",
    "level": "advanced",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Short Selling",
    "definition": "Selling a borrowed share in the hope of buying it back cheaper later. Losses can be unlimited if the price rises.",
    "example": "Sell at ₹100, buy back at ₹80, and keep the ₹20 difference.",
    "level": "intermediate",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Sideways (Range-bound) Market",
    "definition": "A market that moves within a narrow band without a clear upward or downward trend.",
    "example": "A share bouncing between ₹95 and ₹105 for months is range-bound.",
    "level": "intermediate",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "SIP (Systematic Investment Plan)",
    "definition": "A way to invest a fixed amount at regular intervals (usually monthly) in a mutual fund.",
    "example": "Investing ₹2,000 on the 5th of every month automatically.",
    "level": "beginner",
    "section": "Instruments",
    "group": "Funds"
  },
  {
    "name": "Slippage",
    "definition": "The difference between the price you expected and the price you actually got.",
    "example": "You expect to buy at ₹100 but the order fills at ₹100.30 because the price moved.",
    "level": "intermediate",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Square Off",
    "definition": "Closing an open position by making the opposite trade.",
    "example": "You bought 10 shares in the morning and sell the same 10 in the afternoon to square off.",
    "level": "beginner",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Standard Deviation",
    "definition": "A statistical measure of how widely returns vary around their average, used as a measure of risk.",
    "example": "A fund with a higher standard deviation has bumpier returns.",
    "level": "advanced",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Stock / Share / Equity",
    "definition": "A small piece of ownership in a company. If you own a share, you own a tiny part of that business.",
    "example": "If a company has 1,000,000 shares and you buy 1,000, you own 0.1% of the company.",
    "level": "beginner",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "Stock Exchange",
    "definition": "A regulated marketplace where shares are listed and traded.",
    "example": "NSE and BSE in India, or NYSE and NASDAQ in the US.",
    "level": "beginner",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "Stock Exchange Examples (NSE, BSE, NYSE, NASDAQ)",
    "definition": "Major exchanges where shares are traded. NSE and BSE are in India; NYSE and NASDAQ are in the US.",
    "example": "A company can be listed on both NSE and BSE.",
    "level": "beginner",
    "section": "Regulation, Taxes & Costs",
    "group": "Investing basics"
  },
  {
    "name": "Stock Market",
    "definition": "The overall system where buyers and sellers trade shares of publicly listed companies.",
    "example": "When you buy a share through your app, your order goes to the stock market, where it is matched with someone selling that share.",
    "level": "beginner",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "Stock Split",
    "definition": "Dividing existing shares into more shares, lowering the price per share but leaving total value unchanged.",
    "example": "In a 1:2 split, one ₹1,000 share becomes two ₹500 shares.",
    "level": "beginner",
    "section": "Corporate Actions & Income",
    "group": "Investing basics"
  },
  {
    "name": "Stop-Limit Order",
    "definition": "A stop order that turns into a limit order once the trigger price is hit, so you control the minimum selling price.",
    "example": "Trigger ₹90, limit ₹89: when the price hits ₹90, it tries to sell but not below ₹89.",
    "level": "intermediate",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Stop-Loss Order",
    "definition": "An order that automatically sells your shares if the price falls to a set level, limiting your loss.",
    "example": "You bought at ₹100 and set a stop-loss at ₹90, so your shares are sold if the price drops to ₹90.",
    "level": "beginner",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Stop-loss Strategy",
    "definition": "A plan to exit a trade at a pre-decided loss level to protect your capital.",
    "example": "Deciding in advance that you will exit if a stock falls 8% from your buying price.",
    "level": "beginner",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Strike Price",
    "definition": "The fixed price at which an option lets you buy or sell the underlying asset.",
    "example": "A call option with a strike of ₹500 lets you buy at ₹500.",
    "level": "intermediate",
    "section": "Derivatives",
    "group": "Investing basics"
  },
  {
    "name": "STT and Other Transaction Charges",
    "definition": "Securities Transaction Tax and other small fees (exchange fees, stamp duty, GST) charged on trades.",
    "example": "Your contract note lists these charges, which add to the cost of each trade.",
    "level": "intermediate",
    "section": "Regulation, Taxes & Costs",
    "group": "Investing basics"
  },
  {
    "name": "Support and Resistance",
    "definition": "Support is a price level where falling prices tend to stop. Resistance is a level where rising prices tend to stall.",
    "example": "A share keeps bouncing from ₹90 (support) and struggles to cross ₹110 (resistance).",
    "level": "beginner",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Swing Trading",
    "definition": "Holding trades for several days to weeks to capture a price \"swing\".",
    "example": "Buy after a dip and sell a week later after a bounce.",
    "level": "beginner",
    "section": "Trading Styles & Strategies",
    "group": "Investing basics"
  },
  {
    "name": "Tax-saving Investments",
    "definition": "Investments that may reduce your taxable income under tax law.",
    "example": "Certain funds and schemes allow deductions up to a stated limit; always check current rules.",
    "level": "intermediate",
    "section": "Regulation, Taxes & Costs",
    "group": "Investing basics"
  },
  {
    "name": "Technical Analysis",
    "definition": "Studying price charts and trading volume to guess where a price may go next.",
    "example": "A trader sees a price repeatedly bouncing from ₹100 and decides to buy near it.",
    "level": "beginner",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Ticker / Ticker Symbol",
    "definition": "A short code that identifies a stock on an exchange.",
    "example": "Search for a company by typing its ticker symbol into the search bar.",
    "level": "beginner",
    "section": "Platform Terms",
    "group": "Investing basics"
  },
  {
    "name": "Time Frame (Intraday, Swing, Positional)",
    "definition": "The length of time each chart candle or trade covers: within a day (intraday), days to weeks (swing), or weeks to months (positional).",
    "example": "A 5-minute chart suits intraday trading while a weekly chart suits long-term views.",
    "level": "beginner",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Trading Account",
    "definition": "The account you use to place buy and sell orders. It links your bank account and your demat account.",
    "example": "Money moves from your bank into the trading account, orders are placed, and shares land in the demat account.",
    "level": "beginner",
    "section": "Accounts & Participants",
    "group": "Investing basics"
  },
  {
    "name": "Trading Halt",
    "definition": "A temporary stop in trading of a stock or the whole market, often due to major news or extreme price moves.",
    "example": "Trading in a stock is halted while it announces a merger.",
    "level": "intermediate",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Trailing Stop",
    "definition": "A stop-loss that moves up automatically as the price rises, but never moves down.",
    "example": "A 10% trailing stop on a share that rises from ₹100 to ₹150 now triggers at ₹135.",
    "level": "intermediate",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Treasury Bill",
    "definition": "A short-term government security issued at a discount and repaid at face value.",
    "example": "You buy a bill at ₹98 and get ₹100 after 6 months.",
    "level": "beginner",
    "section": "Instruments",
    "group": "Funds"
  },
  {
    "name": "Trend (Uptrend, Downtrend)",
    "definition": "The general direction of price. An uptrend makes higher highs and higher lows; a downtrend makes lower highs and lower lows.",
    "example": "Prices going ₹100, ₹110, ₹105, ₹120 show an uptrend.",
    "level": "beginner",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Unrealized vs. Realized Profit/Loss",
    "definition": "Unrealized is a paper gain or loss on something you still hold. Realized is locked in once you sell.",
    "example": "Your share is up ₹500 but you haven't sold, so that ₹500 is unrealized.",
    "level": "beginner",
    "section": "Portfolio & Risk Management",
    "group": "Investing basics"
  },
  {
    "name": "Value Investing",
    "definition": "Buying good companies that appear to be trading below their true worth.",
    "example": "Buying a profitable company with a low P/E compared to peers.",
    "level": "beginner",
    "section": "Trading Styles & Strategies",
    "group": "Investing basics"
  },
  {
    "name": "VIX (Volatility Index)",
    "definition": "Often called the \"fear gauge\", it measures the market's expected volatility. Higher means more fear.",
    "example": "VIX jumping sharply during a market fall shows investors are nervous.",
    "level": "intermediate",
    "section": "Indices & Benchmarks",
    "group": "Investing basics"
  },
  {
    "name": "Volatility",
    "definition": "How quickly and how much a price moves up and down. High volatility means big swings.",
    "example": "A share that moves ±5% daily is more volatile than one that moves ±0.5%.",
    "level": "beginner",
    "section": "Market Basics",
    "group": "Investing basics"
  },
  {
    "name": "Volume",
    "definition": "The number of shares traded in a given period, usually a day.",
    "example": "Volume of 2 million means 2 million shares changed hands today.",
    "level": "beginner",
    "section": "Trading & Orders",
    "group": "Stocks"
  },
  {
    "name": "Volume Profile",
    "definition": "A chart showing how much trading happened at each price level.",
    "example": "A price level with very heavy volume may act as strong support or resistance.",
    "level": "advanced",
    "section": "Technical Analysis",
    "group": "Investing basics"
  },
  {
    "name": "Warrants",
    "definition": "Certificates that give the right to buy a company's shares at a fixed price before a certain date.",
    "example": "A warrant lets you buy a share at ₹100 even if the market price becomes ₹150.",
    "level": "advanced",
    "section": "Instruments",
    "group": "Funds"
  },
  {
    "name": "Watchlist",
    "definition": "A personal list of stocks you want to keep an eye on without owning them.",
    "example": "Add 5 companies you like to your watchlist and check their prices daily.",
    "level": "beginner",
    "section": "Platform Terms",
    "group": "Investing basics"
  },
  {
    "name": "Weightage",
    "definition": "How much influence a single stock has on an index's movement.",
    "example": "A stock with 10% weightage moves the index more than one with 1%.",
    "level": "intermediate",
    "section": "Indices & Benchmarks",
    "group": "Investing basics"
  }
];
const starterTerms = ["Stock / Share / Equity", "Dividend", "Diversification"];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const filters = ["All terms", "Investing basics", "Stocks", "Funds"];

export default function Glossary() {
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("All terms");
  const [activeLetter, setActiveLetter] = useState("All");
  const [expandedTerm, setExpandedTerm] = useState(null);

  const visibleTerms = useMemo(() => {
    const query = search.trim().toLowerCase();
    return glossaryTerms.filter((term) => {
      const matchesSearch = !query || `${term.name} ${term.definition} ${term.example}`.toLowerCase().includes(query);
      const matchesFilter = activeFilter === "All terms" || term.group === activeFilter;
      const matchesLetter = activeLetter === "All" || term.name.toUpperCase().startsWith(activeLetter);
      return matchesSearch && matchesFilter && matchesLetter;
    });
  }, [search, activeFilter, activeLetter]);

  const openStarter = (name) => {
    const found = glossaryTerms.find((term) => term.name.toLowerCase() === name.toLowerCase());
    if (found) {
      setSearch("");
      setActiveFilter("All terms");
      setActiveLetter("All");
      setExpandedTerm(found.name);
      window.setTimeout(() => document.getElementById(`glossary-${slug(found.name)}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
    }
  };

  return (
    <>
      <style>{`
        .vestora-glossary {  --g-green:#174d3d; --g-maroon:#5b292b; --g-card:#e7e9e3; --g-muted:#78817b; background:var(--g-bg); color:var(--g-green); min-height:100vh; padding:26px 0 42px; font-family:Arial, sans-serif; }
        .vestora-glossary .g-shell { max-width:1160px; }
        .vestora-glossary .g-eyebrow { color:var(--g-maroon); font-size:10px; letter-spacing:2.5px; font-weight:700; margin:0 0 12px; }
        .vestora-glossary .g-title { color:var(--g-green); font:400 clamp(34px,4.1vw,56px)/1.03 Georgia, 'Times New Roman', serif; letter-spacing:-.7px; margin:0 0 14px; max-width:680px; }
        .vestora-glossary .g-intro { color:#7a827d; font-size:14px; line-height:1.55; max-width:570px; margin:0 0 26px; }
        .vestora-glossary .g-search { border:1px solid #d8ddd7; border-radius:7px; background:#fff; min-height:48px; display:flex; align-items:center; padding:0 15px; box-shadow:0 1px 2px #174d3d0b; }
        .vestora-glossary .g-search input { width:100%; border:0; outline:0; background:transparent; color:#31483e; font-size:13px; }
        .vestora-glossary .g-search input::placeholder { color:#929b95; }
        .vestora-glossary .g-search-icon { color:#477665; font-size:18px; margin-right:10px; }
        .vestora-glossary .g-short-note { color:#7e8781; font-size:11px; line-height:1.5; padding-left:8px; }
        .vestora-glossary .g-filter { border:1px solid #dce1da; color:#426957; background:transparent; border-radius:20px; padding:7px 17px; font-size:11px; line-height:1; transition:.2s; }
        .vestora-glossary .g-filter.active,.vestora-glossary .g-filter:hover { background:var(--g-green); border-color:var(--g-green); color:#fff; }
        .vestora-glossary .g-alpha { border-top:1px solid #e0e3dc; border-bottom:1px solid #e0e3dc; padding:15px 0; display:flex; align-items:center; justify-content:space-between; gap:4px; flex-wrap:wrap; margin-top:26px; }
        .vestora-glossary .g-alpha button { border:0; background:transparent; color:#a0a9a2; font-size:10px; min-width:14px; padding:3px; }
        .vestora-glossary .g-alpha button.active { background:var(--g-maroon); color:white; border-radius:4px; padding:5px 9px; }
        .vestora-glossary .g-alpha button:disabled { opacity:.28; cursor:not-allowed; }
        .vestora-glossary .g-results-meta { color:#89918b; font-size:11px; }
        .vestora-glossary .g-reset { color:var(--g-maroon); border:0; background:none; font-size:11px; text-decoration:underline; }
        .vestora-glossary .g-term-row { display:grid; grid-template-columns:34px minmax(0,1fr); gap:12px; align-items:stretch; margin-bottom:10px; }
        .vestora-glossary .g-letter { color:#47715f; font:400 25px/1 Georgia,serif; padding-top:12px; }
        .vestora-glossary .g-term { width:100%; text-align:left; border:0; border-radius:7px; background:var(--g-card); padding:15px 20px; color:var(--g-green); transition:background .2s; }
        .vestora-glossary .g-term:hover,.vestora-glossary .g-term.expanded { background:#dfe4dc; }
        .vestora-glossary .g-term-head { display:flex; align-items:center; justify-content:space-between; gap:12px; }
        .vestora-glossary .g-term-name { font:400 21px/1.2 Georgia,serif; color:#356b57; }
        .vestora-glossary .g-term-tag { color:#89938c; font-size:8px; letter-spacing:.5px; text-transform:uppercase; white-space:nowrap; }
        .vestora-glossary .g-definition { color:#7a837d; font-size:11px; line-height:1.5; margin:7px 0 0; }
        .vestora-glossary .g-details { border-top:1px solid #d2d9d1; margin-top:12px; padding-top:10px; }
        .vestora-glossary .g-example { background:#f1f2ed; border-left:2px solid var(--g-maroon); padding:8px 11px; color:#68756d; margin:9px 0 0; font-size:11px; line-height:1.5; }
        .vestora-glossary .g-side-card { border:1px solid #e1e4dd; border-radius:7px; padding:22px; background:#f8f8f5; }
        .vestora-glossary .g-side-card.dark { background:var(--g-green); color:#f5f5f0; border-color:var(--g-green); }
        .vestora-glossary .g-side-kicker { color:#b9c9bf; font-size:8px; letter-spacing:1px; font-weight:700; margin:0 0 10px; }
        .vestora-glossary .g-side-title { font:400 27px/1.05 Georgia,serif; margin:0 0 12px; color:inherit; }
        .vestora-glossary .g-side-copy { font-size:11px; line-height:1.55; color:inherit; opacity:.78; margin:0 0 12px; }
        .vestora-glossary .g-starter { display:flex; justify-content:space-between; align-items:center; width:100%; color:#edf2ed; background:transparent; border:0; border-top:1px solid #ffffff30; padding:9px 0; font-size:11px; text-align:left; }
        .vestora-glossary .g-starter:hover { color:#fff; padding-left:3px; }
        .vestora-glossary .g-bottom-card { margin-top:16px; }
        .vestora-glossary .g-bottom-card .g-side-kicker { color:var(--g-maroon); }
        .vestora-glossary .g-bottom-card .g-side-title { color:var(--g-green); font-size:22px; }
        .vestora-glossary .g-bottom-card .g-side-copy { color:#7b847e; }
        .vestora-glossary .g-empty { background:#e7e9e3; padding:24px; border-radius:7px; color:#68756d; font-size:13px; }
        .vestora-glossary .g-more { color:#8a938c; font-size:11px; margin:18px 0 0 46px; }
        @media(max-width:767.98px) { .vestora-glossary { padding-top:22px; } .vestora-glossary .g-title { font-size:38px; } .vestora-glossary .g-intro { font-size:13px; } .vestora-glossary .g-alpha { justify-content:flex-start; gap:7px; } .vestora-glossary .g-term { padding:13px 14px; } .vestora-glossary .g-term-name { font-size:18px; } .vestora-glossary .g-letter { font-size:22px; } .vestora-glossary .g-side-card { padding:19px; } }
        @media(max-width:420px) { .vestora-glossary .g-term-head { align-items:flex-start; flex-direction:column; gap:5px; } .vestora-glossary .g-term-tag { order:0; } .vestora-glossary .g-term-name { order:1; } }
      `}</style>

      <main className="vestora-glossary">
        <div className="container-fluid g-shell">
          <header className="mb-4">
            <p className="g-eyebrow">THE GLOSSARY</p>
            <h1 className="g-title">Big market words.<br />Simple explanations.</h1>
            <p className="g-intro">A little clarity goes a long way. Get to know the language of<br className="d-none d-md-block" /> investing, one term at a time.</p>
          </header>

          <div className="row align-items-center g-3">
            <div className="col-12 col-md-9">
              <label className="g-search w-100">
                <span className="g-search-icon" aria-hidden="true">⌕</span>
                <input type="search" value={search} onChange={(e) => {setSearch(e.target.value); setActiveLetter("All");}} placeholder="Search a term, e.g. dividend or equity..." aria-label="Search glossary terms" />
                <span className="text-muted small">⌕</span>
              </label>
              <div className="d-flex flex-wrap gap-2 mt-3">
                {filters.map((filter) => <button key={filter} type="button" className={`g-filter ${activeFilter === filter ? "active" : ""}`} onClick={() => setActiveFilter(filter)}>{filter}</button>)}
              </div>
            </div>
            <div className="col-12 col-md-3"><p className="g-short-note mb-0">Less jargon.<br />More “that makes sense.”</p></div>
          </div>

          <nav className="g-alpha" aria-label="Filter terms by first letter">
            <button type="button" className={activeLetter === "All" ? "active" : ""} onClick={() => setActiveLetter("All")}>All</button>
            {alphabet.map((letter) => <button key={letter} type="button" disabled={!glossaryTerms.some(t => t.name.toUpperCase().startsWith(letter))} className={activeLetter === letter ? "active" : ""} onClick={() => setActiveLetter(letter)}>{letter}</button>)}
          </nav>

          <div className="d-flex justify-content-between align-items-center py-3">
            <span className="g-results-meta">{visibleTerms.length} terms to explore</span>
            <button type="button" className="g-reset" onClick={() => {setSearch("");setActiveFilter("All terms");setActiveLetter("All");setExpandedTerm(null);}}>Reset filters</button>
          </div>

          <div className="row g-4">
            <section className="col-12 col-lg-8" aria-label="Glossary terms">
              {visibleTerms.length ? visibleTerms.map((term) => (
                <div className="g-term-row" key={term.name} id={`glossary-${slug(term.name)}`}>
                  <span className="g-letter">{term.name.charAt(0).toUpperCase()}</span>
                  <button type="button" className={`g-term ${expandedTerm === term.name ? "expanded" : ""}`} aria-expanded={expandedTerm === term.name} onClick={() => setExpandedTerm(expandedTerm === term.name ? null : term.name)}>
                    <span className="g-term-head"><span className="g-term-name">{term.name}</span><span className="g-term-tag">{term.group}</span></span>
                    <span className="g-definition d-block">{term.definition}</span>
                    {expandedTerm === term.name && <span className="g-details d-block"><span className="g-term-tag">{term.level} · {term.section}</span>{term.example && <span className="g-example d-block"><strong>Example:</strong> {term.example}</span>}</span>}
                  </button>
                </div>
              )) : <div className="g-empty">No matching terms found. Try another search or reset the filters.</div>}
              {visibleTerms.length > 5 && <p className="g-more">Showing all matching terms in the interactive glossary</p>}
            </section>

            <aside className="col-12 col-lg-4">
              <div className="g-side-card dark">
                <p className="g-side-kicker">A GOOD PLACE TO START</p>
                <h2 className="g-side-title">New to the<br />market?</h2>
                <p className="g-side-copy">Start with the building blocks. These three terms are a good first step.</p>
                {starterTerms.map((term) => <button type="button" key={term} className="g-starter" onClick={() => openStarter(term)}>{term}<span>↗</span></button>)}
              </div>
              <div className="g-side-card g-bottom-card">
                <p className="g-side-kicker">ONE TERM AT A TIME</p>
                <h2 className="g-side-title">No question too basic.</h2>
                <p className="g-side-copy mb-0">You don’t need to know every word to start learning. Curiosity is enough.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
