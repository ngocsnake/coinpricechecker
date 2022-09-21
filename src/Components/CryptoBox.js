import { MdAddCircleOutline } from "react-icons/md";
import formatMoney from "format-usd";

function fm(money) {
  const decPlaces = money < 1 ? 5 : 2;

  return formatMoney({ amount: money, decimalPlaces: decPlaces });
}

function CryptoBox({ coin }) {
  return (
    <div
      className="headerc"
      style={{
        backgroundColor: "#1D1D1D",
        width: "1200px",
        height: "50px",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px",
        borderBottom: "1px solid #a39e9e",
      }}
    >
      <div style={{ width: "7%" }}>{coin.market_cap_rank}</div>
      <div
        style={{
          width: "13%",
          display: "flex",
          gap: "0 5px",
          alignItems: "center",
        }}
      >
        <img
          src={coin.image}
          width="20px"
          height="20px"
          style={{ marginRight: "10px" }}
          alt={coin.name}
        ></img>
        <div>
          <b>{coin.name}</b>
        </div>
      </div>
      <div style={{ width: "15%", textAlign: "right", color: "#d4d2d2" }}>
        {fm(coin.current_price)}
      </div>
      <div style={{ width: "15%", textAlign: "right", color: "#d4d2d2" }}>
        {fm(coin.high_24h)}
      </div>
      <div style={{ width: "15%", textAlign: "right", color: "#d4d2d2" }}>
        {fm(coin.low_24h)}
      </div>
      <div style={{ width: "15%", textAlign: "right", color: "#d4d2d2" }}>
        {fm(coin.total_volume)}
      </div>
      <div style={{ width: "15%", textAlign: "right", color: "#d4d2d2" }}>
        {fm(coin.current_price * coin.total_supply)}
      </div>
      <div
        style={{
          width: "5%",
          cursor: "pointer",
          textAlign: "right",
          color: "#d4d2d2",
        }}
      >
        <MdAddCircleOutline></MdAddCircleOutline>
      </div>
    </div>
  );
}

export default CryptoBox;
