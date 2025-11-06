import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = ({ refreshKey }) => { // Thêm prop refreshKey nếu cần làm mới sau POST
  const [users, setUsers] = useState([]);
  const API_URL = "http://localhost:3000/users";

  useEffect(() => {
    // Hàm gọi API lấy danh sách users
    const fetchUsers = async () => {
      try {
        const response = await axios.get(API_URL);
        // Backend trả về mảng user với các trường id, name, email, role
        setUsers(response.data); 
      } catch (error) {
        console.error("Lỗi khi fetch users:", error);
      }
    };

    fetchUsers();
  }, [refreshKey]); // Chạy lại khi refreshKey thay đổi

  return (
    <div>
      <h3>Danh sách người dùng</h3>
      {users.length === 0 ? (
        <p>Không có người dùng nào.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {users.map(user => (
            // Hiển thị đầy đủ name, email, và role
            <li key={user.id} style={{ marginBottom: '10px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
              <strong>{user.name}</strong> 
              <br/>
              Email: {user.email} 
              <br/>
              Vai trò: **{user.role}** {/* Thêm nút Sửa/Xóa tại đây nếu ở Hoạt động 7 */}
            </li> 
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;