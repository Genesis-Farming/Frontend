import React, { useState, useEffect, useCallback, useMemo } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import Web3 from "web3";
import { provider } from "web3-core";

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import numbro from "numbro";
import gql from "graphql-tag";
import moment from "moment";

import { useWallet } from "use-wallet";
import { useQuery } from "@apollo/react-hooks";

import useFarm from "../hooks/useFarm";
import useRedeem from "../hooks/useRedeem";
import useSushi from "../hooks/useSushi";
import useEarnings from "../hooks/useEarnings";
import useStake from "../hooks/useStake";
import useUnstake from "../hooks/useUnstake";
import useStakedBalance from "../hooks/useStakedBalance";
import useTokenBalance from "../hooks/useTokenBalance";
import useReward from "../hooks/useReward";
import useApprove from "../hooks/useApprove";
import useAllowance from "../hooks/useAllowance";
import useWindowSize from "../hooks/useWindowSize";

import withApollo from "../utils/withApollo";

import { getMasterChefContract } from "../sushi/utils";
import { getContract } from "../utils/erc20";
import { getBalanceNumber } from "../utils/formatBalance";

import Layout from "../components/layout";
import LayoutDashboard from "../components/layoutDashboard";
import CustomChart from "../components/customChart";
import StakingInput from "../components/stakingInput";

import ColorGuide from "../styles/colorGuide";
import styles from "./index.module.css";

