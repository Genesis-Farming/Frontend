import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useWallet } from "use-wallet";
import BigNumber from "bignumber.js";

import Layout from "../components/layout";
import LayoutDashboard from "../components/layoutDashboard";
import RenderPairIcon from "../components/renderPairIcon";

import { supportedPools, CHAIN_ID } from "../sushi/lib/constants";

import { Farm } from "../contexts/Farms";
import useAllStakedValue, { StakedValue } from "../hooks/useAllStakedValue";

import useWindowSize from "../hooks/useWindowSize";
import useFarms from "../hooks/useFarms";
import useSushi from "../hooks/useSushi";
import useStakedBalance from "../hooks/useStakedBalance";

import {
  getEarned,
  getMasterChefContract,
  getSushiContract,
} from "../sushi/utils";
import { bnToDec } from "../utils";
import { getBalanceNumber } from "../utils/formatBalance";

import ColorGuide from "../styles/colorGuide";

import cryptoList from "../data/cryptoList";

export default function FarmCards({ amount = 0 }) {
  const { account } = useWallet();

  const { responsiveWidth, responsiveHeight } = useWindowSize();
  const [farms] = useFarms();
  const stakedValue = useAllStakedValue();

  const sushi = useSushi();
  const masterChefContract = getMasterChefContract(sushi);
  const sushiContract = getSushiContract(sushi);

  const isMobileLayout = responsiveWidth < 650;

  const sushiIndex = farms.findIndex(
    ({ tokenSymbol }) => tokenSymbol === "SUSHI"
  );

  const sushiPrice =
    sushiIndex >= 0 && stakedValue[sushiIndex]
      ? stakedValue[sushiIndex].tokenPriceInWeth
      : new BigNumber(0);

  const BLOCKS_PER_YEAR = new BigNumber(2333160);
  const SUSHI_PER_BLOCK = new BigNumber(1000);

  const rows = farms.reduce(
    (farmRows, farm, i) => {
      const farmWithStakedValue = {
        ...farm,
        ...stakedValue[i],
        /* apy: stakedValue[i]
          ? sushiPrice
              .times(SUSHI_PER_BLOCK)
              .times(BLOCKS_PER_YEAR)
              .times(stakedValue[i].poolWeight)
              .div(stakedValue[i].totalWethValue)
          : null, */
      };

      const newFarmRows = [...farmRows];
      if (newFarmRows[newFarmRows.length - 1].length === 3) {
        newFarmRows.push([farmWithStakedValue]);
      } else {
        newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue);
      }
      return newFarmRows;
    },
    [[]]
  );

  return Object.values(rows.flat()).map((dataFarm, index) => {
    const {
      pid,
      earnToken,
      name,
      icon,
      id,
      lpToken,
      lpTokenAddress,
      tokenSymbol,
    } = dataFarm;

    const [startTime, setStartTime] = useState(0);
    const [harvestable, setHarvestable] = useState(0);
    const stakedBalance = useStakedBalance(pid);

    const interestRate = supportedPools.find((pool) => pool.pid === pid)
      .interestRate;

    return (
      <div
        key={index}
        className="containerItem"
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minWidth: isMobileLayout ? "90%" : 200,
          maxWidth: 280,
          padding: isMobileLayout ? "5%" : 30,
          marginRight: !isMobileLayout && "2%",
          marginBottom: "2%",
          width: isMobileLayout && "100%",
        }}
      >
        <div
          className="containerSpaceBetween notResponsive"
          style={{ marginBottom: 20 }}
        >
          <div className="containerRow notResponsive">
            <RenderPairIcon style={{ marginRight: 20 }} icon={icon} />
            <div>
              <p>{name}</p>
              <p style={{ color: ColorGuide.mainGrey }}>{lpToken}</p>
              <p style={{ color: ColorGuide.mainGrey }}>Earn UNI</p>
            </div>
          </div>

          <div style={{ textAlign: "right" }}>
            <p>{getBalanceNumber(stakedBalance).toFixed(2)}</p>
            <p style={{ color: ColorGuide.mainGreen }}>{interestRate}% APY</p>
          </div>
        </div>

        <Link
          href={{
            pathname: "/savingsDetail",
            query: { farmId: id },
          }}
        >
          <button style={{ width: "100%", paddingTop: 5, paddingBottom: 5 }}>
            <p>Select</p>
          </button>
        </Link>
      </div>
    );
  });
}
