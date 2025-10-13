import { type CardProps } from '@/types';
import { CARD_PADDINGS, cn, COMMON_STYLES } from '@/utils/styles';
import React from 'react';

/**
 * Reusable Card component with consistent styling and hover effects
 * Supports different padding sizes and hover animations
 */
const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  padding = 'md',
}) => {
  return (
    <div
      className={cn(
        COMMON_STYLES.card,
        CARD_PADDINGS[padding],
        hover && COMMON_STYLES.cardHover,
        className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
