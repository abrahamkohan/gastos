import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { PaymentsModuleLocal } from './components/LayoutLocal';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <PaymentsModuleLocal />
  </React.StrictMode>
);