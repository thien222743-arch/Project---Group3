// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Lấy token từ Local Storage khi khởi tạo
    const [token, setToken] = useState(localStorage.getItem('authToken'));
    const isLoggedIn = !!token; // Kiểm tra trạng thái đăng nhập

    // Dùng useEffect để thiết lập Header Authorization mỗi khi token thay đổi
    useEffect(() => {
        if (token) {
            // Đặt header Bearer Token cho tất cả các request
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } else {
            // Xóa header nếu không có token
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    // Hàm Login: Lưu token và cập nhật state
    const login = (jwtToken) => {
        localStorage.setItem('authToken', jwtToken);
        setToken(jwtToken);
    };

    // Hàm Logout: Xóa token và cập nhật state
    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);