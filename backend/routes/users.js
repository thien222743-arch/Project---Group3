// backend/routes/users.js

const express = require('express');
const router = express.Router();

// Import "bộ não" (Controller) từ controller
const userController = require('../controllers/userController');

// ⚠️ CẦN THIẾT: Import Middleware Xác thực JWT 
// Sinh viên 1 phải tạo file này. Giả định tên là authMiddleware.js
const authMiddleware = require('../middleware/authMiddleware'); 


// --- TUYẾN ĐƯỜNG PUBLIC (HOẠT ĐỘNG 1) ---

// 1. Đăng ký (Sign Up)
router.post('/signup', userController.signup);

// 2. Đăng nhập (Login)
router.post('/login', userController.login);

// 3. Đăng xuất (Logout) - Thường là xử lý phía client, nhưng vẫn nên có route
router.post('/logout', userController.logout);


// --- TUYẾN ĐƯỜNG ĐƯỢC BẢO VỆ (HOẠT ĐỘNG 2) ---

// 5. Xem thông tin cá nhân (View Profile)
// Lỗi 404 được khắc phục bằng cách thêm tuyến đường GET này.
// authMiddleware.verifyToken đảm bảo chỉ user đã đăng nhập mới được truy cập.
router.get(
    '/profile', 
    authMiddleware.verifyToken, // 🔒 Middleware bảo vệ (kiểm tra JWT)
    userController.viewProfile  // Hàm xử lý logic lấy dữ liệu user
); 

// 4. Cập nhật thông tin cá nhân (Update Profile)
// Cần sử dụng phương thức PUT hoặc PATCH
router.put(
    '/profile', 
    authMiddleware.verifyToken, 
    userController.updateProfile
); 


module.exports = router;