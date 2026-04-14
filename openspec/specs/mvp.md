# Spec: Módulo de Pagos MVP

## Overview

Primera versión funcional del módulo de pagos como submodule exportable. Debe funcionar:
- **Standalone**: Con su propia conexión a Supabase
- **Integrado**: Usando la configuración del proyecto padre

---

## 1. Project Setup

### 1.1 Stack (MUST)

- React 19
- Vite (library mode para submodule)
- TypeScript (strict mode)
- Tailwind CSS 4 (config ya definido en Diseño.md)

### 1.2 Estructura de Archivos (MUST)

```
src/
├── components/
│   ├── ui/              # Componentes base
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Checkbox.tsx
│   │   └── Badge.tsx
│   ├── payments/
│   │   ├── PaymentCard.tsx
│   │   ├── PaymentList.tsx
│   │   └── PaymentForm.tsx
│   └── Layout.tsx
├── lib/
│   ├── supabase.ts      # Cliente configurable
│   └── utils.ts
├── types/
│   └── index.ts         # Todas las definiciones
├── config/
│   └── categories.ts   # Config de categorías
├── hooks/
│   └── usePayments.ts  # Lógica de negocio
├── index.tsx            # Entry point del módulo
└── payments-module.css # Estilos (si needed)
```

### 1.3 Module Export (MUST)

```typescript
// index.tsx - Entry point
export { PaymentsModule } from './components/Layout';
export type { Payment, Category, PaymentFormData } from './types';
export { CategoryBadge, DueDateBadge } from './components/ui/Badge';
```

---

## 2. TypeScript Types

### 2.1 Payment (MUST)

```typescript
interface Payment {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  amount: number | null;
  category: Category;
  responsible: string | null;
  due_date: string | null; // ISO date
  notes: string | null;
  icon: string;
  color: string | null;
  is_paid: boolean;
  paid_at: string | null;
  recurrence: Recurrence;
  parent_payment_id: string | null;
  user_id: string;
}
```

### 2.2 Category (MUST)

```typescript
type Category = 'servicios' | 'expensas' | 'honorarios' | 'impuestos' | 'tramites' | 'otros';
```

### 2.3 Recurrence (MUST)

```typescript
type Recurrence = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';
```

### 2.4 Module Config (MUST)

```typescript
interface PaymentsModuleConfig {
  supabaseUrl: string;
  supabaseAnonKey: string;
  userId: string; // Para RLS
  theme?: 'light' | 'dark';
  onPaymentChange?: (payment: Payment) => void;
}
```

---

## 3. Componentes UI

### 3.1 Button (MUST)

Variantes: `primary`, `secondary`, `ghost`, `danger`
Tamaños: `sm`, `md`, `lg`
Estados: default, hover, disabled, loading

```tsx
<Button variant="primary" size="md">Crear Pago</Button>
```

### 3.2 Input (MUST)

Props: label, error, icon, type (text, number, date)

```tsx
<Input label="Monto" type="number" icon={<DollarIcon />} />
```

### 3.3 Checkbox (MUST)

```tsx
<Checkbox checked={isPaid} onChange={setPaid} label="Pagado" />
```

### 3.4 CategoryBadge (MUST)

Según config de categorías en Diseño.md:
- servicios: azul
- expensas: verde
- honorarios: naranja
- impuestos: púrpura
- trámites: amarillo
- otros: gris

### 3.5 DueDateBadge (MUST)

Lógica de colores:
- **Vencido** (isPast && !isPaid): rojo
- **Próximo** (<=3 días): naranja
- **Esta semana** (<=7 días): amarillo
- **Pagado**: verde
- **Normal**: gris

---

## 4. Funcionalidad

### 4.1 PaymentList (MUST)

- Lista de pagos del usuario (filtrada por user_id)
- Muestra: nombre, monto, categoría, responsable, fecha vencimiento, estado paid
- Toggle de paid (checkbox)
- Hover muestra acciones (editar, eliminar)

### 4.2 PaymentForm (MUST)

Campos:
- Nombre (required, text)
- Monto (optional, number)
- Categoría (required, select)
- Responsable (optional, select)
- Fecha vencimiento (optional, date)
- Notas (optional, textarea)
- Icono (optional, emoji picker)
- Color (optional, color picker)

Validación con Zod.

### 4.3 Supabase Client (MUST)

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

export function createPaymentsClient(config: PaymentsModuleConfig) {
  return createClient(config.supabaseUrl, config.supabaseAnonKey);
}
```

### 4.4 usePayments Hook (MUST)

```typescript
const { payments, loading, error, createPayment, updatePayment, deletePayment } = usePayments(supabase, userId);
```

---

## 5. Module Entry Point

### 5.1 Exports (MUST)

```typescript
// index.tsx
export { PaymentsModule } from './components/Layout';
export { PaymentList } from './components/payments/PaymentList';
export { PaymentForm } from './components/payments/PaymentForm';
export { PaymentCard } from './components/payments/PaymentCard';
export { Button, Input, Checkbox } from './components/ui';
export { CategoryBadge, DueDateBadge } from './components/ui/Badge';
export type { Payment, Category, PaymentFormData, PaymentsModuleConfig } from './types';
```

### 5.2 Peer Dependencies (MUST)

```json
{
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "@supabase/supabase-js": "^2.0.0",
    "date-fns": "^3.0.0"
  }
}
```

---

## 6. Scenarios

### Scenario 1: Usuario ve lista de pagos

**Given** el usuario tiene pagos en la base de datos  
**When** carga el módulo  
**Then** ve una lista con todos sus pagos ordenados por fecha de vencimiento

### Scenario 2: Usuario crea un pago

**Given** el usuario está en el formulario de creación  
**When** completa nombre y categoría y envía el formulario  
**Then** se crea el pago en Supabase y aparece en la lista

### Scenario 3: Usuario marca pago como pagado

**Given** el usuario ve un pago pendiente  
**When** hace click en el checkbox  
**Then** el pago se marca como paid=true y cambia el badge a verde

### Scenario 4: Module funciona standalone

**Given** el módulo se importa en un proyecto nuevo  
**When** se configura con supabaseUrl y supabaseAnonKey  
**Then** funciona independientemente sin depender del proyecto padre

---

## 7. Acceptance Criteria

- [ ] El módulo se puede importar como `import { PaymentsModule } from '@abrahamkohan/payments-module'`
- [ ] Muestra la lista de pagos del usuario autenticado
- [ ] Permite crear un nuevo pago con todos los campos
- [ ] Permite marcar/unmark pagos como pagados
- [ ] Diseño consistente con Diseño.md
- [ ] Funciona configurado con credenciales de Supabase
- [ ] Tipos TypeScript completos y exportados
- [ ] build genera archivo UMD/ESM usable