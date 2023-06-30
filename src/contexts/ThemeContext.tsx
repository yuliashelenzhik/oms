import React, { createContext, useState } from "react";

// Define the theme context type
export type ThemeContextType = {
  theme: string;
  toggleTheme: () => void;
};

// Define the theme colors
const themeColors: {
  [key: string]: {
    bgPrimary: string;
    bgSecondary: string;
    textPrimary: string;
    textSecondary: string;
    textTertiary: string;
  };
} = {
  dark: {
    bgPrimary:
      "linear-gradient(to right bottom, #291847, #4e2154, #722b5c, #953860, #b44960)",
    bgSecondary: "red",
    textPrimary: "#e7cecd",
    textSecondary: "#291847",
    textTertiary: "#b44960",
  },
  light: {
    bgPrimary: "linear-gradient(to bottom,  #e7cecd, #b44960)",
    bgSecondary: "green",
    textPrimary: "#291847",
    textSecondary: "#e7cecd",
    textTertiary: "#b44960",
  },
};

// Create the initial context value
const initialContext: ThemeContextType = {
  theme: "dark",
  toggleTheme: () => {},
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
    console.log("toggletheme");
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Get the current theme colors
  const currentThemeColors = themeColors[theme];

  // Create the context value object
  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
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

// import { createContext, useState, ReactNode } from "react";
// import { themes } from "./themes";

// export type ITheme = typeof themes.dark;

// export interface ThemeContextType {
//   theme?: typeof themes.dark;
//   toggleThemes?: (theme: keyof typeof themes) => void;
// }

// type ThemeContextProviderProps = {
//   children: ReactNode;
// };

// export const ThemeContext = createContext<ThemeContextType | undefined>(
//   undefined
// );

// export const ThemeContextProvider = ({
//   children,
// }: ThemeContextProviderProps) => {
//   const [theme, setTheme] = useState<ITheme>(themes.dark);
//   const toggleThemes = (theme: keyof typeof themes) => {
//     setTheme(theme === "dark" ? themes.light : themes.dark);
//   };
//   // };
//   // export const ThemeContextProvider = ({
//   //   children,
//   // }: ThemeContextProviderProps) => {
//   //   const [theme, setTheme] = useState(themes.dark);
//   //   const switchTheme = (themeName: keyof typeof themes) => {
//   //     setTheme(themes.light);
//   //     // setTheme(themeName === "dark" ? themes.light : themes.dark);
//   //   };

//   //   //   const toggleThemes = (theme: any) => {
//   //   //     setTheme(theme === "dark" ? themes.light : themes.dark);
//   //   //   };

//   return (
//     <ThemeContext.Provider value={{ theme, toggleThemes }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// // export const ThemeContextProvider = ({
// //   children,
// // }: ThemeContextProviderProps) => {
// //   return (
// //     <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
// //   );
// // };

// // export type ThemeContextType = "light" | "dark";

// // export type Theme = typeof themes.dark;
// // export interface ThemeContextType {
// //   language: Language;
// //   changeLanguage: (language: keyof typeof languages) => void;
// // }
// // export interface LanguageContextProviderProps {
// //   children: ReactNode;

// // export const themes = {
// //   dark: {
// //     primary: "#291847",
// //     primaryTransp: "#29184754",
// //     secondary: "#e7cecd",
// //     secondaryTransp: "#e7cecd54",
// //     tertiary: "#b44960",
// //     bgGradient:
// //       "linear-gradient(to right bottom, #291847, #4e2154, #722b5c, #953860,#b44960);",
// //   },
// //   light: {
// //     primary: "#e7cecd",
// //     primaryTransp: "#29184754",
// //     secondary: "#291847",
// //     secondaryTransp: "#e7cecd54",
// //     tertiary: "#b44960",
// //     bgGradient:
// //       "linear-gradient(to right bottom, #291847, #4e2154, #722b5c, #953860,#b44960);",
// //   },
// // };

// // export const ThemeContext = createContext<ThemeContextType>("light");

// // export const ThemeContextProvider: React.FC<
// //   LanguageContextProviderProps
// // > = ({ children }) => {
// //   const [language, setLanguage] = useState(languages.en);
// //   const changeLanguage = (language: keyof typeof languages) => {
// //     setLanguage(languages[language]);
// //   };

// //   return (
// //     <LanguageContext.Provider value={{ language, changeLanguage }}>
// //       {children}
// //     </LanguageContext.Provider>
// //   );
// // };
