import { ReactNode } from "react";

interface BoxProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

const Box = ({ className, onClick, children }: BoxProps) => {
  return (
    <div
      onClick={onClick}
      className={`block text-xl sm:text-2xl align-middle ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Box;
