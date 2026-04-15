# 🏦 Conversor Banco → Wallet

Convierte extractos bancarios de Paraguay (Banco Continental) al formato de importación de Wallet.

## 📋 Formato de Entrada

Tu banco exporta así:
```
Fecha	Descripcion	Movimiento	Debitos	Creditos	Saldo
03/03/2026	Transferenc. Recibida SPI	3256	0,00	350.000,00	773.660,00
03/03/2026	POS:DELICES DE FRANCE	931552	-10.000,00	0,00	713.660,00
```

## 📤 Formato de Salida (Wallet)

```
account,category,currency,amount,ref_currency_amount,type,payment_type,note,date,...
Banco,Income,PYG,350000,350000,Income,CASH,Transferenc. Recibida SPI,2026-03-03 12:00:00,...
Banco,Food,PYG,-10000,-10000,Expenses,CASH,DELICES DE FRANCE,2026-03-03 12:00:00,...
```

## 🚀 Uso

### 1. Guardar el extracto del banco

En tu banco online:
- Exportar movimientos
- Guardar como CSV o copiar a un archivo .txt
- Asegurarse que las columnas estén separadas por tabulaciones (tabs)

### 2. Ejecutar el conversor

```bash
cd scripts
node convert-bank-to-wallet.js extracto-banco.csv wallet-import.csv
```

O simplemente:
```bash
node scripts/convert-bank-to-wallet.js extracto.csv
```

Generará `wallet-import.csv` automáticamente.

### 3. Importar en Wallet

1. Abrir app Wallet
2. Menú → Importar/Exportar → Importar CSV
3. Seleccionar `wallet-import.csv`
4. Verificar que los campos estén correctos
5. Importar

## 🏷️ Categorías Automáticas

El script detecta automáticamente:

| Descripción contiene | Categoría Wallet |
|---------------------|------------------|
| DELICES, VIENESA, BIGGIE, HAVANNA, RESTAURANT | Food |
| ANDE | Housing |
| Claro, NIC.PY, CNC | Utilities |
| SHELL | Transport |
| Transferenc. Recibida, Transf.Credito | Income |
| POS, Débito | Expenses |
| Default | Others |

## 🛠️ Personalizar

Para agregar más categorías, editar el archivo `convert-bank-to-wallet.js`:

```javascript
const CATEGORY_MAP = {
  'TU-LOCAL': 'Food',  // Agregar aquí
  // ... resto
};
```

## ⚠️ Notas

- La fecha se convierte de `DD/MM/YYYY` → `YYYY-MM-DD HH:MM:SS`
- Los montos se normalizan (coma decimal → punto decimal)
- Las descripciones se limpian (remueve códigos C, R al final)
- El saldo se ignora (no es necesario para Wallet)