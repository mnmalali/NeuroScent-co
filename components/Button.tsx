import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  variant?: 'primary' | 'secondary' | 'outline';
  onClick?: () => void;
  className?: string;
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  to, 
  variant = 'primary', 
  onClick, 
  className = '',
  icon = false
}) => {
  const baseStyles = "inline-flex items-center justify-center px-8 py-4 text-xs uppercase tracking-[0.2em] transition-all duration-300 group font-medium";
  
  const variants = {
    primary: "bg-neuro-black text-neuro-ivory hover:bg-neuro-gold hover:text-white",
    secondary: "bg-neuro-ivory text-neuro-black border border-neuro-ivory hover:border-neuro-gold hover:text-neuro-gold",
    outline: "bg-transparent border border-neuro-black text-neuro-black hover:bg-neuro-black hover:text-neuro-ivory"
  };

  const content = (
    <>
      {children}
      {icon && <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={`${baseStyles} ${variants[variant]} ${className}`}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {content}
    </button>
  );
};