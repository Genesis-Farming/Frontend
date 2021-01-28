import React from "react";
import App from "next/app";
import { useWallet, UseWalletProvider } from "use-wallet";

import FarmsProvider from "../contexts/Farms";
import ModalsProvider from "../contexts/Modals";
import TransactionProvider from "../contexts/Transactions";
import SushiProvider from "../contexts/SushiProvider";

import { CHAIN_ID } from "../sushi/lib/constants";

import "../styles/global.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-circular-progressbar/dist/styles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Providers>
      <Component {...pageProps} />
    </Providers>
  );
};

const Providers = ({ children }) => {
  return (
    <UseWalletProvider
      chainId={CHAIN_ID}
      connectors={{
        walletconnect: { rpcUrl: "https://mainnet.eth.aragon.network/" },
      }}
    >
      <SushiProvider>
        <TransactionProvider>
          <FarmsProvider>
            <ModalsProvider>{children}</ModalsProvider>
          </FarmsProvider>
        </TransactionProvider>
      </SushiProvider>
    </UseWalletProvider>
  );
};

export default MyApp;
