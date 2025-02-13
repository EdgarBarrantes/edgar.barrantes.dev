import { useNavigation } from "./NavigationContext";
import MenuIcon from "../../public/icons/menu.svg";

const NavigationToggle = () => {
  const { isOpen, toggle } = useNavigation();

  return (
    <button
      onClick={toggle}
      className={`p-4 rounded-full transition-all duration-300 
        bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm
        hover:bg-slate-100 dark:hover:bg-slate-700 hover:scale-105
        ${isOpen ? 'bg-slate-100 dark:bg-slate-700 rotate-90' : ''}`}
      aria-label={isOpen ? 'Close menu' : 'Open menu'}
    >
      <MenuIcon className="w-8 h-8 text-slate-800 dark:text-white transition-transform duration-300" />
    </button>
  );
};

export default NavigationToggle; 