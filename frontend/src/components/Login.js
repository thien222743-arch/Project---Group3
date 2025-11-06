// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [message, setMessage] = useState('');
  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      // Gọi API của SV1 (Backend)
      const res = await axios.post('http://localhost:5000/api/auth/login', formData);

      // YÊU CẦU: Lưu token
      localStorage.setItem('token', res.data.token);
      
      setMessage('Đăng nhập thành công!');

      // YÊU CẦU SCREENSHOT 2: In JWT token ra Console
      console.log('JWT Token:', res.data.token);

    } catch (err) {
      setMessage(err.response.data.message); // "Email hoặc mật khẩu không đúng."
    }
  };

  // YÊU CẦU: Chức năng Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('token'); // Xóa token phía client
    setMessage('Đã đăng xuất.');
    console.log('Đã đăng xuất, xóa token.');
  };

  return (
    <div>
      <h2>Form Đăng Nhập</h2>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
        <br />
        <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
        <br />
        <button type="submit">Đăng Nhập</button>
      </form>

      <br />
      <button onClick={handleLogout}>Đăng Xuất</button>
      
      {message && <p style={{ color: 'blue' }}>{message}</p>}
    </div>
  );
}

export default Login;