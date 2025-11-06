// frontend/src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [userData, setUserData] = useState({
    username: '',
    email: ''
  });
  const [message, setMessage] = useState('');

  // 1. Lấy token từ localStorage (từ Hoạt động 1)
  const token = localStorage.getItem('token');

  // 2. Chức năng: Lấy thông tin cá nhân (VIEW)
  //    (Chạy 1 lần khi component được tải)
  useEffect(() => {
    const fetchProfile = async () => {
      // Nếu không có token (chưa đăng nhập), không làm gì cả
      if (!token) {
        setMessage('Bạn cần đăng nhập để xem thông tin.');
        return;
      }

      try {
        // === BƯỚC QUAN TRỌNG NHẤT (Protected Route) ===
        // Tạo 1 "config" để gửi "vé" (Token) trong Header
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Gửi "vé"
          }
        };

        // Gọi API 'GET /profile' CÓ BẢO VỆ của SV1
        const res = await axios.get('http://localhost:5000/api/auth/profile', config);
        
        setUserData(res.data); // Cập nhật state với thông tin user
        // SCREENSHOT 1 SẼ CHỤP TỪ ĐÂY
      
      } catch (err) {
        setMessage('Token không hợp lệ hoặc đã hết hạn. Vui lòng đăng nhập lại.');
        localStorage.removeItem('token'); // Xóa token hỏng
      }
    };

    fetchProfile();
  }, [token]); // Chạy lại khi token thay đổi

  // 3. Chức năng: Xử lý khi gõ vào Form
  const onChange = e => setUserData({ ...userData, [e.target.name]: e.target.value });

  // 4. Chức năng: Cập nhật thông tin (UPDATE)
  const onSubmit = async e => {
    e.preventDefault();
    if (!token) return; // Không có token, không làm gì cả

    try {
      // Gửi token tương tự như trên
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      
      // Dữ liệu cần cập nhật (chỉ username, vì email thường không đổi)
      const body = { username: userData.username };

      // Gọi API 'PUT /profile' CÓ BẢO VỆ của SV1
      const res = await axios.put('http://localhost:5000/api/auth/profile', body, config);
      
      setMessage('Cập nhật thông tin thành công!');
      setUserData(res.data); // Cập nhật lại state với info mới

      // SCREENSHOT 2 SẼ CHỤP TỪ ĐÂY

    } catch (err) {
      setMessage('Cập nhật thất bại. Vui lòng thử lại.');
    }
  };

  // 5. Giao diện (Render)
  return (
    <div>
      <h2>Trang Thông Tin Cá Nhân</h2>
      
      {/* SCREENSHOT 1: Hiển thị user info */}
      <div>
        <p><strong>Email:</strong> {userData.email}</p><p><strong>Username (hiện tại):</strong> {userData.username}</p>
      </div>

      <hr />
      
      {/* SCREENSHOT 2: Form cập nhật thông tin */}
      <h3>Cập nhật thông tin</h3>
      <form onSubmit={onSubmit}>
        <label>Username mới:</label>
        <input
          type="text"
          name="username"
          value={userData.username}
          onChange={onChange}
        />
        <button type="submit">Cập nhật</button>
      </form>

      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
}

export default Profile;