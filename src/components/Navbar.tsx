import Search from "./Search";
import "../styles/Navbar.css";
import { ReactComponent as LightIcon } from "../icons/sun.svg";
import { ReactComponent as DarkIcon } from "../icons/moon.svg";
import { ThemeContext, ThemeContextType } from "../contexts/ThemeContext";
import { useContext } from "react";

export default function Navbar(props: any) {
  const { theme, colors, toggleTheme } =
    useContext<ThemeContextType>(ThemeContext);

  const styles: React.CSSProperties = {
    color: colors.textPrimary,
  };

  //Navigation bar component, includes "Search" component and the button to switch color themes (dark/light), state manages through context
  return (
    <nav style={styles}>
      <h3>OMS</h3>
      <Search func={props.func} />
      <div className="light-dark-mode" onClick={toggleTheme}>
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
