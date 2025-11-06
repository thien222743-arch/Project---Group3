// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({ username: '', name: '', email: '' });

  const token = localStorage.getItem('token');

  // ✅ Lấy thông tin profile khi load trang
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data.user);
        setFormData({
          username: res.data.user.username,
          name: res.data.user.name,
          email: res.data.user.email
        });
      } catch (err) {
        console.error(err);
        setMessage('❌ Vui lòng đăng nhập lại.');
      }
    };
    fetchProfile();
  }, [token]);

  // ✅ Cập nhật profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        'http://localhost:5000/api/users/profile',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage('✅ Cập nhật thành công!');
      setUser(res.data.user);
    } catch (err) {
      console.error('❌ Lỗi cập nhật:', err);
      if (err.response?.status === 401) setMessage('⚠️ Token hết hạn, vui lòng đăng nhập lại.');
      else setMessage('❌ Cập nhật thất bại.');
    }
  };

  if (!token) return <p>Bạn cần đăng nhập trước.</p>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Thông tin cá nhân</h2>

      {user && (
        <div>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Username:</strong> {user.username}</p>
        </div>
      )}

      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Tên người dùng"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
          type="text"
          placeholder="Tên hiển thị"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <button type="submit">Cập nhật</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}

export default Profile;
