import { useState } from "react";
import Card from "../components/Card";
import List from "../components/List";
import Navbar from "../components/Navbar";

export default function MainScreen() {
  const [filtered, setFiltered] = useState([]);

  const getFiltered = (data: any) => {
    setFiltered(data);
  };

  return (
    <div className="main-screen">
      <Navbar func={getFiltered} />
      <List filtered={filtered} />
      {/* {showCard && <Card />} */}
    </div>
  );
}
