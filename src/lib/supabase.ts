import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { PaymentsModuleConfig } from '../types';
import type { Payment } from '../types';

let supabaseClient: SupabaseClient | null = null;

export function createPaymentsClient(config: PaymentsModuleConfig): SupabaseClient {
  if (supabaseClient) {
    return supabaseClient;
  }

  supabaseClient = createClient(config.supabaseUrl, config.supabaseAnonKey);
  return supabaseClient;
}

export function getPaymentsClient(): SupabaseClient | null {
  return supabaseClient;
}

export function resetPaymentsClient(): void {
  supabaseClient = null;
}

export type Tables = {
  payments: Payment;
};
