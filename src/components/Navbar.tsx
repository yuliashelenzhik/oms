import Search from "./Search";
import "../styles/Navbar.css";
import { ReactComponent as LightIcon } from "../icons/sun.svg";
import { ReactComponent as DarkIcon } from "../icons/moon.svg";

export default function Navbar(props: any) {
  const changeTheme = () => {
    console.log("Change Theme");
  };
  return (
    <nav>
      <h3>OMS</h3>
      <Search func={props.func} />
      <div className="ligth-dark-mode" onClick={changeTheme}>
        {<LightIcon />}
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
