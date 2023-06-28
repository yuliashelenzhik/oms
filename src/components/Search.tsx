import { useEffect, useState } from "react";
import { ReactComponent as SearchIcon } from "../icons/search.svg";

export default function Search(props: any) {
  // const [objects, setObjects] = useState(
  //   JSON.parse(localStorage.getItem("objects") || "[]")
  // );
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    props.func(filtered);
  }, [filtered]);

  const searchFilter = (e: any) => {
    const objects = JSON.parse(localStorage.getItem("objects") || "[]");
    if (e.target.value.length > 0) {
      const filterResult = objects.filter(
        (item: any) =>
          item?.name?.toLowerCase().includes(e.target.value) ||
          item?.desc?.toLowerCase().includes(e.target.value)
      );
      setFiltered(filterResult);
    } else {
      setFiltered(objects);
    }
  };

  console.log(filtered);

  return (
    <div className="search-container">
      <div className="search">
        <SearchIcon />
        <input placeholder="search" onChange={searchFilter} />
      </div>
    </div>
  );
}
