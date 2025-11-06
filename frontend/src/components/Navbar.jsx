import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <nav style={{
      background: '#282c34',
      padding: '10px 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <div style={{ color: 'white', fontWeight: 'bold' }}>🌐 MyApp</div>
      <div>
        <Link to="/" style={linkStyle}>Trang chủ</Link>
        <Link to="/signup" style={linkStyle}>Đăng ký</Link>
        <Link to="/login" style={linkStyle}>Đăng nhập</Link>
        <Link to="/profile" style={linkStyle}>Profile</Link>
        {user && (
          <button onClick={handleLogout} style={{ marginLeft: 10 }}>Đăng xuất</button>
        )}
      </div>
    </nav>
  );
}

const linkStyle = {
  color: 'white',
  marginRight: '15px',
  textDecoration: 'none',
};

export default Navbar;
