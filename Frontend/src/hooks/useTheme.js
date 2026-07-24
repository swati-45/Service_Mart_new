import { useEffect } from "react";

const useTheme = () => {
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    root.classList.add("light");
  }, []);

  return { theme: "light", toggleTheme: () => {}, setTheme: () => {} };
};

export default useTheme;
