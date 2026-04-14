import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/index.css';
import { PaymentsModuleLocal } from '../src/components/LayoutLocal';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PaymentsModuleLocal />
  </React.StrictMode>
);