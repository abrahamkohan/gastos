# 🎨 Sistema de Diseño Minimalista - Módulo Pagos

Sistema de diseño completo inspirado en Notion, Vercel y Linear para el módulo de Pagos y Recordatorios.

## 🎯 Filosofía de Diseño

**Principios clave:**

- **Espacios generosos** - El aire respira
- **Jerarquía sutil** - Sin gritos, con susurros
- **Colores funcionales** - Cada color tiene un propósito
- **Interacciones delicadas** - Transiciones de 200-300ms
- **Tipografía clara** - Legibilidad > Personalidad

---

## 📐 Tailwind CSS 4 - Configuración

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Grises neutros (base)
        gray: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        
        // Colores de categorías (suaves pero distintivos)
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
        },
        orange: {
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        purple: {
          50: '#faf5ff',
          100: '#f3e8ff',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7e22ce',
        },
        yellow: {
          50: '#fefce8',
          100: '#fef9c3',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
        },
        
        // Estados (alertas, success, etc)
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
      },
      
      fontFamily: {
        sans: [
          'Inter var',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        mono: [
          'JetBrains Mono',
          'ui-monospace',
          'monospace',
        ],
      },
      
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
      },
      
      boxShadow: {
        'sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'card': '0 0 0 1px rgb(0 0 0 / 0.05), 0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'card-hover': '0 0 0 1px rgb(0 0 0 / 0.05), 0 4px 8px 0 rgb(0 0 0 / 0.08)',
      },
      
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1rem',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
```

---

## 🎨 Paleta de Colores - Guía de Uso

### Fondo

```jsx
// Fondo principal
bg-gray-50

// Cards y contenedores
bg-white

// Hover states en cards
hover:bg-gray-50

// Disabled states
bg-gray-100
```

### Texto

```jsx
// Texto principal
text-gray-900

// Texto secundario (descripciones, labels)
text-gray-600

// Texto terciario (hints, timestamps)
text-gray-400

// Texto disabled
text-gray-300
```

### Bordes

```jsx
// Bordes principales
border-gray-200

// Bordes hover
hover:border-gray-300

// Bordes focus
focus:border-blue-500 focus:ring-2 focus:ring-blue-100
```

### Categorías (badges)

```jsx
// Servicios - Azul
bg-blue-50 text-blue-700 border-blue-200

// Expensas - Verde
bg-green-50 text-green-700 border-green-200

// Honorarios - Naranja
bg-orange-50 text-orange-700 border-orange-200

// Impuestos - Púrpura
bg-purple-50 text-purple-700 border-purple-200

// Trámites - Amarillo
bg-yellow-50 text-yellow-700 border-yellow-200

// Otros - Gris
bg-gray-100 text-gray-700 border-gray-300
```

### Estados (alerts, fechas)

```jsx
// Vencido - Rojo
bg-red-50 text-red-700 border-red-200

// Advertencia - Naranja
bg-orange-50 text-orange-700 border-orange-200

// Próximo - Amarillo
bg-yellow-50 text-yellow-700 border-yellow-200

// Normal - Gris
bg-gray-100 text-gray-600 border-gray-200

// Success - Verde
bg-green-50 text-green-700 border-green-200
```

---

## 📦 Componentes Base

### 1. Card (contenedor principal)

```tsx
// PaymentCard.tsx
interface PaymentCardProps {
  payment: Payment;
  onEdit?: () => void;
  onDelete?: () => void;
  onTogglePaid?: () => void;
}

