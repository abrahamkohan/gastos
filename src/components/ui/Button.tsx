import React from 'react';
import { cn } from '../../lib/utils';
import { ButtonProps } from '../../types';

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  isLoading,
  children,
  disabled,
  ...props
}) => {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-medium
    transition-colors
    focus-visible:outline-none 
    focus-visible:ring-2 
    focus-visible:ring-offset-2
    disabled:pointer-events-none 
    disabled:opacity-50
  `;

  const variants: Record<string, string> = {
    primary: `
      bg-gray-900 text-white
      hover:bg-gray-800
      focus-visible:ring-gray-900
    `,
    secondary: `
      bg-white text-gray-900
      border border-gray-200
      hover:bg-gray-50
      hover:border-gray-300
      focus-visible:ring-gray-500
    `,
    ghost: `
      text-gray-600
      hover:bg-gray-100
      hover:text-gray-900
      focus-visible:ring-gray-500
    `,
    danger: `
      bg-red-600 text-white
      hover:bg-red-700
      focus-visible:ring-red-600
    `,
  };

  const sizes: Record<string, string> = {
    sm: 'h-8 px-3 text-xs rounded-md',
    md: 'h-9 px-4 text-sm rounded-md',
    lg: 'h-10 px-5 text-base rounded-lg',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant!], sizes[size!], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
};
