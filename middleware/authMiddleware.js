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
