#!/usr/bin/env node
/**
 * Conversor de Extracto Bancario → Wallet
 * 
 * Uso: node convert-bank-to-wallet.js <archivo-banco.csv> [salida.csv]
 * 
 * Formatos soportados:
 * - Banco Continental (Paraguay)
 * - Fecha: DD/MM/YYYY
 * - Monto: formato europeo (coma decimal, punto miles)
 */

const fs = require('fs');
const path = require('path');

// Mapeo de descripciones a categorías de Wallet
const CATEGORY_MAP: Record<string, string> = {
  // Comida
  'DELICES DE FRANCE': 'Food',
  'LA VIENESA': 'Food',
  'BIGGIE': 'Food',
  'HAVANNA': 'Food',
  'LJ-GA': 'Food',
  'LOS JARDINES': 'Food',
  'ÑA EUSTAQUIA': 'Food',
  'BACON STEAKHOUSE': 'Food',
  'BELLINI PASTAS': 'Food',
  'PETROMAX': 'Food',
  'GRUPO MADERO': 'Food',
  'MERCATO': 'Food',
  'EXEN ATRIUM': 'Food',
  'COMPLEJO BULNES PADEL': 'Food',
  'PAPALALO DRINKS': 'Food',
  
  // Servicios/Utilities
  'ANDE': 'Housing',
  'Claro': 'Utilities',
  'NIC.PY': 'Utilities',
  'CNC': 'Utilities',
  
  // Transporte
  'SHELL': 'Transport',
  
  // Tarjetas/Pagos
  'Pago tarjeta': 'Financial',
  'Debito Aut.Tarj': 'Financial',
  'ITAU AUTO COBRE': 'Financial',
  
  // Transferencias
  'Transferenc. Recibida': 'Income',
  'Transferencia Enviada': 'Transfer',
  'Transf.Credito': 'Income',
  'Transfer.Internet': 'Transfer',
  
  // Default
  'POS': 'Expenses',
  'POS Ext': 'Expenses',
};

// Detectar categoría basada en descripción
function detectCategory(description: string): { category: string; type: string } {
  const desc = description.toUpperCase();
  
  // Buscar match exacto o parcial
  for (const [key, category] of Object.entries(CATEGORY_MAP)) {
    if (desc.includes(key.toUpperCase())) {
      return { 
        category, 
        type: category === 'Income' ? 'Income' : 'Expenses' 
      };
    }
  }
  
  // Si tiene débito, es gasto
  return { category: 'Others', type: 'Expenses' };
}

// Limpiar descripción
function cleanDescription(description: string): string {
  return description
    .replace(/\s+/g, ' ')
    .replace(/\s*C\s*$/, '')
    .replace(/\s*R\s*$/, '')
    .replace(/^POS:/, '')
    .replace(/^POS Ext:/, '')
    .trim();
}

// Parsear monto (formato: -50.000,00 → -50000.00)
function parseAmount(amountStr: string): number | null {
  if (!amountStr || amountStr === '0,00' || amountStr === '0.00') {
    return null;
  }
  
  // Remover espacios
  let clean = amountStr.trim();
  
  // Convertir formato europeo a estándar
  // -50.000,00 → -50000.00
  clean = clean.replace(/\./g, '').replace(',', '.');
  
  const num = parseFloat(clean);
  return isNaN(num) ? null : num;
}

// Parsear fecha (DD/MM/YYYY → YYYY-MM-DD HH:MM:SS)
function parseDate(dateStr: string): string {
  const parts = dateStr.split('/');
  if (parts.length !== 3) return dateStr;
  
  const [day, month, year] = parts;
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')} 12:00:00`;
}

// Procesar línea del banco
function processLine(line: string): Record<string, string | number> | null {
  // Separar por tabulaciones
  const columns = line.split('\t');
  
  if (columns.length < 6) return null;
  
  const [fecha, descripcion, movimiento, debitos, creditos, saldo] = columns;
  
  // Determinar monto
  let amount: number | null = null;
  
  const debito = parseAmount(debitos);
  const credito = parseAmount(creditos);
  
  if (debito !== null && debito !== 0) {
    amount = debito; // Ya viene negativo
  } else if (credito !== null && credito !== 0) {
    amount = credito;
  }
  
  if (amount === null) return null;
  
  // Detectar categoría y tipo
  const descLimpia = cleanDescription(descripcion);
  const { category, type } = detectCategory(descripcion);
  
  return {
    account: 'Banco',
    category,
    currency: 'PYG',
    amount,
    ref_currency_amount: amount,
    type,
    payment_type: 'CASH',
    note: descLimpia,
    payment_type_local: 'Cash',
    date: parseDate(fecha),
    gps_latitude: 0,
    gps_longitude: 0,
    gps_accuracy_in_meters: 0,
    warranty_in_month: 0,
    transfer: 'FALSO',
    payee: '',
    labels: '',
    envelope_id: '',
    custom_category: 'FALSO',
  };
}

// Main
function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('Uso: node convert-bank-to-wallet.js <archivo-banco.csv> [salida.csv]');
    console.log('');
    console.log('Ejemplo:');
    console.log('  node convert-bank-to-wallet.js extracto.csv wallet-import.csv');
    process.exit(1);
  }
  
  const inputFile = args[0];
  const outputFile = args[1] || 'wallet-import.csv';
  
  if (!fs.existsSync(inputFile)) {
    console.error(`❌ Error: No se encontró el archivo ${inputFile}`);
    process.exit(1);
  }
  
  console.log(`📄 Leyendo: ${inputFile}`);
  
  const content = fs.readFileSync(inputFile, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  
  // Saltar header si existe
  const startIndex = lines[0].includes('Fecha') || lines[0].includes('DESCRIP') ? 1 : 0;
  
  const results: Record<string, string | number>[] = [];
  let success = 0;
  let errors = 0;
  
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    const processed = processLine(line);
    
    if (processed) {
      results.push(processed);
      success++;
    } else {
      errors++;
      console.log(`⚠️  Línea ${i + 1} ignorada: ${line.substring(0, 50)}...`);
    }
  }
  
  // Generar CSV
  if (results.length === 0) {
    console.error('❌ No se pudieron procesar registros');
    process.exit(1);
  }
  
  // Headers
  const headers = Object.keys(results[0]);
  
  // CSV content
  let csv = headers.join(',') + '\n';
  
  for (const row of results) {
    const values = headers.map(h => {
      const val = row[h];
      // Escapar valores con coma
      if (typeof val === 'string' && val.includes(',')) {
        return `"${val}"`;
      }
      return val;
    });
    csv += values.join(',') + '\n';
  }
  
  fs.writeFileSync(outputFile, csv);
  
  console.log('');
  console.log('✅ Conversión completada!');
  console.log(`   📊 Registros procesados: ${success}`);
  console.log(`   ⚠️  Registros ignorados: ${errors}`);
  console.log(`   💾 Archivo guardado: ${outputFile}`);
  console.log('');
  console.log('📱 Ahora importá el archivo en Wallet');
}

main();