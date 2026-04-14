#!/bin/bash
# Script para levantar el servidor de la demo

echo "🚀 Iniciando servidor de demo..."
echo "Abri: http://localhost:8080"
echo ""
echo "Para detener: Ctrl+C"
echo ""

cd dist-demo
python3 -m http.server 8080