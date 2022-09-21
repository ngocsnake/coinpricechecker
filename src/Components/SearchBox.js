function SearchBox({ onChange }) {
  return (
    <input
      style={{
        width: "450px",
        height: "40px",
        backgroundColor: "transparent",
        border: "1px solid white",
        borderRadius: "10px",
        padding: "0 20px",
        fontSize: "20px",
        color: "white",
      }}
      placeholder="Tìm kiếm..."
      onChange={(e) => {
        onChange(e.target.value);
      }}
    ></input>
  );
}

export default SearchBox;
