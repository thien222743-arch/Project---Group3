// frontend/src/index.js - CODE ĐÃ FIX LỖI CONTEXT

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // ✅ FIX: Import AuthProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Sử dụng React.StrictMode để phát hiện lỗi
  <React.StrictMode> 
    {/* ✅ FIX: Bọc toàn bộ ứng dụng bằng AuthProvider */}
    <AuthProvider>
      <App /> 
    </AuthProvider>
  </React.StrictMode>
);