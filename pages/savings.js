import React, { useEffect } from "react";

import Link from "next/link";

import Layout from "../components/layout";
import LayoutDashboard from "../components/layoutDashboard";

import useWindowSize from "../hooks/useWindowSize";

import FarmCards from "../components/farmCards";

import ColorGuide from "../styles/colorGuide";
import styles from "./index.module.css";

import cryptoList from "../data/cryptoList";

export default function Savings() {
  const { responsiveWidth, responsiveHeight } = useWindowSize();

  return (
    <Layout pageTitle="Farming">
      <LayoutDashboard currentTabIndex={1}>
        <div
          style={{
            display: "flex",
            flexDirection: responsiveWidth < 650 && "column",
            flexWrap: responsiveWidth > 650 && "wrap",
          }}
        >
          <FarmCards />
        </div>
      </LayoutDashboard>
    </Layout>
  );
}
