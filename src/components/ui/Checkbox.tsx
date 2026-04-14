import React from 'react';
import { cn } from '../../lib/utils';
import { CheckboxProps } from '../../types';

export const Checkbox: React.FC<CheckboxProps> = ({
  checked,
  onChange,
  label,
  disabled,
}) => {
  return (
    <label
      className={cn(
        'inline-flex items-center gap-2 cursor-pointer select-none group',
        disabled && 'cursor-not-allowed'
      )}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only"
      />

      <div
        className={cn(
          'w-4 h-4 rounded border-2 transition-all flex items-center justify-center',
          checked
            ? 'bg-gray-900 border-gray-900'
            : 'bg-white border-gray-300 group-hover:border-gray-400',
          disabled && 'opacity-50'
        )}
      >
        {checked && (
          <svg
            className="w-full h-full text-white"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"
              fill="currentColor"
            />
          </svg>
        )}
      </div>

      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  );
};
