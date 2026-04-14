-- ============================================================================
-- DATOS DE PRUEBA - Módulo de Pagos
-- Ejecutar en: https://mznlfsehuerxkgbqidtt.supabase.co/project/_/sql
-- ============================================================================

-- Desactivar RLS temporalmente para insertar datos
ALTER TABLE payments DISABLE ROW LEVEL SECURITY;

-- Insertar pagos de prueba
INSERT INTO payments (name, amount, category, responsible, due_date, notes, icon, is_paid, paid_at, user_id) VALUES
  ('Luz (ANDE)', 450000, 'servicios', 'Abraham', CURRENT_DATE + INTERVAL '2 days', 'Factura mensual de electricidad', '⚡', false, null, '00000000-0000-0000-0000-000000000001'),
  ('Expensas Edificio Central', 850000, 'expensas', 'Nora', CURRENT_DATE + INTERVAL '5 days', null, '🏢', false, null, '00000000-0000-0000-0000-000000000001'),
  ('Honorarios Contador', 1200000, 'honorarios', 'Abraham', CURRENT_DATE - INTERVAL '3 days', 'Servicios contables mensuales', '💼', true, NOW(), '00000000-0000-0000-0000-000000000001'),
  ('IVA Mensual', 3500000, 'impuestos', 'Orestes', CURRENT_DATE + INTERVAL '10 days', 'Declaración de IVA', '📋', false, null, '00000000-0000-0000-0000-000000000001'),
  ('Patente Vehículo', 180000, 'tramites', 'Spirit Mariscal', CURRENT_DATE + INTERVAL '1 day', null, '📄', false, null, '00000000-0000-0000-0000-000000000001'),
  ('Mantenimiento Aire Acondicionado', 320000, 'otros', null, CURRENT_DATE + INTERVAL '14 days', 'Limpieza y mantenimiento', '❄️', false, null, '00000000-0000-0000-0000-000000000001');

-- Reactivar RLS
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Verificar inserción
SELECT id, name, amount, category, is_paid, due_date FROM payments ORDER BY created_at DESC;