import Search from "./Search";
import "../styles/Navbar.css";
import { ReactComponent as LightIcon } from "../icons/sun.svg";
import { ReactComponent as DarkIcon } from "../icons/moon.svg";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";

export default function Navbar(props: any) {
  const { theme, colors, toggleTheme } = useContext(ThemeContext);

  const styles = {
    color: colors.textPrimary,
  };
  return (
    <nav style={styles}>
      <h3>OMS</h3>
      <Search func={props.func} />
      <div className="ligth-dark-mode" onClick={toggleTheme}>
        {theme === "dark" ? (
          <div className="dark">
            <LightIcon />
          </div>
        ) : (
          <div className="light">
            <DarkIcon />
          </div>
        )}
      </div>
    </nav>
  );
}
