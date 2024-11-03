import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { IoSunny } from "react-icons/io5";
import { MdNightsStay } from "react-icons/md";
export default function ThemeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    return storedTheme === "dark" || (!storedTheme && prefersDarkMode);
  });

  useEffect(() => {
    const htmlElement = document.documentElement;
    const themeValue = isDarkMode ? "dark" : "light";

    htmlElement.classList.toggle("dark", isDarkMode);
    htmlElement.classList.toggle("light-theme", !isDarkMode);
    htmlElement.classList.toggle("dark-theme", isDarkMode);
    localStorage.setItem("theme", themeValue);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <motion.div
      className="flex cursor-pointer items-center justify-center rounded-full transition-colors duration-300"
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      animate={{ rotate: isDarkMode ? 0 : 180 }}
      transition={{ duration: 0.5 }}
    >
      {isDarkMode ? (
        <MdNightsStay className="fill-secondary h-6 w-6" />
      ) : (
        <IoSunny className="fill-secondary h-6 w-6" />
      )}
    </motion.div>
  );
}
