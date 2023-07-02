import React, { createContext, useState } from "react";

// Define the theme context type
export type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
  colors: {
    [key: string]: string;
  };
};

//Define theme colors
const themeColors: { [key: string]: ThemeContextType["colors"] } = {
  dark: {
    bgPrimary:
      "linear-gradient(to right bottom, #291847, #4e2154, #722b5c, #953860, #b44960)",
    bgSecondary: "red",
    textPrimary: "#e7cecd",
    textSecondary: "#291847",
    textTertiary: "#b44960",
    test: "#00ff00",
  },
  light: {
    bgPrimary: "linear-gradient(to bottom,  #e7cecd, #b44960)",
    bgSecondary: "green",
    textPrimary: "#291847",
    textSecondary: "#e7cecd",
    textTertiary: "#b44960",
    test: "#ff0000",
  },
};

// Create the initial context value
const initialContext: ThemeContextType = {
  theme: "dark",
  toggleTheme: () => {},
  colors: themeColors.dark,
};

// Create the theme context
export const ThemeContext = createContext(initialContext);

// Create the theme provider component
export const ThemeProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [theme, setTheme] = useState("dark");

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Get the current theme colors
  const currentThemeColors = themeColors[theme];

  // Create the context value object
  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
    colors: currentThemeColors,
  };

  // Apply the theme colors to the body element
  Object.entries(currentThemeColors).forEach(([property, value]) => {
    document.body.style.setProperty(`--${property}`, value);
  });

  // Render the provider with the context value and children components
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
