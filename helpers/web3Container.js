import React, { useEffect, useState } from "react";
import WalletConnect from "@walletconnect/client";
import Web3 from "web3";
import QRCodeModal from "@walletconnect/qrcode-modal";
import Head from "next/head";
import numbro from "numbro";
import Loader from "react-loader-spinner";

import { apiGetAccountAssets } from "../helpers/api";

import useWindowSize from "../hooks/useWindowSize";

import Layout from "../components/layout";
import LayoutDashboard from "../components/layoutDashboard";
import CustomChart from "../components/customChart";

import ColorGuide from "../styles/colorGuide";

export default function Dashboard() {
  const { responsiveWidth, responsiveHeight } = useWindowSize();

  const [connector, setConnector] = useState(null);
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    walletConnectInit();
  }, []);

  function walletConnectInit() {
    const c = new WalletConnect({
      bridge: "https://bridge.walletconnect.org",
      qrcodeModal: QRCodeModal,
    });

    const web3 = new Web3(c);

    console.log(web3);

    c.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }
      const { chainId, accounts } = payload.params[0];
      const address = accounts[0];
      setAddress(address);
      setChainId(chainId);
      setConnected(true);
      getAccountAssets(address, chainId);
    });

    c.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }
      const { chainId, accounts } = payload.params[0];
      const address = accounts[0];
      setAddress(address);
      setChainId(chainId);
      getAccountAssets(address, chainId);
    });

    c.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }
      setAddress(null);
      setChainId(null);
      setAssets([]);
      setConnected(false);
    });

    if (c.connected) {
      const { chainId, accounts } = c;
      const address = accounts[0];
      setAddress(address);
      setChainId(chainId);
      getAccountAssets(address, chainId);
    }

    setConnector(c);
    setConnected(c.connected);
  }

  async function getAccountAssets(a, c) {
    setLoading(true);
    try {
      console.log(await apiGetAccountAssets(a, c));
      setAssets(await apiGetAccountAssets(a, c));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const keyIndicatorsList = [
    { title: "Solde total", value: "28 750 €" },
    { title: "Total épargné", value: "18 750 €" },
    { title: "ROI", value: "65.4%" },
  ];
}
