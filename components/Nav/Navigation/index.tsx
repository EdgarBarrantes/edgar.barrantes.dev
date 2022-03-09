import Box from "../../Box";
import NavigationLink from "../NavigationLink";
import ModeToggle from "../../ColorModeToggle";
import Social from "../../Social";
import NewsletterLink from "../../NewsletterIcon";

const Navigation = () => {
  return (
    <div className="mx-auto text-center">
      <div className="flex flex-wrap justify-between">
        <Box className="basis-1/2 sm:basis-auto">
          <NavigationLink to="/resume">Resume</NavigationLink>
        </Box>
        <Box className="basis-1/2 sm:basis-auto">
          <NavigationLink to="/thoughts">Thoughts</NavigationLink>
        </Box>
        <Box className="basis-1/2 sm:basis-auto">
          <NavigationLink to="/til">TIL</NavigationLink>
        </Box>
        <Box className="basis-1/2 sm:basis-auto">
          <NavigationLink to="/projects">Projects</NavigationLink>
        </Box>
      </div>

      <div className="flex justify-center">
        <Box className="basis-full">
          <Social />
        </Box>
      </div>

      <div className="flex flex-wrap justify-between items-center">
        <Box className="basis-full sm:basis-auto flex justify-center order-1 sm:order-0">
          <NewsletterLink />
        </Box>
        <Box className="basis-full sm:basis-auto p-8 order-0 sm:order-1 hidden">
          Want to focus?
        </Box>
        <Box className="basis-full sm:basis-auto flex justify-center order-2 sm:order-2">
          <ModeToggle />
        </Box>
      </div>
    </div>
  );
};

export default Navigation;
