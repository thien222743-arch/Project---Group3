// backend/routes/users.js

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Import cả 2 "người gác cổng"
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware'); // <-- MỚI

// === HOẠT ĐỘNG 1 (Công khai) ===
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// === HOẠT ĐỘNG 2 (Phải Đăng Nhập) ===
// (Chỉ cần gác cổng 1 lớp: authMiddleware)
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

// === HOẠT ĐỘNG 3 (Phải là Admin) ===
// (Phải gác cổng 2 LỚP!)
// API /users (GET, DELETE)

// GET /api/auth/users
// Phải qua 2 "cửa": 1. Đã đăng nhập (auth) -> 2. Là Admin (admin)
router.get('/users', authMiddleware, adminMiddleware, userController.getAllUsers); // <-- MỚI

// DELETE /api/auth/users/:id
// Tương tự, phải là Admin mới được xóa
router.delete('/users/:id', authMiddleware, adminMiddleware, userController.deleteUser); // <-- MỚI
    
module.exports = router;