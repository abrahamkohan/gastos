import React from 'react';
import { Payment } from '../../types';
import { CategoryBadge, DueDateBadge } from '../ui/Badge';

interface PaymentTableProps {
  payments: Payment[];
  isLoading: boolean;
  error: Error | null;
  onEdit: (payment: Payment) => void;
  onDelete: (payment: Payment) => void;
  onTogglePaid: (payment: Payment) => void;
  onCreateNew: () => void;
}

export const PaymentTable: React.FC<PaymentTableProps> = ({
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
      <div className="flex items-center justify-center py-12 bg-white rounded-lg border border-gray-200">
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
            <h3 className="text-sm font-medium text-red-900 mb-1">Error al cargar pagos</h3>
            <p className="text-sm text-red-700">{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!payments.length) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 text-center py-12">
        <div className="text-4xl mb-3">📭</div>
        <h3 className="text-base font-medium text-gray-900 mb-1">No hay pagos</h3>
        <p className="text-sm text-gray-600 mb-4">Creá tu primer pago para comenzar</p>
        <button 
          onClick={onCreateNew}
          className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
        >
          Crear Pago
        </button>
      </div>
    );
  }

  const getInitial = (name: string | null) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  const getAvatarColor = (name: string | null) => {
    if (!name) return 'from-gray-400 to-gray-600';
    const colors: Record<string, string> = {
      'Abraham': 'from-gray-400 to-gray-600',
      'Nora': 'from-pink-400 to-pink-600',
      'Orestes': 'from-green-400 to-green-600',
      'Spirit Mariscal': 'from-purple-400 to-purple-600',
    };
    return colors[name] || 'from-blue-400 to-blue-600';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-gray-200 bg-gray-50 text-xs font-medium text-gray-500 uppercase tracking-wider">
        <div className="col-span-2">Responsable</div>
        <div className="col-span-4">Nombre</div>
        <div className="col-span-2">Categoría</div>
        <div className="col-span-2">Vencimiento</div>
        <div className="col-span-1 text-right">Monto</div>
        <div className="col-span-1"></div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
        {payments.map((payment) => (
          <div 
            key={payment.id} 
            className={`grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-gray-50 transition-colors group ${
              payment.is_paid ? 'bg-green-50/30' : ''
            }`}
          >
            {/* Responsable */}
            <div className="col-span-2">
              {payment.responsible ? (
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${getAvatarColor(payment.responsible)} text-white flex items-center justify-center text-xs font-medium`}>
                    {getInitial(payment.responsible)}
                  </div>
                  <span className="text-sm text-gray-700 truncate">{payment.responsible}</span>
                </div>
              ) : (
                <span className="text-sm text-gray-400">—</span>
              )}
            </div>

            {/* Nombre + Icono */}
            <div className="col-span-4 flex items-center gap-3">
              <span className={`text-lg ${payment.is_paid ? 'grayscale' : ''}`}>{payment.icon || '💰'}</span>
              <div className="min-w-0">
                <span className={`text-sm font-medium block truncate ${
                  payment.is_paid ? 'text-gray-500 line-through' : 'text-gray-900'
                }`}>
                  {payment.name}
                </span>
                {payment.notes && (
                  <span className="text-xs text-gray-400 truncate block">{payment.notes}</span>
                )}
              </div>
            </div>

            {/* Categoría */}
            <div className="col-span-2">
              <CategoryBadge category={payment.category} />
            </div>

            {/* Vencimiento */}
            <div className="col-span-2">
              {payment.due_date ? (
                <DueDateBadge date={payment.due_date} isPaid={payment.is_paid} />
              ) : (
                <span className="text-sm text-gray-400">Sin fecha</span>
              )}
            </div>

            {/* Monto */}
            <div className={`col-span-1 text-right text-sm font-medium ${
              payment.is_paid ? 'text-green-600 line-through' : 'text-gray-900'
            }`}>
              {payment.amount ? `$${payment.amount.toLocaleString('es-PY')}` : '—'}
            </div>

            {/* Acciones */}
            <div className="col-span-1 flex justify-end gap-1">
              <button
                onClick={() => onTogglePaid(payment)}
                className={`p-1.5 rounded transition-colors ${
                  payment.is_paid 
                    ? 'text-green-600 hover:bg-green-100' 
                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                }`}
                title={payment.is_paid ? 'Marcar pendiente' : 'Marcar pagado'}
              >
                {payment.is_paid ? '✓' : '○'}
              </button>
              <button
                onClick={() => onEdit(payment)}
                className="p-1.5 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors opacity-0 group-hover:opacity-100"
                title="Editar"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button
                onClick={() => onDelete(payment)}
                className="p-1.5 rounded text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                title="Eliminar"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};