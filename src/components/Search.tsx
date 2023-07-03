import { useEffect, useState } from "react";
import { ReactComponent as SearchIcon } from "../icons/search.svg";
import { ModalData } from "../contexts/CardContext";

export type SearchProps = {
  func: (filtered: any[]) => void;
};

const Search: React.FC<SearchProps> = ({ func }) => {
  // export default function Search(props: SearchProps) {
  const [filtered, setFiltered] = useState(
    JSON.parse(localStorage.getItem("objects") || "[]")
  );

  useEffect(() => {
    func(filtered);
  }, [filtered, func]);

  const searchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const objects = JSON.parse(localStorage.getItem("objects") || "[]");
    if (e.target.value.length > 0) {
      const filterResult = objects.filter(
        (item: any) =>
          item?.name?.toLowerCase().includes(e.target.value) ||
          item?.desc?.toLowerCase().includes(e.target.value)
      );

      if (filterResult.length > 0) {
        setFiltered(filterResult);
        func(filtered);
      } else {
        setFiltered([]);
        func(filtered);
      }
    } else {
      setFiltered(objects);
      func(filtered);
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
};

export default Search;
