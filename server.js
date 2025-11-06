// ĐÂY LÀ FILE server.js ĐÃ SỬA ĐÚNG

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // <-- Code mới
require('dotenv').config(); // <-- Code mới

const app = express();
app.use(cors());
app.use(express.json());

// --- KẾT NỐI DATABASE (Code mới) ---
// Nó sẽ đọc chuỗi MONGODB_URI từ file .env của bạn
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('>>> Đã kết nối MongoDB thành công!'))
  .catch(err => console.error('Lỗi kết nối MongoDB:', err));
  
// --- ROUTES (Code mới) ---
// Sử dụng file routes/users.js của bạn
const usersRouter = require('./routes/users');
// Đường dẫn chung là /api/auth
app.use('/api/auth', usersRouter); 

// Lấy cổng 5000 từ file .env (Code mới)
const PORT = process.env.PORT || 5000; // <-- Đã sửa cổng
app.listen(PORT, () => console.log(`Server đang chạy trên cổng ${PORT}`));