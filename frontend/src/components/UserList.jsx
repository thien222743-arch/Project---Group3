import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Hàm gọi API lấy danh sách users
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Lỗi khi fetch users:", error);
      }
    };

    fetchUsers();
  }, []); // [] đảm bảo chỉ chạy 1 lần sau khi render đầu tiên

  return (
    <div>
      <h3>Danh sách người dùng</h3>
      {users.length === 0 ? (
        <p>Không có người dùng nào.</p>
      ) : (
        <ul>
          {users.map(user => (
            // Giả định user có thuộc tính id và name
            <li key={user.id}>{user.name} (ID: {user.id})</li> 
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserList;