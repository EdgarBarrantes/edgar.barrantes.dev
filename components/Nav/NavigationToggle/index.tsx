import Gear from "../../../public/gear.svg";

interface NavigationToggleProps {
  isNavigationOpen: boolean;
  setIsNavigationOpen: (isNavigationOpen: boolean) => void;
}

const NavigationToggle = ({
  isNavigationOpen,
  setIsNavigationOpen,
}: NavigationToggleProps) => {
  const toggleNavigation = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setIsNavigationOpen(!isNavigationOpen);
  };

  return (
    <a
      href="/"
      className={`transition dark:invert md:hover:animate-spin cursor-pointer p-8`}
      onClick={toggleNavigation}
    >
      <Gear width="36" height="36" viewBox="0 0 120 120" />
    </a>
  );
};

export default NavigationToggle;
