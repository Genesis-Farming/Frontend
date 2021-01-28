import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import moment from "moment";
import numbro from "numbro";

import ColorGuide from "../styles/colorGuide";

export default function CustomChart({ aggregateData: { pairDayDatas } }) {
  const series = [
    {
      name: "Liquidity",
      data: Object.values(pairDayDatas).map((pair) =>
        Number(pair.reserveUSD).toFixed(0)
      ),
    },
  ];

  const options = {
    chart: {
      toolbar: { show: false },
      height: 300,
      width: 250,
      type: "area",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      type: "datetime",
      categories: Object.values(pairDayDatas).map((pair) =>
        new Date(pair.date * 1000).getTime()
      ),
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      width={"100%"}
      height={320}
    />
  );
}
