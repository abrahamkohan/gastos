import React from 'react';
import { Payment } from '../../types';
import { PaymentCard } from './PaymentCard';
import { Button } from '../ui/Button';

interface PaymentListProps {
  payments: Payment[];
  isLoading?: boolean;
  error?: Error | null;
  onEdit: (payment: Payment) => void;
  onDelete: (payment: Payment) => void;
  onTogglePaid: (payment: Payment) => void;
  onCreateNew: () => void;
}

export const PaymentList: React.FC<PaymentListProps> = ({
  payments,
  isLoading,
  error,
  onEdit,
  onDelete,
  onTogglePaid,
  onCreateNew,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-4">
        <div className="flex gap-3">
          <span className="text-red-600">⚠️</span>
          <div>
            <h3 className="text-sm font-medium text-red-900 mb-1">
              Error al cargar pagos
            </h3>
            <p className="text-sm text-red-700">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!payments.length) {
    return (
      <div className="text-center py-12">
        <div className="text-4xl mb-3">📭</div>
        <h3 className="text-base font-medium text-gray-900 mb-1">
          No hay pagos pendientes
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Creá tu primer pago para comenzar
        </p>
        <Button onClick={onCreateNew}>Crear Pago</Button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {payments.map((payment) => (
        <PaymentCard
          key={payment.id}
          payment={payment}
          onEdit={() => onEdit(payment)}
          onDelete={() => onDelete(payment)}
          onTogglePaid={() => onTogglePaid(payment)}
        />
      ))}
    </div>
  );
};
