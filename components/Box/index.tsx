import Link from "next/link";
import { HTMLAttributes, ReactNode } from "react";

interface BoxProps {
  children: ReactNode;
  className?: string;
}

const Box = ({ className, children }: BoxProps) => {
  return (
    <div
      className={`block text-2xl align-middle transition ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export default Box;
