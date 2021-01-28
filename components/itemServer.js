import Chart from "chart.js";

import ColorGuide from "../styles/colorGuide";

export default function ItemServer({ style }) {
  return (
    <div
      className="containerItem containerRow defaultShadows"
      style={{
        width: 500,
        ...style,
      }}
    >
      <div
        style={{
          width: 350,
          height: 200,
          borderRadius: 15,
          overflow: "hidden",
          marginRight: 30,
        }}
      >
        <img className="imageFit" src="/art/bitcoin.png" />
      </div>

      <div>
        <div className="containerSpaceBetween" style={{ width: "100%" }}>
          <div>
            <h4>Serveur BTC</h4>
            <p>ROI annuel: 34%</p>
          </div>

          <button>
            <p>381,85€ TTC</p>
          </button>
        </div>

        <div className="separatorHorizontal" />

        <p style={{ textAlign: "left" }}>
          Ce ‘masternode’ Bitcoin, mise en ligne 4 jours après l’achat, vous
          rémunère toutes les minutes sur votre compte.
        </p>
      </div>
    </div>
  );
}
