// --- CÁC THƯ VIỆN CẦN THIẾT ---
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser'); // <-- 1. THÊM IMPORT VÀO ĐÂY

// --- CẤU HÌNH ---
dotenv.config(); // <-- Gọi config() để đọc tệp .env
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser()); // <-- 2. THÊM DÒNG NÀY (sau express.json)

// --- REQUIRE CÁC ROUTER ---
// (Hãy chắc chắn tên tệp là 'user.js' chứ không phải 'users.js')
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

// --- MOUNT CÁC ROUTER ---
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

// --- LẤY BIẾN MÔI TRƯỜNG ---
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI; // <-- Lấy chuỗi kết nối

// --- KẾT NỐI DATABASE VÀ KHỞI ĐỘNG SERVER ---
console.log("Đang kết nối tới MongoDB...");

mongoose.connect(MONGO_URI)
  .then(() => {
    // KẾT NỐI THÀNH CÔNG
    console.log("✅✅✅ ĐÃ KẾT NỐI THÀNH CÔNG VỚI MONGODB!");

    // CHỈ KHỞI ĐỘNG SERVER SAU KHI KẾT NỐI DB THÀNH CÔNG
    app.listen(PORT, () => {
      console.log(`Server đang chạy trên port ${PORT}`);
    });
  })
  .catch((err) => {
    // KẾT NỐI THẤT BẠI
    console.error("❌❌❌ LỖI KẾT NỐI MONGODB:");
    console.error(err.message); // In ra lỗi thật sự
    process.exit(1); // Dừng ứng dụng nếu không kết nối được DB
  });