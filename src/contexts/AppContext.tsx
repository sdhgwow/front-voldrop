import { createContext, ReactNode, useEffect, useState } from "react";

export interface AppContextParams {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextParams | null>(null);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(() => localStorage.getItem("theme") === "dark");

  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.body.classList.add("black-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("black-theme");
      localStorage.setItem("theme", "light");
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme((prev) => {
      const newTheme = !prev;
      applyTheme(newTheme);
      return newTheme;
    });
  };

  useEffect(() => {
    applyTheme(isDarkTheme);
  }, [isDarkTheme]);

  return (
    <AppContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;