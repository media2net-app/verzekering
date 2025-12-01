'use client';

import { useState } from 'react';
import { InfoIcon } from './Icons';
import styles from './Tooltip.module.css';

interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Tooltip({ content, position = 'top' }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      <button
        type="button"
        className={styles.tooltipTrigger}
        aria-label="Meer informatie"
      >
        <InfoIcon size={16} />
      </button>
      {isVisible && (
        <div className={`${styles.tooltip} ${styles[position]}`}>
          {content}
          <div className={styles.tooltipArrow} />
        </div>
      )}
    </div>
  );
}

