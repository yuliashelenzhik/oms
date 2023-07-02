import { useEffect, useState } from "react";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { ModalData } from "../contexts/CardContext";

export type SearchProps = {
  func: (filtered: ModalData[]) => void;
};

export default function Search(props: SearchProps) {
  // const [objects, setObjects] = useState(
  //   JSON.parse(localStorage.getItem("objects") || "[]")
  // );
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    props.func(filtered);
  }, [filtered]);

  const searchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const objects = JSON.parse(localStorage.getItem("objects") || "[]");
    if (e.target.value.length > 0) {
      const filterResult = objects.filter(
        (item: any) =>
          item?.name?.toLowerCase().includes(e.target.value) ||
          item?.desc?.toLowerCase().includes(e.target.value)
      );
      // console.log(filterResult);
      setFiltered(filterResult);
    } else {
      //- [ ] SEARCH -when nothing found - show nothing, before typing - and when nothing is in input - show everythin
      setFiltered(objects);
    }
  };

  return (
    <div className="search-container">
      <div className="search">
        <SearchIcon />
        <input placeholder="search" onChange={searchFilter} />
      </div>
    </div>
  );
}
