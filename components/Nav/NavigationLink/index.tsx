import Link from "next/link";
import { ReactNode } from "react";

interface BoxProps {
  children: ReactNode;
  to: string;
  className?: string;
}

const NavigationLink = ({ children, to, className }: BoxProps) => {
  return (
    <Link href={to}>
      <a
        className={`block p-8 align-middle font-bold hover:text-slate-800 hover:dark:text-slate-300 bold hover:underline ${
          className ? className : ""
        }`}
      >
        {children}
      </a>
    </Link>
  );
};

export default NavigationLink;
