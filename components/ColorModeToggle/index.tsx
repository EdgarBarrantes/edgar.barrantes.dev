import { useTheme } from "next-themes";
import SunIcon from "../../public/icons/sun.svg";
import MoonIcon from "../../public/icons/moon.svg";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="p-4 rounded-full transition-all duration-300 hover:scale-110 hover:bg-slate-100/10 dark:hover:bg-white/10"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-8 h-8">
        <div className={`absolute inset-0 transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}>
          <SunIcon className="w-8 h-8 text-white" />
        </div>
        <div className={`absolute inset-0 transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`}>
          <MoonIcon className="w-8 h-8 text-slate-800" />
        </div>
      </div>
    </button>
  );
};

export default ModeToggle;
