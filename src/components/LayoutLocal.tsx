import React, { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Payment, PaymentFormData } from '../types';
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

  const handleCreate = async (data: PaymentFormData) => {
    await createPayment(data);
    setShowForm(false);
  };

  const handleUpdate = async (data: Partial<Payment>) => {
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
      {/* Header - Desktop */}
      <header className="hidden lg:flex sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold text-gray-900">
                💰 Pagos y Recordatorios
              </h1>
              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                Local
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

      {/* Header - Mobile */}
      <header className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-gray-900">💰 Mis Pagos</h1>
              <p className="text-xs text-gray-500">{payments.length} pagos • {payments.filter(p => !p.is_paid).length} pendientes</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleResetData}
                className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-full"
              >
                🔄
              </button>
              {!showForm && !editingPayment && (
                <button
                  onClick={() => setShowForm(true)}
                  className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
        
        {/* Filter chips - Mobile */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto hide-scrollbar">
          <span className="px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-full whitespace-nowrap">
            Todos ({payments.length})
          </span>
          <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-medium rounded-full whitespace-nowrap">
            ⚡ Servicios ({payments.filter(p => p.category === 'servicios').length})
          </span>
          <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-medium rounded-full whitespace-nowrap">
            🏢 Expensas ({payments.filter(p => p.category === 'expensas').length})
          </span>
          <span className="px-3 py-1.5 bg-white border border-gray-200 text-gray-600 text-xs font-medium rounded-full whitespace-nowrap">
            ⏰ Próximos ({payments.filter(p => !p.is_paid).length})
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-6">
        {/* Info banner - Desktop */}
        <div className="hidden lg:block mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
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

      {/* Footer - Desktop */}
      <footer className="hidden lg:block border-t border-gray-200 bg-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-sm text-gray-600 text-center">
            Módulo de Pagos y Recordatorios v0.1.0 | Modo Local | 
            <a 
              href="https://github.com/abrahamkohan/gastos" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
          </p>
        </div>
      </footer>

      {/* Mobile Bottom Nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-2 flex justify-around items-center z-20">
        <button className="flex flex-col items-center gap-1 p-2 text-gray-900">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="text-xs font-medium">Pagos</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <span className="text-xs">Stats</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 text-gray-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs">Config</span>
        </button>
      </nav>
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