export function PaymentCard({ 
  payment, 
  onEdit, 
  onDelete, 
  onTogglePaid 
}: PaymentCardProps) {
  return (
    <div className="
      group
      bg-white 
      rounded-lg 
      border border-gray-200
      p-4
      transition-all duration-200
      hover:border-gray-300
      hover:shadow-card-hover
    ">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        {/* Left: Icon + Info */}
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className="text-2xl flex-shrink-0">
            {payment.icon}
          </span>
          
          <div className="flex-1 min-w-0">
            <h3 className="
              font-medium 
              text-gray-900 
              text-base 
              truncate
            ">
              {payment.name}
            </h3>
            
            {payment.responsible && (
              <p className="
                text-sm 
                text-gray-600 
                mt-0.5
              ">
                {payment.responsible}
              </p>
            )}
          </div>
        </div>
        
        {/* Right: Amount + Actions */}
        <div className="flex items-start gap-3">
          {payment.amount && (
            <div className="text-right">
              <p className="
                font-semibold 
                text-lg 
                text-gray-900
              ">
                ${payment.amount.toLocaleString('es-PY')}
              </p>
            </div>
          )}
          
          {/* Actions (solo visible en hover) */}
          <div className="
            opacity-0 
            group-hover:opacity-100 
            transition-opacity
            flex items-center gap-1
          ">
            <button
              onClick={onEdit}
              className="
                p-1.5 
                rounded 
                text-gray-400 
                hover:text-gray-600 
                hover:bg-gray-100
                transition-colors
              "
            >
              <PencilIcon className="w-4 h-4" />
            </button>
            
            <button
              onClick={onDelete}
              className="
                p-1.5 
                rounded 
                text-gray-400 
                hover:text-red-600 
                hover:bg-red-50
                transition-colors
              "
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Footer: Category + Date + Checkbox */}
      <div className="
        flex items-center justify-between 
        mt-3 pt-3 
        border-t border-gray-100
      ">
        <div className="flex items-center gap-2">
          <CategoryBadge category={payment.category} />
          {payment.due_date && (
            <DueDateBadge date={payment.due_date} isPaid={payment.is_paid} />
          )}
        </div>
        
        <Checkbox
          checked={payment.is_paid}
          onChange={onTogglePaid}
          label={payment.is_paid ? 'Pagado' : 'Pendiente'}
        />
      </div>
      
      {/* Notes (si existen) */}
      {payment.notes && (
        <div className="
          mt-3 
          p-2 
          bg-gray-50 
          rounded 
          text-sm 
          text-gray-600
        ">
          {payment.notes}
        </div>
      )}
    </div>
  );
}
```

### 2. CategoryBadge

```tsx
// CategoryBadge.tsx
import { CATEGORIES } from '@/config/categories';

interface CategoryBadgeProps {
  category: Category;
  size?: 'sm' | 'md';
}

export function CategoryBadge({ category, size = 'sm' }: CategoryBadgeProps) {
  const config = CATEGORIES[category];
  
  return (
    <span className={`
      inline-flex items-center gap-1.5
      rounded-md
      border
      font-medium
      transition-colors
      ${size === 'sm' ? 'px-2 py-1 text-xs' : 'px-2.5 py-1.5 text-sm'}
      ${config.bgClass}
      ${config.textClass}
      ${config.borderClass}
    `}>
      <span>{config.icon}</span>
      <span>{config.label}</span>
    </span>
  );
}
```

### 3. DueDateBadge (con lógica de colores)

```tsx
// DueDateBadge.tsx
import { differenceInDays, format, isPast } from 'date-fns';
import { es } from 'date-fns/locale';

interface DueDateBadgeProps {
  date: string;
  isPaid?: boolean;
}

export function DueDateBadge({ date, isPaid }: DueDateBadgeProps) {
  const dueDate = new Date(date);
  const today = new Date();
  const daysUntil = differenceInDays(dueDate, today);
  const isOverdue = isPast(dueDate) && !isPaid;
  
  // Determinar estilo según proximidad
  const getStyles = () => {
    if (isPaid) {
      return {
        bg: 'bg-green-50',
        text: 'text-green-700',
        border: 'border-green-200',
        icon: '✓',
      };
    }
    
    if (isOverdue) {
      return {
        bg: 'bg-red-50',
        text: 'text-red-700',
        border: 'border-red-200',
        icon: '!',
      };
    }
    
    if (daysUntil <= 3) {
      return {
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        border: 'border-orange-200',
        icon: '⚠',
      };
    }
    
    if (daysUntil <= 7) {
      return {
        bg: 'bg-yellow-50',
        text: 'text-yellow-700',
        border: 'border-yellow-200',
        icon: '◷',
      };
    }
    
    return {
      bg: 'bg-gray-100',
      text: 'text-gray-600',
      border: 'border-gray-200',
      icon: '◷',
    };
  };
  
  const styles = getStyles();
  
  return (
    <span className={`
      inline-flex items-center gap-1.5
      px-2 py-1
      rounded-md
      border
      text-xs font-medium
      ${styles.bg}
      ${styles.text}
      ${styles.border}
    `}>
      <span>{styles.icon}</span>
      <span>
        {format(dueDate, 'dd/MM/yyyy', { locale: es })}
      </span>
      {!isPaid && daysUntil >= 0 && (
        <span className="opacity-75">
          ({daysUntil === 0 ? 'hoy' : `${daysUntil}d`})
        </span>
      )}
    </span>
  );
}
```

### 4. Button (sistema completo)

```tsx
// Button.tsx
import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  `
    inline-flex items-center justify-center gap-2
    font-medium
    transition-colors
    focus-visible:outline-none 
    focus-visible:ring-2 
    focus-visible:ring-offset-2
    disabled:pointer-events-none 
    disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        primary: `
          bg-gray-900 text-white
          hover:bg-gray-800
          focus-visible:ring-gray-900
        `,
        secondary: `
          bg-white text-gray-900
          border border-gray-200
          hover:bg-gray-50
          hover:border-gray-300
          focus-visible:ring-gray-500
        `,
        ghost: `
          text-gray-600
          hover:bg-gray-100
          hover:text-gray-900
          focus-visible:ring-gray-500
        `,
        danger: `
          bg-red-600 text-white
          hover:bg-red-700
          focus-visible:ring-red-600
        `,
      },
      size: {
        sm: 'h-8 px-3 text-xs rounded-md',
        md: 'h-9 px-4 text-sm rounded-md',
        lg: 'h-10 px-5 text-base rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  isLoading,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
```

