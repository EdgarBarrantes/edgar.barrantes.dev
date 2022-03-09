import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import ToggleIcon from "../../public/toggle.svg";

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  const switchTheme = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <a
      href="/"
      className="hover:rotate-90 dark:rotate-180 dark:hover:rotate-90 dark:invert transition cursor-pointer w-auto p-8"
      onClick={switchTheme}
    >
      <ToggleIcon width="48" height="48" viewBox="0 0 120 120" />
    </a>
  );
};

export default ModeToggle;
