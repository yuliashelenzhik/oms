import { useState } from "react";
import Card from "../components/Card";
import List from "../components/List";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export default function MainScreen() {
  // const { theme } = useContext(ThemeContext);
  // console.log(theme);
  const [filtered, setFiltered] = useState([]);

  const getFiltered = (data: any) => {
    setFiltered(data);
  };

  return (
    <div
      className="main-screen"
      // style={{ backgroundColor: theme?.primary }}
    >
      <Navbar func={getFiltered} />
      <List filtered={filtered} />
      {/* {showCard && <Card />} */}
    </div>
  );
}
