// Ví dụ trong một component Navbar.jsx
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const { isLoggedIn, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Xóa token
        navigate('/login'); // Chuyển hướng
    };

    if (!isLoggedIn) return null; // Ẩn khi chưa đăng nhập

    return (
        <nav>
            <span>Chào mừng!</span>
            <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
                Đăng xuất
            </button>
        </nav>
    );
}
