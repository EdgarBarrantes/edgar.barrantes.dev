import Box from "../Box";
import Github from "../../public/github-fill.svg";
import LinkedIn from "../../public/linkedin-fill.svg";
import Mail from "../../public/mail-fill.svg";
import Twitter from "../../public/twitter-fill.svg";

interface NavigationProps {}

const Navigation = () => {
  return (
    <div className="flex mx-auto justify-center dark:invert">
      <Box>
        <a
          className="block p-8 align-middle hover:opacity-70"
          target="_blank"
          href="https://github.com/edgarbarrantes"
        >
          <Github className="hover:shadow-lg" />
        </a>
      </Box>
      <Box>
        <a
          className="block p-8 align-middle hover:opacity-70"
          target="_blank"
          href="https://www.linkedin.com/in/edgar-barrantes/"
        >
          <LinkedIn />
        </a>
      </Box>
      <Box>
        <a
          className="block p-8 align-middle hover:opacity-70"
          target="_blank"
          href="https://twitter.com/edgarbarrantes"
        >
          <Twitter />
        </a>
      </Box>
      <Box>
        <a
          className="block p-8 align-middle hover:opacity-70"
          target="_blank"
          href="mailto:edgar@barrantes.dev?subject=Hi, I came here from your site..."
        >
          <Mail />
        </a>
      </Box>
    </div>
  );
};

export default Navigation;
