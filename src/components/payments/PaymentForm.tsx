import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Payment, PaymentFormData, Category } from '../../types';
import { CATEGORIES, RESPONSIBLES } from '../../config/categories';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

const paymentSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  amount: z.number().min(0).nullable(),
  category: z.enum([
    'servicios',
    'expensas',
    'honorarios',
    'impuestos',
    'tramites',
    'otros',
  ]),
  responsible: z.string().nullable(),
  due_date: z.string().nullable(),
  notes: z.string().nullable(),
  icon: z.string(),
  color: z.string().nullable(),
});

type FormData = z.infer<typeof paymentSchema>;

interface PaymentFormProps {
  initialData?: Partial<Payment>;
  onSubmit: (data: PaymentFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      name: initialData?.name || '',
      amount: initialData?.amount ?? null,
      category: initialData?.category || 'otros',
      responsible: initialData?.responsible ?? null,
      due_date: initialData?.due_date ?? null,
      notes: initialData?.notes ?? null,
      icon: initialData?.icon || '💰',
      color: initialData?.color ?? null,
    },
  });

  const handleFormSubmit = (data: FormData) => {
    onSubmit(data as PaymentFormData);
  };

  const categories = Object.entries(CATEGORIES) as [Category, typeof CATEGORIES[string]][];

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <Input
        label="Nombre *"
        {...register('name')}
        error={errors.name?.message}
      />

      <Input
        label="Monto (Gs.)"
        type="number"
        step="0.01"
        {...register('amount', { setValueAs: (v) => (v === '' ? null : parseFloat(v)) })}
        error={errors.amount?.message}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Categoría *
        </label>
        <select
          {...register('category')}
          className="w-full h-9 px-3 text-sm bg-white border border-gray-200 rounded-md transition-colors hover:border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          {categories.map(([key, config]) => (
            <option key={key} value={key}>
              {config.icon} {config.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Responsable
        </label>
        <select
          {...register('responsible')}
          className="w-full h-9 px-3 text-sm bg-white border border-gray-200 rounded-md transition-colors hover:border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">Sin responsable</option>
          {RESPONSIBLES.map((resp) => (
            <option key={resp} value={resp}>
              {resp}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Fecha de vencimiento"
        type="date"
        {...register('due_date')}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Icono
        </label>
        <div className="flex gap-2">
          {['💰', '⚡', '🏢', '💼', '📋', '📄', '📌', '💳', '🏠', '🚗', '💡', '📱'].map(
            (emoji) => (
              <label key={emoji} className="cursor-pointer">
                <input
                  type="radio"
                  {...register('icon')}
                  value={emoji}
                  className="sr-only"
                />
                <span className="text-2xl p-2 rounded-md hover:bg-gray-100 transition-colors inline-block">
                  {emoji}
                </span>
              </label>
            )
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Notas
        </label>
        <textarea
          {...register('notes')}
          rows={3}
          className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-md transition-colors placeholder:text-gray-400 hover:border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 resize-none"
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          isLoading={isSubmitting}
          className="flex-1"
        >
          {initialData?.id ? 'Guardar cambios' : 'Crear pago'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
};
