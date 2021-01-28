import React, { useEffect } from "react";
import Link from "next/link";
import Slider from "react-slick";

import Layout from "../components/layout";
import ItemCrypto from "../components/itemCrypto";
import Marquee from "../components/marquee";
import Footer from "../components/footer";
import FAQ from "../components/FAQ";

import ColorGuide from "../styles/colorGuide";

import styles from "./index.module.css";

import useWindowSize from "../hooks/useWindowSize";

import { supportedPools } from "../sushi/lib/constants";

export default function Home() {
  const { responsiveWidth, responsiveHeight } = useWindowSize();

  const defaultSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    variableWidth: true,
    arrows: false,

    centerPadding: "30px",

    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,

    customPaging: (i) => (
      <div
        style={{
          width: 10,
          height: 10,
          marginTop: 15,
          backgroundColor: ColorGuide.lightBlue,
          borderRadius: 10,
        }}
      />
    ),

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 650,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Layout
      pageTitle="Invest to the Farming"
      style={{ backgroundColor: "white" }}
    >
      <img className={styles.backgroundOval} src="/background/oval.png" />

      <div className="fullBloc">
        <div className="container containerSpaceBetween">
          <div className="halfBloc">
            <h1 style={{ color: ColorGuide.mainOrange, marginBottom: 40 }}>
              Put your <br />
              tokens to work.
              <br />
              The Smart Way.
            </h1>

            <p style={{ color: ColorGuide.mainGrey, marginBottom: 50 }}>
              Earn realtime interests with your ERC20 tokens.
            </p>

            <div className="containerRow">
              <Link href={"/dashboard"}>
                <button>
                  <p>Start Farming</p>
                </button>
              </Link>
            </div>
          </div>

          <div className="halfBloc">
            <img className="imageFit" src="/art/assetExchange.png" />
          </div>
        </div>
      </div>

      <div style={{ backgroundColor: ColorGuide.superLightBlue }}>
        <div
          className="fullBloc"
          style={{
            display: "flex",
            textAlign: "center",
          }}
        >
          <div className="container">
            <h2 style={{ textAlign: "center", marginBottom: 50 }}>
              Stake your tokens,
              <br />
              Earn interest in realtime
            </h2>

            <Slider style={{ marginBottom: 50 }} {...defaultSliderSettings}>
              {supportedPools.map((token, index) => (
                <ItemCrypto style={{ width: 200 }} token={token} key={index} />
              ))}
            </Slider>

            <Link href={"/dashboard"}>
              <button>
                <p>Discover our farms</p>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <FAQ />
    </Layout>
  );
}
