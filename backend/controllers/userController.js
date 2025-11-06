// backend/controllers/userController.js
// CODE HOÀN CHỈNH (CẢ HĐ1 VÀ HĐ2)

const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ---- HOẠT ĐỘNG 1 ----
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email này đã tồn tại.' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Đăng ký thành công!' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server: ' + error.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không đúng.' });
    }
    const payload = { userId: user._id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Đăng nhập thành công!', token: token });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server: ' + error.message });
  }
};
exports.logout = (req, res) => {
  res.status(200).json({ message: 'Đã nhận yêu cầu đăng xuất.' });
};

// ---- HOẠT ĐỘNG 2 ----
exports.getProfile = async (req, res) => {
  const user = req.user;
  if (user) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role
    });
  } else {
    res.status(404).json({ message: 'Không tìm thấy người dùng.' });
  }
};
exports.updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.username = req.body.username || user.username;
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      res.status(404).json({ message: 'Không tìm thấy người dùng.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Lỗi server: ' + error.message });
  }
};