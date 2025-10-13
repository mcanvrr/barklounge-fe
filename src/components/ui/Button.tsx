import { type ButtonProps } from '@/types';
import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  cn,
  COMMON_STYLES,
} from '@/utils/styles';
import React from 'react';

/**
 * Reusable Button component with consistent styling and behavior
 * Supports multiple variants, sizes, and loading states
 */
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      className={cn(
        COMMON_STYLES.button,
        BUTTON_VARIANTS[variant],
        BUTTON_SIZES[size],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className='w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin mr-2' />
      )}
      {children}
    </button>
  );
};

export default Button;
