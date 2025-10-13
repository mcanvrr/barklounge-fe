import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines class names using clsx and merges Tailwind classes with twMerge.
 * This is the main utility function for conditional class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Creates size-based class mappings for consistent sizing across components
 */
export const createSizeClasses = (baseClass: string) =>
  ({
    sm: `${baseClass}-sm`,
    md: `${baseClass}-md`,
    lg: `${baseClass}-lg`,
  } as const);

/**
 * Creates variant-based class mappings for consistent theming
 */
export const createVariantClasses = <T extends string>(
  variants: Record<T, string>
) => variants;

// Common style classes - organized by component type
export const COMMON_STYLES = {
  // Layout
  container: 'container mx-auto px-4 lg:px-6',
  section: 'relative w-full overflow-hidden',

  // Cards
  card: 'bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50',
  cardHover:
    'hover:shadow-2xl transition-all duration-500 hover:-translate-y-2',

  // Buttons - Base classes
  button:
    'inline-flex items-center justify-center font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',

  // Inputs - Base classes
  input:
    'w-full px-4 py-3 border rounded-xl focus:outline-none transition-all duration-300',

  // Text
  heading1: 'text-5xl lg:text-6xl font-bold text-gray-900',
  heading2: 'text-4xl lg:text-5xl font-bold text-gray-900',
  heading3: 'text-3xl lg:text-4xl font-bold text-gray-900',
  textLarge: 'text-xl text-gray-600 leading-relaxed',
  textMedium: 'text-lg text-gray-600',
  textSmall: 'text-sm text-gray-600',

  // Backgrounds
  backgroundGradient:
    'bg-gradient-to-br from-orange-50/40 via-navy-50/30 to-pink-50/20',
  backgroundDark: 'bg-gradient-to-br from-navy-900 to-purple-900',
  backgroundLight: 'bg-white',

  // Animations
  fadeIn: 'animate-fade-in-up',
  bounce: 'animate-bounce',
  pulse: 'animate-pulse',

  // Spacing
  sectionPadding: 'py-24 lg:py-36',
  sectionPaddingSmall: 'py-16 lg:py-20',
  sectionPaddingLarge: 'py-32 lg:py-48',
} as const;

// Component-specific style variants
export const BUTTON_VARIANTS = createVariantClasses({
  primary:
    'bg-gradient-to-r from-navy-500 to-navy-700 text-white hover:from-navy-600 hover:to-navy-800 focus:ring-navy-500',
  secondary:
    'bg-white/80 backdrop-blur-sm border-2 border-navy-200 text-navy-600 hover:bg-navy-50 hover:border-navy-300 focus:ring-navy-500',
  outline:
    'border-2 border-current text-current hover:bg-current hover:text-white focus:ring-current',
  ghost: 'text-current hover:bg-current/10 focus:ring-current',
});

export const BUTTON_SIZES = createVariantClasses({
  sm: 'px-4 py-2 text-sm rounded-lg',
  md: 'px-6 py-3 text-base rounded-xl',
  lg: 'px-8 py-4 text-lg rounded-2xl',
});

export const INPUT_VARIANTS = createVariantClasses({
  light:
    'bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-navy-300',
  dark: 'bg-white/5 border-white/10 text-white placeholder-white/40 focus:border-white/30',
});

export const SECTION_BACKGROUNDS = createVariantClasses({
  light: 'bg-white',
  dark: 'bg-gradient-to-br from-navy-900 to-purple-900',
  gradient: 'bg-gradient-to-br from-orange-50/40 via-navy-50/30 to-pink-50/20',
});

export const SECTION_PADDINGS = createVariantClasses({
  sm: 'py-16 lg:py-20',
  md: 'py-24 lg:py-36',
  lg: 'py-32 lg:py-48',
});

export const CARD_PADDINGS = createVariantClasses({
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
});

// Icon background gradients
export const ICON_BACKGROUNDS = {
  pink: 'from-rose-100 to-pink-200',
  green: 'from-emerald-100 to-green-200',
  blue: 'from-blue-100 to-indigo-200',
  yellow: 'from-amber-100 to-yellow-200',
  purple: 'from-purple-100 to-violet-200',
  teal: 'from-teal-100 to-cyan-200',
} as const;
