import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Payment } from '../types';
import { PaymentList } from './payments/PaymentList';
import { PaymentForm } from './payments/PaymentForm';
import { Button } from './ui/Button';
import { useLocalPayments } from '../hooks/useLocalPayments';
import { resetLocalData } from '../lib/localStorage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const PaymentsModuleLocalContent: React.FC = () => {
  const {
    payments,
    isLoading,
    error,
    createPayment,
    updatePayment,
    deletePayment,
    togglePaid,
  } = useLocalPayments();

  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState<Payment | null>(null);

  const handleCreate = async (data: Parameters<typeof createPayment>[0]) => {
    await createPayment(data);
    setShowForm(false);
  };

  const handleUpdate = async (data: Parameters<typeof updatePayment>[0]['data']) => {
    if (!editingPayment) return;
    await updatePayment({ id: editingPayment.id, data });
    setEditingPayment(null);
  };

  const handleDelete = async (payment: Payment) => {
    if (!confirm(`¿Eliminar "${payment.name}"?`)) return;
    await deletePayment(payment.id);
  };

  const handleTogglePaid = async (payment: Payment) => {
    await togglePaid(payment);
  };

  const handleResetData = () => {
    if (confirm('¿Restaurar datos de ejemplo? Se perderán los cambios.')) {
      resetLocalData();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold text-gray-900">
                💰 Pagos y Recordatorios
              </h1>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Modo Local
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleResetData}
                title="Restaurar datos de ejemplo"
              >
                🔄 Reset
              </Button>
              {!showForm && !editingPayment && (
                <Button size="sm" onClick={() => setShowForm(true)}>
                  Nuevo Pago
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Info banner */}
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <span className="text-blue-600">ℹ️</span>
            <div>
              <h3 className="text-sm font-medium text-blue-900">
                Modo Offline - Datos guardados localmente
              </h3>
              <p className="text-sm text-blue-700 mt-1">
                Los pagos se guardan en tu navegador (localStorage). 
                Podés crear, editar, eliminar y marcar como pagados. 
                Los datos persisten al recargar la página.
              </p>
            </div>
          </div>
        </div>

        {showForm && (
          <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4 animate-slide-up">
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
          <div className="mb-6 bg-white rounded-lg border border-gray-200 p-4 animate-slide-up">
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

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-xs text-gray-500 text-center">
            Módulo de Pagos v0.1.0 | Modo Local | 
            <a 
              href="https://github.com/abrahamkohanpy-cloud/gastos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Ver en GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export const PaymentsModuleLocal: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PaymentsModuleLocalContent />
    </QueryClientProvider>
  );
};