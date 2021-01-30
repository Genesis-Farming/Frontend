import React, { useEffect, useState } from "react";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import Web3 from "web3";

import Head from "next/head";
import numbro from "numbro";
import Loader from "react-loader-spinner";

import { useWallet } from "use-wallet";
import useWindowSize from "../hooks/useWindowSize";
import useTokenBalance from "../hooks/useTokenBalance";
import useSushi from "../hooks/useSushi";

import Layout from "../components/layout";
import LayoutDashboard from "../components/layoutDashboard";
import CustomChart from "../components/customChart";

import { getBalanceNumber } from "../utils/formatBalance";
import { contractAddresses, supportedPools } from "../sushi/lib/constants";
import {
  getSushiAddress,
  getSushiSupply,
  getMasterChefContract,
} from "../sushi/utils";

import ColorGuide from "../styles/colorGuide";

export default function Dashboard() {
  const sushi = useSushi();

  const { responsiveWidth, responsiveHeight } = useWindowSize();
  const { account, balance, connect, chainId, status } = useWallet();

  const isMobileLayout = responsiveWidth < 650;

  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState([]);
  const [totalSupply, setTotalSupply] = useState(0);

  const genesisTokenBalance = useTokenBalance(getSushiAddress(sushi));

  useEffect(() => {
    async function fetchTotalSupply() {
      const supply = await getSushiSupply(sushi);
      setTotalSupply(supply);
    }

    if (sushi) {
      fetchTotalSupply();
    }
  }, [sushi, setTotalSupply]);

  const keyIndicatorsList = [
    {
      title: "Total UNI supply",
      value: totalSupply
        ? `${numbro(getBalanceNumber(totalSupply || 0)).format({
            spaceSeparated: true,
            thousandSeparated: true,
            mantissa: 0,
          })}`
        : 0,
    },
    {
      title: "Your UNI earnings",
      value: `${numbro(getBalanceNumber(genesisTokenBalance || 0)).format({
        spaceSeparated: true,
        thousandSeparated: true,
        mantissa: 2,
      })}`,
    },
  ];

  return (
    <Layout pageTitle="Mon dashboard">
      <LayoutDashboard currentTabIndex={0}>
        <div
          className="containerSpaceBetween"
          style={{ flexDirection: "row", marginBottom: 20 }}
        >
          {keyIndicatorsList.map(({ title, value }, index) => (
            <div
              className="containerItem containerSpaceBetween"
              style={{
                padding: isMobileLayout ? 10 : responsiveWidth < 1250 ? 20 : 25,
                width: "42%",
              }}
            >
              <div>
                <p style={{ color: ColorGuide.mainGrey }}>{title}</p>
                <h3 style={{ marginBottom: 0 }}>{value}</h3>
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center" }}>
          <b>Pro Tip</b>: boost your earnings using the GT-ETH pool!
        </p>
      </LayoutDashboard>
    </Layout>
  );
}
