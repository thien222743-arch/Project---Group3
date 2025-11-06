import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div>
        <Navbar /> {/* ✅ Luôn hiển thị ở mọi trang */}
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<h2>Chào mừng đến ứng dụng React!</h2>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
