import { useState } from "react";
// import Card from "../components/Card";
import List from "../components/List";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { ThemeContext, ThemeContextType } from "../contexts/ThemeContext";

export default function MainScreen() {
  const { theme, colors } = useContext<ThemeContextType>(ThemeContext);
  const [filtered, setFiltered] = useState([]);

  const getFiltered = (data: any) => {
    setFiltered(data);
  };

  const styles = {
    backgroundImage: colors.bgPrimary,
  };

  return (
    <div className="main-screen" style={styles}>
      <Navbar func={getFiltered} />
      <List filtered={filtered} />
      {/* {showCard && <Card />} */}
    </div>
  );
}
