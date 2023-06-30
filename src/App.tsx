import React, { useState } from "react";
import "../src/styles/App.css";
import Navbar from "./components/Navbar";
import MainScreen from "./screens/MainScreen";
import { ThemeContextProvider } from "./contexts/ThemeContext";
// import { ThemeContext, ThemeContextType } from "./contexts/ThemeContext";
// import ThemeContext

function App() {
  const [theme, setTheme] = useState("dark");
  return (
    <ThemeContextProvider>
      <div className="App">
        <MainScreen />
      </div>
    </ThemeContextProvider>
  );
}

export default App;
