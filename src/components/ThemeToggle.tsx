import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark");
    setIsDark(isDarkMode);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 bg-secondary rounded-full p-1 transition-colors duration-300"
      aria-label="Toggle theme"
    >
      <div
        className={`absolute top-1 w-6 h-6 rounded-full bg-card shadow-md flex items-center justify-center transition-all duration-300 ${
          isDark ? "left-7" : "left-1"
        }`}
      >
        {isDark ? (
          <Moon className="w-3.5 h-3.5 text-primary" />
        ) : (
          <Sun className="w-3.5 h-3.5 text-warning" />
        )}
      </div>
    </button>
  );
}
