import Head from "next/head";

import Menu from "./menu";
import Footer from "./footer";

import useWindowSize from "../hooks/useWindowSize";

export default function Layout({ children, pageTitle, style }) {
  const { responsiveWidth, responsiveHeight } = useWindowSize();

  return (
    <div
      className="wrapper"
      style={{ paddingTop: responsiveWidth < 650 && 50, ...style }}
    >
      <Head>
        <title>{pageTitle} - Genesis Farming</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />

        <meta itemProp="url" content="https://genesis-farming.org/" />

        <meta name="description" content="Put your tokens to work." />

        <meta
          name="keywords"
          content="staking, eth, ethereum, uniswap, blockchain, tether, usdt, link, susd, bitcoin, wbtc, dai, aave"
        />

        <meta name="author" content="" />

        <meta itemProp="name" content="Genesis Farming" />
        <meta itemProp="description" content="Put your tokens to work." />

        <meta property="og:title" content="Genesis Farming" />
        <meta property="og:description" content="Put your tokens to work." />

        <meta name="twitter:title" content="Genesis Farming" />
        <meta name="twitter:description" content="Put your tokens to work." />

        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <Menu />

      {children}

      <Footer />
    </div>
  );
}
