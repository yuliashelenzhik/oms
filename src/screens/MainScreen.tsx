import { useState } from "react";
import List from "../components/List";
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { ThemeContext, ThemeContextType } from "../contexts/ThemeContext";

export default function MainScreen() {
  const { colors } = useContext<ThemeContextType>(ThemeContext);
  const [filtered, setFiltered] = useState([]);

  // Function that gets data from child components (Navbar and Search inside Navbar)

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
    </div>
  );
}
