const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // <-- Thêm thư viện JWT

// === TUYẾN ĐƯỜNG ĐĂNG KÝ (SIGNUP) ===
// (Bạn đã có code này)
router.post('/signup', async (req, res) => {
    // ... code signup của bạn ...
    // Ví dụ, bạn có thể có:
    try {
        const { username, email, password } = req.body;
        
        // Kiểm tra xem email đã tồn tại chưa
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email đã tồn tại" });
        }

        // Hash mật khẩu
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Tạo user mới
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        // Lưu user vào DB
        const savedUser = await newUser.save();
        res.status(201).json({ message: "Đăng ký thành công!", userId: savedUser._id });

    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
});

// === TUYẾN ĐƯỜNG ĐĂNG NHẬP (LOGIN) ===
// (Code login của bạn)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Tìm user
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác' });
        }

        // 2. So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không chính xác' });
        }

        // 3. Tạo token
        const token = jwt.sign(
            { userId: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // 4. Trả về token
        res.status(200).json({
            message: "Đăng nhập thành công!",
            token: token
        });

    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
});

// === THÊM VÀO ĐÂY (SAU LOGIN, TRƯỚC MODULE.EXPORTS) ===
// === TUYẾN ĐƯỜNG ĐĂNG XUẤT (LOGOUT) ===
// Thêm route này để sửa lỗi 404
router.post('/logout', (req, res) => {
    try {
        // Với cách login trả token về body,
        // server không có gì để "xóa" (vì client giữ token).
        // Chúng ta chỉ cần trả về thông báo thành công.
        // Phía client sẽ nhận được thông báo này và tự xóa token.
        res.status(200).json({ message: "Đăng xuất thành công!" });

    } catch (error) {
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
});
// === KẾT THÚC PHẦN THÊM MỚI ===


module.exports = router; // Dòng này nằm ở cuối file