// backend/server.js
// --- KHAI BÁO THƯ VIỆN BẮT BUỘC ---
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Dùng để tải biến môi trường từ file .env

// --- THIẾT LẬP APP VÀ MIDDLEWARE ---
const app = express();
const PORT = process.env.PORT || 5000; // Cổng mặc định 5000

// Middleware: Cho phép truy cập từ client (frontend) khác domain
app.use(cors()); 

// Middleware: Giúp Express hiểu và phân tích dữ liệu JSON gửi từ client
app.use(express.json()); 

// --- KẾT NỐI DATABASE ---
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('LỖI CẤU HÌNH: Vui lòng cung cấp MONGODB_URI trong file .env');
    process.exit(1); // Thoát ứng dụng nếu thiếu URI
}

mongoose.connect(MONGODB_URI)
  .then(() => console.log('>>> ✅ Đã kết nối MongoDB thành công!'))
  .catch(err => console.error('>>> ❌ LỖI KẾT NỐI MONGODB:', err));
  
// --- TÍCH HỢP ROUTES ---
// Lấy route module xử lý các chức năng User/Auth
const usersRouter = require('./routes/users');

// backend/routes/users.js

// ... (khai báo thư viện)

// Router.get chỉ có thể dùng được khi đường dẫn này đã được định nghĩa
// Đảm bảo bạn có đoạn code sau:
router.get(
    '/profile', 
    authMiddleware.verifyToken, // Middleware xác thực JWT (công việc của SV 1)
    userController.viewProfile
); 

// ... (các routes khác như /signup, /login)

module.exports = router;

// Đường dẫn chung là /api/auth cho tất cả các endpoint liên quan đến Authentication & User Management
app.use('/api/auth', usersRouter); 

// --- KHỞI ĐỘNG SERVER ---
app.listen(PORT, () => {
    console.log(`>>> 🚀 Server đang chạy trên http://localhost:${PORT}`);
});