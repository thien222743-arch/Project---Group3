// backend/models/User.js (Nhiệm vụ của SV3)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  
  // === TRƯỜNG MỚI CHO HOẠT ĐỘNG 4 (SV3 Thêm vào) ===

  // 1️⃣ Upload Avatar (Tích hợp Cloudinary)
  avatar: {
    type: String,
    default: "https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg" // Ảnh mặc định
  },

  // 2️⃣ Token Reset Password
  resetPasswordToken: {
    type: String
  },

  // 3️⃣ Thời gian hết hạn của token reset
  resetPasswordExpires: {
    type: Date
  }

}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
