// Entry point - Módulo de Pagos y Recordatorios

// Main component
export { PaymentsModule } from './components/Layout';

// Local/Offline mode (uses localStorage, no Supabase needed)
export { PaymentsModuleLocal } from './components/LayoutLocal';
export { useLocalPayments } from './hooks/useLocalPayments';

// Payment components
export { PaymentList } from './components/payments/PaymentList';
export { PaymentForm } from './components/payments/PaymentForm';
export { PaymentCard } from './components/payments/PaymentCard';

// UI components
export { Button } from './components/ui/Button';
export { Input } from './components/ui/Input';
export { Checkbox } from './components/ui/Checkbox';
export { CategoryBadge, DueDateBadge } from './components/ui/Badge';

// Hooks
export { usePayments } from './hooks/usePayments';

// Utils
export { cn } from './lib/utils';

// Config
export { CATEGORIES, RESPONSIBLES, RECURRENCE_OPTIONS } from './config/categories';

// Types
export type {
  Payment,
  PaymentFormData,
  Category,
  Recurrence,
  Reminder,
  CategoryConfig,
  PaymentsModuleConfig,
  ButtonProps,
  InputProps,
  CheckboxProps,
  CategoryBadgeProps,
  DueDateBadgeProps,
} from './types';

// Default export
export { PaymentsModule as default } from './components/Layout';
