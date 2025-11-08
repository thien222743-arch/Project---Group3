
// middleware/authMiddleware.js

// Middleware kiểm tra xác thực (bản demo)
const authMiddleware = (req, res, next) => {
  // Giả lập kiểm tra token (trong thực tế sẽ kiểm JWT)
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Thiếu token hoặc chưa đăng nhập.' });
  }

  // Giả sử token hợp lệ
  next();
};

module.exports = authMiddleware;
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  let token;

  // 1. Kiểm tra xem header 'Authorization' có tồn tại và bắt đầu bằng 'Bearer' không
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Tách lấy token (bỏ chữ "Bearer " đi)
      token = req.headers.authorization.split(' ')[1];

      // 3. Giải mã token dùng khóa bí mật (từ file .env)
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Tìm user trong DB bằng ID từ token (loại bỏ password)
      // Gắn user này vào request để các hàm sau có thể dùng
      req.user = await User.findById(decoded.userId).select('-password');

      // 5. Cho phép request đi tiếp
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Token không hợp lệ.' });
    }
  }

  // Nếu không có token
  if (!token) {
    res.status(401).json({ message: 'Không có quyền truy cập, không tìm thấy token.' });
  }
};

module.exports = authMiddleware;
