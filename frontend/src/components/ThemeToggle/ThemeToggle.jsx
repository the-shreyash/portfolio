import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle({ showLabel = false, className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`group relative flex items-center gap-2 rounded-full border border-[var(--color-line)] bg-[var(--color-surface)]/80 px-3 py-1.5 text-xs font-medium text-[var(--color-ink-soft)] backdrop-blur-md transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] ${className}`}
    >
      <div className="relative flex h-4 w-4 items-center justify-center">
        {/* Moon Icon */}
        <Moon
          size={14}
          className={`absolute transition-all duration-300 ${
            isDark
              ? "rotate-0 scale-100 opacity-100 text-[var(--color-accent)]"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />
        {/* Sun Icon */}
        <Sun
          size={14}
          className={`absolute transition-all duration-300 ${
            !isDark
              ? "rotate-0 scale-100 opacity-100 text-amber-500"
              : "rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>

      {showLabel && (
        <span className="text-[10px] font-semibold uppercase tracking-widest">
          {isDark ? "Dark" : "Light"}
        </span>
      )}
    </button>
  );
}
