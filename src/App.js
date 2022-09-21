import SearchBox from "./Components/SearchBox";
import TableC from "./Components/TableC";

import { useState } from "react";

function App() {
  const [query, setQuery] = useState("");

  const handleChangSearchInput = (e) => {
    setQuery(e);
  }

  return (
    <div
      className="App"
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#1A1A1F",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ margin: "70px 0" }}>
        <SearchBox onChange={handleChangSearchInput}></SearchBox>
      </div>

      <TableC query={query}></TableC>
    </div>
  );
}

export default App;
