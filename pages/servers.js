import React, { useEffect } from "react";

import Link from "next/link";

import Layout from "../components/layout";
import LayoutDashboard from "../components/layoutDashboard";

import useWindowSize from "../hooks/useWindowSize";

import ColorGuide from "../styles/colorGuide";
import styles from "./index.module.css";

export default function Servers() {
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
      <LayoutDashboard
        currentTabIndex={2}
        rightLink={{ title: "Acheter un serveur", link: "/newServer" }}
      >
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {userServerList.map(
            ({ ticker, status, totalEarnings, returnInvestment }, index) => {
              const optionList = [
                { label: "Statut", value: status },
                { label: "Gain totaux", value: `${totalEarnings} ${ticker}` },
                { label: "Amortissement", value: returnInvestment + "%" },
              ];

              return (
                <div
                  className="containerItem"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "40%",
                    padding: 30,
                    marginRight: !(index % 2) && "2%",
                    marginBottom: "2%",
                  }}
                >
                  <div className="containerSpaceBetween">
                    <p>{`Serveur ${ticker}`}</p>
                    <p
                      style={{ color: ColorGuide.mainGreen }}
                    >{`ROI actuel ${returnInvestment}%`}</p>
                  </div>

                  <div className="separatorHorizontal" />

                  {optionList.map(({ label, value }, index) => (
                    <div className="containerSpaceBetween">
                      <p>{label}</p>
                      <p style={{ color: ColorGuide.mainBlue }}>{value}</p>
                    </div>
                  ))}
                </div>
              );
            }
          )}
        </div>
      </LayoutDashboard>
    </Layout>
  );
}
