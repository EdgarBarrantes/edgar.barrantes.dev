import { ReactNode } from "react";

import Box from "../Box";
import Github from "../../public/github-fill.svg";
import LinkedIn from "../../public/linkedin-fill.svg";
import Mail from "../../public/mail-fill.svg";
import Twitter from "../../public/twitter-fill.svg";
interface SocialContainerProps {
  children: ReactNode;
  href: string;
}
const SocialContainer = ({ children, href }: SocialContainerProps) => {
  return (
    <Box>
      <a
        className="block p-6 sm:p-8 align-middle transition hover:scale-110"
        target="_blank"
        rel="noreferrer"
        href={href}
      >
        {children}
      </a>
    </Box>
  );
};

const Social = () => {
  return (
    <div className="flex mx-auto justify-center dark:invert">
      <SocialContainer href="https://github.com/edgarbarrantes">
        <Github />
      </SocialContainer>
      <SocialContainer href="https://www.linkedin.com/in/edgar-barrantes/">
        <LinkedIn />
      </SocialContainer>
      <SocialContainer href="https://twitter.com/edgarbarrantes">
        <Twitter />
      </SocialContainer>
      <SocialContainer href="mailto:edgar@barrantes.dev">
        <Mail />
      </SocialContainer>
    </div>
  );
};

export default Social;
