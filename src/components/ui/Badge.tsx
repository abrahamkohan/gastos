import React from 'react';
import { differenceInDays, format, isPast } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '../../lib/utils';
import { CATEGORIES } from '../../config/categories';
import { CategoryBadgeProps, DueDateBadgeProps } from '../../types';

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  size = 'sm',
}) => {
  const config = CATEGORIES[category];

  if (!config) return null;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-md border font-medium transition-colors',
        size === 'sm' ? 'px-2 py-1 text-xs' : 'px-2.5 py-1.5 text-sm',
        config.bgClass,
        config.textClass,
        config.borderClass
      )}
    >
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
};

export const DueDateBadge: React.FC<DueDateBadgeProps> = ({
  date,
  isPaid = false,
}) => {
  const dueDate = new Date(date);
  const today = new Date();
  const daysUntil = differenceInDays(dueDate, today);
  const isOverdue = isPast(dueDate) && !isPaid;

  const getStyles = () => {
    if (isPaid) {
      return {
        bg: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-200',
        icon: '✓',
      };
    }

    if (isOverdue) {
      return {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        icon: '!',
      };
    }

    if (daysUntil <= 3) {
      return {
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        border: 'border-orange-200',
        icon: '⚠',
      };
    }

    if (daysUntil <= 7) {
      return {
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        border: 'border-yellow-200',
        icon: '◷',
      };
    }

    return {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      border: 'border-gray-200',
      icon: '◷',
    };
  };

  const styles = getStyles();

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-1 rounded-md border text-xs font-medium',
        styles.bg,
        styles.text,
        styles.border
      )}
    >
      <span>{styles.icon}</span>
      <span>{format(dueDate, 'dd/MM/yyyy', { locale: es })}</span>
      {!isPaid && daysUntil >= 0 && (
        <span className="opacity-75">
          ({daysUntil === 0 ? 'hoy' : `${daysUntil}d`})
        </span>
      )}
    </span>
  );
};
