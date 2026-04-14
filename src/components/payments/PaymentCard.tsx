import React from 'react';
import { cn } from '../../lib/utils';
import { Payment } from '../../types';
import { CategoryBadge, DueDateBadge } from '../ui/Badge';
import { Checkbox } from '../ui/Checkbox';

interface PaymentCardProps {
  payment: Payment;
  onEdit?: () => void;
  onDelete?: () => void;
  onTogglePaid?: () => void;
}

export const PaymentCard: React.FC<PaymentCardProps> = ({
  payment,
  onEdit,
  onDelete,
  onTogglePaid,
}) => {
  return (
    <div
      className={cn(
        'group bg-white rounded-lg border p-4 transition-all duration-200',
        'hover:border-gray-300 hover:shadow-card-hover',
        payment.is_paid && 'bg-gray-50'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        {/* Left: Icon + Info */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className="text-2xl flex-shrink-0">{payment.icon || '💰'}</span>

          <div className="flex-1 min-w-0">
            <h3
              className={cn(
                'font-medium text-base truncate',
                payment.is_paid ? 'text-gray-600 line-through' : 'text-gray-900'
              )}
            >
              {payment.name}
            </h3>

            {payment.responsible && (
              <p className="text-sm text-gray-600 mt-0.5">
                {payment.responsible}
              </p>
            )}
          </div>
        </div>

        {/* Right: Amount + Actions */}
        <div className="flex items-start gap-3">
          {payment.amount !== null && (
            <div className="text-right">
              <p
                className={cn(
                  'font-semibold text-lg',
                  payment.is_paid ? 'text-gray-400' : 'text-gray-900'
                )}
              >
                ${payment.amount.toLocaleString('es-PY')}
              </p>
            </div>
          )}

          {/* Actions (solo visible en hover) */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            <button
              onClick={onEdit}
              className="p-1.5 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              title="Editar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
            </button>

            <button
              onClick={onDelete}
              className="p-1.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Eliminar"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18" />
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                <line x1="10" x2="10" y1="11" y2="17" />
                <line x1="14" x2="14" y1="11" y2="17" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Footer: Category + Date + Checkbox */}
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <CategoryBadge category={payment.category} />
          {payment.due_date && (
            <DueDateBadge date={payment.due_date} isPaid={payment.is_paid} />
          )}
        </div>

        <Checkbox
          checked={payment.is_paid}
          onChange={() => onTogglePaid?.()}
          label={payment.is_paid ? 'Pagado' : 'Pendiente'}
        />
      </div>

      {/* Notes (si existen) */}
      {payment.notes && (
        <div className="mt-3 p-2 bg-gray-50 rounded text-sm text-gray-600">
          {payment.notes}
        </div>
      )}
    </div>
  );
};
