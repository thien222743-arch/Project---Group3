import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/users/login', { email, password });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      setMessage('Đăng nhập thành công!');
      console.log('✅ JWT Token:', res.data.token);
      console.log('👤 User:', res.data.user);

      // ✅ Tự động chuyển sang trang Profile
      setTimeout(() => navigate('/profile'), 1000);

    } catch (error) {
      setMessage(error.response?.data?.message || 'Lỗi đăng nhập');
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
        <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
        <button type="submit">Đăng nhập</button>
      </form>
      {message && <p style={{ color: 'blue' }}>{message}</p>}
    </div>
  );
}

export default Login;
