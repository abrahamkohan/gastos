export type Category =
  | 'servicios'
  | 'expensas'
  | 'honorarios'
  | 'impuestos'
  | 'tramites'
  | 'otros';

export type Recurrence = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Payment {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  amount: number | null;
  category: Category;
  responsible: string | null;
  due_date: string | null;
  notes: string | null;
  icon: string;
  color: string | null;
  is_paid: boolean;
  paid_at: string | null;
  recurrence: Recurrence;
  parent_payment_id: string | null;
  user_id: string;
}

export interface PaymentFormData {
  name: string;
  amount: number | null;
  category: Category;
  responsible: string | null;
  due_date: string | null;
  notes: string | null;
  icon: string;
  color: string | null;
}

export interface PaymentsModuleConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  userId: string;
  theme?: 'light' | 'dark';
  onPaymentChange?: (payment: Payment) => void;
  onPaymentCreate?: (payment: Payment) => void;
  onPaymentDelete?: (paymentId: string) => void;
}

export interface Reminder {
  id: string;
  payment_id: string;
  reminder_date: string;
  days_before: number;
  is_sent: boolean;
  sent_at: string | null;
  channel: 'email' | 'push' | 'sms';
}

export interface CategoryConfig {
  label: string;
  icon: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  hoverClass: string;
}

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md';
}

export interface DueDateBadgeProps {
  date: string;
  isPaid?: boolean;
}