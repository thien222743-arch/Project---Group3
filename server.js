const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRoutes = require('./routes/userRoutes');       // routes của user
const authRoutes = require('./routes/authRoutes');       // routes quên mật khẩu / reset password
const avatarRoutes = require('./routes/avatarRoutes');   // routes upload avatar

const app = express();
app.use(cors());
app.use(express.json());

// ========================
// Kết nối MongoDB
// ========================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Kết nối MongoDB thành công'))
  .catch(err => console.error('❌ Lỗi kết nối MongoDB:', err));

// ========================
// Routes
// ========================
app.use('/api/users', userRoutes);       // routes user cũ
app.use('/api/auth', authRoutes);        // routes quên mật khẩu / reset password
app.use('/api/avatar', avatarRoutes);    // routes upload avatar

// ========================
// Chạy server
// ========================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
