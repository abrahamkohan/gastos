# Design: Módulo de Pagos MVP

## Arquitectura Técnica

### Enfoque General

El módulo usa una arquitectura de **widget exportable** - un componente React que recibe configuración y retorna UI lista para usar.

```
┌─────────────────────────────────────────────────────┐
│                   PaymentsModule                    │
│  ┌─────────────────────────────────────────────┐   │
│  │  Config (supabaseUrl, anonKey, userId)      │   │
│  └─────────────────────────────────────────────┘   │
│                         │                            │
│                         ▼                            │
│  ┌─────────────────────────────────────────────┐   │
│  │              React Query Provider            │   │
│  └─────────────────────────────────────────────┘   │
│                         │                            │
│          ┌──────────────┼──────────────┐           │
│          ▼              ▼              ▼           │
│    ┌──────────┐   ┌──────────┐   ┌──────────┐    │
│    │  List    │   │  Form    │   │ Dashboard │    │
│    └──────────┘   └──────────┘   └──────────┘    │
└─────────────────────────────────────────────────────┘
```

---

## Decisiones de Diseño

### 1. Modo Standalone vs Integrado

El módulo detecta el modo automáticamente:

```typescript
// Si se provee config de Supabase → modo standalone
// Si NO se provee → modo integrado (usa contexto del padre)
```

### 2. Estado del Servidor

- **React Query** para caching y sincronización
- Optimistic updates para toggle de paid
- invalidación automática tras CRUD

### 3. Estilos

- Tailwind CSS 4 (config del proyecto padre se extiende)
- El módulo NO incluye su propio CSS - usa las clases de tailwind del proyecto padre
- Si el proyecto padre no tiene Tailwind, Warn en console

### 4. Tipos

- Todos los tipos son exportados
- El módulo NO depende de tipos de Supabase - define los propios
- Facilita testing con mocks

---

## Componentes del Módulo

### exports públicos

```typescript
// Entry point (index.tsx)
export default PaymentsModule;  // Componente principal
export PaymentsModule;          // Named export

// Componentes
export { PaymentList };
export { PaymentForm };
export { PaymentCard };

// UI base
export { Button };
export { Input };
export { Checkbox };
export { CategoryBadge };
export { DueDateBadge };

// Hooks
export { usePayments };

// Tipos
export type { Payment, Category, PaymentFormData, PaymentsModuleConfig };
```

### Dependencias del módulo

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.0.0",
    "@supabase/supabase-js": "^2.0.0",
    "date-fns": "^3.0.0",
    "react-hook-form": "^7.0.0",
    "@hookform/resolvers": "^3.0.0",
    "zod": "^3.0.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0"
  },
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "tailwindcss": "^4.0.0"
  }
}
```

---

## Integración como Submodule

### Para proyecto padre (CRM inmobiliario)

```bash
# Agregar como submodule
git submodule add https://github.com/abrahamkohan/payments-module.git src/payments-module

# Usage en el proyecto
import PaymentsModule from './payments-module';

function App() {
  return (
    <PaymentsModule 
      supabaseUrl={import.meta.env.VITE_SUPABASE_URL}
      supabaseAnonKey={import.meta.env.VITE_SUPABASE_ANON_KEY}
      userId={currentUser.id}
    />
  );
}
```

### Build del módulo

```typescript
// vite.config.ts para build como biblioteca
export default defineConfig({
  build: {
    lib: {
      entry: './src/index.tsx',
      name: 'PaymentsModule',
      formats: ['es', 'umd'],
      fileName: (format) => `payments-module.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});
```

---

## Patrones de Código

### Componentes

- Functional components con TypeScript
- Props con tipos explícitos
- No usa React.memo por defecto (solo si hay performance issue)

### Hooks

- Custom hooks para lógica de negocio
- useQuery/useMutation de React Query
- Tipos de retorno explícitos

### Utils

- clsx + tailwind-merge para classes composables
- date-fns para fechas (locale es-PE)

---

## Consideraciones de Performance

1. **Bundle size**: El módulo debe staying under 50KB gzipped
2. **Code splitting**: Los componentes grandes (Dashboard) lazy load
3. **Memoization**: Solo donde hay re-renders costosos

---

## Testing Strategy

- Vitest para tests unitarios
- Componentes testables sin React DOM (testing-library)
- Mocks para Supabase

---

## Acceptance del Design

- [ ] Arquitectura clara para modo standalone e integrado
- [ ] Exports públicos definidos
- [ ] Dependencias resueltas
- [ ] Build config para submodule
- [ ] Patrones de código consistentes
- [ ] Testing strategy definida