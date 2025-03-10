import { useCallback, useEffect, useState } from "react";
import Web3 from "web3";
import { useWallet } from "use-wallet";

declare const window: any;

const useBlock = () => {
  const [block, setBlock] = useState(0);
  const { ethereum }: { ethereum: any } = useWallet();

  useEffect(() => {
    if (!ethereum) return;
    const web3 = new Web3(ethereum);

    const interval = setInterval(async () => {
      const latestBlockNumber = await web3.eth.getBlockNumber();
      if (block !== latestBlockNumber) {
        setBlock(latestBlockNumber);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ethereum]);

  return block;
};

export default useBlock;
