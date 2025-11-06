// src/context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from 'react'; // ✅ FIX: Import hook từ React
// import axios, ... (Nếu cần)

const AuthContext = createContext(); // ✅ FIX: createContext được định nghĩa

export const AuthProvider = ({ children }) => {
    // Lấy token từ Local Storage
    const [token, setToken] = useState(localStorage.getItem('authToken')); // ✅ FIX: useState được định nghĩa
    
    // Logic cho isLoggedIn
    const isLoggedIn = !!token;

    // --- Các hàm Logic ---
    const login = (jwtToken) => {
        // ⚠️ Đảm bảo key 'authToken' được sử dụng nhất quán
        localStorage.setItem('authToken', jwtToken); 
        setToken(jwtToken);
    };
    
    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
    };

    const value = {
        token,         // Cung cấp token
        isLoggedIn,    
        login,
        logout
    };

    return ( // ✅ FIX: Lệnh return nằm trong hàm component
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom Hook để sử dụng Context dễ dàng
export const useAuth = () => { // ✅ FIX: Đảm bảo hook được định nghĩa và export
    return useContext(AuthContext);
};