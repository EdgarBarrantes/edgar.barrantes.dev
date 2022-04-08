import { NextRouter } from "next/router";
import BackIcon from "../../public/back.svg";

interface BackButtonProps {
  router: NextRouter;
}

const BackButton = ({ router }: BackButtonProps) => {
  const moveBack = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    router.back();
  };

  return (
    <a
      href="/"
      className={`dark:invert cursor-pointer p-8 left-0`}
      onClick={moveBack}
    >
      <BackIcon style={{ transform: "scale(4)" }} />
    </a>
  );
};

export default BackButton;
