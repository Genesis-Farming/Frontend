import React, { createContext, useEffect, useState } from "react";

import { useWallet } from "use-wallet";

import { Sushi } from "../../sushi";

export interface SushiContext {
  sushi?: typeof Sushi;
}

export const Context = createContext<SushiContext>({
  sushi: undefined,
});

declare global {
  interface Window {
    sushisauce: any;
  }
}

declare const window: any;

const SushiProvider: React.FC = ({ children }) => {
  const { ethereum }: { ethereum: any } = useWallet();
  const [sushi, setSushi] = useState<any>();

  // @ts-ignore
  // @ts-ignore

  useEffect(() => {
    if (ethereum) {
      const chainId = Number(ethereum.chainId);
      const sushiLib = new Sushi(ethereum, chainId, false, {
        defaultAccount: ethereum.selectedAddress,
        defaultConfirmations: 1,
        autoGasMultiplier: 1.5,
        testing: false,
        defaultGas: "6000000",
        defaultGasPrice: "1000000000000",
        accounts: [],
        ethereumNodeTimeout: 10000,
      });
      setSushi(sushiLib);
      window.sushi = sushi;
      window.sushisauce = sushiLib;
    }
  }, [ethereum]);

  return <Context.Provider value={{ sushi }}>{children}</Context.Provider>;
};

export default SushiProvider;
