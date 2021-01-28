import React, { useEffect } from "react";

import Link from "next/link";

import Layout from "../components/layout";
import LayoutDashboard from "../components/layoutDashboard";

import useWindowSize from "../hooks/useWindowSize";

import cryptoList from "../data/cryptoList";

import ColorGuide from "../styles/colorGuide";
import styles from "./index.module.css";

export default function BuyCrypto() {
  const { responsiveWidth, responsiveHeight } = useWindowSize();

  const renderPriceInput = () => (
    <div
      className="containerItem containerRow"
      style={{ width: "30%", padding: 30 }}
    >
      <div
        className="containerCenter"
        style={{
          width: 60,
          height: 60,
          backgroundColor: ColorGuide.lightRed,
          marginRight: 15,
          borderRadius: 10,
        }}
      >
        <img className="defaultIconSize" src={cryptoList[1].icon} />
      </div>

      <div>
        <p style={{ color: ColorGuide.mainGrey }}>Prix en euros</p>
        <h3 style={{ marginBottom: 0 }}>9 500 €</h3>
      </div>
    </div>
  );

  return (
    <Layout pageTitle="Acheter des cryptos">
      <LayoutDashboard currentTabIndex={1}>
        <div className="containerSpaceBetween">
          {renderPriceInput()}
          <div className="containerItem" style={{ padding: 20 }}>
            <div
              className="defaultIconContainerSize containerCenter"
              style={{
                backgroundColor: ColorGuide.lightBlue,
                borderRadius: 10,
              }}
            >
              <img className="defaultIconSize" src="/UI/exchange.png" />
            </div>
          </div>
          {renderPriceInput()}
        </div>

        <div
          className="separatorHorizontal"
          style={{ marginBottom: 25, marginTop: 25 }}
        />

        <h3>Paiement par carte</h3>

        <div className="containerSpaceBetween" style={{ marginBottom: 20 }}>
          <div className="containerItem" style={{ width: "40%" }} />
          <div className="containerItem" style={{ width: "10%" }} />
          <div className="containerItem" style={{ width: "10%" }} />
        </div>

        <button>
          <p>Acheter</p>
        </button>
      </LayoutDashboard>
    </Layout>
  );
}
