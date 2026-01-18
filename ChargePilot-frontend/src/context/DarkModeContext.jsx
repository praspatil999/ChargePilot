import { createContext } from "react";

const DarkModeContext = createContext({
  darkMode: true,
  setDarkMode: () => {},
});

export default DarkModeContext;
