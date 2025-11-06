// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile'; // <-- 1. Import Profile

function App() {
  return (
    <Router>
      <div>
        {/* Tạo link để chuyển trang */}
        <nav>
          <Link to="/signup" style={{ marginRight: '10px' }}>Đăng Ký</Link>
          <Link to="/login" style={{ marginRight: '10px' }}>Đăng Nhập</Link>
          <Link to="/profile">Thông Tin Cá Nhân</Link> {/* <-- 2. Thêm Link */}
        </nav>

        <hr />

        {/* Định nghĩa các trang */}
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} /> {/* <-- 3. Thêm Route */}
          <Route path="/" element={<Login />} /> {/* Mặc định là trang Login */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;