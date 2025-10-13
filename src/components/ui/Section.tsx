import { type SectionProps } from '@/types';
import {
  cn,
  COMMON_STYLES,
  SECTION_BACKGROUNDS,
  SECTION_PADDINGS,
} from '@/utils/styles';
import React from 'react';

/**
 * Reusable Section component with consistent layout and styling
 * Supports different backgrounds and padding sizes
 */
const Section: React.FC<SectionProps> = ({
  id,
  children,
  className,
  background = 'light',
  padding = 'md',
}) => {
  return (
    <section
      id={id}
      className={cn(
        COMMON_STYLES.section,
        SECTION_BACKGROUNDS[background],
        SECTION_PADDINGS[padding],
        className
      )}
    >
      {children}
    </section>
  );
};

export default Section;
