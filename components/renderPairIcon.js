import Chart from "chart.js";

import ColorGuide from "../styles/colorGuide";

export default function RenderPairIcon({ style, icon }) {
  const defaultIconSize = "65%";

  return (
    <div
      style={{
        position: "relative",
        width: 70,
        height: 70,
        ...style,
      }}
    >
      <img
        style={{
          zIndex: 0,
          position: "absolute",
          bottom: 0,
          right: 0,
          width: defaultIconSize,
          height: defaultIconSize,
        }}
        src="/tokens/eth.png"
      />

      <img
        style={{
          zIndex: 400,
          width: defaultIconSize,
          height: defaultIconSize,
        }}
        src={icon}
      />
    </div>
  );
}
