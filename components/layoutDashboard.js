import Link from "next/link";

import ColorGuide from "../styles/colorGuide";
import React from "react";
import { useWallet } from "use-wallet";

import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/router";

import useWindowSize from "../hooks/useWindowSize";

export default function LayoutDashboard({
  children,
  currentTabIndex,
  rightLink,
  sectionTitle = null,
}) {
  const { responsiveWidth, responsiveHeight } = useWindowSize();
  const { account, balance, connect, chainId, status } = useWallet();

  const isMobileLayout = responsiveWidth < 650;

  const dashboardMenuList = [
    { title: "Dashboard", link: "/dashboard", icon: "/icons/dashboard.png" },
    { title: "Pool", link: "/savings", icon: "/icons/savings.png" },
    { title: "Staking", link: "/staking", icon: "/icons/servers.png" },
    { title: "Exchange", link: "/exchange", icon: "/icons/transfers.png" },
    { title: "Settings", link: "/settings", icon: "/icons/settings.png" },
  ];

  return (
    <div className="container">
      <div
        className="containerRow"
        style={{
          alignItems: "flex-start",
          flexDirection: isMobileLayout && "column",
        }}
      >
        <div
          className="containerItem"
          style={{
            display: "flex",
            flexDirection: isMobileLayout ? "row" : "column",
            justifyContent: !isMobileLayout ? "flex-start" : "space-between",
            width: isMobileLayout ? "100%" : "30%",
            minWidth: 150,
            maxWidth: isMobileLayout ? "90%" : 250,
            marginRight: isMobileLayout ? 0 : 50,
            padding: 0,
            paddingRight: isMobileLayout ? "5%" : 0,
            paddingLeft: isMobileLayout ? "5%" : 0,
            paddingTop: isMobileLayout ? 20 : 50,
            paddingBottom: isMobileLayout ? 20 : 50,
            marginBottom: isMobileLayout ? 25 : 0,
          }}
        >
          {dashboardMenuList.map(({ title, icon, link }, index) => (
            <Link href={`${link}`}>
              <div
                className="containerRow"
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  position: "relative",
                  backgroundColor:
                    index === currentTabIndex && ColorGuide.lightBlue,
                  paddingRight: isMobileLayout ? "5%" : 25,
                  paddingLeft: isMobileLayout ? "5%" : 25,
                  paddingTop: 10,
                  paddingBottom: 10,
                  borderRadius: isMobileLayout ? 10 : 0,
                }}
              >
                {index === currentTabIndex && !isMobileLayout && (
                  <div
                    style={{
                      position: "absolute",
                      left: 0,
                      top: 0,
                      width: 5,
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      height: "100%",
                      backgroundColor: ColorGuide.mainBlue,
                    }}
                  />
                )}

                <img
                  style={{
                    height: 20,
                    width: 20,
                    marginRight: !isMobileLayout && 20,
                  }}
                  src={icon}
                />
                <p>{title}</p>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ width: "100%" }}>
          <div
            className="containerSpaceBetween notResponsive"
            style={{ alignItems: "flex-start" }}
          >
            <h3>
              {sectionTitle || dashboardMenuList[currentTabIndex]?.title || ""}
            </h3>

            {rightLink && (
              <a target="_blank" href={`${rightLink.link}`}>
                <div
                  className="containerRow notResponsive"
                  style={{ cursor: "pointer" }}
                >
                  <p style={{ color: ColorGuide.mainBlue, marginRight: 10 }}>
                    {rightLink.title}
                  </p>
                  <img style={{ width: 25 }} src="/UI/arrow.png" />
                </div>
              </a>
            )}
          </div>

          {status === "connected" ? (
            children
          ) : (
            <div
              className="containerItem"
              style={{
                padding: 20,
                marginBottom: 20,
              }}
            >
              <p style={{ marginBottom: 10 }}>
                Connect your wallet using either MetaMask or Wallet Connect.
              </p>
              <button
                style={{ marginRight: 10 }}
                onClick={() => connect("walletconnect")}
              >
                <p>Use Wallet Connect</p>
              </button>

              <button onClick={() => connect()}>
                <p>Use MetaMask</p>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
