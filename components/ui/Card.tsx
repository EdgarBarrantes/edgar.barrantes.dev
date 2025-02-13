import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`
        bg-white dark:bg-slate-800 
        rounded-lg shadow-sm 
        p-6 
        ${hover ? 'transition-transform hover:scale-102 hover:shadow-md' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
} 