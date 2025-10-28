import React, { useState } from 'react';
import axios from 'axios';

const AddUser = ({ onUserAdded }) => { // Nhận hàm callback
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = { name, email }; // Đảm bảo khớp với API Backend
      await axios.post("http://localhost:3000/users", newUser);
      alert(`Thêm người dùng ${name} thành công!`);
      setName('');
      setEmail('');
      if (onUserAdded) {
        onUserAdded(); // Gọi hàm để làm mới danh sách
      }
    } catch (error) {
      console.error("Lỗi khi thêm user:", error);
      alert("Lỗi khi thêm người dùng. Kiểm tra console.");
    }
  };

  return (
    <div>
      <h3>Thêm người dùng mới</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Tên" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <br/>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <br/>
        <button type="submit">Thêm</button>
      </form>
    </div>
  );
};

export default AddUser;