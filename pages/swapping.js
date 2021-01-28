import React, { useEffect } from "react";

import Link from "next/link";

import Layout from "../components/layout";
import LayoutDashboard from "../components/layoutDashboard";

import { CHAIN_ID, contractAddresses } from "../sushi/lib/constants";

import useWindowSize from "../hooks/useWindowSize";

import ColorGuide from "../styles/colorGuide";
import styles from "./index.module.css";

export default function Pools() {
  const { responsiveWidth, responsiveHeight } = useWindowSize();

  const gsAddress = contractAddresses["sushi"][CHAIN_ID];
  const uniswapURL = `https://app.uniswap.org/#/add/${gsAddress}/ETH`;

  return (
    <Layout pageTitle="Swapping">
      <LayoutDashboard currentTabIndex={2}>
        <iframe
          src={uniswapURL}
          height="660px"
          width="100%"
          id="myId"
          style={{ border: 0 }}
        />
      </LayoutDashboard>
    </Layout>
  );
}
