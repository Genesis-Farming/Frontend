import React, { useEffect } from "react";

import Link from "next/link";

import Layout from "../components/layout";
import LayoutDashboard from "../components/layoutDashboard";

import useWindowSize from "../hooks/useWindowSize";

import ColorGuide from "../styles/colorGuide";
import styles from "./index.module.css";
import { useRouter } from "next/router";

export default function Servers() {
  const { responsiveWidth, responsiveHeight } = useWindowSize();

  const router = useRouter();

  async function signOut() {
    try {
      await router.replace("/");
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Layout pageTitle="Settings">
      <LayoutDashboard currentTabIndex={2}>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div
            className="containerItem"
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              padding: 30,
            }}
          >
            <p>Coming Soon.</p>
          </div>
        </div>
      </LayoutDashboard>
    </Layout>
  );
}
