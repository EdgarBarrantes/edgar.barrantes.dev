import { ReactNode } from "react";

interface BoxProps {
  children: ReactNode;
  className?: string;
}

const Box = ({ className, children }: BoxProps) => {
  return (
    <div
      className={`block text-xl sm:text-2xl align-middle ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Box;
