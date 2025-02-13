import { ReactNode } from "react";

interface BoxProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

const Box = ({ children, className, onClick }: BoxProps) => {
  return (
    <div
      onClick={onClick}
      className={`block text-xl sm:text-2xl align-middle ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default Box;
