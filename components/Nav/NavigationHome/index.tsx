import Link from "next/link";
import Home from "../../../public/home.svg";

const NavigationToggle = () => {
  return (
    <Link href="/">
      <a
        className={`transition dark:invert hover:scale-110 cursor-pointer p-8`}
      >
        <Home width="48" height="48" viewBox="0 0 120 120" />
      </a>
    </Link>
  );
};

export default NavigationToggle;
