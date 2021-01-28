import Chart from "chart.js";

import ColorGuide from "../styles/colorGuide";

export default function ItemCrypto({ style, token }) {
  return (
    <div
      className="containerItem defaultShadows"
      style={{
        width: 100,
        ...style,
      }}
    >
      <img
        style={{
          width: 60,
          height: 60,
          margin: "0 auto",
        }}
        src={token.icon}
      />

      <h4 style={{ marginTop: 15, marginBottom: 10 }}>
        {token.symbol.replace("-ETH", "").replace("LP", "")}
      </h4>

      <div
        style={{
          backgroundColor: ColorGuide.lightBlue,
          borderRadius: 5,
          width: "50%",
          margin: "0 auto",
        }}
      >
        <p style={{ color: ColorGuide.mainBlue }}>{token.interestRate}%</p>
      </div>
    </div>
  );
}
