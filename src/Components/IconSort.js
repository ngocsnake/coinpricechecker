import { FaSort, FaSortUp, FaSortDown } from "react-icons/fa";

function IconSort({ col, props }) {
  if (col !== props.c) return <FaSort></FaSort>;
  return props.t === "desc" ? <FaSortDown></FaSortDown> : <FaSortUp></FaSortUp>;
}

export default IconSort;
