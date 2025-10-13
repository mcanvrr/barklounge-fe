import { type InputProps } from '@/types';
import { cn, COMMON_STYLES, INPUT_VARIANTS } from '@/utils/styles';
import React from 'react';

/**
 * Reusable Input component with consistent styling and validation
 * Supports different variants, labels, and error states
 */
const Input: React.FC<InputProps> = ({
  label,
  error,
  variant = 'light',
  className,
  id,
  ...props
}) => {
  const generatedId = React.useId();
  const inputId = id || generatedId;

  return (
    <div className='space-y-2'>
      {label && (
        <label
          htmlFor={inputId}
          className='block text-sm font-medium text-white'
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={cn(
          COMMON_STYLES.input,
          INPUT_VARIANTS[variant],
          error && 'border-red-500 focus:border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
};

export default Input;
