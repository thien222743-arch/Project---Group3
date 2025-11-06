// backend/routes/users.js
// CODE HOÀN CHỈNH (CẢ HĐ1 VÀ HĐ2)

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Import "người gác cổng"
const authMiddleware = require('../middleware/authMiddleware');

// === HOẠT ĐỘNG 1 ===
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post('/logout', userController.logout);

// === HOẠT ĐỘNG 2 ===
router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

module.exports = router;