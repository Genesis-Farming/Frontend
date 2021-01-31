import BigNumber from "bignumber.js/bignumber";

export const SUBTRACT_GAS_LIMIT = 100000;

const ONE_MINUTE_IN_SECONDS = new BigNumber(60);
const ONE_HOUR_IN_SECONDS = ONE_MINUTE_IN_SECONDS.times(60);
const ONE_DAY_IN_SECONDS = ONE_HOUR_IN_SECONDS.times(24);
const ONE_YEAR_IN_SECONDS = ONE_DAY_IN_SECONDS.times(365);

export const INTEGERS = {
  ONE_MINUTE_IN_SECONDS,
  ONE_HOUR_IN_SECONDS,
  ONE_DAY_IN_SECONDS,
  ONE_YEAR_IN_SECONDS,
  ZERO: new BigNumber(0),
  ONE: new BigNumber(1),
  ONES_31: new BigNumber("4294967295"), // 2**32-1
  ONES_127: new BigNumber("340282366920938463463374607431768211455"), // 2**128-1
  ONES_255: new BigNumber(
    "115792089237316195423570985008687907853269984665640564039457584007913129639935"
  ), // 2**256-1
  INTEREST_RATE_BASE: new BigNumber("1e18"),
};

export const addressMap = {
  uniswapFactory: "0xc0a47dFe034B400B47bDaD5FecDa2621de6c4d95",
  uniswapFactoryV2: "0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f",
  YFI: "0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e",
  YCRV: "0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8",
  UNIAmpl: "0xc5be99a02c6857f9eac67bbce58df5572498f40c",
  WETH: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  UNIRouter: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D",
  LINK: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
  MKR: "0x9f8f72aa9304c8b593d555f12ef6589cc3a579a2",
  SNX: "0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F",
  COMP: "0xc00e94Cb662C3520282E6f5717214004A7f26888",
  LEND: "0x80fB784B7eD66730e8b1DBd9820aFD29931aab03",
  SUSHIYCRV: "0x2C7a51A357d5739C5C74Bf3C96816849d2c9F726",
};

// JUICYSWAP SETTINGS

export const CHAIN_ID = 1;

export const gsTokenAddress = "0x51e02f189cb528ef1193bcd10d56a1bf2094ee2d";

export const contractAddresses = {
  sushi: {
    1: gsTokenAddress,
  },
  masterChef: {
    1: "0x9fB90Ac76A1eae4DAeFfc6e439EF9438F73Fd793",
  },
  weth: {
    1: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  },
  xSushi: {
    1: "0x8798249c2e607446efb7ad49ec89dd1865ff4272", // NOTE: Not in use
  },
};

export const supportedPools = [
  {
    pid: 8,
    lpAddresses: {
      1: "0x526292433b00D05F82F210671830e91e080A3264",
    },
    tokenAddresses: {
      1: gsTokenAddress,
    },
    name: "CGT",
    symbol: "CGT-ETH LP",
    tokenSymbol: "CGT",
    icon: "/tokens/cache-gold-logo.png",
    interestRate: 4780.34,
  },
  {
    pid: 0,
    lpAddresses: {
      1: "0xa478c2975ab1ea89e8196811f51a7b7ade33eb11",
    },
    tokenAddresses: {
      1: "0x6b175474e89094c44da98b954eedeac495271d0f",
    },
    name: "DAI",
    symbol: "DAI-ETH LP",
    tokenSymbol: "DAI",
    icon: "/tokens/DAI.png",
    interestRate: 2873.56,
  },
  {
    pid: 1,
    lpAddresses: {
      1: "0xb4e16d0168e52d35cacd2c6185b44281ec28c9dc",
    },
    tokenAddresses: {
      1: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
    },
    name: "USDC",
    symbol: "USDC-ETH LP",
    tokenSymbol: "USDC",
    icon: "/tokens/usdt.png",
    interestRate: 2549.83,
  },
  {
    pid: 2,
    lpAddresses: {
      1: "0xa2107fa5b38d9bbd2c461d6edf11b11a50f6b974",
    },
    tokenAddresses: {
      1: "0xf6b1c64e86c1213088a6464484ebb8488635795d",
    },
    name: "LINK",
    symbol: "LINK-ETH LP",
    tokenSymbol: "LINK",
    icon: "/tokens/link.png",
    interestRate: 2136.2,
  },
  {
    pid: 3,
    lpAddresses: {
      1: "0xd3d2e2692501a5c9ca623199d38826e513033a17",
    },
    tokenAddresses: {
      1: "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984",
    },
    name: "UNI",
    symbol: "UNI-ETH LP",
    tokenSymbol: "UNI",
    icon: "/tokens/uniswap.png",
    interestRate: 1498.23,
  },
  {
    pid: 4,
    lpAddresses: {
      1: "0xf80758ab42c3b07da84053fd88804bcb6baa4b5c",
    },
    tokenAddresses: {
      1: "0x57ab1ec28d129707052df4df418d58a2d46d5f51",
    },
    name: "SUSD",
    symbol: "SUSD-ETH LP",
    tokenSymbol: "SUSD",
    icon: "/tokens/susd.png",
    interestRate: 2020.15,
  },
  {
    pid: 5,
    lpAddresses: {
      1: "0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852",
    },
    tokenAddresses: {
      1: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    },
    name: "USDT",
    symbol: "USDT-ETH LP",
    tokenSymbol: "USDT",
    icon: "/tokens/tether.png",
    interestRate: 3717.05,
  },
  {
    pid: 6,
    lpAddresses: {
      1: "0xbb2b8038a1640196fbe3e38816f3e67cba72d940",
    },
    tokenAddresses: {
      1: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599",
    },
    name: "WBTC",
    symbol: "WBTC-ETH LP",
    tokenSymbol: "WBTC",
    icon: "/tokens/btc.png",
    interestRate: 2300.3,
  },
  {
    pid: 7,
    lpAddresses: {
      1: "0xdfc14d2af169b0d36c4eff567ada9b2e0cae044f",
    },
    tokenAddresses: {
      1: "0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9",
    },
    name: "AAVE",
    symbol: "AAVE-ETH LP",
    tokenSymbol: "AAVE",
    icon: "/tokens/aave.png",
    interestRate: 1532.46,
  },
];
