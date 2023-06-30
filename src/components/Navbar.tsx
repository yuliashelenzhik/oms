import Search from "./Search";
import "../styles/Navbar.css";
import { ReactComponent as LightIcon } from "../icons/sun.svg";
import { ReactComponent as DarkIcon } from "../icons/moon.svg";
import { ThemeContext } from "../contexts/ThemeContext";
import { useContext } from "react";
// import { ITheme } from "../contexts/ThemeContext";

export default function Navbar(props: any) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  // const themeContext = useContext(ThemeContext);
  // console.log(themeContext);
  // const { theme, toggleThemes } = useContext(ThemeContext);
  // console.log(theme);

  const changeTheme = () => {
    // console.log("Change Theme");
  };
  return (
    <nav>
      <h3>OMS</h3>
      <Search func={props.func} />
      <div className="ligth-dark-mode" onClick={toggleTheme}>
        {/* <LightIcon /> */}
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
      {/* <ul>
        <li>Home</li>
        <li>Equipment</li>
        <li>People</li>
        <li></li>
      </ul> */}
    </nav>
  );
}
