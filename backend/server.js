// backend/server.js
// CODE HOÀN CHỈNH (CỔNG 5000, KẾT NỐI DB)

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// --- KẾT NỐI DATABASE ---
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('>>> Đã kết nối MongoDB thành công!'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));

// --- ROUTES ---
const usersRouter = require('./routes/users');
app.use('/api/auth', usersRouter); 

// Lấy cổng 5000 từ file .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server đang chạy trên cổng ${PORT}`));