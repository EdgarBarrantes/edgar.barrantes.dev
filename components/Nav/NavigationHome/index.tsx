import Link from "next/link";
import HomeIcon from "../../../public/home.svg";

const NavigationHome = () => {
  return (
    <Link 
      href="/"
      className="transition dark:invert hover:scale-110 cursor-pointer p-8"
    >
      <HomeIcon width="48" height="48" viewBox="0 0 120 120" />
    </Link>
  );
};

export default NavigationHome;
