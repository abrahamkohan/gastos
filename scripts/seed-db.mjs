import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mznlfsehuerxkgbqidtt.supabase.co';
const supabaseKey = 'sb_publishable_l5JwVlNl3DdBUlashEOFAw_x0IqAIyi';

const supabase = createClient(supabaseUrl, supabaseKey);

const testPayments = [
  {
    name: 'Luz (ANDE)',
    amount: 450000,
    category: 'servicios',
    responsible: 'Abraham',
    due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: 'Factura mensual de electricidad',
    icon: '⚡',
    is_paid: false,
  },
  {
    name: 'Expensas Edificio Central',
    amount: 850000,
    category: 'expensas',
    responsible: 'Nora',
    due_date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: null,
    icon: '🏢',
    is_paid: false,
  },
  {
    name: 'Honorarios Contador',
    amount: 1200000,
    category: 'honorarios',
    responsible: 'Abraham',
    due_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: 'Servicios contables mensuales',
    icon: '💼',
    is_paid: true,
    paid_at: new Date().toISOString(),
  },
  {
    name: 'IVA Mensual',
    amount: 3500000,
    category: 'impuestos',
    responsible: 'Orestes',
    due_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: 'Declaración de IVA',
    icon: '📋',
    is_paid: false,
  },
  {
    name: 'Patente Vehículo',
    amount: 180000,
    category: 'tramites',
    responsible: 'Spirit Mariscal',
    due_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: null,
    icon: '📄',
    is_paid: false,
  },
  {
    name: 'Mantenimiento Aire Acondicionado',
    amount: 320000,
    category: 'otros',
    responsible: null,
    due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: 'Limpieza y mantenimiento',
    icon: '❄️',
    is_paid: false,
  },
];

async function seedDatabase() {
  console.log('🌱 Creando datos de prueba...\n');

  try {
    // Usar un UUID fijo para testing
    const testUserId = '00000000-0000-0000-0000-000000000001';

    for (const payment of testPayments) {
      const { data, error } = await supabase
        .from('payments')
        .insert([{ ...payment, user_id: testUserId }])
        .select()
        .single();

      if (error) {
        console.error(`❌ Error creando "${payment.name}":`, error.message);
      } else {
        console.log(`✅ Creado: ${data.name} ($${data.amount.toLocaleString('es-PY')})`);
      }
    }

    console.log('\n🎉 Datos de prueba creados!');
    console.log('📊 Verificando...\n');

    // Verificar
    const { count } = await supabase
      .from('payments')
      .select('*', { count: 'exact', head: true });

    console.log(`Total de pagos en la base de datos: ${count}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

seedDatabase();