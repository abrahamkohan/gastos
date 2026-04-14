import React from 'react';
import { Payment } from '../../types';
import { CategoryBadge } from '../ui/Badge';
import { differenceInDays, isPast } from 'date-fns';

interface PaymentCardMobileProps {
  payment: Payment;
  onEdit: () => void;
  onDelete: () => void;
  onTogglePaid: () => void;
}

export const PaymentCardMobile: React.FC<PaymentCardMobileProps> = ({
  payment,
  onEdit,
  onDelete,
  onTogglePaid,
}) => {
  const getInitial = (name: string | null) => {
    if (!name) return '?';
    return name.charAt(0).toUpperCase();
  };

  const getAvatarColor = (name: string | null) => {
    if (!name) return 'bg-gray-200 text-gray-600';
    const colors: Record<string, string> = {
      'Abraham': 'bg-gray-200 text-gray-600',
      'Nora': 'bg-pink-100 text-pink-600',
      'Orestes': 'bg-green-100 text-green-600',
      'Spirit Mariscal': 'bg-purple-100 text-purple-600',
    };
    return colors[name] || 'bg-blue-100 text-blue-600';
  };

  const getStatusBadge = () => {
    if (payment.is_paid) {
      return { text: 'Pagado', className: 'bg-green-100 text-green-700' };
    }
    if (!payment.due_date) {
      return { text: 'Pendiente', className: 'bg-gray-100 text-gray-600' };
    }
    
    const dueDate = new Date(payment.due_date);
    const today = new Date();
    const isOverdue = isPast(dueDate);
    const daysUntil = differenceInDays(dueDate, today);
    
    if (isOverdue) {
      return { text: 'Vencido', className: 'bg-red-100 text-red-700' };
    }
    if (daysUntil <= 2) {
      return { text: `${daysUntil === 0 ? 'Hoy' : `${daysUntil} días`}`, className: 'bg-red-100 text-red-700' };
    }
    if (daysUntil <= 5) {
      return { text: `${daysUntil} días`, className: 'bg-orange-100 text-orange-700' };
    }
    return { text: `${daysUntil} días`, className: 'bg-yellow-100 text-yellow-700' };
  };

  const status = getStatusBadge();

  // Borde izquierdo de color según estado
  const getBorderColor = () => {
    if (payment.is_paid) return 'border-l-green-500';
    if (!payment.due_date) return 'border-l-gray-300';
    
    const dueDate = new Date(payment.due_date);
    const today = new Date();
    const isOverdue = isPast(dueDate);
    const daysUntil = differenceInDays(dueDate, today);
    
    if (isOverdue || daysUntil <= 2) return 'border-l-red-500';
    if (daysUntil <= 5) return 'border-l-orange-500';
    return 'border-l-gray-300';
  };

  return (
    <div 
      className={`bg-white rounded-xl border border-gray-200 p-4 shadow-sm border-l-4 ${getBorderColor()} ${
        payment.is_paid ? 'opacity-75' : ''
      }`}
    >
      {/* Header: Icono + Nombre + Status */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <span className={`text-3xl flex-shrink-0 ${payment.is_paid ? 'grayscale' : ''}`}>
            {payment.icon || '💰'}
          </span>
          <div className="min-w-0">
            <h3 className={`font-semibold text-sm truncate ${payment.is_paid ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
              {payment.name}
            </h3>
            {payment.notes && (
              <p className="text-xs text-gray-500 truncate mt-0.5">{payment.notes}</p>
            )}
          </div>
        </div>
        <span className={`flex-shrink-0 px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${status.className}`}>
          {status.text}
        </span>
      </div>

      {/* Middle: Responsable + Monto */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          {payment.responsible ? (
            <>
              <div className={`w-6 h-6 rounded-full ${getAvatarColor(payment.responsible)} flex items-center justify-center text-xs font-medium`}>
                {getInitial(payment.responsible)}
              </div>
              <span className="text-xs text-gray-600">{payment.responsible}</span>
            </>
          ) : (
            <span className="text-xs text-gray-400">Sin responsable</span>
          )}
        </div>
        <span className={`text-lg font-bold ${payment.is_paid ? 'text-green-600 line-through' : 'text-gray-900'}`}>
          {payment.amount ? `$${payment.amount.toLocaleString('es-PY')}` : '—'}
        </span>
      </div>

      {/* Footer: Categoría + Checkbox */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <CategoryBadge category={payment.category} />
        
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={payment.is_paid}
            onChange={onTogglePaid}
            className="w-5 h-5 rounded border-gray-300 accent-gray-900"
          />
          <span className={`text-xs ${payment.is_paid ? 'text-green-600' : 'text-gray-600'}`}>
            {payment.is_paid ? 'Pagado' : 'Pendiente'}
          </span>
        </label>
      </div>

      {/* Actions (always visible on mobile for touch) */}
      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
        <button
          onClick={onEdit}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm text-gray-600 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
          Editar
        </button>
        <button
          onClick={onDelete}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 text-sm text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Eliminar
        </button>
      </div>
    </div>
  );
};