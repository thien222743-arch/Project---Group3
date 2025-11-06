import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '' // ✅ thêm name để backend nhận đầy đủ
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Gửi đúng các trường mà backend yêu cầu
      const res = await axios.post('http://localhost:5000/api/users/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        name: formData.name
      });

      alert('🎉 Đăng ký thành công!');
      console.log('Phản hồi từ server:', res.data);

      // Xóa form sau khi đăng ký xong
      setFormData({ username: '', email: '', password: '', name: '' });
    } catch (error) {
      console.error('Lỗi đăng ký:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Đăng ký thất bại, vui lòng thử lại!');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: 300,
        margin: '50px auto',
        padding: 20,
        border: '1px solid #ccc',
        borderRadius: 10,
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Đăng ký tài khoản</h2>

      <input
        type="text"
        placeholder="Tên người dùng"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        required
      />

      <input
        type="text"
        placeholder="Họ và tên"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />

      <input
        type="email"
        placeholder="Email (Gmail)"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />

      <input
        type="password"
        placeholder="Mật khẩu"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      />

      <button
        type="submit"
        style={{
          marginTop: 10,
          padding: '8px 0',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer'
        }}
      >
        Đăng ký
      </button>
    </form>
  );
}

export default Signup;
