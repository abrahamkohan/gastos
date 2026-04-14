import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mznlfsehuerxkgbqidtt.supabase.co';
const supabaseKey = 'sb_publishable_l5JwVlNl3DdBUlashEOFAw_x0IqAIyi';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDatabase() {
  console.log('🔍 Verificando base de datos...\n');

  try {
    // Intentar hacer un SELECT a payments para ver si existe
    const { data: testData, error: testError } = await supabase
      .from('payments')
      .select('count', { count: 'exact', head: true });

    if (testError) {
      if (testError.message.includes('does not exist') || testError.code === '42P01') {
        console.log('❌ La tabla PAYMENTS no existe');
        console.log('💡 Tenés que ejecutar el schema.sql en Supabase primero');
        console.log('   URL: https://mznlfsehuerxkgbqidtt.supabase.co/project/_/sql\n');
        console.log('📄 O ejecutá este SQL:');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log(`CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  amount DECIMAL(10,2),
  category TEXT,
  responsible TEXT,
  due_date DATE,
  notes TEXT,
  icon TEXT DEFAULT '💰',
  color TEXT,
  is_paid BOOLEAN DEFAULT FALSE,
  paid_at TIMESTAMPTZ,
  recurrence TEXT DEFAULT 'none',
  user_id UUID REFERENCES auth.users(id)
);`);
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
        return;
      } else {
        console.error('❌ Error:', testError.message);
        return;
      }
    }

    console.log('✅ Tabla PAYMENTS existe\n');

    // Contar registros
    const { count, error: countError } = await supabase
      .from('payments')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.error('❌ Error al contar registros:', countError.message);
      return;
    }

    console.log(`📊 Total de pagos: ${count || 0}\n`);

    if (count && count > 0) {
      // Mostrar algunos registros
      const { data: payments, error: paymentsError } = await supabase
        .from('payments')
        .select('*')
        .limit(5);

      if (paymentsError) {
        console.error('❌ Error al obtener pagos:', paymentsError.message);
        return;
      }

      console.log('📝 Últimos pagos:');
      console.log('==================');
      payments.forEach((payment, i) => {
        console.log(`${i + 1}. ${payment.name}`);
        console.log(`   💰 $${payment.amount?.toLocaleString('es-PY') || 'N/A'}`);
        console.log(`   🏷️  ${payment.category}`);
        console.log(`   📅 ${payment.due_date || 'Sin fecha'}`);
        console.log(`   ✅ ${payment.is_paid ? 'Pagado' : 'Pendiente'}`);
        console.log('');
      });
    } else {
      console.log('💡 No hay pagos creados todavía');
      console.log('   El módulo está listo para usar!');
    }

    // Verificar RLS
    const { data: rls, error: rlsError } = await supabase
      .from('pg_policies')
      .select('policyname')
      .eq('tablename', 'payments');

    if (!rlsError && rls) {
      console.log(`🔒 Políticas RLS activas: ${rls.length}`);
      rls.forEach(p => console.log(`   - ${p.policyname}`));
    }

  } catch (error) {
    console.error('❌ Error inesperado:', error.message);
  }
}

checkDatabase();