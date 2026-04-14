import { Payment, PaymentFormData } from '../types';

const STORAGE_KEY = 'payments-module-data';

// Datos de ejemplo iniciales
const defaultPayments: Payment[] = [
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
    user_id: 'local-user',
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
    user_id: 'local-user',
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
    user_id: 'local-user',
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
    user_id: 'local-user',
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
    user_id: 'local-user',
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
    user_id: 'local-user',
  },
];

export function getLocalPayments(): Payment[] {
  if (typeof window === 'undefined') return defaultPayments;
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPayments));
    return defaultPayments;
  }
  
  return JSON.parse(stored);
}

export function saveLocalPayment(payment: PaymentFormData): Payment {
  const payments = getLocalPayments();
  const newPayment: Payment = {
    ...payment,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    user_id: 'local-user',
    is_paid: false,
    paid_at: null,
    recurrence: payment.recurrence || 'none',
    parent_payment_id: null,
  };
  
  payments.push(newPayment);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
  return newPayment;
}

export function updateLocalPayment(id: string, data: Partial<Payment>): Payment {
  const payments = getLocalPayments();
  const index = payments.findIndex(p => p.id === id);
  
  if (index === -1) throw new Error('Payment not found');
  
  payments[index] = {
    ...payments[index],
    ...data,
    updated_at: new Date().toISOString(),
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payments));
  return payments[index];
}

export function deleteLocalPayment(id: string): void {
  const payments = getLocalPayments();
  const filtered = payments.filter(p => p.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

export function resetLocalData(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPayments));
}