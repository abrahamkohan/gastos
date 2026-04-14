# Integración con Supabase - Configurado ✅

## Credenciales

```
Base de datos: gastos
URL: https://mznlfsehuerxkgbqidtt.supabase.co
Password: zcDRmKk7BwU%RzHsi6R%
Anon Key: sb_publishable_l5JwVlNl3DdBUlashEOFAw_x0IqAIyi
```

## Configuración automática

1. **Variables de entorno** → `.env.local` ✅
2. **Schema SQL** → `supabase/schema.sql` ✅
3. **Documentación** → `README.md` actualizado ✅

## Para activar la base de datos

Solo tenés que ejecutar el SQL en Supabase:

```bash
# Ir a:
open https://mznlfsehuerxkgbqidtt.supabase.co/project/_/sql
```

Y pegar el contenido de `supabase/schema.sql`, luego clic en **Run**.

## Uso del módulo

```tsx
import { PaymentsModule } from './payments-module';

// Con credenciales hardcodeadas (para pruebas)
<PaymentsModule
  supabaseUrl="https://mznlfsehuerxkgbqidtt.supabase.co"
  supabaseAnonKey="sb_publishable_l5JwVlNl3DdBUlashEOFAw_x0IqAIyi"
  userId="test-user-id"
/>
```

O usando variables de entorno:

```tsx
<PaymentsModule
  supabaseUrl={import.meta.env.VITE_SUPABASE_URL}
  supabaseAnonKey={import.meta.env.VITE_SUPABASE_ANON_KEY}
  userId={currentUser.id}
/>
```