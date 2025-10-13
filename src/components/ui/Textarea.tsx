import { cn } from '@/utils/styles';
import React from 'react';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  variant?: 'light' | 'dark';
}

const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  variant = 'light',
  className,
  id,
  ...props
}) => {
  const generatedId = React.useId();
  const textareaId = id || generatedId;

  const variants = {
    light:
      'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-navy-300',
    dark: 'bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-white/30',
  };

  return (
    <div className='space-y-2'>
      {label && (
        <label
          htmlFor={textareaId}
          className='block text-sm font-medium text-white'
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={cn(
          'w-full px-4 py-3 border rounded-xl focus:outline-none transition-all duration-300 resize-none',
          variants[variant],
          error && 'border-red-500 focus:border-red-500',
          className
        )}
        {...props}
      />
      {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
    </div>
  );
};

export default Textarea;
