import { createContext, useEffect, useContext } from "react";

import useLocalStorageState from "../hooks/useLocalStorageState";

import type { tTheme } from "../app.types";

type tThemeContext = {
  theme: tTheme;
  setTheme: React.Dispatch<React.SetStateAction<tTheme>>;
};

const ThemeContext = createContext({} as tThemeContext);

export default function ThemeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useLocalStorageState<tTheme>("light", "theme");

  useEffect(() => {
    document.documentElement.className =
      theme === "light" ? "light-mode" : "dark-mode";
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Theme was used outside of ThemeProvider");
  return context;
}
