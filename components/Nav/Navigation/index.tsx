import { useRouter } from "next/router";
import Link from "next/link";

import Box from "../../Box";
import NavigationLink from "../NavigationLink";
import ModeToggle from "../../ColorModeToggle";
import Social from "../../Social";
import NavigationHome from "../NavigationHome";
import Info from "../../Info";

interface NavigationProps {
  onClose: () => void;
}

const Navigation = ({ onClose }: NavigationProps) => {
  const router = useRouter();
  const decideOnShouldToggle = (pathname: string) => {
    return () => {
      if (router.pathname.startsWith(`/${pathname}`)) {
        onClose();
      }
    };
  };
  return (
    <div className="flex flex-col mx-auto text-center">
      <div className="flex flex-wrap justify-between">
        <Box
          onClick={decideOnShouldToggle("resume")}
          className="basis-1/2 sm:basis-auto"
        >
          <NavigationLink href="/resume" text="Resume" />
        </Box>
        <Box
          onClick={decideOnShouldToggle("thoughts")}
          className="basis-1/2 sm:basis-auto"
        >
          <NavigationLink href="/thoughts" text="Thoughts" />
        </Box>
        <Box
          onClick={decideOnShouldToggle("til")}
          className="basis-1/2 sm:basis-auto"
        >
          <NavigationLink href="/til" text="TIL" />
        </Box>
        <Box
          onClick={decideOnShouldToggle("projects")}
          className="basis-1/2 sm:basis-auto"
        >
          <NavigationLink href="/projects" text="Projects" />
        </Box>
      </div>

      <div className="flex justify-center">
        <Box className="basis-full">
          <Social />
        </Box>
      </div>

      <div className="flex flex-wrap justify-between items-center">
        <Box className="basis-auto flex justify-center order-1 sm:order-0">
          <NavigationHome />
        </Box>
        <Box className="basis-full sm:basis-auto p-8 order-0 sm:order-1 hidden">
          Want to focus?
        </Box>
        <Box className="basis-auto flex justify-center order-2 sm:order-2">
          <ModeToggle />
        </Box>
      </div>
    </div>
  );
};

export default Navigation;
