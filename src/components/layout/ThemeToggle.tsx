import { useThemeStore } from "@/store/useThemeStore";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`w-14 h-8 flex items-center px-1 rounded-full transition-colors duration-300 ${
        isDark ? "bg-muted" : "bg-blue-200"
      } cursor-pointer`}
    >
      <div
        className={`w-6 h-6 rounded-full bg-background shadow-md flex items-center justify-center transform transition-transform duration-300 ${
          isDark ? "translate-x-6" : "translate-x-0"
        }`}
      >
        {isDark ? (
          <Moon className="w-4 h-4 text-muted-foreground" />
        ) : (
          <Sun className="w-4 h-4 text-yellow-500" />
        )}
      </div>
    </button>
  );
}