function SavingsDetail() {
  const { responsiveWidth, responsiveHeight } = useWindowSize();
  const { account } = useWallet();

  const [currentTimeFrame, setCurrentTimeFrame] = useState(1);
  const [stakingBalance, setStakingBalance] = useState("0");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [requestedApproval, setRequestedApproval] = useState(false);

  const [loading, setLoading] = useState(true);

  const isMobileLayout = responsiveWidth < 650;

  const {
    query: { farmId },
  } = useRouter();

  const {
    pid,
    lpToken,
    lpTokenAddress,
    tokenAddress,
    earnToken,
    name,
    icon,
  } = useFarm(farmId) || {
    pid: 0,
    lpToken: "",
    lpTokenAddress: "",
    tokenAddress: "",
    earnToken: "",
    name: "",
    icon: "",
  };

  const QUERY = gql`
    {
      pairDayDatas(
        first: 100
        orderBy: date
        orderDirection: asc
        where: {
          pairAddress: "${lpTokenAddress}"
          date_gt: 1592505859
        }
      ) {
        date
        reserveUSD
      }
    }
  `;

  const { loading: isLoadingQuery, data: aggregateData } = useQuery(QUERY);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sushi = useSushi();
  const earnings = useEarnings(pid);

  const { ethereum } = useWallet();

  const lpContract = useMemo(() => {
    return getContract(ethereum, lpTokenAddress);
  }, [ethereum, lpTokenAddress]);

  const { onStake } = useStake(pid);
  const { onUnstake } = useUnstake(pid);
  const { onReward } = useReward(pid);
  const { onApprove } = useApprove(lpContract);
  const allowance = useAllowance(lpContract);

  const tokenBalance = useTokenBalance(lpContract.options.address);
  const stakedBalance = useStakedBalance(pid);

  const { onRedeem } = useRedeem(getMasterChefContract(sushi));

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      const txHash = await onApprove();
      if (!txHash) {
        setRequestedApproval(false);
      }
    } catch (e) {
      console.log(e);
    }
  }, [onApprove, setRequestedApproval]);

  const lpTokenName = useMemo(() => {
    return lpToken;
  }, [lpToken]);

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase();
  }, [earnToken]);

  const chartTimeFrame = ["Total", "Aujourd'hui"];

  const formattedEarnings = numbro(getBalanceNumber(earnings) || 0).format({
    average: true,
    spaceSeparated: true,
    thousandSeparated: true,
    mantissa: 2,
  });

  const keyIndicatorsList = [
    {
      title: `Balance`,
      value: `${numbro(getBalanceNumber(tokenBalance) || 0).format({
        average: true,
        mantissa: 2,
        spaceSeparated: true,
      })}`,
    },
    {
      title: `Staked`,
      value: `${numbro(getBalanceNumber(stakedBalance) || 0).format({
        spaceSeparated: true,
        thousandSeparated: true,
        mantissa: 3,
      })}`,
    },
    {
      title: `Earnings UNI`,
      value: `${formattedEarnings}`,
    },
  ];

  const stakedPercentage =
    (getBalanceNumber(stakedBalance) * 100) /
    (getBalanceNumber(stakedBalance) + getBalanceNumber(tokenBalance));

  const uniswapURL = `https://app.uniswap.org/#/add/${tokenAddress}/ETH`;

  return (
    <Layout pageTitle={`Stake ${lpToken}`}>
      <LayoutDashboard
        currentTabIndex={1}
        sectionTitle={`Stake ${lpToken}`}
        rightLink={{
          title: "Get LP token",
          link: uniswapURL,
        }}
      >
        <div
          className="containerSpaceBetween notResponsive"
          style={{ marginBottom: 20 }}
        >
          {keyIndicatorsList.map(({ title, value }, index) => (
            <div
              key={index}
              className="containerItem containerSpaceBetween"
              style={{
                padding: isMobileLayout ? 10 : responsiveWidth < 1250 ? 20 : 25,
                width: "25%",
              }}
            >
              <div>
                <p style={{ color: ColorGuide.mainGrey }}>{title}</p>
                <h3 style={{ marginBottom: 0 }}>{value}</h3>
              </div>
            </div>
          ))}
        </div>

        <div
          className="containerSpaceBetween"
          style={{ alignItems: "flex-start" }}
        >
          <div
            style={{
              width: isMobileLayout ? "100%" : "38%",
              minWidth: !isMobileLayout && 150,
              maxWidth: !isMobileLayout && 350,
              marginBottom: isMobileLayout && 10,
            }}
          >
            <div
              className="containerItem"
              style={{
                padding: 20,
              }}
            >
              {!allowance.toNumber() ? (
                <>
                  <p style={{ marginBottom: 20 }}>
                    You didn't approve the pair {lpToken} yet.
                  </p>
                  <button
                    onClick={handleApprove}
                    style={{ width: "100%", marginBottom: 10 }}
                  >
                    <p>Approve the pair</p>
                  </button>
                </>
              ) : (
                <>
                  <div
                    style={{
                      margin: "auto",
                      width: 100,
                      height: 100,
                      marginBottom: 20,
                    }}
                  >
                    <CircularProgressbarWithChildren
                      value={!isNaN(stakedPercentage) ? stakedPercentage : 0}
                      strokeWidth={15}
                      styles={buildStyles({
                        pathColor: ColorGuide.mainGreen,
                        textColor: "#f88",
                        trailColor: ColorGuide.lightGreen,
                      })}
                    >
                      <h4>
                        {!isNaN(stakedPercentage) ? stakedPercentage : 0}%
                      </h4>
                    </CircularProgressbarWithChildren>
                  </div>

                  <div style={{ position: "relative", width: "94%" }}>
                    <input
                      style={{ padding: 15 }}
                      type="text"
                      onChange={(e) =>
                        setSelectedAmount(e.target.value.replace(",", "."))
                      }
                      value={selectedAmount}
                      placeholder="Amount to stake"
                      required
                    />

                    <button
                      className="secondaryButton"
                      style={{
                        width: "30%",
                        paddingRight: 10,
                        paddingLeft: 10,
                        position: "absolute",
                        top: 10,
                        right: -2,
                        paddingTop: 0,
                        paddingBottom: 0,
                      }}
                    >
                      <p
                        onClick={() =>
                          setSelectedAmount(getBalanceNumber(tokenBalance))
                        }
                        style={{
                          color: ColorGuide.mainBlue,
                          textAlign: "center",
                        }}
                      >
                        MAX
                      </p>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      onStake(selectedAmount);
                      setSelectedAmount(null);
                    }}
                    style={{ width: "100%", marginBottom: 10 }}
                  >
                    <p>Stake amount</p>
                  </button>

                  <button
                    onClick={() => {
                      onUnstake(selectedAmount);
                      setSelectedAmount(null);
                    }}
                    style={{
                      width: "100%",
                      backgroundColor: ColorGuide.lightBlue,
                    }}
                  >
                    <p style={{ color: ColorGuide.mainBlue }}>
                      Withdraw amount
                    </p>
                  </button>
                </>
              )}
            </div>
          </div>

          <div
            style={{
              width: isMobileLayout ? "100%" : "60%",
              minWidth: 150,
              maxWidth: 1500,
            }}
          >
            {earnings > 0 && (
              <button
                onClick={() => {
                  onReward();
                }}
                style={{
                  width: "100%",
                  marginBottom: isMobileLayout ? 25 : 10,
                }}
              >
                <p>Get my reward ({`${formattedEarnings}`}) GT</p>
              </button>
            )}
            {!isLoadingQuery && (
              <div className="containerItem" style={{ padding: 15 }}>
                <CustomChart aggregateData={aggregateData} />
              </div>
            )}
          </div>
        </div>
      </LayoutDashboard>
    </Layout>
  );
}

export default withApollo(SavingsDetail);
