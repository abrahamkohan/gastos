#!/bin/bash
# Setup script for Payments Module with Supabase
# Base de datos: gastos
# URL: https://mznlfsehuerxkgbqidtt.supabase.co

echo "🚀 Configurando Módulo de Pagos con Supabase..."
echo ""
echo "URL: https://mznlfsehuerxkgbqidtt.supabase.co"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "❌ Error: No se encontró .env.local"
    exit 1
fi

echo "✅ Variables de entorno configuradas"
echo ""
echo "📋 Próximos pasos:"
echo ""
echo "1. Ir a: https://mznlfsehuerxkgbqidtt.supabase.co/project/_/sql"
echo "2. Copiar el contenido de supabase/schema.sql"
echo "3. Pegar en el SQL Editor de Supabase"
echo "4. Ejecutar (Run)"
echo ""
echo "5. Una vez configurada la DB, ejecutar:"
echo "   npm run dev"
echo ""
echo "🔑 Credenciales ya configuradas en .env.local"
echo ""