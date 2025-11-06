// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios'; // Import axios

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [message, setMessage] = useState(''); // Để lưu thông báo kết quả

  const { username, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      // Gọi API của SV1 (Backend)
      // Đây chính là URL mà SV1 đã tạo:
      const res = await axios.post('http://localhost:5000/api/auth/signup', formData);

      // Cập nhật thông báo
      setMessage(res.data.message); // "Đăng ký thành công!"

    } catch (err) {
      // Nếu có lỗi (ví dụ: email trùng)
      setMessage(err.response.data.message); // "Email này đã tồn tại."
    }
  };

  return (
    <div>
      <h2>Form Đăng Ký</h2>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Username" name="username" value={username} onChange={onChange} required />
        <br />
        <input type="email" placeholder="Email" name="email" value={email} onChange={onChange} required />
        <br />
        <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
        <br />
        <button type="submit">Đăng Ký</button>
      </form>
      
      {/* YÊU CẦU SCREENSHOT 1: Form + Thông báo kết quả */}
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}

export default Signup;