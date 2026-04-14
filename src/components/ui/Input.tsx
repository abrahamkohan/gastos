import React from 'react';
import { cn } from '../../lib/utils';
import { InputProps } from '../../types';

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  className,
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          className={cn(
            `
            w-full
            h-9
            px-3
            text-sm
            bg-white
            border border-gray-200
            rounded-md
            transition-colors
            placeholder:text-gray-400
            hover:border-gray-300
            focus:outline-none
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
            disabled:bg-gray-50
            disabled:text-gray-500
            disabled:cursor-not-allowed
          `,
            icon && 'pl-10',
            error && 'border-red-300 focus:border-red-500 focus:ring-red-100',
            className
          )}
          {...props}
        />
      </div>

      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  );
};
