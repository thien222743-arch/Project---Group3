const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
require('dotenv').config();

// ==========================
// 1️⃣ API: Forgot Password
// ==========================
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email không tồn tại" });

    // Tạo token reset ngẫu nhiên
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Lưu token và thời hạn 10 phút vào DB
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 phút
    await user.save();

    // Tạo link reset
    const resetLink = `${process.env.CLIENT_URL || "http://localhost:3000"}/reset-password/${resetToken}`;

    // Gửi email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Yêu cầu đặt lại mật khẩu",
      text: `Nhấn vào link để đặt lại mật khẩu (10 phút): ${resetLink}`,
      html: `<p>Nhấn vào link để đặt lại mật khẩu (10 phút): <a href="${resetLink}">${resetLink}</a></p>`
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Đã gửi email đặt lại mật khẩu!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};

// ==========================
// 2️⃣ API: Reset Password
// ==========================
exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() } // token chưa hết hạn
    });

    if (!user) return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });

    // Hash mật khẩu mới
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    // Xóa token sau khi đổi mật khẩu
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Đổi mật khẩu thành công!" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Lỗi server" });
  }
};
