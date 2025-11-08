// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

// ✅ [1] Đăng ký người dùng mới
const signup = async (req, res) => {
  try {
    const { username, email, password, name } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Vui lòng nhập đầy đủ thông tin.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã được sử dụng.' });
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      name: name || ''
    });

    return res.status(201).json({
      message: 'Đăng ký thành công',
      user: { id: newUser._id, username: newUser.username, email: newUser.email, name: newUser.name }
    });
  } catch (error) {
    console.error('❌ Lỗi đăng ký:', error);
    res.status(500).json({ message: 'Lỗi server khi đăng ký.' });
  }
};

// ✅ [2] Đăng nhập người dùng
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Kiểm tra email
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Email không tồn tại.' });

    // Kiểm tra mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Sai mật khẩu.' });

    // Tạo JWT thật
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
    );

    return res.status(200).json({
      message: 'Đăng nhập thành công',
      token,
      user: { id: user._id, username: user.username, email: user.email, name: user.name }
    });
  } catch (error) {
    console.error('❌ Lỗi đăng nhập:', error);
    res.status(500).json({ message: 'Lỗi server khi đăng nhập.' });
  }
};

// ✅ [3] Xem thông tin cá nhân (cần token hợp lệ)
const viewProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Chưa đăng nhập.' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(404).json({ message: 'Không tìm thấy người dùng.' });

    res.status(200).json({ message: 'Lấy thông tin thành công', user });
  } catch (error) {
    console.error('❌ Lỗi xem profile:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Phiên đăng nhập đã hết hạn.' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Token không hợp lệ.' });
    }
    res.status(500).json({ message: 'Lỗi server khi xem profile.' });
  }
};

// ✅ [4] Cập nhật thông tin cá nhân
const updateProfile = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ message: 'Chưa đăng nhập.' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { username, name, email, password } = req.body;

    const updateData = { username, name, email };

    // Nếu người dùng nhập mật khẩu mới → mã hóa lại
    if (password && password.trim() !== '') {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      decoded.id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) return res.status(404).json({ message: 'Không tìm thấy người dùng.' });

    res.status(200).json({ message: 'Cập nhật thành công', user: updatedUser });
  } catch (error) {
    console.error('❌ Lỗi cập nhật profile:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Phiên đăng nhập đã hết hạn.' });
    }
    res.status(500).json({ message: 'Lỗi server khi cập nhật profile.' });
  }
};

// ✅ [5] Đăng xuất (frontend tự xử lý)
const logout = (req, res) => {
  res.json({ message: 'Đăng xuất thành công.' });
};

module.exports = {
  signup,
  login,
  logout,
  viewProfile,
  updateProfile,
};
