# Tasks: Módulo de Pagos MVP

## Fase 1: Setup del Proyecto

### 1.1 Configuración inicial
- [ ] 1.1.1 Crear package.json con dependencies y peerDependencies
- [ ] 1.1.2 Configurar vite.config.ts para library mode (ES + UMD)
- [ ] 1.1.3 Crear tsconfig.json (strict mode)
- [ ] 1.1.4 Configurar tailwind.config.js (copiar de Diseño.md)
- [ ] 1.1.5 Crear .gitignore para el módulo

### 1.2 Estructura de carpetas
- [ ] 1.2.1 Crear src/components/ui/
- [ ] 1.2.2 Crear src/components/payments/
- [ ] 1.2.3 Crear src/lib/
- [ ] 1.2.4 Crear src/types/
- [ ] 1.2.5 Crear src/config/
- [ ] 1.2.6 Crear src/hooks/

---

## Fase 2: Tipos y Config

### 2.1 TypeScript Types
- [ ] 2.1.1 Crear src/types/index.ts con Payment, Category, Recurrence
- [ ] 2.1.2 Crear PaymentFormData type
- [ ] 2.1.3 Crear PaymentsModuleConfig type

### 2.2 Config
- [ ] 2.2.1 Crear src/config/categories.ts (de Diseño.md)
- [ ] 2.2.2 Exportar CATEGORIES constant

---

## Fase 3: Componentes UI Base

### 3.1 Button
- [ ] 3.1.1 Implementar Button.tsx con variantes (primary, secondary, ghost, danger)
- [ ] 3.1.2 Implementar tamaños (sm, md, lg)
- [ ] 3.1.3 Agregar estado loading

### 3.2 Input
- [ ] 3.2.1 Implementar Input.tsx con label, error, icon
- [ ] 3.2.2 Soporte para types (text, number, date)
- [ ] 3.2.3 Estilos de hover/focus/disabled

### 3.3 Checkbox
- [ ] 3.3.1 Implementar Checkbox.tsx minimalista
- [ ] 3.3.2 Soporte para label y disabled

### 3.4 Badges
- [ ] 3.4.1 Crear CategoryBadge.tsx (6 categorías)
- [ ] 3.4.2 Crear DueDateBadge.tsx (lógica de colores por fecha)

---

## Fase 4: Componentes de Pagos

### 4.1 PaymentCard
- [ ] 4.1.1 Implementar diseño de card (de Diseño.md)
- [ ] 4.1.2 Mostrar: nombre, monto, categoría, responsable, fecha, estado paid
- [ ] 4.1.3 Acciones en hover (editar, eliminar)
- [ ] 4.1.4 Toggle de paid

### 4.2 PaymentList
- [ ] 4.2.1 Renderizar lista de PaymentCards
- [ ] 4.2.2 Estado loading
- [ ] 4.2.3 Estado empty
- [ ] 4.2.4 Estado error

### 4.3 PaymentForm
- [ ] 4.3.1 Campos: nombre, monto, categoría, responsable, fecha, notas, icono
- [ ] 4.3.2 Validación con Zod
- [ ] 4.3.3 Estilos de Diseño.md
- [ ] 4.3.4 Modal o inline form

---

## Fase 5: Lógica e Integración

### 5.1 Supabase Client
- [ ] 5.1.1 Crear src/lib/supabase.ts
- [ ] 5.1.2 Función createPaymentsClient(config)

### 5.2 Hooks
- [ ] 5.2.1 Crear src/hooks/usePayments.ts
- [ ] 5.2.2 Queries (list, getById)
- [ ] 5.2.3 Mutations (create, update, delete)
- [ ] 5.2.4 Optimistic updates para toggle

### 5.3 Layout
- [ ] 5.3.1 Crear src/components/Layout.tsx
- [ ] 5.3.2 Header con título y botón "Nuevo Pago"
- [ ] 5.3.3 Responsive container

---

## Fase 6: Entry Point y Exports

### 6.1 Módulo Principal
- [ ] 6.1.1 Crear src/index.tsx
- [ ] 6.1.2 Exportar todos los componentes
- [ ] 6.1.3 Exportar todos los tipos
- [ ] 6.1.4 Exportar hooks

### 6.2 PaymentsModule Component
- [ ] 6.2.1 Crear componente principal que recibe config
- [ ] 6.2.2 Inicializar React Query provider
- [ ] 6.2.3 Renderizar Layout con children

---

## Fase 7: Build y Testing

### 7.1 Build
- [ ] 7.1.1 Testear build con `npm run build`
- [ ] 7.1.2 Verificar archivos output (ES + UMD)
- [ ] 7.1.3 Verificar types (.d.ts)

### 7.2 Testing Setup
- [ ] 7.2.1 Configurar Vitest
- [ ] 7.2.2 Crear primer test (Button component)

---

## Resumen de Tareas

| Fase | Tareas |
|------|--------|
| 1. Setup | 5 |
| 2. Tipos y Config | 3 |
| 3. UI Base | 8 |
| 4. Componentes | 6 |
| 5. Lógica | 4 |
| 6. Exports | 4 |
| 7. Build | 3 |
| **Total** | **33** |

---

## Orden de Implementación Sugerido

1. Setup → Tipos → UI Base → Componentes → Lógica → Exports → Build
2. Las tareas dentro de cada fase son dependientes - seguir orden
3. Las últimas fases (6-7) dependen de las anteriores