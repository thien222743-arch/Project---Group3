// backend/middleware/adminMiddleware.js

const adminMiddleware = (req, res, next) => {
  // Middleware này PHẢI chạy SAU authMiddleware (vì nó cần req.user)
  
  // authMiddleware đã giải mã token và gắn req.user vào
  if (req.user && req.user.role === 'admin') {
    // Nếu user tồn tại VÀ role là 'admin', cho phép đi tiếp
    next();
  } else {
    // Nếu không, trả về lỗi 403 (Forbidden - Bị cấm)
    res.status(403).json({ message: 'Không có quyền Admin. Yêu cầu bị từ chối.' });
  }
};

module.exports = adminMiddleware;