import React from 'react';
import { Payment, Category } from '../src/types';
import { PaymentCard } from '../src/components/payments/PaymentCard';
import { PaymentList } from '../src/components/payments/PaymentList';
import { Button } from '../src/components/ui/Button';
import { CategoryBadge, DueDateBadge } from '../src/components/ui/Badge';
import { Checkbox } from '../src/components/ui/Checkbox';
import { Input } from '../src/components/ui/Input';

// Mock data
const mockPayments: Payment[] = [
  {
    id: '1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: 'Luz (ANDE)',
    amount: 450000,
    category: 'servicios',
    responsible: 'Abraham',
    due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: 'Factura mensual de electricidad',
    icon: '⚡',
    color: null,
    is_paid: false,
    paid_at: null,
    recurrence: 'monthly',
    parent_payment_id: null,
    user_id: 'user-1',
  },
  {
    id: '2',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: 'Expensas Edificio Central',
    amount: 850000,
    category: 'expensas',
    responsible: 'Nora',
    due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: null,
    icon: '🏢',
    color: null,
    is_paid: false,
    paid_at: null,
    recurrence: 'monthly',
    parent_payment_id: null,
    user_id: 'user-1',
  },
  {
    id: '3',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: 'Honorarios Contador',
    amount: 1200000,
    category: 'honorarios',
    responsible: 'Abraham',
    due_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: 'Servicios contables mensuales',
    icon: '💼',
    color: null,
    is_paid: true,
    paid_at: new Date().toISOString(),
    recurrence: 'monthly',
    parent_payment_id: null,
    user_id: 'user-1',
  },
  {
    id: '4',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: 'IVA Mensual',
    amount: 3500000,
    category: 'impuestos',
    responsible: 'Orestes',
    due_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: 'Declaración de IVA',
    icon: '📋',
    color: null,
    is_paid: false,
    paid_at: null,
    recurrence: 'monthly',
    parent_payment_id: null,
    user_id: 'user-1',
  },
  {
    id: '5',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: 'Patente Vehículo',
    amount: 180000,
    category: 'tramites',
    responsible: 'Spirit Mariscal',
    due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: null,
    icon: '📄',
    color: null,
    is_paid: false,
    paid_at: null,
    recurrence: 'yearly',
    parent_payment_id: null,
    user_id: 'user-1',
  },
  {
    id: '6',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    name: 'Mantenimiento Aire Acondicionado',
    amount: 320000,
    category: 'otros',
    responsible: null,
    due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: 'Limpieza y mantenimiento',
    icon: '❄️',
    color: null,
    is_paid: false,
    paid_at: null,
    recurrence: 'none',
    parent_payment_id: null,
    user_id: 'user-1',
  },
];

export const DemoApp: React.FC = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <h1 className="text-lg font-semibold text-gray-900">
              💰 Demo - Módulo de Pagos
            </h1>
            <div className="flex gap-2">
              <Button variant="secondary" size="sm">
                Secondary
              </Button>
              <Button size="sm">Nuevo Pago</Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Component Showcase */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">UI Components</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Buttons</h3>
              <div className="flex flex-wrap gap-2">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Danger</Button>
                <Button isLoading>Loading</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Inputs</h3>
              <div className="max-w-md space-y-3">
                <Input label="Nombre" placeholder="Ej: Luz ANDE" />
                <Input label="Monto" type="number" placeholder="450000" />
                <Input label="Con error" error="Este campo es requerido" />
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Checkbox</h3>
              <Checkbox checked={checked} onChange={setChecked} label="Marcar como pagado" />
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Badges</h3>
              <div className="flex flex-wrap gap-2">
                {(['servicios', 'expensas', 'honorarios', 'impuestos', 'tramites', 'otros'] as Category[]).map((cat) => (
                  <CategoryBadge key={cat} category={cat} />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Due Date Badges</h3>
              <div className="flex flex-wrap gap-2">
                <DueDateBadge date={new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()} />
                <DueDateBadge date={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()} />
                <DueDateBadge date={new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString()} />
                <DueDateBadge date={new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString()} />
                <DueDateBadge date={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()} isPaid />
              </div>
            </div>
          </div>
        </section>

        {/* Payment Cards */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Cards</h2>
          <div className="space-y-3 max-w-3xl">
            {mockPayments.slice(0, 3).map((payment) => (
              <PaymentCard
                key={payment.id}
                payment={payment}
                onEdit={() => console.log('Edit', payment.id)}
                onDelete={() => console.log('Delete', payment.id)}
                onTogglePaid={() => console.log('Toggle', payment.id)}
              />
            ))}
          </div>
        </section>

        {/* Payment List */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment List</h2>
          <div className="max-w-3xl">
            <PaymentList
              payments={mockPayments}
              onEdit={(p) => console.log('Edit', p.id)}
              onDelete={(p) => console.log('Delete', p.id)}
              onTogglePaid={(p) => console.log('Toggle', p.id)}
              onCreateNew={() => console.log('Create new')}
            />
          </div>
        </section>

        {/* States */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">States</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Loading</h3>
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-900" />
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Empty</h3>
              <div className="text-center py-8">
                <div className="text-4xl mb-3">📭</div>
                <h3 className="text-base font-medium text-gray-900 mb-1">
                  No hay pagos pendientes
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Creá tu primer pago para comenzar
                </p>
                <Button size="sm">Crear Pago</Button>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Error</h3>
              <div className="rounded-lg bg-red-50 border border-red-200 p-4">
                <div className="flex gap-3">
                  <span className="text-red-600">⚠️</span>
                  <div>
                    <h3 className="text-sm font-medium text-red-900 mb-1">
                      Error al cargar pagos
                    </h3>
                    <p className="text-sm text-red-700">No se pudo conectar al servidor</p>
                    <Button variant="ghost" size="sm" className="mt-2">
                      Reintentar
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};