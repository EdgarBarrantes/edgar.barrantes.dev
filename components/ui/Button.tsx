import { ReactNode } from 'react';
import Link from 'next/link';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  className?: string;
}

const Button = ({ href, onClick, children, variant = 'primary', className = '' }: ButtonProps) => {
  const baseStyles = "inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all";
  const variants = {
    primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
    ghost: "hover:bg-slate-100 dark:hover:bg-slate-800"
  };

  const buttonClass = `${baseStyles} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={buttonClass}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClass}>
      {children}
    </button>
  );
}; 