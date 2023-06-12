import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap-grid.css';
import 'react-tooltip/dist/react-tooltip.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import "react-datepicker/dist/react-datepicker.css";
import App from './App';
import { AuthContextProvider } from './context/AuthContext'
import Modal from 'react-modal'

const root = ReactDOM.createRoot(document.getElementById('root'));
Modal.setAppElement(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);