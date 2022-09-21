import { MdOutlineCompareArrows } from "react-icons/md";

import { useState, useEffect } from "react";

import CryptoBox from "./CryptoBox";

import IconSort from "./IconSort";

function dynamicSort(property, type) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      type === "desc"
        ? a[property] > b[property]
          ? -1
          : a[property] > b[property]
          ? 1
          : 0
        : a[property] < b[property]
        ? -1
        : a[property] > b[property]
        ? 1
        : 0;
    return result * sortOrder;
  };
}

function TableC({ query }) {
  const [coinsB, setCoinsB] = useState([]);
  const [coins, setCoins] = useState([]);

  const [ipp, setIpp] = useState(20);
  const [page, setPage] = useState(1);

  const [column, setColumn] = useState({
    c: "market_cap_rank",
    t: "asc",
  });

  const handleClickColumn = (col) => {
    handleSort({
      c: col,
      t: column.c === col ? (column.t === "desc" ? "asc" : "desc") : "desc",
    });
  };

  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${ipp}&page=${page}&sparkline=false`
      // `http://localhost:3000/data.json`
    )
      .then((res) => res.json())
      .then((res) => {
        const filter = res.filter(
          (coin) => coin.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
        );
        setCoins(filter);
        setCoinsB(res);
      });
    // eslint-disable-next-line
  }, [ipp, page]);

  useEffect(() => {
    const filter = coinsB.filter(
      (coin) => coin.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
    setCoins(filter);
    // eslint-disable-next-line
  }, [query]);

  useEffect(() => {
    handleSort(column);

    // eslint-disable-next-line
  }, [column]);

  const handleSort = (c) => {
    const sort = coinsB.sort(dynamicSort(c.c, c.t));

    setColumn(c);
    setCoins(sort);
  };

  return (
    <>
      <div
        style={{
          width: "1200px",
          margin: "5px 0",
          color: "white",
          fontSize: "13px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", gap: "0 25px" }}>
          <div className="g5">
            Page
            <button
              style={{
                width: " 25px",
                height: "25px",
                textAlign: "center",
                borderRadius: "100%",
                fontSize: "17px",
                cursor: "pointer",
              }}
              onClick={() => {
                setPage(page - 1 < 1 ? 1 : page - 1);
              }}
            >
              <b>-</b>
            </button>
            <input
              className="itemPerPage"
              style={{
                width: "30px",
                textAlign: "center",
              }}
              value={page}
              onChange={(e) => {
                const re = /^[0-9\b]+$/;

                if (e.target.value === "" || re.test(e.target.value)) {
                  setPage((v) =>
                    e.target.validity.valid ? e.target.value : v
                  );
                }
              }}
            ></input>{" "}
            <button
              style={{
                width: " 25px",
                height: "25px",
                textAlign: "center",
                borderRadius: "100%",
                fontSize: "17px",
                cursor: "pointer",
              }}
              onClick={() => {
                setPage(Number(page) + 1);
              }}
            >
              <b>+</b>
            </button>
          </div>
          <div className="g5">
            Item per page
            <input
              className="itemPerPage"
              style={{
                width: "30px",
                textAlign: "center",
              }}
              value={ipp}
              onChange={(e) => {
                setIpp(e.target.value);
              }}
            ></input>
          </div>
        </div>
        <div style={{ cursor: "pointer" }}>
          <b>💵 USD</b>
        </div>
      </div>

      <div
        className="headerc"
        style={{
          backgroundColor: "#181818",
          width: "1200px",
          height: "50px",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "30px 10px 30px 0",
          borderBottom: "1px solid #A19CE0",
          fontWeight: "bold",
          userSelect: "none",
        }}
      >
        <div
          style={{ cursor: "pointer", width: "7%" }}
          onClick={() => {
            handleClickColumn("market_cap_rank");
          }}
        >
          Hạng <IconSort col="market_cap_rank" props={column}></IconSort>
        </div>
        <div
          style={{ cursor: "pointer", width: "13%" }}
          onClick={() => {
            handleClickColumn("name");
          }}
        >
          Tiền ảo <IconSort col="name" props={column}></IconSort>
        </div>
        <div
          style={{ cursor: "pointer", width: "15%", textAlign: "right" }}
          onClick={() => {
            handleClickColumn("current_price");
          }}
        >
          Giá hiện tại <IconSort col="current_price" props={column}></IconSort>
        </div>
        <div
          style={{ cursor: "pointer", width: "15%", textAlign: "right" }}
          onClick={() => {
            handleClickColumn("high_24h");
          }}
        >
          Giá cao nhất (24h) <IconSort col="high_24h" props={column}></IconSort>
        </div>
        <div
          style={{ cursor: "pointer", width: "15%", textAlign: "right" }}
          onClick={() => {
            handleClickColumn("low_24h");
          }}
        >
          Giá thấp nhất (24h) <IconSort col="low_24h" props={column}></IconSort>
        </div>
        <div
          style={{ cursor: "pointer", width: "15%", textAlign: "right" }}
          onClick={() => {
            handleClickColumn("total_volume");
          }}
        >
          Khối lượng giao dịch{" "}
          <IconSort col="total_volume" props={column}></IconSort>
        </div>
        <div
          style={{ cursor: "pointer", width: "15%", textAlign: "right" }}
          onClick={() => {
            handleClickColumn("fully_diluted_valuation");
          }}
        >
          Vốn hóa thị trường{" "}
          <IconSort col="fully_diluted_valuation" props={column}></IconSort>
        </div>
        <div style={{ cursor: "pointer", width: "5%", textAlign: "right" }}>
          <MdOutlineCompareArrows></MdOutlineCompareArrows>
        </div>
      </div>

      <div className="tableb" style={{ maxHeight: "420px", overflowY: "auto" }}>
        {coins.length === 0 ? (
          <div style={{ color: "white", fontSize: "30px", padding: "30px 0" }}>
            Loading...
          </div>
        ) : (
          coins.map((coin) => (
            <CryptoBox key={coin.market_cap_rank} coin={coin}></CryptoBox>
          ))
        )}
      </div>
    </>
  );
}

export default TableC;
