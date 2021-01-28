export default [
  {
    question:
      "Providing Liquidity Introduction :",
    answer:
      "When providing liquidity from a smart contract, the most important thing to keep in mind is that tokens deposited into a pool at any rate other than the current reserve ratio are vulnerable to being arbitraged. As an example, if the ratio of x:y in a pair is 10:2 (i.e. the price is 5), and someone naively adds liquidity at 5:2 (a price of 2.5), the contract will simply accept all tokens (changing the price to 3.75 and opening up the market to arbitrage), but only issue pool tokens entitling the sender to the amount of assets sent at the proper ratio, in this case 5:1. To avoid donating to arbitrageurs, it is imperative to add liquidity at the current price. Luckily, it’s easy to ensure that this condition is met!",
  },
  {
    question: "Using the Router",
    answer:
      "The easiest way to safely add liquidity to a pool is to use the router, which provides simple methods to safely add liquidity to a pool. If the liquidity is to be added to an ERC-20/ERC-20 pair, use addLiquidity. If WETH is involved, use addLiquidityETH.These methods both require the caller to commit to a belief about the current price, which is encoded in the amount*Desired parameters. Typically, it’s fairly safe to assume that the current fair market price is around what the current reserve ratio is for a pair (because of arbitrage). So, if a user wants to add 1 ETH to a pool, and the current DAI/WETH ratio of the pool is 200/1, it’s reasonable to calculate that 200 DAI must be sent along with the ETH, which is an implicit commitment to the price of 200 DAI/1 WETH. However, it’s important to note that this must be calculated before the transaction is submitted. It is not safe to look up the reserve ratio from within a transaction and rely on it as a price belief, as this ratio can be cheaply manipulated to your detriment.However, it is still possible to submit a transaction which encodes a belief about the price which ends up being wrong because of a larger change in the true market price before the transaction is confirmed. For that reason, it’s necessary to pass an additional set of parameters which encode the caller’s tolerance to price changes. These amount*Min parameters should typically be set to percentages of the calculated desired price. So, at a 1% tolerance level, if our user sends a transaction with 1 ETH and 200 DAI, amountETHMin should be set to e.g. .99 ETH, and amountTokenMin should be set to 198 DAI. This means that, at worst, liquidity will be added at a rate between 198 DAI/1 ETH and 202.02 DAI/1 ETH (200 DAI/.99 ETH).Once the price calculations have been made, it’s important to ensure that your contract a) controls at least as many tokens/ETH as were passed as amount*Desired parameters, and b) has granted approval to the router to withdraw this many tokens.",
  },
  {
    question: "Pools Introduction :",
    answer:
      "Each Uniswap liquidity pool is a trading venue for a pair of ERC20 tokens. When a pool contract is created, its balances of each token are 0; in order for the pool to begin facilitating trades, someone must seed it with an initial deposit of each token. This first liquidity provider is the one who sets the initial price of the pool. They are incentivized to deposit an equal value of both tokens into the pool. To see why, consider the case where the first liquidity provider deposits tokens at a ratio different from the current market rate. This immediately creates a profitable arbitrage opportunity, which is likely to be taken by an external party.When other liquidity providers add to an existing pool, they must deposit pair tokens proportional to the current price. If they don’t, the liquidity they added is at risk of being arbitraged as well. If they believe the current price is not correct, they may arbitrage it to the level they desire, and add liquidity at that price.",
  },
  {
    question:
      "Pool tokens",
    answer:
      "Whenever liquidity is deposited into a pool, unique tokens known as liquidity tokens are minted and sent to the provider’s address. These tokens represent a given liquidity provider’s contribution to a pool. The proportion of the pool’s liquidity provided determines the number of liquidity tokens the provider receives. If the provider is minting a new pool, the number of liquidity tokens they will receive will equal sqrt(x * y), where x and y represent the amount of each token provided.Whenever a trade occurs, a 0.3% fee is charged to the transaction sender. This fee is distributed pro-rata to all LPs in the pool upon completion of the trade.To retrieve the underlying liquidity, plus any fees accrued, liquidity providers must “burn” their liquidity tokens, effectively exchanging them for their portion of the liquidity pool, plus the proportional fee allocation.As liquidity tokens are themselves tradable assets, liquidity providers may sell, transfer, or otherwise use their liquidity tokens in any way they see fit.",
  },
  {
    question: "Fees",
    answer:
      "Liquidity provider feesThere is a 0.3% fee for swapping tokens. This fee is split by liquidity providers proportional to their contribution to liquidity reserves.Swapping fees are immediately deposited into liquidity reserves. This increases the value of liquidity tokens, functioning as a payout to all liquidity providers proportional to their share of the pool. Fees are collected by burning liquidity tokens to remove a proportional share of the underlying reserves.Since fees are added to liquidity pools, the invariant increases at the end of every trade. Within a single transaction, the invariant represents token0_pool / token1_pool at the end of the previous transaction.There are many community developed tools to determine returns. You can also read more in the docs about how to think about LP returns.Protocol Fees: At the moment there are no protocol fees. However, it is possible for a 0.05% fee to be turned on in the future.More information about a potential future protocol fee can be found here.Protocol Charge Calculation: In the future, it is possible that a protocol-wide charge of 0.05% per trade will take effect. This represents ⅙th (16.6̅%) of the 0.30% fee. The fee is in effect if feeTo is not address(0) (0x0000000000000000000000000000000000000000), indicating that feeTo is the recipient of the charge.This amount would not affect the fee paid by traders, but would affect the amount received by liquidity providers.Rather than calculating this charge on swaps, which would significantly increase gas costs for all users, the charge is instead calculated when liquidity is added or removed. See the whitepaper for more details.",
  },
  {
    question: "Security (Audit & Formal Verification)",
    answer:
      "Between January 8 and April 30, a team of six engineers reviewed and formally verified crucial components of the smart contracts for Genesis Farming.Their past work includes smart contract development on and formal verification of multi-collateral DAI.The scope of work includes: Formal verification of the core smart contracts, code review of core smart contracts, numerical error analysis, code review of periphery smart contracts (during ongoing development).",
  },
  {
    question: "Supporting meta transactions",
    answer:
      "All Uniswap V2 pool tokens support meta-transaction approvals via the permit function. This obviates the need for a blocking approve transaction before programmatic interactions with pool tokens can occur. ERC-712 In vanilla ERC-20 token contracts, owners may only register approvals by directly calling a function which uses msg.sender to permission itself. With meta-approvals, ownership and permissioning are derived from a signature passed into the function by the caller (sometimes referred to as the relayer). Because signing data with Ethereum private keys can be a tricky endeavor, Uniswap V2 relies on ERC-712, a signature standard with widespread community support, to ensure user safety and wallet compatibility.",
  },
  {
    question:
      "Minimum Liquidity",
    answer:
      "To ameliorate rounding errors and increase the theoretical minimum tick size for liquidity provision, pairs burn the first MINIMUM_LIQUIDITY pool tokens. For the vast majority of pairs, this will represent a trivial value. The burning happens automatically during the first liquidity provision, after which point the totalSupply is forevermore bounded.",
  },
];
