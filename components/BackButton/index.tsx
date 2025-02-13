import { NextRouter } from "next/router";
import Link from "next/link";
import BackIcon from "../../public/back.svg";

interface BackButtonProps {
  router: NextRouter;
}

const BackButton = ({ router }: BackButtonProps) => {
  return (
    <Link href="/" className="absolute top-4 left-4 cursor-pointer">
      <BackIcon style={{ transform: "scale(4)" }} />
    </Link>
  );
};

export default BackButton;
