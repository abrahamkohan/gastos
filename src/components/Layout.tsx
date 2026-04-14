import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createPaymentsClient } from '../lib/supabase';
import { PaymentsModuleConfig, Payment } from '../types';
import { PaymentList } from './payments/PaymentList';
import { PaymentForm } from './payments/PaymentForm';
import { Button } from './ui/Button';
import { usePayments } from '../hooks/usePayments';

interface PaymentsModuleProps extends PaymentsModuleConfig {
  className?: string;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: true,
    },
  },
});

const PaymentsModuleContent: React.FC<PaymentsModuleProps> = ({
  supabaseUrl,
  supabaseAnonKey,
  userId,
  onPaymentChange,
  onPaymentCreate,
  onPaymentDelete,
  className,
}) => {
  const supabase = createPaymentsClient({
    supabaseUrl,
    supabaseAnonKey,
    userId,
  });

  const {
    payments,
    isLoading,
    error,
    createPayment,
    updatePayment,
    deletePayment,
    togglePaid,
  } = usePayments(supabase, userId);

  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);

  const handleCreate = async (data: Parameters<typeof createPayment>[0]) => {
    const newPayment = await createPayment(data);
    onPaymentCreate?.(newPayment);
    setShowForm(false);
  };

  const handleUpdate = async (data: Parameters<typeof updatePayment>[0]['data']) => {
    if (!editingPayment) return;
    const updated = await updatePayment({ id: editingPayment.id, data });
    onPaymentChange?.(updated);
    setEditingPayment(null);
  };

  const handleDelete = async (payment: Payment) => {
    if (!confirm(`¿Eliminar "${payment.name}"?`)) return;
    await deletePayment(payment.id);
    onPaymentDelete?.(payment.id);
  };

  const handleTogglePaid = async (payment: Payment) => {
    const updated = await togglePaid(payment);
    onPaymentChange?.(updated);
  };

  return (
    <div className={className}>
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <h1 className="text-lg font-semibold text-gray-900">
              💰 Pagos y Recordatorios
            </h1>
            {!showForm && !editingPayment && (
              <Button size="sm" onClick={() => setShowForm(true)}>
                Nuevo Pago
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {showForm && (
          <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Crear nuevo pago
            </h2>
            <PaymentForm
              onSubmit={handleCreate}
              onCancel={() => setShowForm(false)}
            />
          </div>
        )}

        {editingPayment && (
          <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Editar pago
            </h2>
            <PaymentForm
              initialData={editingPayment}
              onSubmit={handleUpdate}
              onCancel={() => setEditingPayment(null)}
            />
          </div>
        )}

        <PaymentList
          payments={payments}
          isLoading={isLoading}
          error={error as Error | null}
          onEdit={setEditingPayment}
          onDelete={handleDelete}
          onTogglePaid={handleTogglePaid}
          onCreateNew={() => setShowForm(true)}
        />
      </main>
    </div>
  );
};

export const PaymentsModule: React.FC<PaymentsModuleProps> = (props) => {
  return (
    <QueryClientProvider client={queryClient}>
      <PaymentsModuleContent {...props} />
    </QueryClientProvider>
  );
};
