# 💰 Módulo de Pagos y Recordatorios

Módulo React 19 para gestionar pagos y recordatorios con Supabase. Funciona standalone o integrado en cualquier proyecto React.

## Stack

- React 19
- TypeScript
- Tailwind CSS 4
- Supabase
- TanStack Query (React Query)
- React Hook Form + Zod
- date-fns

## ⚡ Configuración Rápida (Ya lista)

Tu base de datos ya está configurada:

```
Base de datos: gastos
URL: https://mznlfsehuerxkgbqidtt.supabase.co
```

### Paso 1: Configurar Supabase (1 minuto)

1. Andá a: https://mznlfsehuerxkgbqidtt.supabase.co/project/_/sql
2. Copiá el contenido de `supabase/schema.sql`
3. Pegalo en el SQL Editor
4. Hacé clic en **Run**

### Paso 2: Ejecutar el módulo

```bash
npm install
npm run demo
```

Abrir: http://localhost:5173

## Uso en tu proyecto

### Variables de entorno (ya configuradas en .env.local)

```env
VITE_SUPABASE_URL=https://mznlfsehuerxkgbqidtt.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_l5JwVlNl3DdBUlashEOFAw_x0IqAIyi
```

### Ejemplo de uso

```tsx
import { PaymentsModule } from './payments-module';

function App() {
  return (
    <PaymentsModule
      supabaseUrl="https://mznlfsehuerxkgbqidtt.supabase.co"
      supabaseAnonKey="sb_publishable_l5JwVlNl3DdBUlashEOFAw_x0IqAIyi"
      userId="uuid-del-usuario"
    />
  );
}
```

## Demo Visual

Para ver el diseño sin conexión a Supabase:

```bash
open demo.html
```

## Configuración de Supabase (Detallada)

### Schema Completo

El archivo `supabase/schema.sql` incluye:

- ✅ Tabla `payments` (campos completos)
- ✅ Tabla `payment_reminders`
- ✅ Índices para optimización
- ✅ Row Level Security (RLS)
- ✅ Triggers automáticos
- ✅ Funciones auxiliares

### Estructura de payments

```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,           -- Nombre del pago
  amount DECIMAL(10,2),         -- Monto
  category TEXT,                -- Categoría (6 opciones)
  responsible TEXT,             -- Responsable
  due_date DATE,                -- Fecha de vencimiento
  notes TEXT,                   -- Notas
  icon TEXT DEFAULT '💰',       -- Emoji/icono
  color TEXT,                   -- Color personalizado
  is_paid BOOLEAN DEFAULT FALSE,-- Estado pagado
  paid_at TIMESTAMPTZ,          -- Fecha de pago
  recurrence TEXT DEFAULT 'none', -- Recurrencia
  user_id UUID REFERENCES auth.users(id) -- Usuario
);
```

### Seguridad (RLS)

- Cada usuario solo ve/edita sus propios pagos
- Las políticas están activadas por defecto
- Multi-tenant listo

## Features

- ✅ CRUD completo de pagos
- ✅ 6 categorías con colores distintivos
- ✅ Marcado rápido pagado/pendiente (optimistic updates)
- ✅ Alertas visuales por fecha de vencimiento
  - 🔴 Vencido (rojo)
  - 🟠 Próximo ≤3 días (naranja)
  - 🟡 Esta semana ≤7 días (amarillo)
  - ⚪ Normal (gris)
  - 🟢 Pagado (verde)
- ✅ Responsables
- ✅ Iconos/emojis personalizables
- ✅ Responsive design
- ✅ Diseño minimalista (Notion/Vercel/Linear style)

## Scripts

```bash
npm run dev        # Development mode
npm run demo       # Demo con datos de prueba
npm run build      # Production build (ES + UMD)
npm run build:demo # Build de demo estático
npm run typecheck  # Verificar TypeScript
npm run test       # Ejecutar tests
```

## Componentes Exportados

```tsx
// Componente principal
export { PaymentsModule };

// Componentes de pagos
export { PaymentList, PaymentForm, PaymentCard };

// UI base
export { Button, Input, Checkbox };
export { CategoryBadge, DueDateBadge };

// Hooks
export { usePayments };

// Config
export { CATEGORIES, RESPONSIBLES };

// Tipos
export type { 
  Payment, 
  PaymentFormData, 
  PaymentsModuleConfig,
  Category,
  ButtonProps,
  InputProps 
};
```

## Categorías

| Categoría | Icono | Color | Badge |
|-----------|-------|-------|-------|
| Servicios | ⚡ | Azul | `bg-blue-50 text-blue-700` |
| Expensas | 🏢 | Verde | `bg-green-50 text-green-700` |
| Honorarios | 💼 | Naranja | `bg-orange-50 text-orange-700` |
| Impuestos | 📋 | Púrpura | `bg-purple-50 text-purple-700` |
| Trámites | 📄 | Amarillo | `bg-yellow-50 text-yellow-700` |
| Otros | 📌 | Gris | `bg-gray-100 text-gray-700` |

## Diseño

El diseño sigue los principios de **Diseño.md**:

- **Espacios generosos** - padding y gap amplios
- **Jerarquía sutil** - sin negritas excesivas
- **Colores funcionales** - cada color tiene propósito
- **Interacciones delicadas** - transiciones de 200ms
- **Tipografía clara** - Inter font, buen contraste
- **Bordes consistentes** - 1px, gray-200
- **Sombras mínimas** - solo en hover de cards

## Estructura del Proyecto

```
src/
├── components/
│   ├── Layout.tsx          # Componente principal
│   ├── ui/                 # Componentes base
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Checkbox.tsx
│   │   └── Badge.tsx
│   └── payments/           # Componentes de pagos
│       ├── PaymentCard.tsx
│       ├── PaymentList.tsx
│       └── PaymentForm.tsx
├── hooks/
│   └── usePayments.ts      # Lógica con React Query
├── lib/
│   ├── supabase.ts         # Cliente Supabase
│   └── utils.ts            # Helpers (cn, etc.)
├── types/
│   └── index.ts            # Todos los tipos
├── config/
│   └── categories.ts       # Config de categorías
└── index.tsx               # Entry point
```

## Integración como Submodule

```bash
# En tu proyecto
git submodule add https://github.com/tu-usuario/payments-module.git src/payments-module
cd src/payments-module
npm install
```

```tsx
// En tu App.tsx
import { PaymentsModule } from './payments-module';

<PaymentsModule
  supabaseUrl="https://mznlfsehuerxkgbqidtt.supabase.co"
  supabaseAnonKey="sb_publishable_l5JwVlNl3DdBUlashEOFAw_x0IqAIyi"
  userId={currentUser.id}
  onPaymentChange={(payment) => console.log('Updated:', payment)}
/>
```

## Build

Genera dos formatos:
- **ES Module**: `dist/payments-module.es.js` (para import moderno)
- **UMD**: `dist/payments-module.umd.js` (para browsers)
- **Types**: `dist/index.d.ts` (tipos TypeScript)

```bash
npm run build
```

## License

MIT - Abraham Kohan