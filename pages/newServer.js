import React, { useEffect } from "react";

import Link from "next/link";

import Layout from "../components/layout";
import LayoutDashboard from "../components/layoutDashboard";
import ItemServer from "../components/itemServer";

import useWindowSize from "../hooks/useWindowSize";

import ColorGuide from "../styles/colorGuide";
import styles from "./index.module.css";

export default function newServer() {
  const { responsiveWidth, responsiveHeight } = useWindowSize();

  const userServerList = [
    {
      ticker: "EUR",
      status: "En ligne",
      totalEarnings: 2.5,
      returnInvestment: 450,
    },
    {
      ticker: "EUR",
      status: "En ligne",
      totalEarnings: 2.5,
      returnInvestment: 450,
    },
    {
      ticker: "EUR",
      status: "En ligne",
      totalEarnings: 2.5,
      returnInvestment: 450,
    },
    {
      ticker: "EUR",
      status: "En ligne",
      totalEarnings: 2.5,
      returnInvestment: 450,
    },
  ];

  return (
    <Layout pageTitle="Mes serveurs">
      <LayoutDashboard currentTabIndex={2}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {userServerList.map(
            ({ ticker, status, totalEarnings, returnInvestment }, index) => {
              return <ItemServer style={{ width: "100%", marginBottom: 30 }} />;
            }
          )}
        </div>
      </LayoutDashboard>
    </Layout>
  );
}
