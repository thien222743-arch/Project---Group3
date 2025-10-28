import React, { useState } from 'react';
import UserList from './components/UserList';
import AddUser from './components/AddUser';
import './App.css'; // Giả định App.css

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  // Hàm được gọi khi user mới được thêm thành công
  const handleUserAdded = () => {
    // Tăng key để buộc component UserList re-render
    setRefreshKey(prevKey => prevKey + 1); 
  };

  return (
    <div className="App">
      <h1>Quản lý người dùng</h1>
      <hr />
      <AddUser onUserAdded={handleUserAdded} />
      <hr />
      {/* Dùng key để buộc component được khởi tạo lại khi user mới được thêm */}
      <UserList key={refreshKey} /> 
    </div>
  );
}

export default App;