### 5. Input (campo de texto)

```tsx
// Input.tsx
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export function Input({ 
  label, 
  error, 
  icon,
  className,
  ...props 
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="
          block 
          text-sm 
          font-medium 
          text-gray-700 
          mb-1.5
        ">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="
            absolute left-3 top-1/2 -translate-y-1/2
            text-gray-400
          ">
            {icon}
          </div>
        )}
        
        <input
          className={`
            w-full
            h-9
            px-3
            ${icon ? 'pl-10' : ''}
            text-sm
            bg-white
            border border-gray-200
            rounded-md
            transition-colors
            placeholder:text-gray-400
            hover:border-gray-300
            focus:outline-none
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-100
            disabled:bg-gray-50
            disabled:text-gray-500
            disabled:cursor-not-allowed
            ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-100' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="
          mt-1.5 
          text-xs 
          text-red-600
        ">
          {error}
        </p>
      )}
    </div>
  );
}
```

### 6. Checkbox (minimalista)

```tsx
// Checkbox.tsx
interface CheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function Checkbox({ 
  checked, 
  onChange, 
  label,
  disabled 
}: CheckboxProps) {
  return (
    <label className="
      inline-flex items-center gap-2
      cursor-pointer
      select-none
      group
    ">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className="sr-only"
      />
      
      <div className={`
        w-4 h-4
        rounded
        border-2
        transition-all
        ${checked 
          ? 'bg-gray-900 border-gray-900' 
          : 'bg-white border-gray-300 group-hover:border-gray-400'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}>
        {checked && (
          <svg
            className="w-full h-full text-white"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z"
              fill="currentColor"
            />
          </svg>
        )}
      </div>
      
      {label && (
        <span className="text-sm text-gray-700">
          {label}
        </span>
      )}
    </label>
  );
}
```

---

## 📊 Configuración de Categorías

```typescript
// config/categories.ts
export const CATEGORIES = {
  servicios: {
    label: 'Servicios',
    icon: '⚡',
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-700',
    borderClass: 'border-blue-200',
    hoverClass: 'hover:bg-blue-100',
  },
  expensas: {
    label: 'Expensas',
    icon: '🏢',
    bgClass: 'bg-green-50',
    textClass: 'text-green-700',
    borderClass: 'border-green-200',
    hoverClass: 'hover:bg-green-100',
  },
  honorarios: {
    label: 'Honorarios',
    icon: '💼',
    bgClass: 'bg-orange-50',
    textClass: 'text-orange-700',
    borderClass: 'border-orange-200',
    hoverClass: 'hover:bg-orange-100',
  },
  impuestos: {
    label: 'Impuestos',
    icon: '📋',
    bgClass: 'bg-purple-50',
    textClass: 'text-purple-700',
    borderClass: 'border-purple-200',
    hoverClass: 'hover:bg-purple-100',
  },
  tramites: {
    label: 'Trámites',
    icon: '📄',
    bgClass: 'bg-yellow-50',
    textClass: 'text-yellow-700',
    borderClass: 'border-yellow-200',
    hoverClass: 'hover:bg-yellow-100',
  },
  otros: {
    label: 'Otros',
    icon: '📌',
    bgClass: 'bg-gray-100',
    textClass: 'text-gray-700',
    borderClass: 'border-gray-300',
    hoverClass: 'hover:bg-gray-200',
  },
} as const;
```

---

## 🏗️ Layout Principal

```tsx
// Layout.tsx
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="
        sticky top-0 z-10
        bg-white/80 
        backdrop-blur-md
        border-b border-gray-200
      ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <h1 className="text-lg font-semibold text-gray-900">
              💰 Pagos y Recordatorios
            </h1>
            
            <Button size="sm">
              Nuevo Pago
            </Button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
```

---

## ✨ Reglas de Oro

### Espaciado

- **Dentro de cards:** `p-4` (16px)
- **Entre elementos:** `gap-3` o `gap-4` (12-16px)
- **Entre secciones:** `mt-6` o `mt-8` (24-32px)
- **Padding containers:** `px-4 sm:px-6 lg:px-8` (responsive)

### Bordes

- **Thickness:** Siempre `border` (1px), nunca más
- **Color:** `border-gray-200` por defecto
- **Radius:** `rounded-md` (6px) o `rounded-lg` (8px)

### Shadows

- **Cards reposo:** `shadow-card` (muy sutil)
- **Cards hover:** `shadow-card-hover` (un poco más)
- **Nunca:** sombras grandes o dramáticas

### Transiciones

- **Duración:** `duration-200` o `duration-300`
- **Ease:** Por defecto está bien
- **Qué animar:** `colors`, `shadow`, `border-color`, `opacity`

### Tipografía

- **Títulos:** `font-semibold` o `font-medium`, nunca `font-bold`
- **Cuerpo:** `font-normal`
- **Tamaños:** `text-sm`, `text-base`, `text-lg` (no saltar mucho)
- **Line height:** Tailwind lo maneja bien por defecto

### Estados hover

- **Backgrounds:** `hover:bg-gray-50`
- **Borders:** `hover:border-gray-300`
- **Shadows:** `hover:shadow-card-hover`
- **Todo junto:** Transición suave de 200ms

---

## 🎭 Estados y Feedback

### Loading State

```tsx
{isLoading ? (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-900" />
  </div>
) : (
  <PaymentsList payments={payments} />
)}
```

### Empty State

```tsx
<div className="text-center py-12">
  <div className="text-4xl mb-3">📭</div>
  <h3 className="text-base font-medium text-gray-900 mb-1">
    No hay pagos pendientes
  </h3>
  <p className="text-sm text-gray-600 mb-4">
    Creá tu primer pago para comenzar
  </p>
  <Button onClick={onCreatePayment}>
    Crear Pago
  </Button>
</div>
```

### Error State

```tsx
<div className="rounded-lg bg-red-50 border border-red-200 p-4">
  <div className="flex gap-3">
    <span className="text-red-600">⚠️</span>
    <div>
      <h3 className="text-sm font-medium text-red-900 mb-1">
        Error al cargar pagos
      </h3>
      <p className="text-sm text-red-700">
        {error.message}
      </p>
      <Button 
        variant="ghost" 
        size="sm" 
        className="mt-2"
        onClick={retry}
      >
        Reintentar
      </Button>
    </div>
  </div>
</div>
```

---

## 🎨 BONUS: Tema Oscuro (opcional)

Si querés agregar dark mode después:

```tsx
// Agregar a tailwind.config.js
darkMode: 'class',

// En tu HTML root
<html className="dark">

// Clases con dark variant
className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
```

---

## 📝 Checklist Visual

Antes de considerar un componente "terminado":

- [ ] ¿Los espacios respiran? (Generoso padding/gap)
- [ ] ¿Los colores son funcionales? (No decorativos)
- [ ] ¿Las transiciones son suaves? (200-300ms)
- [ ] ¿Los hover states son sutiles? (No saltos visuales)
- [ ] ¿La tipografía es clara? (Buen contraste, tamaños apropiados)
- [ ] ¿Los bordes son consistentes? (1px, gray-200)
- [ ] ¿Las sombras son mínimas? (shadow-card máximo)
- [ ] ¿Los estados son claros? (loading, empty, error)
- [ ] ¿Es responsive? (mobile-first)
- [ ] ¿Se ve profesional en screenshot? (test final)

---

**Filosofía final:** Menos es más. Cuando dudes, remové en lugar de agregar.