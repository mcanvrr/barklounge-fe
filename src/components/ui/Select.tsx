import { cn } from '@/utils/styles';
import React from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  variant?: 'light' | 'dark';
  options: SelectOption[];
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  error,
  variant = 'light',
  options,
  placeholder,
  className,
  id,
  ...props
}) => {
  const generatedId = React.useId();
  const selectId = id || generatedId;

  const variants = {
    light: 'bg-white border-gray-200 text-gray-900 focus:border-navy-300',
    dark: 'bg-white/5 border-white/10 text-white focus:border-white/30',
  };

  return (
    <div className='space-y-2'>
      {label && (
        <label
          htmlFor={selectId}
          className='block text-sm font-medium text-white'
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={cn(
          'w-full px-4 py-3 border rounded-xl focus:outline-none transition-all duration-300',
          variants[variant],
          error && 'border-red-500 focus:border-red-500',
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value='' className='text-gray-900'>
            {placeholder}
          </option>
        )}
        {options.map(option => (
          <option
            key={option.value}
            value={option.value}
            className='text-gray-900'
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
};

export default Select;
