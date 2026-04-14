-- ============================================================================
-- MÓDULO DE PAGOS Y RECORDATORIOS - SCHEMA SQL
-- Base de datos: gastos
-- URL: https://mznlfsehuerxkgbqidtt.supabase.co
-- ============================================================================

-- Tabla principal de pagos
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Campos básicos
  name TEXT NOT NULL,
  amount DECIMAL(10,2),
  category TEXT CHECK (category IN (
    'servicios', 'expensas', 'honorarios',
    'impuestos', 'tramites', 'otros'
  )),
  responsible TEXT,
  due_date DATE,
  notes TEXT,
  
  -- Personalización
  icon TEXT DEFAULT '💰',
  color TEXT,
  
  -- Estado
  is_paid BOOLEAN DEFAULT FALSE,
  paid_at TIMESTAMPTZ,
  
  -- Recurrencia
  recurrence TEXT CHECK (recurrence IN (
    'none', 'daily', 'weekly', 'monthly', 'yearly'
  )) DEFAULT 'none',
  parent_payment_id UUID REFERENCES payments(id),
  
  -- Multi-tenant (para múltiples usuarios)
  user_id UUID REFERENCES auth.users(id),
  
  CONSTRAINT valid_amount CHECK (amount >= 0)
);

-- Tabla de recordatorios
CREATE TABLE IF NOT EXISTS payment_reminders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payment_id UUID REFERENCES payments(id) ON DELETE CASCADE,
  reminder_date TIMESTAMPTZ NOT NULL,
  days_before INTEGER NOT NULL,
  is_sent BOOLEAN DEFAULT FALSE,
  sent_at TIMESTAMPTZ,
  channel TEXT CHECK (channel IN ('email', 'push', 'sms'))
);

-- Índices para optimización
CREATE INDEX IF NOT EXISTS idx_payments_due_date ON payments(due_date);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_category ON payments(category);
CREATE INDEX IF NOT EXISTS idx_payments_responsible ON payments(responsible);
CREATE INDEX IF NOT EXISTS idx_payments_is_paid ON payments(is_paid);
CREATE INDEX IF NOT EXISTS idx_reminders_date ON payment_reminders(reminder_date);
CREATE INDEX IF NOT EXISTS idx_reminders_is_sent ON payment_reminders(is_sent);

-- Trigger para updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) - MULTI-TENANT
-- ============================================================================

-- Activar RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_reminders ENABLE ROW LEVEL SECURITY;

-- Políticas para payments
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments"
  ON payments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own payments"
  ON payments FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own payments"
  ON payments FOR DELETE
  USING (auth.uid() = user_id);

-- Políticas para reminders
CREATE POLICY "Users can view own reminders"
  ON payment_reminders FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM payments 
    WHERE payments.id = payment_reminders.payment_id 
    AND payments.user_id = auth.uid()
  ));

CREATE POLICY "Users can insert own reminders"
  ON payment_reminders FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM payments 
    WHERE payments.id = payment_reminders.payment_id 
    AND payments.user_id = auth.uid()
  ));

-- ============================================================================
-- DATOS DE EJEMPLO (opcional - ejecutar solo si querés datos de prueba)
-- ============================================================================

-- Descomentar si querés datos de ejemplo:
/*
INSERT INTO payments (name, amount, category, responsible, due_date, notes, icon, user_id)
VALUES 
  ('Luz (ANDE)', 450000, 'servicios', 'Abraham', CURRENT_DATE + INTERVAL '2 days', 'Factura mensual', '⚡', auth.uid()),
  ('Expensas Edificio', 850000, 'expensas', 'Nora', CURRENT_DATE + INTERVAL '5 days', NULL, '🏢', auth.uid()),
  ('Honorarios Contador', 1200000, 'honorarios', 'Abraham', CURRENT_DATE - INTERVAL '3 days', 'Servicios contables', '💼', auth.uid()),
  ('IVA Mensual', 3500000, 'impuestos', 'Orestes', CURRENT_DATE + INTERVAL '10 days', 'Declaración de IVA', '📋', auth.uid()),
  ('Patente Vehículo', 180000, 'tramites', 'Spirit Mariscal', CURRENT_DATE + INTERVAL '1 day', NULL, '📄', auth.uid()),
  ('Mantenimiento Aire', 320000, 'otros', NULL, CURRENT_DATE + INTERVAL '14 days', 'Limpieza y mantenimiento', '❄️', auth.uid());
*/

-- ============================================================================
-- FUNCIONES AUXILIARES
-- ============================================================================

-- Función para obtener pagos próximos a vencer (próximos 7 días)
CREATE OR REPLACE FUNCTION get_upcoming_payments(p_user_id UUID)
RETURNS TABLE (
  id UUID,
  name TEXT,
  amount DECIMAL,
  category TEXT,
  due_date DATE,
  days_until INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.name,
    p.amount,
    p.category,
    p.due_date,
    (p.due_date - CURRENT_DATE)::INTEGER as days_until
  FROM payments p
  WHERE p.user_id = p_user_id
    AND p.is_paid = FALSE
    AND p.due_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
  ORDER BY p.due_date ASC;
END;
$$ LANGUAGE plpgsql;

-- Función para obtener estadísticas de pagos
CREATE OR REPLACE FUNCTION get_payment_stats(p_user_id UUID)
RETURNS TABLE (
  total_pending INTEGER,
  total_paid INTEGER,
  amount_pending DECIMAL,
  amount_paid DECIMAL
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) FILTER (WHERE is_paid = FALSE)::INTEGER as total_pending,
    COUNT(*) FILTER (WHERE is_paid = TRUE)::INTEGER as total_paid,
    COALESCE(SUM(amount) FILTER (WHERE is_paid = FALSE), 0) as amount_pending,
    COALESCE(SUM(amount) FILTER (WHERE is_paid = TRUE), 0) as amount_paid
  FROM payments
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================================================