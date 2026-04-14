import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Payment, PaymentFormData } from '../types';
import { 
  getLocalPayments, 
  saveLocalPayment, 
  updateLocalPayment, 
  deleteLocalPayment 
} from '../lib/localStorage';

const PAYMENTS_QUERY_KEY = 'payments-local';

export function useLocalPayments() {
  const queryClient = useQueryClient();

  // Fetch payments from localStorage
  const { data: payments = [], isLoading, error } = useQuery({
    queryKey: [PAYMENTS_QUERY_KEY],
    queryFn: () => {
      // Simulate network delay for realistic feel
      return new Promise<Payment[]>((resolve) => {
        setTimeout(() => {
          resolve(getLocalPayments());
        }, 300);
      });
    },
    staleTime: 0,
  });

  // Create payment
  const createPayment = useMutation({
    mutationFn: async (formData: PaymentFormData) => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return saveLocalPayment(formData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PAYMENTS_QUERY_KEY] });
    },
  });

  // Update payment
  const updatePayment = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<Payment> }) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return updateLocalPayment(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PAYMENTS_QUERY_KEY] });
    },
  });

  // Delete payment
  const deletePayment = useMutation({
    mutationFn: async (id: string) => {
      await new Promise(resolve => setTimeout(resolve, 300));
      deleteLocalPayment(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PAYMENTS_QUERY_KEY] });
    },
  });

  // Toggle paid status
  const togglePaid = useMutation({
    mutationFn: async (payment: Payment) => {
      await new Promise(resolve => setTimeout(resolve, 200));
      const newStatus = !payment.is_paid;
      return updateLocalPayment(payment.id, {
        is_paid: newStatus,
        paid_at: newStatus ? new Date().toISOString() : null,
      });
    },
    onMutate: async (payment) => {
      // Optimistic update
      await queryClient.cancelQueries({ queryKey: [PAYMENTS_QUERY_KEY] });
      const previousPayments = queryClient.getQueryData<Payment[]>([PAYMENTS_QUERY_KEY]);

      queryClient.setQueryData([PAYMENTS_QUERY_KEY], (old: Payment[] | undefined) => {
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
        queryClient.setQueryData([PAYMENTS_QUERY_KEY], context.previousPayments);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [PAYMENTS_QUERY_KEY] });
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