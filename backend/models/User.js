const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Đây là Schema (khuôn mẫu) mà SV3 chịu trách nhiệm
// Nó có email (unique), password, và role (default là 'user')
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // <-- Đảm bảo kiểm tra email trùng
    lowercase: true,
  },
  password: {
    type: String,
    required: true, // <-- Mật khẩu này sẽ được mã hóa (việc của bạn)
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user' // <-- Yêu cầu: có role
  }
}, { timestamps: true }); // Tự động thêm 'createdAt' và 'updatedAt'

module.exports = mongoose.model('User', userSchema);