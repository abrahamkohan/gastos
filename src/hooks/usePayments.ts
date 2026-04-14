import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SupabaseClient } from '@supabase/supabase-js';
import { Payment, PaymentFormData } from '../types';

const PAYMENTS_QUERY_KEY = 'payments';

export function usePayments(supabase: SupabaseClient, userId: string) {
  const queryClient = useQueryClient();

  // Fetch payments
  const { data: payments = [], isLoading, error } = useQuery({
    queryKey: [PAYMENTS_QUERY_KEY, userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('payments')
        .select('*')
        .eq('user_id', userId)
        .order('due_date', { ascending: true });

      if (error) throw error;
      return (data || []) as Payment[];
    },
    enabled: !!userId,
  });

  // Create payment
  const createPayment = useMutation({
    mutationFn: async (formData: PaymentFormData) => {
      const { data, error } = await supabase
        .from('payments')
        .insert([
          {
            ...formData,
            user_id: userId,
            is_paid: false,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data as Payment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PAYMENTS_QUERY_KEY, userId] });
    },
  });

  // Update payment
  const updatePayment = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Payment> }) => {
      const { data: updated, error } = await supabase
        .from('payments')
        .update(data)
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return updated as Payment;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PAYMENTS_QUERY_KEY, userId] });
    },
  });

  // Delete payment
  const deletePayment = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('payments')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PAYMENTS_QUERY_KEY, userId] });
    },
  });

  // Toggle paid status
  const togglePaid = useMutation({
    mutationFn: async (payment: Payment) => {
      const newStatus = !payment.is_paid;
      const { data, error } = await supabase
        .from('payments')
        .update({
          is_paid: newStatus,
          paid_at: newStatus ? new Date().toISOString() : null,
        })
        .eq('id', payment.id)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return data as Payment;
    },
    onMutate: async (payment) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: [PAYMENTS_QUERY_KEY, userId] });
      const previousPayments = queryClient.getQueryData<Payment[]>([PAYMENTS_QUERY_KEY, userId]);

      queryClient.setQueryData([PAYMENTS_QUERY_KEY, userId], (old: Payment[] | undefined) => {
        if (!old) return [];
        return old.map((p) =>
          p.id === payment.id
            ? { ...p, is_paid: !p.is_paid, paid_at: !p.is_paid ? new Date().toISOString() : null }
            : p
        );
      });

      return { previousPayments };
    },
    onError: (_err, _payment, context) => {
      if (context?.previousPayments) {
        queryClient.setQueryData([PAYMENTS_QUERY_KEY, userId], context.previousPayments);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [PAYMENTS_QUERY_KEY, userId] });
    },
  });

  return {
    payments,
    isLoading,
    error,
    createPayment: createPayment.mutateAsync,
    updatePayment: updatePayment.mutateAsync,
    deletePayment: deletePayment.mutateAsync,
    togglePaid: togglePaid.mutateAsync,
    isCreating: createPayment.isPending,
    isUpdating: updatePayment.isPending,
    isDeleting: deletePayment.isPending,
    isToggling: togglePaid.isPending,
  };
}
