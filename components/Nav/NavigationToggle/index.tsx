import GearIcon from "../../../public/gear.svg";

interface NavigationToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const NavigationToggle = ({ isOpen, onToggle }: NavigationToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className={`transition dark:invert hover:scale-110 cursor-pointer p-8 ${
        isOpen ? 'rotate-180' : ''
      }`}
      aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
    >
      <GearIcon width="48" height="48" viewBox="0 0 120 120" />
    </button>
  );
};

export default NavigationToggle;
